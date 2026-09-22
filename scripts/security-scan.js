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
 for(const r of rules){for(const m of s.matchAll(r.re)){const line=s.slice(0,m.index).split('\n').length;findings.push({level:r.level,id:r.id,file,line})}}
}
const allow=new Set(['index.html:document-write','latest.html:document-write','scripts/validate-guardrails.js:new-function']);
const unexpected=findings.filter(x=>!allow.has(x.file+':'+x.id));
console.log(JSON.stringify({scanned:files.length,findings,unexpected},null,2));
if(unexpected.some(x=>x.level==='block'))process.exit(1);
