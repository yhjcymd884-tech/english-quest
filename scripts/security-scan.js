const fs=require('fs'),cp=require('child_process');
const files=cp.execFileSync('git',['ls-files'],{encoding:'utf8'}).trim().split('\n').filter(f=>/\.(?:html|js|mjs|cjs)$/.test(f));
const findings=[];
const rules=[
 {id:'eval',re:/\beval\s*\(/g,level:'block'},
 {id:'new-function',re:/\bnew\s+Function\s*\(/g,level:'review'},
 {id:'document-write',re:/\bdocument\s*\.\s*write(?:ln)?\s*\(/g,level:'review'},
 {id:'innerHTML',re:/\.innerHTML\s*=/g,level:'review'},
 {id:'insertAdjacentHTML',re:/\.insertAdjacentHTML\s*\(/g,level:'review'},
 {id:'http-resource',re:/["']http:\/\//g,level:'block'}
];
for(const file of files){
 const s=fs.readFileSync(file,'utf8');
 for(const rule of rules) for(const m of s.matchAll(rule.re)){
  const line=s.slice(0,m.index).split('\n').length;
  findings.push({level:rule.level,id:rule.id,file,line});
 }
}
const allow=new Set(['index.html:document-write','latest.html:document-write','scripts/validate-guardrails.js:new-function']);
const isDevHttp=x=>x.id==='http-resource'&&x.file==='playwright.config.js';
const isSvgNamespace=x=>x.id==='http-resource'&&x.file==='assets/wardrobe-v110.js';
const unexpected=findings.filter(x=>!allow.has(x.file+':'+x.id)&&!isDevHttp(x)&&!isSvgNamespace(x));
const blocking=unexpected.filter(x=>x.level==='block');
const summary=[
 '# Browser security scan','',
 '| Severity | Rule | File | Line | Status |','|---|---|---|---:|---|',
 ...findings.map(x=>`| ${x.level} | ${x.id} | \`${x.file}\` | ${x.line} | ${allow.has(x.file+':'+x.id)?'temporary allowlist':isDevHttp(x)?'localhost test server':isSvgNamespace(x)?'SVG namespace (not network)':'review'} |`),
 '',`Scanned **${files.length}** browser-code files. Blocking findings: **${blocking.length}**.`
].join('\n');
console.log(summary);
if(process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,summary+'\n');
for(const x of unexpected) console.log(`::${x.level==='block'?'error':'warning'} file=${x.file},line=${x.line},title=${x.id}::Security-sensitive browser sink requires review`);
if(blocking.length) process.exit(1);
