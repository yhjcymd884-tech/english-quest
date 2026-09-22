/* v118: reference-inspired English monster battle with typed answers. */
(function(){
  const petAsset='assets/battle-v118/pet-poodle.png';
  const mushroomAsset='assets/battle-v118/monster-mushroom.png';
  const esc=value=>String(value??'').replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
  const clean=value=>String(value||'').trim().toLowerCase().replace(/\s+/g,' ');
  const today=()=>new Date().toISOString().slice(0,10);
  const displayMonsterName=m=>m.id==='mush'?'蘑菇咕咕':m.name;
  function monsterVisual(m){
    return m.id==='mush'
      ? '<img src="'+mushroomAsset+'" alt="蘑菇咕咕">'
      : monsterArt(m.id);
  }
  function dailyCount(){
    const d=S.v118BattleDaily;
    return d&&d.date===today()?Math.min(10,d.count||0):0;
  }
  function addDaily(){
    if(!S.v118BattleDaily||S.v118BattleDaily.date!==today())S.v118BattleDaily={date:today(),count:0};
    S.v118BattleDaily.count=Math.min(10,(S.v118BattleDaily.count||0)+1);
  }

  startBattle=function(zone=currentZone,forceBoss=false){
    let unlocked=monsters.filter(m=>m.lv<=S.level&&(!m.boss||S.level>=6));
    let pool=forceBoss?unlocked.filter(m=>m.boss):unlocked.filter(m=>!m.boss);
    if(!pool.length)pool=monsters.filter(m=>!m.boss&&m.lv<=Math.max(1,S.level));
    let choices=pool.filter(m=>m.id!==v89LastMonster);
    let m=(choices.length?choices:pool)[Math.floor(Math.random()*Math.max(1,(choices.length?choices:pool).length))]||monsters[0];
    v89LastMonster=m.id;
    battle={m:{...m},hp:m.hp,maxhp:m.hp,playerHp:S.hearts,q:null,locked:false,zone:Number.isFinite(+zone)?+zone:0};
    renderBattle();
  };

  battleQuestion=function(){
    const pool=spellWords.filter(x=>Array.isArray(x)&&x.length===2&&String(x[1]).trim());
    const q=pool[Math.floor(Math.random()*pool.length)]||['蘋果','apple'];
    battle.q={zh:q[0],ans:String(q[1]).trim(),opts:[],category:'單字'};
    battle.locked=false;
  };

  renderBattle=function(){
    const box=document.getElementById('gamebox');
    const games=document.getElementById('games');
    if(!box)return;
    if(!battle){startBattle(currentZone,false);return}
    if(!battle.q)battleQuestion();
    if(games)games.classList.add('v118BattleMode');
    const answer=battle.q.ans;
    const letters=[...answer].filter(ch=>ch!==' ');
    const hp=Math.max(0,Math.round(battle.hp/battle.maxhp*100));
    const playerMax=100+S.level*12;
    const playerNow=Math.round(playerMax*(S.hearts/3));
    const icon=/蘋果/.test(battle.q.zh)?'🍎':/狗|犬/.test(battle.q.zh)?'🐶':/貓/.test(battle.q.zh)?'🐱':/水/.test(battle.q.zh)?'💧':'📖';
    box.innerHTML='<section class="v118Battle" aria-label="英文怪獸戰">'
      +'<div class="v118Scene">'
        +'<div class="v118Top"><div class="v118Sign">英文怪獸戰<small>VOCABULARY BATTLE ♡</small></div>'
        +'<div class="v118EnemyCard"><b>Lv.'+esc(battle.m.lv)+'　'+esc(displayMonsterName(battle.m))+'</b><div class="v118Hp"><i style="width:'+hp+'%"></i></div><span>'+battle.hp+' / '+battle.maxhp+'</span></div></div>'
        +'<div class="v118BattleStage battleStage"><div class="v118Hero" id="fighter">'+avatarSVG()+'</div><img class="v118Pet" src="'+petAsset+'" alt="棕色貴賓狗夥伴"><div class="v118Bubble">加油！<br>你一定可以的 ♡</div><div class="v118Monster" id="enemyFighter">'+monsterVisual(battle.m)+'</div></div>'
        +'<div class="v118PlayerHp"><b>♡ Lv.'+S.level+'</b><div><div class="v118Hp"><i style="width:'+(S.hearts/3*100)+'%"></i></div><span>'+playerNow+' / '+playerMax+'</span></div></div>'
      +'</div>'
      +'<div class="v118Question"><button class="v118Speak" type="button" data-v118-speak aria-label="播放英文發音">🔊</button><div><div class="v118Prompt"><small>（'+esc(battle.q.category)+'）</small> '+esc(battle.q.zh)+'</div><div class="v118Slots" data-v118-slots>'
        +letters.map((_,i)=>'<span class="v118Slot" data-slot="'+i+'"></span>').join('')
        +'<input class="v118SpellInput" data-v118-input maxlength="'+Math.max(answer.length,letters.length)+'" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="輸入英文答案"></div></div><div class="v118WordIcon">'+icon+'</div></div>'
      +'<button class="v118Attack" type="button" data-v118-attack disabled>⚔️　攻擊！</button>'
      +'<div class="v118Rewards"><div>答對可獲得<b>EXP +5</b></div><div>擊敗獲得<b>🪙 +'+battle.m.coin+'</b></div><div>今日挑戰<b>'+dailyCount()+'/10</b></div></div>'
      +'</section>';
  };

  function paintSlots(input){
    const chars=[...input.value].filter(ch=>ch!==' ');
    document.querySelectorAll('[data-v118-slots] [data-slot]').forEach((slot,i)=>slot.textContent=chars[i]||'');
    const attack=document.querySelector('[data-v118-attack]');
    if(attack)attack.disabled=!clean(input.value);
  }
  function showFeedback(text){
    const root=document.querySelector('.v118Battle');
    if(!root)return;
    root.querySelector('.v118Feedback')?.remove();
    const feedback=document.createElement('div');
    feedback.className='v118Feedback';
    feedback.textContent=String(text??'');
    root.appendChild(feedback);
  }
  function showResult(win,message){
    const box=document.getElementById('gamebox');
    if(!box)return;
    const art=win&&battle?monsterVisual(battle.m):'<div style="font-size:80px">💗</div>';
    box.innerHTML='<section class="v118Result"><h1>'+(win?'勝利！':'先休息一下')+'</h1><div class="v118ResultArt">'+art+'</div><p>'+message+'</p><button class="big" data-game="battle">'+(win?'挑戰下一隻':'重新挑戰')+'</button><button class="big" data-go="home">返回首頁</button></section>';
    battle=null;
  }
  function submitBattle(){
    const input=document.querySelector('[data-v118-input]');
    if(!input||!battle||battle.locked)return;
    const guess=clean(input.value),correct=clean(battle.q.ans);
    if(!guess)return;
    battle.locked=true;
    input.blur();
    if(guess===correct){
      const fighter=document.getElementById('fighter'),enemy=document.getElementById('enemyFighter');
      fighter?.classList.add('attack');
      setTimeout(()=>enemy?.classList.add('hit'),140);
      const w=weapons.find(x=>x.id===S.weapon)||weapons[0];
      battle.hp=Math.max(0,battle.hp-w.atk);
      addXP(5);addDaily();save();
      showFeedback('命中！答對了 ♡');
      if(battle.hp<=0){
        const defeated=battle.m;
        const gem=defeated.boss?2:(Math.random()<.22?1:0);
        S.coins+=defeated.coin;S.gems+=gem;S.monsterDex[defeated.id]=(S.monsterDex[defeated.id]||0)+1;
        if(defeated.boss){S.bossWins++;if(!S.bossClears.includes(battle.zone))S.bossClears.push(battle.zone)}
        const up=addXP(defeated.exp);save();
        setTimeout(()=>showResult(true,'獲得 🪙 '+defeated.coin+'・EXP '+defeated.exp+(gem?'・💎 '+gem:'')+(up?'・LEVEL UP!':'')),650);
      }else{
        setTimeout(()=>{if(battle){battle.q=null;renderBattle()}},600);
      }
    }else{
      document.getElementById('fighter')?.classList.add('hurt');
      S.wrongWords[battle.q.ans]=(S.wrongWords[battle.q.ans]||0)+1;
      if(typeof v87AddWrong==='function')v87AddWrong('vocab','中文「'+battle.q.zh+'」的英文是？',battle.q.ans,[],'英文怪獸戰');
      S.hearts=Math.max(0,S.hearts-1);save();
      showFeedback('再試一次：正確答案是 '+battle.q.ans);
      if(S.hearts===0){
        if(S.level>1)S.level--;S.xp=0;S.hearts=3;save();
        setTimeout(()=>showResult(false,'愛心用完了，休息後再挑戰。'),1050);
      }else{
        setTimeout(()=>{if(battle){battle.q=null;renderBattle()}},1050);
      }
    }
  }

  const oldGame=game;
  game=function(type){
    document.getElementById('games')?.classList.remove('v118BattleMode');
    if(type==='battle')startBattle(currentZone,false);else oldGame(type);
  };
  const oldGo=go;
  go=function(page){
    if(page!=='games')document.getElementById('games')?.classList.remove('v118BattleMode');
    oldGo(page);
  };

  document.addEventListener('input',event=>{
    if(event.target.matches('[data-v118-input]'))paintSlots(event.target);
  });
  document.addEventListener('keydown',event=>{
    if(event.target.matches('[data-v118-input]')&&event.key==='Enter'){event.preventDefault();submitBattle()}
  });
  document.addEventListener('click',event=>{
    if(event.target.closest('[data-v118-slots]'))document.querySelector('[data-v118-input]')?.focus();
    if(event.target.closest('[data-v118-attack]'))submitBattle();
    if(event.target.closest('[data-v118-speak]')&&battle?.q){
      if('speechSynthesis' in window){speechSynthesis.cancel();const utter=new SpeechSynthesisUtterance(battle.q.ans);utter.lang='en-US';utter.rate=.82;speechSynthesis.speak(utter)}
    }
  });
})();

/* v119: 500-question junior-high bank; vocabulary exam only. */
(function(){
const P=s=>s.split('|').map(x=>x.split(','));
const SA=P('big,large,small|small,little,big|happy,glad,sad|sad,unhappy,happy|fast,quick,slow|easy,simple,difficult|difficult,hard,easy|smart,clever,stupid|beautiful,pretty,ugly|quiet,silent,noisy|noisy,loud,quiet|strong,powerful,weak|rich,wealthy,poor|clean,tidy,dirty|hot,warm,cold|young,youthful,old|early,ahead of time,late|right,correct,wrong|begin,start,end|end,finish,begin|buy,purchase,sell|love,like very much,hate|remember,recall,forget|open,unlock,close|full,filled,empty|safe,secure,dangerous|kind,nice,mean|near,close,far|same,identical,different|brave,courageous,afraid');
const CN=P('apple,C|book,C|chair,C|student,C|teacher,C|dog,C|cat,C|car,C|house,C|idea,C|question,C|egg,C|orange,C|banana,C|bottle,C|water,U|milk,U|rice,U|bread,U|money,U|homework,U|information,U|advice,U|furniture,U|news,U|weather,U|traffic,U|music,U|sugar,U|coffee,U');
const IV=P('be,was-were,been|become,became,become|begin,began,begun|break,broke,broken|bring,brought,brought|build,built,built|buy,bought,bought|catch,caught,caught|choose,chose,chosen|come,came,come|do,did,done|draw,drew,drawn|drink,drank,drunk|drive,drove,driven|eat,ate,eaten|fall,fell,fallen|feel,felt,felt|find,found,found|fly,flew,flown|forget,forgot,forgotten|get,got,gotten|give,gave,given|go,went,gone|grow,grew,grown|have,had,had|hear,heard,heard|keep,kept,kept|know,knew,known|leave,left,left|make,made,made');
const mix=(a,i)=>a[(i*7+3)%a.length], opt=(ans,a,b)=>v81Shuffle([...new Set([ans,a,b])]).slice(0,3);
const bank={similar:[],countable:[],irregular:[]};let all=[],id=1;
for(let i=0;i<170;i++){let x=SA[i%SA.length],anti=i%2===1,ans=anti?x[2]:x[1],z={id:id++,topic:'synonym_antonym',q:(anti?'Which word is the opposite of “':'Which word/phrase is closest in meaning to “')+x[0]+'”?',a:ans,opts:opt(ans,mix(SA,i+5)[0],mix(SA,i+11)[0]),source:anti?'相反詞':'相似詞'};bank.similar.push(z);all.push(z)}
for(let i=0;i<165;i++){let x=CN[i%CN.length],c=x[1]==='C',m=i%3,ans,q;if(m===0){ans=c?'countable':'uncountable';q='Is “'+x[0]+'” countable or uncountable?'}else{ans=c?(m===1?'many':'a few'):(m===1?'much':'a little');q='Choose the best word for “'+x[0]+'”.'}let z={id:id++,topic:'countable_uncountable',q:q,a:ans,opts:m===0?opt(ans,c?'uncountable':'countable','both'):opt(ans,c?'much':'many',c?'a little':'a few'),source:'可數／不可數名詞'};bank.countable.push(z);all.push(z)}
for(let i=0;i<165;i++){let x=IV[i%IV.length],pp=i%2===1,ans=x[pp?2:1],z={id:id++,topic:'irregular_verbs',q:'What is the '+(pp?'past participle':'past tense')+' of “'+x[0]+'”?',a:ans,opts:opt(ans,mix(IV,i+4)[pp?2:1],mix(IV,i+9)[pp?2:1]),source:'不規則動詞'};bank.irregular.push(z);all.push(z)}
window.ENGLISH_QUESTION_BANK_500=all;window.v119Banks=bank;
const oldMenu=v81Menu;
v81Menu=function(type){if(type!=='vocab')return oldMenu(type);go('games');const b=document.getElementById('gamebox');if(!b)return;b.innerHTML='<div class="card v81ExamCard"><small>VOCABULARY EXAM</small><h2>📖 字彙大會考</h2><p>可單選或混合題庫。</p><div class="v81Checks"><label><input type="checkbox" name="v81" value="verbs"><span>🏃 動詞</span></label><label><input type="checkbox" name="v81" value="countable" checked><span>🔢 可數／不可數名詞</span></label><label><input type="checkbox" name="v81" value="similar" checked><span>↔️ 相似詞／相反詞</span></label><label><input type="checkbox" name="v81" value="irregular" checked><span>🔄 不規則動詞</span></label><label><input type="checkbox" name="v81" value="thousand"><span>📚 千詞表</span></label></div><div class="v82ExamConfig"><button data-v82count="10">10 題</button><button class="on" data-v82count="20">20 題</button><button data-v82count="30">30 題</button></div><button class="big primary" data-v81start="vocab">開始大會考</button></div>';b.scrollIntoView({behavior:'smooth',block:'start'})};
v81StartVocab=function(){const sets=[...document.querySelectorAll('input[name=v81]:checked')].map(x=>x.value);if(!sets.length)return alert('請至少勾選一個題庫');let pool=[];if(sets.includes('similar'))pool.push(...bank.similar);if(sets.includes('countable'))pool.push(...bank.countable);if(sets.includes('irregular'))pool.push(...bank.irregular);if(sets.includes('verbs')||sets.includes('thousand')){let words=spellWords.filter(w=>sets.includes('thousand')||(sets.includes('verbs')&&v81Verbs.has(String(w[1]||'').toLowerCase())));pool.push(...words.map(w=>v81VocabQ(w,words)))}if(!pool.length)return alert('目前沒有可用題目');v81Exam={type:'vocab',qs:v81Shuffle(pool).slice(0,Math.min(v82ExamCount,pool.length)),i:0,score:0};v81Render()};
})();
