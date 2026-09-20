(()=>{
'use strict';
const grammarMap=[1,2,3,4,5,6,7,8,9,12];
const grammarSet=new Set(grammarMap);
const style=document.createElement('style');
style.id='grammar-v121-style';
style.textContent=`
.quest119MapStage .quest119__nav,#grammarForest119 .quest119__nav{
  left:0!important;right:0!important;bottom:0!important;height:10.5%!important;
  gap:0!important;z-index:6!important;pointer-events:none!important
}
.quest119MapStage .quest119__nav button,#grammarForest119 .quest119__nav button{
  min-height:0!important;height:100%!important;border:0!important;border-radius:0!important;
  background:transparent!important;box-shadow:none!important;backdrop-filter:none!important;
  color:transparent!important;font-size:0!important;pointer-events:auto!important
}
.quest119MapStage .quest119__nav button b,#grammarForest119 .quest119__nav button b{display:none!important}
.quest119MapStage .quest119__nav button:focus-visible,#grammarForest119 .quest119__nav button:focus-visible{
  outline:3px solid #ff4e9b!important;outline-offset:-5px!important;background:rgba(255,255,255,.12)!important
}
.grammar121Level{
  position:absolute;z-index:4;left:50%;top:13.1%;translate:-50% 0;
  padding:.35rem .8rem;border:2px solid #eda2be;border-radius:999px;
  background:rgba(255,255,255,.92);color:#8b3b68;
  font:800 clamp(11px,2.8vw,15px)/1.15 system-ui,sans-serif;
  box-shadow:0 4px 12px rgba(91,49,69,.14);pointer-events:none
}
`;
document.head.appendChild(style);

const third=v=>v==='have'?'has':v==='do'?'does':v==='go'?'goes':/[^aeiou]y$/.test(v)?v.slice(0,-1)+'ies':/(s|x|z|ch|sh|o)$/.test(v)?v+'es':v+'s';
const past=v=>({go:'went',eat:'ate',drink:'drank',come:'came',see:'saw',read:'read',write:'wrote',buy:'bought',take:'took',make:'made',have:'had',do:'did',run:'ran',swim:'swam'}[v]||(/e$/.test(v)?v+'d':/[^aeiou]y$/.test(v)?v.slice(0,-1)+'ied':v+'ed'));
const ing=v=>({run:'running',swim:'swimming',sit:'sitting',write:'writing',make:'making',come:'coming',dance:'dancing'}[v]||(/e$/.test(v)?v.slice(0,-1)+'ing':v+'ing'));
const shuffle=a=>[...a].sort(()=>Math.random()-.5);
const q=(text,opts,answer,difficulty)=>[text,opts,answer,difficulty];
const subjects=[
  {s:'I',be:'am',pro:'I',third:false},{s:'You',be:'are',pro:'You',third:false},
  {s:'He',be:'is',pro:'He',third:true},{s:'She',be:'is',pro:'She',third:true},
  {s:'It',be:'is',pro:'It',third:true},{s:'We',be:'are',pro:'We',third:false},
  {s:'They',be:'are',pro:'They',third:false},{s:'Tom',be:'is',pro:'He',third:true},
  {s:'Amy',be:'is',pro:'She',third:true},{s:'My friends',be:'are',pro:'They',third:false}
];
const verbs=['play','study','watch','go','eat','drink','read','write','wash','do'];
const complements=['a student','happy today','in the classroom','ready for school','my best friend','very busy','at home','good classmates','ten years old','from Taiwan'];
function makeBe(){const out=[];for(let i=0;i<100;i++){const s=subjects[i%10],c=complements[Math.floor(i/10)];if(i<50)out.push(q(`${s.s} ___ ${c}.`,['am','is','are','be'],['am','is','are','be'].indexOf(s.be),i));else{const noun=`${s.s} ${s.be} ${c}.`,all=['I','You','He','She','It','We','They'],opts=[s.pro,...all.filter(x=>x!==s.pro).slice((i*2)%4,(i*2)%4+3)];while(opts.length<4)opts.push(all.find(x=>!opts.includes(x)));out.push(q(`${noun} ___ ${i%2?'is':'looks'} great.`,opts,0,i))}}return out}
function makePresent(){const out=[];for(let i=0;i<100;i++){const s=subjects[i%10],v=verbs[Math.floor(i/10)],ans=s.third?third(v):v;out.push(q(`${s.s} ___ ${v==='go'?'to school':v==='study'?'English':v==='watch'?'TV':v==='eat'?'breakfast':v==='drink'?'water':v==='read'?'books':v==='write'?'emails':v==='wash'?'the dishes':v==='do'?'homework':'basketball'} every ${i<40?'day':i<70?'morning':'week'}.`,[v,third(v),past(v),(s.be+' '+ing(v))],s.third?1:0,i))}return out}
function makePast(){const out=[];for(let i=0;i<100;i++){const s=subjects[i%10],v=verbs[Math.floor(i/10)],p=past(v);out.push(q(`${i<50?'Yesterday':'Last '+['night','Sunday','week','month','summer'][i%5]}, ${s.s.toLowerCase()} ___ ${v==='go'?'to the park':v==='study'?'English':v==='watch'?'a movie':v==='eat'?'breakfast':v==='drink'?'juice':v==='read'?'a story':v==='write'?'a letter':v==='wash'?'the car':v==='do'?'homework':'basketball'}.`,[v,third(v),p,'will '+v],2,i))}return out}
function makeFuture(){const out=[];const times=['tomorrow','next Monday','tonight','next week','this weekend','soon','next month','after school','later','in the future'];for(let i=0;i<100;i++){const s=subjects[i%10],v=verbs[Math.floor(i/10)];out.push(q(`${s.s} ___ ${v==='go'?'to Taipei':v==='study'?'English':v==='watch'?'a movie':v==='eat'?'dinner':v==='drink'?'some water':v==='read'?'the book':v==='write'?'to Grandma':v==='wash'?'the car':v==='do'?'the work':'basketball'} ${times[i%10]}.`,['will '+v,past(v),third(v),s.be+' '+ing(v)],0,i))}return out}
function makeContinuous(){const out=[];for(let i=0;i<100;i++){const s=subjects[i%10],v=verbs[Math.floor(i/10)],ans=s.be+' '+ing(v);out.push(q(`${i<50?'Look!':'Right now,'} ${s.s.toLowerCase()} ___ ${v==='go'?'home':v==='study'?'English':v==='watch'?'TV':v==='eat'?'lunch':v==='drink'?'milk':v==='read'?'a book':v==='write'?'a note':v==='wash'?'the dishes':v==='do'?'homework':'basketball'}.`,[v,past(v),ans,'will '+v],2,i))}return out}
function makePrepositions(){
  const patterns=[
    ['The book is ___ the desk.','on'],['The cat is ___ the box.','in'],['The ball is ___ the chair.','under'],['The lamp is ___ the sofa.','beside'],['Tom sits ___ Amy and Ben.','between'],
    ['The school is ___ the bank.','across from'],['The dog is ___ the table.','behind'],['The tree is ___ the house.','in front of'],['The picture is ___ the wall.','on'],['The shoes are ___ the bed.','under'],
    ['We meet ___ seven o’clock.','at'],['My birthday is ___ April.','in'],['English class is ___ Monday.','on'],['I study ___ the morning.','in'],['We eat lunch ___ noon.','at'],
    ['The party is ___ Friday night.','on'],['It is cold ___ winter.','in'],['Dad comes home ___ six.','at'],['School starts ___ September.','in'],['We travel ___ summer.','in']
  ];
  const all=['on','in','under','beside','between','across from','behind','in front of','at','from'];const out=[];
  for(let i=0;i<100;i++){const [text,ans]=patterns[i%20],suffix=i<20?'':` (${['A','B','C','D','E'][Math.floor(i/20)]})`;const distract=all.filter(x=>x!==ans).slice((i*3)%7,(i*3)%7+3);while(distract.length<3)distract.push(all[(i+distract.length)%all.length]);const opts=shuffle([ans,...distract.slice(0,3)]);out.push(q(text+suffix,opts,opts.indexOf(ans),i))}return out
}
function makeWh(){
  const kinds=[
    ['___ is your name?','What'],['___ do you live?','Where'],['___ is your birthday?','When'],['___ is your teacher?','Who'],['___ are you late?','Why'],
    ['___ do you go to school? By bus.','How'],['___ old is your sister?','How old'],['___ books do you have?','How many'],['___ is the bag? 500 dollars.','How much'],['___ do you exercise? Twice a week.','How often']
  ];
  const choices=['What','Where','When','Who','Why','How','How old','How many','How much','How often'];const out=[];
  const speakers=['Amy','Tom','Ben','Mary','Kevin','Lucy','Jack','Anna','Eric','Tina'];
  for(let i=0;i<100;i++){const [text,ans]=kinds[i%10],prompt=`${speakers[Math.floor(i/10)]} asks, “${text}”`;const opts=shuffle([ans,...choices.filter(x=>x!==ans).slice((i*2)%6,(i*2)%6+3)]);out.push(q(prompt,opts,opts.indexOf(ans),i))}return out
}
function makeCan(){const out=[];for(let i=0;i<100;i++){const s=subjects[i%10],v=verbs[Math.floor(i/10)];if(i<50)out.push(q(`${s.s} ___ ${v} very well.`,['can','is','does','has'],0,i));else out.push(q(`${s.s} will ___ ${v} after more practice.`,['be able to','can to','able','could to'],0,i))}return out}
function makeTags(){
  const rows=[
    ['You are ready',"aren't you",['are you',"don't you","isn't it"]],['She is a teacher',"isn't she",['is she',"doesn't she","aren't she"]],
    ['They are students',"aren't they",['are they',"don't they","isn’t it"]],['Tom likes cats',"doesn't he",["isn't he",'does he',"don't he"]],
    ['You like English',"don't you",["aren't you",'do you',"isn't it"]],['Amy can swim',"can't she",["doesn't she","isn't she",'can she']],
    ['We will go',"won't we",["don't we","aren't we",'will we']],['He went home',"didn't he",["doesn't he","isn't he",'did he']],
    ['It is cute',"isn't it",["doesn't it",'is it',"aren't it"]],['They played well',"didn't they",["don't they","aren't they",'did they']]
  ];
  const out=[];for(let i=0;i<100;i++){const row=rows[i%10],suffix=i<10?'':` ${['today','now','this week','at school','after class','every day','yesterday','last night','again','too'][Math.floor(i/10)]}`;const opts=shuffle([row[1],...row[2]]);out.push(q(`${row[0]}${suffix}, ___?`,opts,opts.indexOf(row[1]),i))}return out
}
function makeCostTakeSpend(){
  const things=['book','bag','ticket','computer','T-shirt','bike','meal','camera','phone','trip'];
  const times=['ten minutes','half an hour','one hour','two hours','three days','a week','twenty minutes','forty minutes','all morning','the whole afternoon'];
  const places=['bookstore','night market','school shop','online store','station','museum shop','supermarket','sports shop','toy store','department store'];
  const tasks=['clean the room','finish homework','walk to school','cook dinner','read the chapter','wash the car','build the model','write the report','practice the song','paint the picture'];
  const activities=['practicing English','reading','doing homework','playing basketball','cleaning','drawing','cooking','writing','studying science','helping Grandma'];
  const out=[];
  for(let i=0;i<100;i++){
    const mode=i%3,thing=things[i%10],time=times[Math.floor(i/10)];
    if(mode===0)out.push(q(`At the ${places[Math.floor(i/10)]}, the ${thing} ___ ${100+(i%10)*100} dollars.`,['costs','spends','takes','pays'],0,i));
    else if(mode===1)out.push(q(`It ___ me ${time} to ${tasks[i%10]}.`,['cost','spent','took','paid'],2,i));
    else out.push(q(`I ___ ${time} ${activities[i%10]}.`,['cost','spent','took','paid'],1,i));
  }
  return out
}

const banks=[makeBe(),makePresent(),makePast(),makeFuture(),makeContinuous(),makePrepositions(),makeWh(),makeCan(),makeTags(),makeCostTakeSpend()];
window.grammarBanksV121=banks;
grammarMap.forEach((topic,i)=>{topicBanks[topic]=banks[i]});
const starKey='eq121GrammarStars';
const loadStars=()=>{try{return JSON.parse(localStorage.getItem(starKey)||'{}')}catch{return {}}};
const getStar=topic=>Math.max(0,Math.min(5,Number(loadStars()[topic]||0)));
const saveStar=(topic,value)=>{const data=loadStars();data[topic]=Math.max(0,Math.min(5,value));localStorage.setItem(starKey,JSON.stringify(data))};
let grammarRun=false;

makeQuiz=function(topic){
  const pool=topicBanks[topic]||topicBanks[0];
  if(!grammarSet.has(topic))return shuffle(pool).slice(0,10).map(row=>{const opts=row[1].map((text,j)=>({text,ok:j===row[2]}));return {text:row[0],opts:shuffle(opts)}});
  const star=getStar(topic),band=Math.min(4,star),start=band*20;
  return shuffle(pool.slice(start,start+20)).slice(0,10).sort((a,b)=>(a[3]||0)-(b[3]||0)).map(row=>{
    const opts=row[1].map((text,j)=>({text,ok:j===row[2]}));return {text:row[0],opts:shuffle(opts),difficulty:row[3]}
  });
};
const oldStartQuiz=startQuiz;
startQuiz=function(topic){grammarRun=grammarSet.has(Number(topic));return oldStartQuiz(Number(topic))};
const oldFinish=finish;
finish=function(){
  if(!grammarRun||!grammarSet.has(quiz.topic))return oldFinish();
  if(typeof v78DailyComplete==='function')v78DailyComplete();
  const passed=quiz.score>=8,oldStar=getStar(quiz.topic),newStar=passed?Math.min(5,oldStar+1):oldStar;
  if(passed){
    saveStar(quiz.topic,newStar);S.coins=(S.coins||0)+50;
    if(newStar>oldStar)S.gems=(S.gems||0)+1;
    const p=S.progress[quiz.topic]||{star:1,clears:0};p.star=Math.max(1,Math.min(3,newStar));p.clears=(p.clears||0)+1;S.progress[quiz.topic]=p;
  }
  save();score.textContent=quiz.score+'/10';pass.textContent=passed?'通過 ✓':'尚未通過';
  reward.textContent=passed?(newStar>oldStar?`答對 ${quiz.score} 題，升為 ${'★'.repeat(newStar)}${'☆'.repeat(5-newStar)}`:'已達五星，獲得 50 金幣'):`需答對至少 8 題才可升星（本次 ${quiz.score} 題）`;
  go('result');refreshLabels();grammarRun=false;
};

function refreshLabels(){
  const screen=document.getElementById('grammarForest119');if(!screen)return;
  screen.querySelectorAll('[data-q119-topic]').forEach((button,i)=>{
    const topic=grammarMap[i],star=getStar(topic),name=button.getAttribute('aria-label')?.replace(/^開始/,'')||'';
    button.dataset.q119Topic=String(topic);button.setAttribute('aria-label',`${name}，目前 ${star} 星，開始 10 題挑戰`);
  });
  let label=screen.querySelector('.grammar121Level');if(!label){label=document.createElement('div');label.className='grammar121Level';screen.appendChild(label)}
  label.textContent='每關 10 題・答對 8 題升一星・題目由簡到難';
}
function init(){refreshLabels();const screen=document.getElementById('grammarForest119');if(screen)new MutationObserver(refreshLabels).observe(screen,{childList:true,subtree:false})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
