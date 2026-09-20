const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function count(pattern) {
  return (html.match(pattern) || []).length;
}

// 1. HTML structure and text integrity.
check(/^\s*<!doctype html>/i.test(html), 'index.html 缺少 <!doctype html>');
check(/<body[\s>]/i.test(html), 'index.html 缺少 <body>');
check(/<\/body>\s*<\/html>\s*$/i.test(html), 'index.html 結尾不完整');
check(count(/<script\b/gi) === count(/<\/script>/gi), 'script 開始／結束標籤數量不一致');
check(count(/<style\b/gi) === count(/<\/style>/gi), 'style 開始／結束標籤數量不一致');
check(!html.includes('\u0000'), 'index.html 含有 NUL 二進位字元');
check(!html.includes('\uFFFD'), 'index.html 含有 UTF-8 替代字元，可能遭到二進位污染');

// 2. Prevent an unexpected large file-size drop relative to main.
const currentBytes = fs.statSync(indexPath).size;
check(currentBytes >= 500000, `index.html 過小：${currentBytes} bytes`);
try {
  const base = execFileSync('git', ['show', 'origin/main:index.html'], {
    cwd: root,
    encoding: null,
    maxBuffer: 20 * 1024 * 1024
  });
  const minimum = Math.floor(base.length * 0.8);
  check(
    currentBytes >= minimum,
    `index.html 相較 main 縮小超過 20%：${base.length} → ${currentBytes} bytes`
  );
} catch (error) {
  console.warn('無法讀取 origin/main:index.html，略過相對大小比較。');
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

console.log(`五項快速檢查通過：index.html ${currentBytes} bytes，${inlineScripts.length} 個 inline scripts，${trackedJs.length} 個 JS 檔案。`);
