(()=>{
  const fixedLayerStyle=document.createElement('style');
  fixedLayerStyle.textContent='#wardrobe .v110Stage.v110OriginalUI .v110LayeredStage .v110LayerBase{position:absolute!important;inset:0!important;z-index:1!important;width:100%!important;height:100%!important;object-fit:fill!important;object-position:center center!important}#wardrobe .v110Stage.v110OriginalUI .v110LayeredStage .v110WearLayer{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;display:block!important;object-fit:fill!important;object-position:center center!important;pointer-events:none!important;transform:none!important;transform-origin:center!important;filter:none!important}#wardrobe .v110Stage.v110OriginalUI .v110LayeredStage .v110WearShoes{z-index:5!important;clip-path:inset(67% 0 0 0)!important;-webkit-mask-image:none!important;mask-image:none!important}#wardrobe .v110Stage.v110OriginalUI .v110LayeredStage .v110WearBottom{z-index:6!important;-webkit-mask-image:none!important;mask-image:none!important}#wardrobe .v110Stage.v110OriginalUI .v110LayeredStage .v110WearBottom[data-v110-fitbottom="short"]{clip-path:polygon(58% 40.5%,70% 40.5%,75% 43.5%,83% 49%,80% 53%,48% 53%,46% 49%,52% 43.5%)!important}#wardrobe .v110Stage.v110OriginalUI .v110LayeredStage .v110WearBottom[data-v110-fitbottom="long"]{clip-path:polygon(53% 40.5%,75% 40.5%,74% 48%,80% 58%,91% 69%,82% 74%,53% 74%,38% 70%,42% 55%,47% 45%)!important}#wardrobe .v110Stage.v110OriginalUI .v110LayeredStage .v110WearBottom[data-v110-fitbottom="0"]{clip-path:none!important}#wardrobe .v110Stage.v110OriginalUI .v110LayeredStage .v110TopFront{z-index:7!important;clip-path:polygon(72% 30%,78% 31%,89% 54%,84% 58%,78% 54%,72% 40%)!important;-webkit-mask-image:none!important;mask-image:none!important}#wardrobe .v110Stage.v110OriginalUI .v110LayeredStage .v110WearBag{z-index:8!important;clip-path:none!important;transform:none!important;-webkit-mask-image:none!important;mask-image:none!important}#wardrobe .v110Stage.v110OriginalUI .v110LayeredStage .v110WearAccessory{z-index:9!important}#wardrobe .v110Stage.v110OriginalUI .v110LayeredStage .v110WearLayer[hidden]{display:none!important}';
  document.head.appendChild(fixedLayerStyle);
  /* V115 starts with only the top selected. The previous key could contain
     automatically-filled bottom/shoes from the old wardrobe implementation. */
  const KEY='englishQuestWardrobeSavedV115';
  const clone=o=>JSON.parse(JSON.stringify(o));
  const defaults={mode:'piece',suit:'daily-pink',previewSuit:'daily-pink',top:'rose',bottom:'',shoes:'',bag:'',accessory:'',hair:'softLong',hairColor:'#9a705f',makeup:{brow:'soft',iris:'brown',lash:'long',shadow:'peach',blush:'rose',lip:'berry'},pet:''};
  let saved=clone(defaults),draft=clone(defaults),active='top',suitGroup='daily',hairPane='style',makeTab='brow',panelOpen=true;
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
    top:[['rose','玫瑰襯衫','🌸','#ef9eb6'],['sailor','水手上衣','⚓','#8db8db'],['cream','奶油針織','🧶','#f0d3a9'],['blazer','學院西裝','🎓','#9c846e'],['hoodie','粉色帽T','🎀','#e894b2'],['mint','薄荷短衫','🍃','#8fcbbc'],['black','黑色荷葉','♠️','#665963'],['snow','雪花斗篷','❄️','#c7424e'],['iceblue','冰藍蝴蝶結襯衫','🩵','#a9bfe8'],['blackvest','黑色蝴蝶結背心','🖤','#4d454a'],['varsity','粉色棒球外套','🧸','#e8a7bb'],['whitefrill','白色荷葉短衫','🤍','#eee9e6'],['sage','森系綁帶上衣','🌿','#8c9871'],['ivoryButton','奶油圓領排扣上衣','🤍','#eadcc9'],['brownPuff','可可方領蝴蝶結上衣','🤎','#8a5f4e']],
    bottom:[['pinkSkirt','粉格短裙','🌷','#eaa1b9'],['navySkirt','海軍百褶裙','🌙','#6683a7'],['latteSkirt','奶茶格裙','🧸','#b69879'],['denimShort','牛仔短褲','🫐','#7699bb'],['creamLong','奶油長裙','🤍','#e5cfb4'],['blackSkirt','黑色百褶裙','♣️','#5c5360'],['mintSkirt','薄荷裙','🍀','#91cabb'],['redSkirt','節慶紅裙','🎄','#bd4650'],['blueRuffle','冰藍荷葉裙','🩵','#9db7e4'],['brownPlaid','可可格紋裙','🤎','#8b6657'],['grayPlaid','灰色格紋裙','🩶','#77747a'],['navySport','海軍運動百褶裙','💙','#343a63'],['denimOverall','牛仔吊帶褲','👖','#78a2ce']],
    shoes:[['maryPink','粉色瑪莉珍','👠','#d76f91'],['loafers','棕色樂福鞋','👞','#855f4d'],['sneakers','白色球鞋','👟','#e9e7e5'],['boots','短靴','🥾','#6f554b'],['blueMary','藍色瑪莉珍','👠','#6c95bc'],['redBoots','紅色雪靴','👢','#b9434c'],['sockPinkLace','粉色蕾絲襪瑪莉珍','🎀','#e7a2b8'],['sockCreamBrown','奶油棕邊襪樂福鞋','🧦','#a07c68'],['sockBlueLace','冰藍蕾絲襪瑪莉珍','🩵','#91acd9'],['sockBlackRibbon','黑緞帶襪瑪莉珍','🖤','#4d4650'],['sockNavyKnee','海軍及膝襪樂福鞋','💙','#323a5b'],['sockBrownBow','奶油蝴蝶結襪樂福鞋','🤎','#8b6756'],['sockBlackKnee','黑色及膝襪樂福鞋','♠️','#2f2f38'],['sockPinkStripe','粉條紋襪休閒鞋','🩷','#e79ab2'],['sockPinkKnee','粉色及膝襪高筒鞋','🌸','#e68ca9'],['sockBrownCrew','棕色短襪牛津鞋','🤎','#754c3d'],['sockWhiteCrew','白色短襪休閒鞋','🤍','#dedde2'],['sockSageLace','鼠尾草蕾絲襪瑪莉珍','🌿','#899b75']],
    bag:[['heart','黑色蝴蝶結包','👜','#473d43'],['tote','米白肩背包','👜','#d4b995'],['star','棕色斜背包','👜','#87644e']],
    accessory:[['bow','黃色蝴蝶結','🎀','#e6c451'],['pearl','粉色蝴蝶結','🎀','#eaa0b7'],['beret','星月魔女帽','🌙','#76529b'],['snow','冰晶髮飾','❄️','#b8d9ed']],
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
  const labels={top:'上衣',bottom:'下身',shoes:'鞋子',bag:'包包',accessory:'飾品',suit:'套裝',hair:'髮型',makeup:'妝容',pet:'寵物'};
  const get=(list,id)=>list.find(x=>x[0]===id)||list[0];
  const suit=()=>allSuits().find(x=>x[0]===draft.suit)||allSuits()[0];
  const suitUrl=id=>(allSuits().find(x=>x[0]===id)||allSuits()[0])[2];
  const layerRoot='assets/wardrobe-composable/';
  const fixedLayerRoot='assets/wardrobe-fixed/';
  const layerThumbRoot='assets/wardrobe-piece-thumbs/';
  const layerAssets={
    top:{rose:'top-rose-clean-v3.webp',sailor:'top-sailor-clean-v3.webp',cream:'top-cream-clean-v3.webp',hoodie:'top-hoodie-clean-v3.webp',black:'top-black-v2.webp',iceblue:'top-iceblue-clean-v2.webp',blackvest:'top-blackvest-clean-v2.webp',varsity:'top-varsity-clean-v2.webp',whitefrill:'top-whitefrill-clean-v2.webp',sage:'top-sage-clean-v2.webp',blazer:'top-blazer-clean-v2.webp',mint:'top-mint-new-v1.webp',snow:'top-snow-new-v1.webp',ivoryButton:'top-ivoryButton-clean-v2.webp',brownPuff:'top-brownPuff-clean-v2.webp'},
    bottom:{pinkSkirt:'bottom-pinkSkirt-v2.webp',navySkirt:'bottom-navySkirt-v2.webp',latteSkirt:'bottom-latteSkirt-v2.webp',denimShort:'bottom-denimShort-v2.webp',creamLong:'bottom-creamLong-new-v1.webp',blackSkirt:'bottom-blackSkirt-new-v1.webp',mintSkirt:'bottom-mintSkirt-new-v1.webp',redSkirt:'bottom-redSkirt-new-v1.webp',blueRuffle:'bottom-blueRuffle-new-v1.webp',brownPlaid:'bottom-brownPlaid-new-v1.webp',grayPlaid:'bottom-grayPlaid-new-v1.webp',navySport:'bottom-navySport-new-v1.webp',denimOverall:'bottom-denimOverall-new-v1.webp'},
    shoes:{maryPink:'shoes-maryPink-v2.webp',loafers:'shoes-loafers-v2.webp',sneakers:'shoes-sneakers-v2.webp',boots:'shoes-boots-v2.webp',blueMary:'shoes-blueMary-new-v1.webp',redBoots:'shoes-redBoots-new-v1.webp',sockPinkLace:'shoes-sockPinkLace-new-v1.webp',sockCreamBrown:'shoes-sockCreamBrown-new-v1.webp',sockBlueLace:'shoes-sockBlueLace-new-v1.webp',sockBlackRibbon:'shoes-sockBlackRibbon-new-v1.webp',sockNavyKnee:'shoes-sockNavyKnee-new-v1.webp',sockBrownBow:'shoes-sockBrownBow-new-v1.webp',sockBlackKnee:'shoes-sockBlackKnee-new-v1.webp',sockPinkStripe:'shoes-sockPinkStripe-new-v1.webp',sockPinkKnee:'shoes-sockPinkKnee-new-v1.webp',sockBrownCrew:'shoes-sockBrownCrew-new-v1.webp',sockWhiteCrew:'shoes-sockWhiteCrew-new-v1.webp',sockSageLace:'shoes-sockSageLace-new-v1.webp'},
    bag:{heart:'bag-heart.webp',tote:'bag-tote.webp',star:'bag-star.webp'},
    accessory:{bow:'accessory-bow-yellow-v3.webp',pearl:'accessory-pearl.webp',beret:'accessory-beret.webp'},
    pet:{cinnamon:''}
  };
  const fixedShoeAssets={maryPink:'shoes-maryPink-v2.webp',loafers:'shoes-loafers-v2.webp',sneakers:'shoes-sneakers-v2.webp',boots:'shoes-boots-v2.webp',blueMary:'shoes-blueMary-new-v1.webp',redBoots:'shoes-redBoots-new-v1.webp',sockPinkLace:'shoes-sockPinkLace-new-v1.webp',sockCreamBrown:'shoes-sockCreamBrown-new-v1.webp',sockBlueLace:'shoes-sockBlueLace-new-v1.webp',sockBlackRibbon:'shoes-sockBlackRibbon-new-v1.webp',sockNavyKnee:'shoes-sockNavyKnee-new-v1.webp',sockBrownBow:'shoes-sockBrownBow-new-v1.webp',sockBlackKnee:'shoes-sockBlackKnee-new-v1.webp',sockPinkStripe:'shoes-sockPinkStripe-new-v1.webp',sockPinkKnee:'shoes-sockPinkKnee-new-v1.webp',sockBrownCrew:'shoes-sockBrownCrew-new-v1.webp',sockWhiteCrew:'shoes-sockWhiteCrew-new-v1.webp',sockSageLace:'shoes-sockSageLace-new-v1.webp'};
  const topScenes={
    rose:'assets/wardrobe-top-scenes/top-rose-v8.webp?v=20260919-18',
    sailor:'assets/wardrobe-top-scenes/top-sailor-v8.webp?v=20260919-18',
    cream:'assets/wardrobe-top-scenes/top-cream-v8.webp?v=20260919-18',
    hoodie:'assets/wardrobe-top-scenes/top-hoodie-v8.webp?v=20260919-18',
    black:'assets/wardrobe-top-scenes/top-black-v8.webp?v=20260919-17',
    iceblue:'assets/wardrobe-top-scenes/top-iceblue-v2.webp?v=20260919-17',
    blackvest:'assets/wardrobe-top-scenes/top-blackvest-v2.webp?v=20260919-17',
    academy:'assets/wardrobe-top-scenes/top-academy-v2.webp?v=20260919-17',
    varsity:'assets/wardrobe-top-scenes/top-varsity-v2.webp?v=20260919-17',
    whitefrill:'assets/wardrobe-top-scenes/top-whitefrill-v2.webp?v=20260919-17',
    sage:'assets/wardrobe-top-scenes/top-sage-v2.webp?v=20260919-17'
  };
  const bottomScenes={
    pinkSkirt:'assets/wardrobe-bottom-scenes/bottom-pinkSkirt-v2.webp?v=20260919-17',
    navySkirt:'assets/wardrobe-bottom-scenes/bottom-navySkirt-v2.webp?v=20260919-17',
    latteSkirt:'assets/wardrobe-bottom-scenes/bottom-latteSkirt-v2.webp?v=20260919-17',
    denimShort:'assets/wardrobe-bottom-scenes/bottom-denimShort-v2.webp?v=20260919-17'
  };
  const shoeScenes={
    maryPink:'assets/wardrobe-shoe-scenes/shoes-maryPink-v1.webp?v=20260919-12',
    loafers:'assets/wardrobe-shoe-scenes/shoes-loafers-v1.webp?v=20260919-12',
    sneakers:'assets/wardrobe-shoe-scenes/shoes-sneakers-v1.webp?v=20260919-12',
    boots:'assets/wardrobe-shoe-scenes/shoes-boots-v1.webp?v=20260919-12'
  };
  const bagScenes={
    heart:'assets/wardrobe-bag-scenes/bag-heart-v2.webp?v=20260919-15',
    tote:'assets/wardrobe-bag-scenes/bag-tote-v2.webp?v=20260919-15',
    star:'assets/wardrobe-bag-scenes/bag-star-v2.webp?v=20260919-15'
  };
  const accessoryScenes={
    bow:'assets/wardrobe-accessory-scenes/accessory-bow-yellow-v3.webp?v=20260919-15',
    pearl:'assets/wardrobe-accessory-scenes/accessory-bow-pink-v3.webp?v=20260919-15',
    beret:'assets/wardrobe-accessory-scenes/accessory-beret-v2.webp?v=20260919-15'
  };
  /* Pose-fitted tops use the exact clean character as their scene base. Other
     categories remain separate layers so they can still be mixed freely. */
  const fittedTopScenes={
    rose:'assets/wardrobe-fitted/top-rose-scene-v3.webp?v=20260919-2',
    sailor:'assets/wardrobe-fitted/top-sailor-scene-v1.webp?v=20260919-1',
    cream:'assets/wardrobe-fitted/top-cream-scene-v1.webp?v=20260919-1',
    hoodie:'assets/wardrobe-fitted/top-hoodie-scene-v4.webp?v=20260920-59',
    black:'assets/wardrobe-fitted/top-black-scene-v1.webp?v=20260919-1',
    iceblue:'assets/wardrobe-fitted/top-iceblue-scene-v1.webp?v=20260919-1',
    blackvest:'assets/wardrobe-fitted/top-blackvest-scene-v1.webp?v=20260919-1',
    academy:'assets/wardrobe-fitted/top-academy-scene-v1.webp?v=20260919-1',
    varsity:'assets/wardrobe-fitted/top-varsity-scene-v1.webp?v=20260919-1',
    whitefrill:'assets/wardrobe-fitted/top-whitefrill-scene-v1.webp?v=20260919-1',
    sage:'assets/wardrobe-fitted/top-sage-scene-v2.webp?v=20260920-48',
    blazer:'assets/wardrobe-top-scenes/top-blazer-fitted-v1.webp?v=20260920-32',
    mint:'assets/wardrobe-top-scenes/top-mint-fitted-v1.webp?v=20260920-32',
    snow:'assets/wardrobe-top-scenes/top-snow-fitted-v3.webp?v=20260920-50',
    ivoryButton:'assets/wardrobe-top-scenes/top-ivoryButton-fitted-v1.webp?v=20260920-34',
    brownPuff:'assets/wardrobe-top-scenes/top-brownPuff-fitted-v1.webp?v=20260920-34'
  };
  const fittedBottomScenes={
    pinkSkirt:'assets/wardrobe-fitted/bottom-pinkSkirt-scene-v1.webp?v=20260919-1',
    navySkirt:'assets/wardrobe-fitted/bottom-navySkirt-scene-v1.webp?v=20260919-1',
    latteSkirt:'assets/wardrobe-fitted/bottom-latteSkirt-scene-v1.webp?v=20260919-1',
    denimShort:'assets/wardrobe-fitted/bottom-denimShort-scene-v1.webp?v=20260919-1',
    creamLong:'assets/wardrobe-bottom-scenes/bottom-creamLong-fitted-v1.webp?v=20260920-32',
    blackSkirt:'assets/wardrobe-bottom-scenes/bottom-blackSkirt-fitted-v1.webp?v=20260920-32',
    mintSkirt:'assets/wardrobe-bottom-scenes/bottom-mintSkirt-fitted-v1.webp?v=20260920-32',
    redSkirt:'assets/wardrobe-bottom-scenes/bottom-redSkirt-fitted-v1.webp?v=20260920-32',
    blueRuffle:'assets/wardrobe-bottom-scenes/bottom-blueRuffle-fitted-v1.webp?v=20260920-34',
    brownPlaid:'assets/wardrobe-bottom-scenes/bottom-brownPlaid-fitted-v1.webp?v=20260920-34',
    grayPlaid:'assets/wardrobe-bottom-scenes/bottom-grayPlaid-fitted-v1.webp?v=20260920-34',
    navySport:'assets/wardrobe-bottom-scenes/bottom-navySport-fitted-v1.webp?v=20260920-34',
    denimOverall:'assets/wardrobe-bottom-scenes/bottom-denimOverall-fitted-v1.webp?v=20260920-34'
  };
  const fittedShortBottoms=new Set(['pinkSkirt','navySkirt','latteSkirt','denimShort','blackSkirt','mintSkirt','redSkirt','blueRuffle','brownPlaid','grayPlaid','navySport']);
  const fittedLongBottoms=new Set(['creamLong']);
  const fittedShoeScenes={
    maryPink:'assets/wardrobe-shoe-scenes/shoes-maryPink-fitted-v2.webp?v=20260920-32',
    loafers:'assets/wardrobe-shoe-scenes/shoes-loafers-fitted-v2.webp?v=20260920-32',
    sneakers:'assets/wardrobe-shoe-scenes/shoes-sneakers-fitted-v2.webp?v=20260920-32',
    boots:'assets/wardrobe-shoe-scenes/shoes-boots-fitted-v2.webp?v=20260920-32',
    blueMary:'assets/wardrobe-shoe-scenes/shoes-blueMary-fitted-v1.webp?v=20260920-32',
    redBoots:'assets/wardrobe-shoe-scenes/shoes-redBoots-fitted-v1.webp?v=20260920-32',
    sockPinkLace:'assets/wardrobe-shoe-scenes/shoes-sockPinkLace-fitted-v1.webp?v=20260920-34',
    sockCreamBrown:'assets/wardrobe-shoe-scenes/shoes-sockCreamBrown-fitted-v1.webp?v=20260920-34',
    sockBlueLace:'assets/wardrobe-shoe-scenes/shoes-sockBlueLace-fitted-v1.webp?v=20260920-34',
    sockBlackRibbon:'assets/wardrobe-shoe-scenes/shoes-sockBlackRibbon-fitted-v1.webp?v=20260920-34',
    sockNavyKnee:'assets/wardrobe-shoe-scenes/shoes-sockNavyKnee-fitted-v1.webp?v=20260920-34',
    sockBrownBow:'assets/wardrobe-shoe-scenes/shoes-sockBrownBow-fitted-v1.webp?v=20260920-34',
    sockBlackKnee:'assets/wardrobe-shoe-scenes/shoes-sockBlackKnee-fitted-v1.webp?v=20260920-34',
    sockPinkStripe:'assets/wardrobe-shoe-scenes/shoes-sockPinkStripe-fitted-v1.webp?v=20260920-34',
    sockPinkKnee:'assets/wardrobe-shoe-scenes/shoes-sockPinkKnee-fitted-v1.webp?v=20260920-34',
    sockBrownCrew:'assets/wardrobe-shoe-scenes/shoes-sockBrownCrew-fitted-v1.webp?v=20260920-34',
    sockWhiteCrew:'assets/wardrobe-shoe-scenes/shoes-sockWhiteCrew-fitted-v1.webp?v=20260920-34',
    sockSageLace:'assets/wardrobe-shoe-scenes/shoes-sockSageLace-fitted-v1.webp?v=20260920-34'
  };
  const fittedBagScenes={
    heart:'assets/wardrobe-bag-scenes/bag-heart-fitted-v3.webp?v=20260920-32',
    tote:'assets/wardrobe-bag-scenes/bag-tote-fitted-v3.webp?v=20260920-32',
    star:'assets/wardrobe-bag-scenes/bag-star-fitted-v3.webp?v=20260920-32'
  };
  const fittedAccessoryScenes={
    bow:'assets/wardrobe-accessory-scenes/accessory-bow-yellow-fitted-v4.webp?v=20260920-32',
    pearl:'assets/wardrobe-accessory-scenes/accessory-bow-pink-fitted-v4.webp?v=20260920-32',
    beret:'assets/wardrobe-accessory-scenes/accessory-beret-fitted-v4.webp?v=20260920-32'
  };
  const sceneKinds={top:fittedTopScenes,bottom:fittedBottomScenes,shoes:fittedShoeScenes,bag:fittedBagScenes,accessory:fittedAccessoryScenes};
  const pieceKinds=['top','bottom','shoes','bag','accessory'];
  const optionalPieceKinds=['bottom','shoes','bag','accessory'];
  const startPieceMode=kind=>{
    const choices=layerAssets[kind]||{};
    if(optionalPieceKinds.includes(kind)&&draft[kind]==='')return;
    if(!Object.prototype.hasOwnProperty.call(choices,draft[kind]))draft[kind]=Object.keys(choices)[0]||'';
  };
  const layerUrl=(kind,id)=>{
    if(kind==='shoes'){
      const scene=fittedShoeScenes[id]||'';
      return scene?`${scene}&fit=20260920-70`:'';
    }
    if(kind==='bag'){
      const file=layerAssets.bag[id]||'';
      return file?`${layerRoot}${file}?v=20260921-3`:'';
    }
    if(kind==='bottom'){
      const file=layerAssets.bottom[id]||'';
      return file?`${layerRoot}${file}?v=20260921-4`:'';
    }
    const file=layerAssets[kind]?.[id];return file?`${layerRoot}${file}?v=20260920-61`:'';
  };
  const layerThumbUrl=(kind,id)=>{const file=layerAssets[kind]?.[id];return file?`${layerThumbRoot}${file}?v=20260920-39`:''};
  Object.keys(layerAssets).forEach(kind=>{
    if(lists[kind])lists[kind]=lists[kind].filter(x=>Object.prototype.hasOwnProperty.call(layerAssets[kind],x[0]));
    const fallback=Object.keys(layerAssets[kind])[0];
    if(!(optionalPieceKinds.includes(kind)&&draft[kind]==='')&&!Object.prototype.hasOwnProperty.call(layerAssets[kind],draft[kind]))draft[kind]=fallback;
    if(!(optionalPieceKinds.includes(kind)&&saved[kind]==='')&&!Object.prototype.hasOwnProperty.call(layerAssets[kind],saved[kind]))saved[kind]=fallback;
  });
  const imageCache=new Map();let previewToken=0,sceneToken=0;
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
  const panelHead=title=>`<div class="v110DrawerHead"><button data-v110-panel-close aria-label="返回分類">‹</button><b>${title}</b></div>`;
  const suitPanelHtml=()=>`${panelHead('套裝選擇')}<div class="v110SuitTabs">${Object.entries(suits).map(([k,v])=>`<button data-v110-suitgroup="${k}" class="${suitGroup===k?'on':''}">${v.label}</button>`).join('')}</div><div class="v110Grid">${suits[suitGroup].items.map(x=>`<button class="v110Card ${draft.suit===x[0]?'on':''}" data-v110-suit="${x[0]}"><img src="${x[3]}" alt="${x[1]}"><span>${x[1]}</span></button>`).join('')}</div>`;
  const piecePanelHtml=()=>{const list=lists[active]||[];return `${panelHead(labels[active]+'選擇')}<div class="v110Grid">${list.map(x=>{const thumb=layerThumbUrl(active,x[0]);return `<button class="v110Card ${draft[active]===x[0]?'on':''}" data-v110-item="${active}" data-v110-value="${x[0]}">${thumb?`<img src="${thumb}" alt="${x[1]}">`:`<i class="v110Mini">${x[2]}</i>`}<span>${x[1]}</span></button>`}).join('')}</div>`};
  const updatePanel=()=>{const panel=document.querySelector('#wardrobe .v110Panel');if(panel)panel.innerHTML=active==='suit'?suitPanelHtml():piecePanelHtml()};
  const pieceBase='assets/wardrobe-base-clean-v120.webp?v=20260919-1';
  const topScene=()=>fittedTopScenes[draft.top]||pieceBase;
  const verifiedMixScenes={
    '100':'assets/wardrobe-fitted/top-cream-scene-v1.webp?v=20260920-63',
    '110':'assets/mix-lab/top-cream-bottom-pink-fused-preview-v2.webp?v=20260920-63',
    '101':'assets/mix-lab/top-cream-shoes-loafers-fused-v1.webp?v=20260920-63',
    '111':'assets/mix-lab/top-cream-bottom-pink-shoes-loafers-fused-preview-v1.webp?v=20260920-63'
  };
  const verifiedMixScene=()=>{
    if(draft.top!=='cream'||!['','pinkSkirt'].includes(draft.bottom)||!['','loafers'].includes(draft.shoes))return '';
    const key='1'+Number(draft.bottom==='pinkSkirt')+''+Number(draft.shoes==='loafers');
    return verifiedMixScenes[key]||'';
  };
  const activeScene=()=>verifiedMixScene()||topScene();
  const svgMask=body=>`url(data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 941 1672">${body}</svg>`)})`;
  const bagMasks={
    heart:svgMask('<path fill="white" d="M750 560L790 550L825 605L825 650L795 675L755 655L735 605Z"/><path fill="none" stroke="white" stroke-width="18" d="M770 635L720 675M805 640L845 680"/><rect fill="white" x="665" y="660" width="225" height="150" rx="25"/>'),
    tote:svgMask('<path fill="white" d="M755 760L790 750L830 815L842 865L820 900L780 885L750 830Z"/><path fill="none" stroke="white" stroke-width="18" d="M800 865L735 940M825 875L870 945"/><rect fill="white" x="675" y="925" width="245" height="180" rx="30"/>'),
    star:svgMask('<path fill="white" d="M750 575L790 565L825 625L820 680L785 700L750 670L735 620Z"/><path fill="none" stroke="white" stroke-width="18" d="M790 665L815 815M815 670L875 815"/><rect fill="white" x="755" y="790" width="185" height="150" rx="24"/>')
  };
  // Bottom assets are already aligned transparent garment layers. Never crop a
  // full fitted scene here: its camisole/shorts leak out at the waist seams.
  const bottomFit=()=> '0';
  const layerStyle=()=>'';
  const stageLayerUrl=kind=>{
    if(verifiedMixScene()&&['bottom','shoes'].includes(kind))return '';
    if(kind==='topFront')return topScene();
    return layerUrl(kind,draft[kind]);
  };
  const optionalLayerHtml=kind=>{
    const url=stageLayerUrl(kind);
    const className={topFront:'v110TopFront',bottom:'v110WearBottom',shoes:'v110WearShoes',bag:'v110WearBag',accessory:'v110WearAccessory'}[kind]||'';
    const piece=kind==='topFront'?draft.top:(draft[kind]||'');
    const fitBottom=kind==='bottom'?bottomFit(draft.bottom):'0';
    return `<img class="v110WearLayer ${className}" data-v110-layer="${kind}" data-v110-piece="${piece}" data-v110-fitbottom="${fitBottom}" style="${layerStyle(kind,piece)}" src="${url}" alt="${kind==='topFront'?'上衣前景':labels[kind]}" ${url?'':'hidden'}>`;
  };
  const layerOrder=['shoes','bottom','bag','accessory'];
  const layeredStageHtml=()=>`<div class="v110LayeredStage"><img class="v110LayerBase" src="${activeScene()}" alt="女孩目前造型">${layerOrder.map(optionalLayerHtml).join('')}</div>`;
  const updateLayer=()=>{
    const image=document.querySelector('#wardrobe .v110LayerBase');
    const url=activeScene();
    if(!image||!url)return;
    const token=++sceneToken;
    const layers=layerOrder.map(kind=>[kind,stageLayerUrl(kind)]);
    Promise.all([warmImage(url),...layers.map(([,layer])=>warmImage(layer))]).then(()=>{
      if(token!==sceneToken||!image.isConnected)return;
      image.src=url;image.hidden=false;image.alt='女孩目前混搭造型';
      layers.forEach(([kind,layer])=>{
        const target=document.querySelector(`#wardrobe [data-v110-layer="${kind}"]`);if(!target)return;
        const piece=kind==='topFront'?draft.top:(draft[kind]||'');
        target.dataset.v110Piece=piece;
        if(kind==='bottom')target.dataset.v110Fitbottom=bottomFit(draft.bottom);
        if(kind==='bag'){
          target.style.setProperty('-webkit-mask-image','none');
          target.style.setProperty('mask-image','none');
        }
        target.hidden=!layer;if(layer)target.src=layer;
      });
    });
  };
  const toast=t=>{document.querySelector('.v110Toast')?.remove();const d=document.createElement('div');d.className='v110Toast';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),1500)};
  const persist=()=>{saved=clone(draft);try{localStorage.setItem(KEY,JSON.stringify(saved));localStorage.setItem('englishQuestWardrobeV103',saved.suit)}catch{}const b=document.querySelector('[data-v110-save]');if(b){b.textContent='已儲存 ✓';setTimeout(()=>{if(b.isConnected)b.textContent='儲存'},1200)}toast('整套穿搭已儲存 ♡')};
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
    return `<div class="v110Wardrobe ${panelOpen?'v110DrawerOpen':''}"><div class="v110Stage v110OriginalUI ${isSuit?'v110SuitUI':'v110PieceUI'}">${stage}${side()}<aside class="v110Panel" aria-label="${labels[active]}素材選擇">${panel}</aside></div></div>`;
  };
  const hairRefs=['daily-latte','casual-knit','campus-cardigan','campus-sport','sweet-rose','daily-pink','sweet-cream','casual-cafe','sweet-lavender'];
  const hairEditor=()=>`<div class="v110Editor"><div class="v110EditorHead"><button class="v110Back" data-v110-editorback>‹</button><h2>髮型 / 髮色</h2><button class="v110Save" data-v110-save>儲存</button></div><div class="v110Segment"><button data-v110-hairpane="style" class="${hairPane==='style'?'on':''}">髮型</button><button data-v110-hairpane="color" class="${hairPane==='color'?'on':''}">髮色</button></div>${hairPane==='style'?`<div class="v110Grid v110HairGrid">${hairs.map((x,i)=>`<button class="v110Card ${draft.hair===x[0]?'on':''}" data-v110-hair="${x[0]}"><i class="v110HeadThumb"><img src="${suitUrl(hairRefs[i])}" alt="${x[1]}"></i><span>${x[1]}</span></button>`).join('')}</div>`:`<div class="v110FacePreview"><img src="${suitUrl('daily-latte')}" alt="髮色預覽"></div>`}<div class="v110ColorRow">${hairColors.map(x=>`<button class="v110Color ${draft.hairColor===x[0]?'on':''}" style="background:${x[0]}" data-v110-haircolor="${x[0]}" aria-label="${x[1]}"></button>`).join('')}</div></div>`;
  const makeupEditor=()=>{const m=makeup[makeTab];return `<div class="v110Editor"><div class="v110EditorHead"><button class="v110Back" data-v110-editorback>‹</button><h2>妝容細節</h2><button class="v110Save" data-v110-save>儲存</button></div><div class="v110MakeTabs">${Object.entries(makeup).map(([k,v])=>`<button data-v110-maketab="${k}" class="${makeTab===k?'on':''}">${v.label}</button>`).join('')}</div><div class="v110FacePreview"><img src="${suitUrl('daily-latte')}" alt="妝容預覽"></div><div class="v110Grid v110MakeGrid">${m.items.map(x=>`<button class="v110Card ${draft.makeup[makeTab]===x[0]?'on':''}" data-v110-make="${x[0]}"><i class="v110MakeIcon">${x[2]}</i><span>${x[1]}</span></button>`).join('')}</div><button class="v110Finish" data-v110-makefinish>完成妝容</button></div>`};
  const render=()=>{const sec=document.getElementById('wardrobe');if(!sec)return;warmWardrobe();sec.innerHTML=active==='hair'?hairEditor():active==='makeup'?makeupEditor():standard()};
  renderWard=render;
  const goBeforeV110=go;
  go=function(id){if(id==='wardrobe'){draft=clone(saved);active='top';panelOpen=true;draft.mode='piece';pieceKinds.forEach(startPieceMode)}goBeforeV110(id)};
  document.addEventListener('click',e=>{
    const q=s=>e.target.closest(s);
    if(q('[data-v110-back]')){go('home');return}
    if(q('[data-v110-editorback]')){active='suit';render();return}
    if(q('[data-v110-save]')){persist();return}
    if(q('[data-v110-panel-close]')){panelOpen=false;render();return}
    if(q('[data-v110-return-suits]')){active='suit';panelOpen=true;draft.mode='suit';draft.previewSuit=draft.suit;render();return}
    let b=q('[data-v110-tab]');if(b){active=b.dataset.v110Tab;if(active==='suit'){draft.mode='suit';draft.previewSuit=draft.suit}else{draft.mode='piece';if(pieceKinds.includes(active))startPieceMode(active)}if(active==='hair'||active==='makeup'){panelOpen=false;render()}else{panelOpen=true;render()}return}
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
