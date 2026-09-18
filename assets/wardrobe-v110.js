(()=>{
  const fixedLayerStyle=document.createElement('style');
  fixedLayerStyle.textContent='#wardrobe .v110WearLayer{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;display:block!important;object-fit:fill!important;pointer-events:none!important}#wardrobe .v110WearLayer[hidden]{display:none!important}';
  document.head.appendChild(fixedLayerStyle);
  const KEY='englishQuestWardrobeSavedV113';
  const clone=o=>JSON.parse(JSON.stringify(o));
  const defaults={mode:'suit',suit:'daily-pink',previewSuit:'daily-pink',top:'rose',bottom:'pinkSkirt',shoes:'maryPink',bag:'heart',accessory:'bow',hair:'softLong',hairColor:'#9a705f',makeup:{brow:'soft',iris:'brown',lash:'long',shadow:'peach',blush:'rose',lip:'berry'},pet:'cinnamon'};
  let saved=clone(defaults),draft=clone(defaults),active='suit',suitGroup='daily',hairPane='style',makeTab='brow';
  try{const x=JSON.parse(localStorage.getItem(KEY)||'null');if(x)saved={...defaults,...x,makeup:{...defaults.makeup,...(x.makeup||{})}}}catch{}
  draft=clone(saved);
  const suits={
    daily:{label:'日常',items:[['daily-pink','粉色格紋','assets/wardrobe-daily-pink-v107.jpeg?v=20260918-1','assets/wardrobe-thumbs/daily-pink.webp?v=20260918-2'],['daily-latte','奶茶套裝','assets/wardrobe-daily-latte-v107.jpeg?v=20260918-1','assets/wardrobe-thumbs/daily-latte.webp?v=20260918-2'],['daily-blue','藍色洋裝','assets/wardrobe-daily-blue-v107.jpeg?v=20260918-1','assets/wardrobe-thumbs/daily-blue.webp?v=20260918-2'],['daily-black','黑色洋裝','assets/wardrobe-daily-black-v107.jpeg?v=20260918-1','assets/wardrobe-thumbs/daily-black.webp?v=20260918-2']]},
    campus:{label:'校園',items:[['campus-sailor','水手制服','assets/wardrobe-campus-sailor-v104.jpeg?v=20260917-2','assets/wardrobe-thumbs/campus-sailor.webp?v=20260918-2'],['campus-cardigan','針織制服','assets/wardrobe-campus-cardigan-v104.jpeg?v=20260917-2','assets/wardrobe-thumbs/campus-cardigan.webp?v=20260918-2'],['campus-blazer','西裝制服','assets/wardrobe-campus-blazer-v104.jpeg?v=20260917-2','assets/wardrobe-thumbs/campus-blazer.webp?v=20260918-2'],['campus-sport','運動校服','assets/wardrobe-campus-sport-v104.jpeg?v=20260917-2','assets/wardrobe-thumbs/campus-sport.webp?v=20260918-2']]},
    sweet:{label:'甜美',items:[['sweet-strawberry','草莓甜心','assets/wardrobe-sweet-strawberry-v104.jpeg?v=20260917-2','assets/wardrobe-thumbs/sweet-strawberry.webp?v=20260918-2'],['sweet-lavender','薰衣草夢','assets/wardrobe-sweet-lavender-v104.jpeg?v=20260917-2','assets/wardrobe-thumbs/sweet-lavender.webp?v=20260918-2'],['sweet-cream','奶油玫瑰','assets/wardrobe-sweet-cream-v104.jpeg?v=20260917-2','assets/wardrobe-thumbs/sweet-cream.webp?v=20260918-2'],['sweet-rose','玫瑰茶會','assets/wardrobe-sweet-rose-v104.jpeg?v=20260917-2','assets/wardrobe-thumbs/sweet-rose.webp?v=20260918-2']]},
    casual:{label:'休閒',items:[['casual-hoodie','粉色帽T','assets/wardrobe-casual-hoodie-v108.jpeg?v=20260918-1','assets/wardrobe-thumbs/casual-hoodie.webp?v=20260918-2'],['casual-knit','針織長裙','assets/wardrobe-casual-knit-v108.jpeg?v=20260918-1','assets/wardrobe-thumbs/casual-knit.webp?v=20260918-2'],['casual-overalls','牛仔吊帶','assets/wardrobe-casual-overalls-v108.jpeg?v=20260918-1','assets/wardrobe-thumbs/casual-overalls.webp?v=20260918-2'],['casual-cafe','森系洋裝','assets/wardrobe-casual-cafe-v108.jpeg?v=20260918-1','assets/wardrobe-thumbs/casual-cafe.webp?v=20260918-2']]},
    special:{label:'特殊',items:[['special-kimono','櫻花和服','assets/wardrobe-special-kimono-v108.jpeg?v=20260918-1','assets/wardrobe-thumbs/special-kimono.webp?v=20260918-2'],['special-princess','冰藍公主','assets/wardrobe-special-princess-v108.jpeg?v=20260918-1','assets/wardrobe-thumbs/special-princess.webp?v=20260918-2'],['special-witch','星月魔女','assets/wardrobe-special-witch-v108.jpeg?v=20260918-1','assets/wardrobe-thumbs/special-witch.webp?v=20260918-2'],['special-holiday','冬日節慶','assets/wardrobe-special-holiday-v108.jpeg?v=20260918-1','assets/wardrobe-thumbs/special-holiday.webp?v=20260918-2']]}
  };
  const allSuits=()=>Object.values(suits).flatMap(x=>x.items);
  const lists={
    top:[['rose','玫瑰襯衫','🌸','#ef9eb6'],['sailor','水手上衣','⚓','#8db8db'],['cream','奶油針織','🧶','#f0d3a9'],['blazer','學院西裝','🎓','#9c846e'],['hoodie','粉色帽T','🎀','#e894b2'],['mint','薄荷短衫','🍃','#8fcbbc'],['black','黑色荷葉','♠️','#665963'],['snow','雪花斗篷','❄️','#c7424e']],
    bottom:[['pinkSkirt','粉格短裙','🌷','#eaa1b9'],['navySkirt','海軍百褶裙','🌙','#6683a7'],['latteSkirt','奶茶格裙','🧸','#b69879'],['denimShort','牛仔短褲','🫐','#7699bb'],['creamLong','奶油長裙','🤍','#e5cfb4'],['blackSkirt','黑色百褶裙','♣️','#5c5360'],['mintSkirt','薄荷裙','🍀','#91cabb'],['redSkirt','節慶紅裙','🎄','#bd4650']],
    shoes:[['maryPink','粉色瑪莉珍','👠','#d76f91'],['loafers','棕色樂福鞋','👞','#855f4d'],['sneakers','白色球鞋','👟','#e9e7e5'],['boots','短靴','🥾','#6f554b'],['blueMary','藍色瑪莉珍','👠','#6c95bc'],['redBoots','紅色雪靴','👢','#b9434c']],
    bag:[['heart','黑色蝴蝶結包','👜','#473d43'],['tote','米白肩背包','👜','#d4b995'],['star','棕色斜背包','👜','#87644e']],
    accessory:[['bow','黑色髮蝴蝶結','🎀','#4b4149'],['pearl','粉色領結','🎀','#eaa0b7'],['beret','星月魔女帽','🌙','#76529b'],['snow','冰晶髮飾','❄️','#b8d9ed']],
    pet:[['cinnamon','白色長耳狗狗','🐶','#d8edf5']]
  };
  const hairs=[['softLong','柔捲長髮'],['bob','俏麗短髮'],['bun','丸子盤髮'],['pony','高馬尾'],['twin','雙馬尾'],['sideBraid','側編髮'],['princess','公主頭'],['braid','編髮'],['wave','波浪捲']];
  const hairColors=[['#715044','可可棕'],['#9a705f','奶茶棕'],['#c39584','玫瑰棕'],['#e8c2ba','櫻花粉'],['#4f515b','夜幕黑']];
  const makeup={
    brow:{label:'眉毛',items:[['natural','自然眉','⌒'],['soft','柔和眉','﹏'],['flat','平眉','━'],['raised','微挑眉','⌁']]},
    iris:{label:'瞳孔',items:[['brown','蜜糖棕','●'],['pink','櫻花粉','◉'],['blue','星海藍','◉'],['violet','紫水晶','◉']]},
    lash:{label:'睫毛',items:[['natural','自然睫','〰'],['long','纖長睫','≋'],['doll','娃娃睫','✦'],['cat','貓眼睫','⌁']]},
    shadow:{label:'眼影',items:[['none','清透','○'],['peach','蜜桃','◒'],['rose','乾燥玫瑰','◒'],['cocoa','可可棕','◒']]},
    blush:{label:'腮紅',items:[['none','自然','○'],['rose','玫瑰','●'],['peach','蜜桃','●'],['berry','莓果','●']]},
    lip:{label:'口紅',items:[['nude','裸粉','⌣'],['berry','莓果紅','⌣'],['coral','珊瑚橘','⌣'],['rose','玫瑰粉','⌣']]}
  };
  const labels={suit:'套裝',top:'上衣',bottom:'下身',shoes:'鞋子',bag:'包包',accessory:'飾品',hair:'髮型',makeup:'妝容',pet:'寵物'};
  const get=(list,id)=>list.find(x=>x[0]===id)||list[0];
  const suit=()=>allSuits().find(x=>x[0]===draft.suit)||allSuits()[0];
  const suitUrl=id=>(allSuits().find(x=>x[0]===id)||allSuits()[0])[2];
  const layerRoot='assets/wardrobe-fixed/';
  const layerThumbRoot='assets/wardrobe-piece-thumbs/';
  const layerAssets={
    top:{rose:'top-rose-v2.webp',sailor:'top-sailor-v2.webp',cream:'top-cream-v2.webp',hoodie:'top-hoodie-v2.webp',black:'top-black-v2.webp'},
    bottom:{pinkSkirt:'bottom-pinkSkirt-v2.webp',navySkirt:'bottom-navySkirt-v2.webp',latteSkirt:'bottom-latteSkirt-v2.webp',denimShort:'bottom-denimShort-v2.webp'},
    shoes:{maryPink:'shoes-maryPink-v2.webp',loafers:'shoes-loafers-v2.webp',sneakers:'shoes-sneakers-v2.webp',boots:'shoes-boots-v2.webp'},
    bag:{heart:'bag-heart.webp',tote:'bag-tote.webp',star:'bag-star.webp'},
    accessory:{bow:'',pearl:'accessory-pearl.webp',beret:'accessory-beret.webp'},
    pet:{cinnamon:''}
  };
  const topScenes={
    rose:'assets/wardrobe-top-scenes/top-rose-v7.webp?v=20260919-6',
    sailor:'assets/wardrobe-top-scenes/top-sailor-v7.webp?v=20260919-6',
    cream:'assets/wardrobe-top-scenes/top-cream-v7.webp?v=20260919-6',
    hoodie:'assets/wardrobe-top-scenes/top-hoodie-v7.webp?v=20260919-6',
    black:'assets/wardrobe-top-scenes/top-black-v7.webp?v=20260919-6'
  };
  const pieceKinds=['top','bottom','shoes','bag','accessory'];
  const startPieceMode=kind=>{
    pieceKinds.forEach(key=>{draft[key]=''});
    draft[kind]=Object.keys(layerAssets[kind]||{})[0]||'';
  };
  const layerUrl=(kind,id)=>{const file=layerAssets[kind]?.[id];return file?`${layerRoot}${file}?v=20260919-11`:''};
  const layerThumbUrl=(kind,id)=>{const file=layerAssets[kind]?.[id];return file?`${layerThumbRoot}${file}?v=20260919-11`:''};
  Object.keys(layerAssets).forEach(kind=>{
    if(lists[kind])lists[kind]=lists[kind].filter(x=>Object.prototype.hasOwnProperty.call(layerAssets[kind],x[0]));
    const fallback=Object.keys(layerAssets[kind])[0];
    if(!Object.prototype.hasOwnProperty.call(layerAssets[kind],draft[kind]))draft[kind]=fallback;
    if(!Object.prototype.hasOwnProperty.call(layerAssets[kind],saved[kind]))saved[kind]=fallback;
  });
  const imageCache=new Map();let previewToken=0;
  const warmImage=url=>{
    if(!url||typeof Image==='undefined')return Promise.resolve();
    if(imageCache.has(url))return imageCache.get(url).promise;
    const image=new Image();image.decoding='async';
    const promise=new Promise(resolve=>{image.onload=resolve;image.onerror=resolve});
    image.src=url;imageCache.set(url,{image,promise});return promise;
  };
  const warmWardrobe=()=>allSuits().forEach(x=>{warmImage(x[2]);warmImage(x[3])});
  const showPreview=id=>{
    const item=allSuits().find(x=>x[0]===id);if(!item)return;
    const image=document.querySelector('#wardrobe .v110SuitImage');if(!image)return;
    const token=++previewToken;
    warmImage(item[2]).then(()=>{if(token!==previewToken||!image.isConnected)return;image.src=item[2];image.alt=item[1]+'完整造型預覽'});
  };
  const markSelected=(selector,value,key)=>document.querySelectorAll(selector).forEach(x=>x.classList.toggle('on',x.dataset[key]===value));
  const suitPanelHtml=()=>`<div class="v110SuitTabs">${Object.entries(suits).map(([k,v])=>`<button data-v110-suitgroup="${k}" class="${suitGroup===k?'on':''}">${v.label}</button>`).join('')}</div><div class="v110Grid">${suits[suitGroup].items.map(x=>`<button class="v110Card ${draft.suit===x[0]?'on':''}" data-v110-suit="${x[0]}"><img src="${x[3]}" alt="${x[1]}"><span>${x[1]}</span></button>`).join('')}</div>`;
  const piecePanelHtml=()=>{const list=lists[active]||[];return `<div class="v110SectionTitle"><b>${labels[active]}造型選擇</b><button class="v110ReturnSuits" data-v110-return-suits>返回完整套裝</button></div><div class="v110Grid">${list.map(x=>{const thumb=layerThumbUrl(active,x[0]);return `<button class="v110Card ${draft[active]===x[0]?'on':''}" data-v110-item="${active}" data-v110-value="${x[0]}">${thumb?`<img src="${thumb}" alt="${x[1]}">`:`<i class="v110Mini">${x[2]}</i>`}<span>${x[1]}</span></button>`}).join('')}</div>`};
  const updatePanel=()=>{const panel=document.querySelector('#wardrobe .v110Panel');if(panel)panel.innerHTML=active==='suit'?suitPanelHtml():piecePanelHtml()};
  const layerImage=(kind,className,label)=>{const url=layerUrl(kind,draft[kind]);return `<img class="v110WearLayer ${className}" data-v110-layer="${kind}" data-v110-value="${draft[kind]}" src="${url}" ${url?'':'hidden'} alt="${label}">`};
  const pieceBase='assets/wardrobe-layers/base-color-v3.webp?v=20260919-4';
  const layeredStageHtml=()=>{const topScene=topScenes[draft.top]||'';return `<div class="v110LayeredStage"><img class="v110LayerBase" src="${topScene||pieceBase}" alt="女孩混搭造型">${topScene?'':layerImage('top','v110WearTop','目前上衣')}${layerImage('bottom','v110WearBottom','目前下身')}${layerImage('shoes','v110WearShoes','目前鞋子')}${layerImage('bag','v110WearBag','目前包包')}${layerImage('accessory','v110WearAccessory','目前飾品')}</div>`};
  const updateLayer=(kind,id)=>{if(kind==='top'){const base=document.querySelector('#wardrobe .v110LayerBase');const old=document.querySelector('#wardrobe [data-v110-layer="top"]');const scene=topScenes[id]||'';if(base)base.src=scene||pieceBase;if(scene){old?.remove();return}if(!old){render();return}}const image=document.querySelector(`#wardrobe [data-v110-layer="${kind}"]`);if(!image)return;const url=layerUrl(kind,id);image.dataset.v110Value=id;image.src=url;image.hidden=!url};
  const toast=t=>{document.querySelector('.v110Toast')?.remove();const d=document.createElement('div');d.className='v110Toast';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),1500)};
  const persist=()=>{saved=clone(draft);try{localStorage.setItem(KEY,JSON.stringify(saved));localStorage.setItem('englishQuestWardrobeV103',saved.suit)}catch{}toast('穿搭已儲存 ♡')};
  const hairShape=(style,c)=>{
    const back={softLong:`<path d="M98 255Q67 130 112 73Q150 27 208 73Q252 131 224 300L190 310L171 164L145 164L127 310Z" fill="${c}"/>`,bob:`<path d="M99 91Q159 29 218 91L222 214Q195 238 160 226Q123 239 96 211Z" fill="${c}"/>`,bun:`<circle cx="160" cy="57" r="37" fill="${c}"/><path d="M96 211Q78 108 111 76Q160 33 210 76Q241 111 220 218L195 202L181 149L134 149L122 202Z" fill="${c}"/>`,pony:`<path d="M102 185Q75 83 124 65Q190 27 220 93Q253 129 236 276Q220 240 197 216L180 149L132 149Z" fill="${c}"/><path d="M207 91Q270 126 238 293Q230 210 188 139Z" fill="${c}"/>`,twin:`<path d="M104 179Q76 91 119 68Q160 35 204 69Q237 91 218 182L191 153L130 153Z" fill="${c}"/><path d="M113 121Q55 115 65 256Q78 219 113 188Z" fill="${c}"/><path d="M207 121Q266 116 253 258Q242 216 208 187Z" fill="${c}"/>`,sideBraid:`<path d="M98 252Q73 113 112 72Q160 30 210 73Q240 117 218 223L188 163L130 163L122 248Z" fill="${c}"/><path d="M206 169Q241 210 217 307Q196 283 208 252Q190 232 207 214Q189 196 206 169Z" fill="${c}"/>`,princess:`<path d="M96 263Q71 112 112 72Q160 28 209 73Q244 119 220 274L193 254L181 155L133 155L124 260Z" fill="${c}"/><path d="M105 92Q159 137 215 91Q195 55 160 54Q124 55 105 92Z" fill="${c}"/>`,braid:`<path d="M98 247Q70 111 112 72Q160 29 209 73Q240 116 221 247L192 163L130 163Z" fill="${c}"/><path d="M109 172Q82 201 105 224Q84 246 108 268Q89 291 113 317L130 300Q111 279 132 259Q112 237 132 218Q111 197 130 175Z" fill="${c}"/><path d="M211 172Q239 201 215 224Q237 246 212 268Q231 291 207 317L190 300Q209 279 188 259Q208 237 188 218Q210 197 190 175Z" fill="${c}"/>`,wave:`<path d="M96 287Q65 111 111 71Q160 27 211 72Q252 123 224 293Q205 273 218 244Q197 224 216 201Q194 182 208 156L185 151L136 154Q142 181 121 199Q139 221 119 244Q137 267 116 291Z" fill="${c}"/>`};
    return back[style]||back.softLong;
  };
  const characterSvg=(st=draft)=>{
    const top=get(lists.top,st.top),bottom=get(lists.bottom,st.bottom),shoe=get(lists.shoes,st.shoes),bag=get(lists.bag,st.bag),acc=get(lists.accessory,st.accessory),pet=get(lists.pet,st.pet),hc=st.hairColor;
    const eye={brown:'#8d604c',pink:'#bd6c83',blue:'#5e92bf',violet:'#8266a5'}[st.makeup.iris]||'#8d604c';
    const blush={none:'transparent',rose:'#ef9caf',peach:'#efa486',berry:'#dc7991'}[st.makeup.blush];
    const lip={nude:'#d98f91',berry:'#c95770',coral:'#df7d68',rose:'#d86f91'}[st.makeup.lip];
    const skirt=st.bottom.includes('Short')?`<path d="M127 315L193 315L201 354L163 352L158 334L155 352L119 354Z" fill="${bottom[3]}" stroke="#765a67" stroke-width="2"/>`:`<path d="M126 309L194 309L213 385Q161 401 108 385Z" fill="${bottom[3]}" stroke="#765a67" stroke-width="2"/><path d="M125 333H196M119 358H203" stroke="#fff" opacity=".45" stroke-width="3"/>`;
    const topDetail=st.top==='sailor'?`<path d="M124 226L160 260L198 226L185 214L160 242L136 214Z" fill="#fff" opacity=".9"/><path d="M160 242L155 283L165 283Z" fill="#4f7195"/>`:st.top==='hoodie'?`<path d="M128 218Q160 190 192 218L182 239Q160 224 138 239Z" fill="#fff" opacity=".58"/><path d="M153 228v45M167 228v45" stroke="#fff" stroke-width="3"/>`:st.top==='blazer'?`<path d="M128 216L157 247L145 286H121Z" fill="#fff"/><path d="M192 216L163 247L176 286H199Z" fill="#fff"/><path d="M157 247L160 282L164 247Z" fill="#74576a"/>`:`<path d="M126 238Q160 250 194 238" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/><circle cx="160" cy="262" r="6" fill="#fff" opacity=".8"/>`;
    const accessory=acc[0]==='bow'?`<g fill="${acc[3]}" stroke="#8c5268"><path d="M118 82Q87 58 91 103Q100 118 127 98Z"/><path d="M126 86Q147 60 150 98Q142 113 124 100Z"/><circle cx="123" cy="94" r="8"/></g>`:acc[0]==='glasses'?`<g fill="none" stroke="#795a55" stroke-width="4"><circle cx="141" cy="144" r="18"/><circle cx="181" cy="144" r="18"/><path d="M159 144h5"/></g>`:acc[0]==='pearl'?`<path d="M143 210Q160 232 178 210" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="2 8"/>`:acc[0]==='beret'?`<ellipse cx="150" cy="65" rx="56" ry="24" fill="${acc[3]}" stroke="#7f5961" stroke-width="3"/><path d="M150 47l9-12" stroke="#7f5961" stroke-width="5"/>`:acc[0]==='snow'?`<text x="110" y="94" font-size="34">❄</text>`:'';
    const bagSvg=bag[0]==='none'?'':`<path d="M196 251Q235 283 228 356" fill="none" stroke="#805968" stroke-width="5"/><rect x="205" y="326" width="53" height="49" rx="15" fill="${bag[3]}" stroke="#805968" stroke-width="3"/><path d="M216 327Q231 304 247 327" fill="none" stroke="#805968" stroke-width="4"/>`;
    const petSvg=pet[0]==='none'?'':pet[0]==='cinnamon'?`<g transform="translate(220 390)"><ellipse cx="30" cy="55" rx="36" ry="44" fill="#f8fbfa" stroke="#91a7bd" stroke-width="3"/><ellipse cx="-1" cy="43" rx="27" ry="13" fill="#f8fbfa" stroke="#91a7bd" stroke-width="3"/><ellipse cx="61" cy="43" rx="27" ry="13" fill="#f8fbfa" stroke="#91a7bd" stroke-width="3"/><circle cx="18" cy="52" r="5" fill="#5c8fc5"/><circle cx="42" cy="52" r="5" fill="#5c8fc5"/><path d="M24 64q6 8 12 0" fill="none" stroke="#7890a7" stroke-width="3"/><path d="M9 87q21-19 42 0" fill="#83b6dc"/></g>`:`<g transform="translate(226 411)"><circle cx="28" cy="30" r="34" fill="${pet[3]}" stroke="#8e7180" stroke-width="3"/><text x="7" y="45" font-size="38">${pet[2]}</text></g>`;
    return `<svg viewBox="0 0 320 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="目前混搭造型"><defs><linearGradient id="skin" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff1ea"/><stop offset="1" stop-color="#f6cfc5"/></linearGradient></defs>${hairShape(st.hair,hc)}<path d="M130 166Q160 188 190 166L184 216H136Z" fill="url(#skin)"/><path d="M115 220Q96 276 105 333" fill="none" stroke="url(#skin)" stroke-width="24" stroke-linecap="round"/><path d="M205 220Q224 276 215 333" fill="none" stroke="url(#skin)" stroke-width="24" stroke-linecap="round"/><path d="M132 378L130 474M188 378L190 474" stroke="url(#skin)" stroke-width="27" stroke-linecap="round"/><path d="M120 212Q160 194 200 212L199 308Q160 325 121 308Z" fill="${top[3]}" stroke="#765a67" stroke-width="2"/>${topDetail}${skirt}<g fill="${shoe[3]}" stroke="#765a67" stroke-width="3"><path d="M112 462Q133 451 148 469L147 489Q112 498 101 480Z"/><path d="M172 469Q190 451 210 462L219 480Q207 498 173 489Z"/></g><ellipse cx="160" cy="135" rx="54" ry="65" fill="url(#skin)" stroke="#d9aaa2" stroke-width="2"/><path d="M108 127Q102 77 137 68Q179 48 211 82Q226 101 215 137Q199 93 168 89Q135 103 108 127Z" fill="${hc}"/><path d="M111 106Q125 74 154 78Q143 111 111 126M154 78Q178 66 207 95Q189 108 171 89" fill="${hc}" stroke="${hc}" stroke-width="9"/><g fill="${eye}" stroke="#59434a" stroke-width="3"><ellipse cx="139" cy="144" rx="12" ry="17"/><ellipse cx="181" cy="144" rx="12" ry="17"/></g><g fill="#fff"><circle cx="135" cy="139" r="4"/><circle cx="177" cy="139" r="4"/></g><path d="M127 118q13-8 25 0M169 118q13-8 25 0" fill="none" stroke="${st.makeup.brow==='flat'?'#76554d':'#8b6358'}" stroke-width="4" stroke-linecap="round"/><g fill="${blush}" opacity=".55"><ellipse cx="121" cy="166" rx="14" ry="7"/><ellipse cx="199" cy="166" rx="14" ry="7"/></g><path d="M151 177Q160 185 170 177Q160 194 151 177" fill="${lip}"/>${bagSvg}${accessory}${petSvg}</svg>`;
  };
  const side=()=>`<button class="v110Back" data-v110-back aria-label="返回首頁">‹</button><div class="v110Topbar"><strong class="v110Title">夢幻衣櫥</strong><button class="v110Save" data-v110-save>儲存</button></div><div class="v110Side">${Object.entries(labels).map(([k,v])=>`<button data-v110-tab="${k}" class="${active===k?'on':''}">${v}</button>`).join('')}</div>`;
  const standard=()=>{
    const isSuit=active==='suit',current=suit();
    const stage=isSuit?`<img class="v110SuitImage" src="${current[2]}" alt="${current[1]}完整造型預覽">`:layeredStageHtml();
    const panel=active==='suit'?suitPanelHtml():piecePanelHtml();
    return `<div class="v110Wardrobe"><div class="v110Stage v110OriginalUI">${stage}${side()}</div><div class="v110Panel">${panel}</div></div>`;
  };
  const hairRefs=['daily-latte','casual-knit','campus-cardigan','campus-sport','sweet-rose','daily-pink','sweet-cream','casual-cafe','sweet-lavender'];
  const hairEditor=()=>`<div class="v110Editor"><div class="v110EditorHead"><button class="v110Back" data-v110-editorback>‹</button><h2>髮型 / 髮色</h2><button class="v110Save" data-v110-save>儲存</button></div><div class="v110Segment"><button data-v110-hairpane="style" class="${hairPane==='style'?'on':''}">髮型</button><button data-v110-hairpane="color" class="${hairPane==='color'?'on':''}">髮色</button></div>${hairPane==='style'?`<div class="v110Grid v110HairGrid">${hairs.map((x,i)=>`<button class="v110Card ${draft.hair===x[0]?'on':''}" data-v110-hair="${x[0]}"><i class="v110HeadThumb"><img src="${suitUrl(hairRefs[i])}" alt="${x[1]}"></i><span>${x[1]}</span></button>`).join('')}</div>`:`<div class="v110FacePreview"><img src="${suitUrl('daily-latte')}" alt="髮色預覽"></div>`}<div class="v110ColorRow">${hairColors.map(x=>`<button class="v110Color ${draft.hairColor===x[0]?'on':''}" style="background:${x[0]}" data-v110-haircolor="${x[0]}" aria-label="${x[1]}"></button>`).join('')}</div></div>`;
  const makeupEditor=()=>{const m=makeup[makeTab];return `<div class="v110Editor"><div class="v110EditorHead"><button class="v110Back" data-v110-editorback>‹</button><h2>妝容細節</h2><button class="v110Save" data-v110-save>儲存</button></div><div class="v110MakeTabs">${Object.entries(makeup).map(([k,v])=>`<button data-v110-maketab="${k}" class="${makeTab===k?'on':''}">${v.label}</button>`).join('')}</div><div class="v110FacePreview"><img src="${suitUrl('daily-latte')}" alt="妝容預覽"></div><div class="v110Grid v110MakeGrid">${m.items.map(x=>`<button class="v110Card ${draft.makeup[makeTab]===x[0]?'on':''}" data-v110-make="${x[0]}"><i class="v110MakeIcon">${x[2]}</i><span>${x[1]}</span></button>`).join('')}</div><button class="v110Finish" data-v110-makefinish>完成妝容</button></div>`};
  const render=()=>{const sec=document.getElementById('wardrobe');if(!sec)return;warmWardrobe();sec.innerHTML=active==='hair'?hairEditor():active==='makeup'?makeupEditor():standard()};
  renderWard=render;
  const goBeforeV110=go;
  go=function(id){if(id==='wardrobe'){draft=clone(saved);draft.suit='daily-pink';draft.previewSuit='daily-pink';active='suit';suitGroup='daily'}goBeforeV110(id)};
  document.addEventListener('click',e=>{
    const q=s=>e.target.closest(s);
    if(q('[data-v110-back]')){go('home');return}
    if(q('[data-v110-editorback]')){active='suit';render();return}
    if(q('[data-v110-save]')){persist();return}
    if(q('[data-v110-return-suits]')){active='suit';draft.mode='suit';draft.previewSuit=draft.suit;render();return}
    let b=q('[data-v110-tab]');if(b){const previous=active;active=b.dataset.v110Tab;if(active==='suit'){draft.mode='suit';draft.suit='daily-pink';draft.previewSuit='daily-pink';suitGroup='daily'}else{draft.mode='piece';if(previous==='suit'&&pieceKinds.includes(active))startPieceMode(active)}if(active==='hair'||active==='makeup'||previous==='suit'||active==='suit'||!document.querySelector('#wardrobe .v110Stage')){render()}else{document.querySelectorAll('[data-v110-tab]').forEach(x=>x.classList.toggle('on',x.dataset.v110Tab===active));updatePanel()}return}
    b=q('[data-v110-suitgroup]');if(b){suitGroup=b.dataset.v110Suitgroup;updatePanel();return}
    b=q('[data-v110-suit]');if(b){draft.suit=b.dataset.v110Suit;draft.previewSuit=draft.suit;draft.mode='suit';markSelected('[data-v110-suit]',draft.suit,'v110Suit');showPreview(draft.suit);return}
    b=q('[data-v110-item]');if(b){const kind=b.dataset.v110Item;draft[kind]=b.dataset.v110Value;draft.mode='piece';markSelected('[data-v110-item]',b.dataset.v110Value,'v110Value');updateLayer(kind,draft[kind]);return}
    b=q('[data-v110-hairpane]');if(b){hairPane=b.dataset.v110Hairpane;render();return}
    b=q('[data-v110-hair]');if(b){draft.hair=b.dataset.v110Hair;draft.mode='mix';render();return}
    b=q('[data-v110-haircolor]');if(b){draft.hairColor=b.dataset.v110Haircolor;draft.mode='mix';render();return}
    b=q('[data-v110-maketab]');if(b){makeTab=b.dataset.v110Maketab;render();return}
    b=q('[data-v110-make]');if(b){draft.makeup[makeTab]=b.dataset.v110Make;draft.mode='mix';render();return}
    if(q('[data-v110-makefinish]')){active='suit';draft.mode='mix';render();toast('妝容已套用，記得儲存 ♡')}
  });
})();
