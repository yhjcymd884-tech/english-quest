(()=>{
  const style=document.createElement('style');
  style.id='navigation-map-v122-style';
  style.textContent=`
    #map.quest119Map{
      position:fixed!important;
      inset:0!important;
      overflow:hidden!important;
      background:#f8edf1!important;
    }
    #map.quest119Map .quest119MapStage{
      position:fixed!important;
      inset:auto!important;
      left:50%!important;
      top:50%!important;
      width:min(100vw,calc(100dvh * 592 / 884))!important;
      height:min(100dvh,calc(100vw * 884 / 592))!important;
      max-width:none!important;
      transform:translate(-50%,-50%)!important;
      overflow:hidden!important;
      background:#f8edf1!important;
    }
    #map.quest119Map .quest119MapStage>.quest119__art{
      object-fit:fill!important;
      object-position:center!important;
    }
  `;
  document.head.appendChild(style);

  const alignHomeActions=()=>{
    const root=document.querySelector('[data-companion120="home"]');
    if(!root)return false;
    const layout={
      map:[1.5,69.5,24.2,21.5],
      games:[26.2,69.5,24.2,21.5],
      wardrobe:[51,69.5,24.2,21.5],
      shop:[75.8,69.5,22.7,21.5]
    };
    Object.entries(layout).forEach(([action,[left,top,width,height]])=>{
      const button=root.querySelector(`[data-c120="${action}"]`);
      if(!button)return;
      Object.assign(button.style,{left:left+'%',top:top+'%',width:width+'%',height:height+'%'});
    });
    return true;
  };

  const init=()=>{
    if(alignHomeActions())return;
    const observer=new MutationObserver(()=>{
      if(alignHomeActions())observer.disconnect();
    });
    observer.observe(document.body,{childList:true,subtree:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();