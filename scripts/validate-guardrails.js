const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const entryHtml = fs.readFileSync(indexPath, 'utf8');
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function count(source, pattern) {
  return (source.match(pattern) || []).length;
}

function validateDocument(source, label) {
  check(/^\s*<!doctype html>/i.test(source), `${label} 缺少 <!doctype html>`);
  check(/<body[\s>]/i.test(source), `${label} 缺少 <body>`);
  check(/<\/body>\s*<\/html>\s*$/i.test(source), `${label} 結尾不完整`);
  check(count(source, /<script\b/gi) === count(source, /<\/script>/gi), `${label} script 開始／結束標籤數量不一致`);
  check(count(source, /<style\b/gi) === count(source, /<\/style>/gi), `${label} style 開始／結束標籤數量不一致`);
  check(!source.includes('\u0000'), `${label} 含有 NUL 二進位字元`);
  check(!source.includes('\uFFFD'), `${label} 含有 UTF-8 替代字元，可能遭到二進位污染`);
}

// The public entry point may be a small loader that pins the full application to
// an immutable commit. Validate both layers so a legitimate loader is accepted,
// while a branch URL or a missing historical payload still fails CI.
const pinnedMatch = entryHtml.match(
  /https:\/\/raw\.githubusercontent\.com\/yhjcymd884-tech\/english-quest\/([0-9a-f]{40})\/index\.html/i
);
let html = entryHtml;
let sourceLabel = 'index.html';

if (pinnedMatch) {
  const pinnedSha = pinnedMatch[1].toLowerCase();
  check(!/raw\.githubusercontent\.com\/[^'"\s]+\/(?:main|master)\/index\.html/i.test(entryHtml), '載入器不得從可變動分支載入完整遊戲');
  try {
    html = execFileSync('git', ['show', `${pinnedSha}:index.html`], {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024
    });
    sourceLabel = `固定版本 ${pinnedSha.slice(0, 8)}:index.html`;
  } catch (error) {
    failures.push(`無法讀取載入器鎖定的歷史版本：${pinnedSha}`);
  }
}

// 1. HTML structure and text integrity.
validateDocument(entryHtml, '入口 index.html');
if (pinnedMatch) validateDocument(html, sourceLabel);

// 2. Prevent truncation. A loader stays small; its pinned payload must stay large.
const entryBytes = Buffer.byteLength(entryHtml);
const payloadBytes = Buffer.byteLength(html);
if (pinnedMatch) {
  check(entryBytes >= 500, `載入器異常過小：${entryBytes} bytes`);
  check(payloadBytes >= 500000, `固定歷史版本過小：${payloadBytes} bytes`);
} else {
  check(payloadBytes >= 500000, `index.html 過小：${payloadBytes} bytes`);
}

// 3. JavaScript syntax: inline scripts and tracked external scripts.
const inlineScripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter(match => !/\bsrc\s*=/.test(match[1]))
  .map(match => match[2]);

inlineScripts.forEach((source, index) => {
  try {
    new Function(source);
  } catch (error) {
    failures.push(`第 ${index + 1} 個 inline script 語法錯誤：${error.message}`);
  }
});

const trackedJs = execFileSync('git', ['ls-files', '*.js'], { cwd: root, encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

for (const file of trackedJs) {
  try {
    execFileSync(process.execPath, ['--check', file], { cwd: root, stdio: 'pipe' });
  } catch (error) {
    failures.push(`${file} JavaScript 語法錯誤`);
  }
}

// 4 and 5. Static protection for core entry points and eq38 persistence.
for (const marker of ['id="home"', 'id="map"', 'id="wardrobe"', 'id="pet"']) {
  check(html.includes(marker), `缺少核心頁面標記：${marker}`);
}
for (const label of ['文法筆記', '錯題本', '文法大會考', '字彙大會考']) {
  check(html.includes(label), `缺少核心功能文字：${label}`);
}
check(html.includes('eq38'), '找不到 eq38 localStorage 儲存鍵');
check(!/localStorage\s*\.\s*clear\s*\(/.test(html), '禁止呼叫 localStorage.clear()');
check(!/removeItem\s*\(\s*['"]eq38['"]\s*\)/.test(html), '禁止刪除 eq38');

if (failures.length) {
  console.error('\nEnglish Quest 五項檢查失敗：');
  failures.forEach((failure, index) => console.error(`${index + 1}. ${failure}`));
  process.exit(1);
}

const architecture = pinnedMatch ? `載入器 ${entryBytes} bytes + 固定版本 ${payloadBytes} bytes` : `完整入口 ${payloadBytes} bytes`;
console.log(`五項快速檢查通過：${architecture}，${inlineScripts.length} 個完整遊戲 inline scripts，${trackedJs.length} 個 JS 檔案。`);
