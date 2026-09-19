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
    root.insertAdjacentHTML('beforeend','<div class="v118Feedback">'+esc(text)+'</div>');
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
