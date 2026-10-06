import { extFetch } from "/_sdk/client.js";

const SIGNS=[
 {id:"flower",k:["flower","bloom","blossom","አበበ","አበባ","አበቀ","ማበብ"],hits:{wol:8,tel:8,har:7},
  en:{name:"Early tree flowering",pred:"Rain starts later than usual",lag:"about 3 weeks",advice:"Wait before sowing. Keep your seed stored and dry."},
  am:{name:"ዛፍ ቀድሞ ማበቡ",pred:"ዝናብ ከወትሮው ዘግይቶ ይጀምራል",lag:"ወደ 3 ሳምንት",advice:"ከመዝራትዎ በፊት ይጠብቁ። ዘርዎን ደረቅ አድርገው ያስቀምጡ።"}},
 {id:"ants",k:["ant","termite","ጉንዳ"],hits:{wol:9,tel:8,har:8},
  en:{name:"Ants carrying eggs uphill",pred:"Heavy rain within days",lag:"2 to 5 days",advice:"Heavy rain is close. Protect harvested grain and open drainage in your field."},
  am:{name:"ጉንዳኖች እንቁላላቸውን ወደ ከፍታ ሲያጓጉዙ",pred:"በጥቂት ቀናት ውስጥ ከባድ ዝናብ",lag:"ከ2 እስከ 5 ቀን",advice:"ከባድ ዝናብ ቅርብ ነው። የታጨደ እህልዎን ይሸፍኑ፣ የማሳዎትንም ውሃ መውረጃ ይክፈቱ።"}},
 {id:"frog",k:["frog","croak","toad","እንቁራሪ"],hits:{wol:8,tel:8,har:7},
  en:{name:"Frogs croaking loudly at night",pred:"Rain within a few days",lag:"1 to 4 days",advice:"Rain is likely soon. Prepare your field and seed."},
  am:{name:"እንቁራሪቶች በሌሊት ጮክ ብለው ሲጮሁ",pred:"በጥቂት ቀናት ውስጥ ዝናብ",lag:"ከ1 እስከ 4 ቀን",advice:"ዝናብ በቅርቡ ሊመጣ ይችላል። ማሳዎን እና ዘርዎን ያዘጋጁ።"}},
 {id:"birds",k:["bird","swallow","cuckoo","stork","crane","sparrow","ወፍ","ወፎች"],hits:{wol:7,tel:7,har:6},
  en:{name:"Migratory birds arriving",pred:"Season is turning, rains in 2 to 4 weeks",lag:"2 to 4 weeks",advice:"Rains are on the way. Start preparing the land now."},
  am:{name:"ፍልሰተኛ ወፎች ሲመጡ",pred:"ወቅቱ እየተቀየረ ነው፣ ዝናብ በ2 እስከ 4 ሳምንት ውስጥ",lag:"ከ2 እስከ 4 ሳምንት",advice:"ዝናብ እየመጣ ነው። መሬትዎን አሁን ማዘጋጀት ይጀምሩ።"}},
 {id:"halo",k:["halo","ring around","ቀለበት"],hits:{wol:6,tel:7,har:7},
  en:{name:"Ring around the moon",pred:"Rain within 2 days",lag:"1 to 2 days",advice:"Rain may come in a day or two. Do not spread fertilizer today."},
  am:{name:"በጨረቃ ዙሪያ ቀለበት ሲታይ",pred:"በ2 ቀን ውስጥ ዝናብ",lag:"ከ1 እስከ 2 ቀን",advice:"ዝናብ በአንድ ወይም በሁለት ቀን ሊመጣ ይችላል። ዛሬ ማዳበሪያ አይበትኑ።"}},
 {id:"wind",k:["east wind","wind from the east","eastern wind","wind turned","wind changed","wind direction","ምሥራቅ","ምስራቅ","ንፋስ","ነፋስ"],hits:{wol:7,tel:7,har:8},
  en:{name:"Wind turning to the east",pred:"Moist air arriving, rain likely this week",lag:"2 to 6 days",advice:"Moist air is coming. Be ready to sow when the first good rain falls."},
  am:{name:"ንፋስ ወደ ምሥራቅ ሲዞር",pred:"እርጥብ አየር እየመጣ ነው፣ በዚህ ሳምንት ዝናብ ይኖራል",lag:"ከ2 እስከ 6 ቀን",advice:"እርጥብ አየር እየመጣ ነው። የመጀመሪያው ጥሩ ዝናብ ሲዘንብ ለመዝራት ዝግጁ ይሁኑ።"}},
 {id:"dragon",k:["dragonfl","flying low","ነፍሳት"],hits:{wol:6,tel:6,har:6},
  en:{name:"Dragonflies flying low",pred:"Rain within a day",lag:"under 1 day",advice:"Rain is near today. Cover what you must keep dry."},
  am:{name:"ነፍሳት ዝቅ ብለው ሲበሩ",pred:"በአንድ ቀን ውስጥ ዝናብ",lag:"ከ1 ቀን ያነሰ",advice:"ዝናብ ዛሬ ቅርብ ነው። ደረቅ መሆን ያለበትን ነገር ይሸፍኑ።"}},
 {id:"hot",k:["hot night","very hot","humid","sticky","no wind","still air","ሞቃት","እርጥበት","ሙቀት"],hits:{wol:7,tel:7,har:7},
  en:{name:"Hot, humid, still nights",pred:"Storm building within days",lag:"2 to 4 days",advice:"A storm may build. Delay spraying and secure loose things on the farm."},
  am:{name:"ሞቃትና እርጥበት ያለው ሌሊት",pred:"በጥቂት ቀናት ውስጥ ማዕበል ይፈጠራል",lag:"ከ2 እስከ 4 ቀን",advice:"ማዕበል ሊፈጠር ይችላል። ኬሚካል ርጭትን ያዘገዩ፣ በእርሻ ላይ ያሉ ልቅ ነገሮችንም ያስጠብቁ።"}},
 {id:"crow",k:["crow","nest","owl","ቁራ","ጎጆ"],hits:{wol:4,tel:5,har:4},
  en:{name:"Bird nest height",pred:"Claimed rain strength for the season",lag:"whole season",advice:"Do not rely on this sign alone. Combine it with other signs and the weather forecast."},
  am:{name:"የቁራ ጎጆ ከፍታ",pred:"ለወቅቱ የዝናብ መጠን ይተነብያል ተብሎ ይታመናል",lag:"ሙሉ ወቅት",advice:"በዚህ ምልክት ብቻ አይተማመኑ። ከሌሎች ምልክቶችና ከአየር ትንበያ ጋር ያዋህዱት።"}},
 {id:"cloud",k:["red sky","red clouds","evening sky","sunset","ቀይ ሰማይ","ቀዩ ሰማይ"],hits:{wol:6,tel:6,har:7},
  en:{name:"Red evening sky",pred:"Dry, clear weather next day",lag:"1 day",advice:"Tomorrow looks dry. Good day for harvesting and drying grain."},
  am:{name:"ቀይ የምሽት ሰማይ",pred:"በማግስቱ ደረቅና ጥርት ያለ የአየር ሁኔታ",lag:"1 ቀን",advice:"ነገ ደረቅ ይመስላል። እህል ለመሰብሰብና ለማድረቅ ጥሩ ቀን ነው።"}}
];
const T={
 en:{sub:"Tell me a nature sign in English. I will test it and talk back.",where:"Where is the farmer?",
  loc:{wol:"Wolaita, Ethiopia (enset, maize, teff)",tel:"Telangana, India (cotton, pulses, millets)",har:"Haryana, India (bajra, mustard, wheat)"},
  crop:{wol:"enset and maize",tel:"cotton and pulses",har:"bajra and mustard"},rain:{wol:"Belg and Kiremt rains",tel:"monsoon",har:"monsoon"},
  ph:"Speak or type: “The mango tree flowered early this year”",go:"Test",hint:"Tap the mic and speak, or type. You can also tap an example.",
  h:["1 · Listen","2 · Understand","3 · Test against 10 past seasons","4 · Voice advice"],
  kv:["Sign","Place","Season","It predicts","Usual delay"],seas:["Main rainy season","Pre-rain season","Dry season"],
  strong:"Strong",fair:"Fair",weak:"Weak",trust:"Trust score",rep:"🔊 Play again",mute:"Mute",unmute:"Unmute",
  ex:["The mango tree flowered early this year","Ants are carrying their eggs uphill","Frogs are croaking loudly every night","Birds arrived early from far away","I saw a ring around the moon","When should I sow my maize?"],
  ask:/when|should i sow|sow|plant|planting|will it rain|advice/i,
  seasonTxt:h=>`In <b>${h} of 10</b> past seasons, this sign was followed by what the elders say.`,
  unk:"I have not heard that sign before. Thank you for sharing it. We will save it and test it against past rainfall. Can you tell me another sign, like birds, ants or frogs?",
  unkTest:"I have not heard this sign before. In the real system it is saved with your name and tested once enough farmers report it.",unkSign:"Not recognised yet",
  strength:h=>h>=8?`The sign and the satellite records agree, ${h} out of 10 years.`:h>=6?`The sign is fairly reliable, ${h} out of 10 years.`:`The sign was right only ${h} out of 10 years, so be careful.`,
  thanks:"Thank you for sharing.",follow:(n,a,r,c)=>`Based on the last sign you told me, ${n.toLowerCase()}, ${a} Your ${r} and ${c} depend on good timing, so check again in three days.`,
  listen:"Listening… speak now.",blocked:"Microphone is blocked here. Please type your sign instead.",nohear:"I could not hear you. Try again or type.",nosr:"Voice input is not supported in this browser. Please type your sign.",nostart:"Could not start the microphone. Please type.",
  novoice:"",foot:"Demo for the Sign & Sky idea. Results here are illustrative, not real forecasts. The full system would test every sign against real satellite rainfall records for the farmer’s exact place.",sr:"en-US",tts:"en-US"},
 am:{sub:"የተፈጥሮ ምልክት በአማርኛ ይንገሩኝ። እፈትሸዋለሁ፣ መልስም እሰጣለሁ።",where:"ገበሬው የት ነው ያለው?",
  loc:{wol:"ወላይታ፣ ኢትዮጵያ (እንሰት፣ በቆሎ፣ ጤፍ)",tel:"ተላንጋና፣ ሕንድ (ጥጥ፣ ጥራጥሬ፣ ማሽላ)",har:"ሃርያና፣ ሕንድ (ባጅራ፣ ሰናፍጭ፣ ስንዴ)"},
  crop:{wol:"እንሰትና በቆሎ",tel:"ጥጥና ጥራጥሬ",har:"ባጅራና ሰናፍጭ"},rain:{wol:"የበልግና የክረምት ዝናብ",tel:"የሞንሱን ዝናብ",har:"የሞንሱን ዝናብ"},
  ph:"ይናገሩ ወይም ይጻፉ፦ “የማንጎ ዛፍ ዘንድሮ ቀድሞ አበበ”",go:"ፈትሽ",hint:"ማይክሮፎኑን ነክተው ይናገሩ፣ ወይም ይጻፉ። ምሳሌም መምረጥ ይችላሉ።",
  h:["1 · ማዳመጥ","2 · መረዳት","3 · ካለፉት 10 ወቅቶች ጋር መፈተሽ","4 · የድምፅ ምክር"],
  kv:["ምልክት","ቦታ","ወቅት","የሚተነብየው","ብዙ ጊዜ የሚዘገየው"],seas:["ዋና የዝናብ ወቅት","ከዝናብ በፊት ያለ ወቅት","የበጋ ወቅት"],
  strong:"ጠንካራ",fair:"መካከለኛ",weak:"ደካማ",trust:"የአመኔታ ነጥብ",rep:"🔊 እንደገና አጫውት",mute:"ድምፅ አጥፋ",unmute:"ድምፅ አብራ",
  ex:["የማንጎ ዛፍ ዘንድሮ ቀድሞ አበበ","ጉንዳኖች እንቁላላቸውን ወደ ከፍታ እያጓጓዙ ነው","እንቁራሪቶች በየሌሊቱ ጮክ ብለው ይጮሃሉ","ወፎች ከሩቅ ቀድመው መጡ","በጨረቃ ዙሪያ ቀለበት አየሁ","በቆሎዬን መቼ ልዝራ?"],
  ask:/መቼ|ልዝራ|መዝራት|ዝናብ ይዘንባል|ምክር|when|sow/i,
  seasonTxt:h=>`ባለፉት 10 ወቅቶች ውስጥ በ<b>${h}</b> ይህ ምልክት ሽማግሌዎች እንደሚሉት ሆኖ ተከስቷል።`,
  unk:"ይህን ምልክት ከዚህ በፊት አልሰማሁም። ስላካፈሉን እናመሰግናለን። እናስቀምጠዋለን፤ ካለፉ የዝናብ መረጃዎች ጋር እንፈትሸዋለን። ሌላ ምልክት ቢነግሩኝ፣ ለምሳሌ ወፎች፣ ጉንዳኖች ወይም እንቁራሪቶች?",
  unkTest:"ይህን ምልክት ከዚህ በፊት አልሰማሁም። በእውነተኛው ሥርዓት ውስጥ በስምዎ ይቀመጣል፣ በቂ ገበሬዎች ሲያሳውቁም ይፈተናል።",unkSign:"ገና አልታወቀም",
  strength:h=>h>=8?`ምልክቱና የሳተላይት መረጃው ይስማማሉ፤ ከ10 ዓመት ውስጥ በ${h}።`:h>=6?`ምልክቱ በአብዛኛው አስተማማኝ ነው፤ ከ10 ዓመት ውስጥ በ${h}።`:`ምልክቱ ከ10 ዓመት ውስጥ በ${h} ብቻ ትክክል ነበር፤ ስለዚህ ይጠንቀቁ።`,
  thanks:"ስላካፈሉን እናመሰግናለን።",follow:(n,a,r,c)=>`ከነገሩኝ የመጨረሻ ምልክት (${n}) በመነሳት፣ ${a} የ${r} እና የ${c} ስኬት በወቅቱ መዝራት ላይ ይመሰረታል፤ ከሦስት ቀን በኋላ እንደገና ይፈትሹ።`,
  listen:"እያዳመጥኩ ነው… አሁን ይናገሩ።",blocked:"ማይክሮፎን እዚህ ታግዷል። እባክዎ ምልክቱን ይጻፉ።",nohear:"አልሰማሁዎትም። እንደገና ይሞክሩ ወይም ይጻፉ።",nosr:"ይህ ብሮውዘር የድምፅ ግብዓትን አይደግፍም። እባክዎ ምልክቱን ይጻፉ።",nostart:"ማይክሮፎኑን ማስጀመር አልተቻለም። እባክዎ ይጻፉ።",
  novoice:"በዚህ መሣሪያ ላይ የአማርኛ ድምፅ የለም፤ ምክሩ በጽሑፍ ብቻ ይታያል።",foot:"ይህ የSign & Sky ሀሳብ ማሳያ ነው። እዚህ ያሉት ውጤቶች ለምሳሌ ብቻ ናቸው እንጂ እውነተኛ ትንበያ አይደሉም። ሙሉው ሥርዓት እያንዳንዱን ምልክት ለገበሬው ትክክለኛ ቦታ ከሚሆን እውነተኛ የሳተላይት የዝናብ መዝገብ ጋር ይፈትሻል።",sr:"am-ET",tts:"am-ET"}
};
const $=id=>document.getElementById(id);
let lang="en",muted=false,lastAdvice="",lastSign=null,on=false;
const tr=()=>T[lang];

function applyLang(){
  const t=tr();
  $("t-sub").textContent=t.sub;$("t-where").textContent=t.where;$("said").placeholder=t.ph;$("go").textContent=t.go;$("hint").textContent=t.hint;
  ["wol","tel","har"].forEach((v,i)=>$("loc").options[i].textContent=t.loc[v]);
  t.h.forEach((x,i)=>$("h"+(i+1)).textContent=x);
  $("rep").textContent=t.rep;$("mute").textContent=muted?t.unmute:t.mute;$("t-foot").textContent=t.foot;
  $("l-en").classList.toggle("on",lang==="en");$("l-am").classList.toggle("on",lang==="am");
  document.documentElement.lang=lang==="am"?"am":"en";
  $("chips").innerHTML="";
  t.ex.forEach(x=>{const b=document.createElement("button");b.className="chip";b.textContent=x;b.onclick=()=>{$("said").value=x;run()};$("chips").appendChild(b)});
  if(rec)rec.lang=t.sr;
  hideAll();$("said").value="";
  try{speechSynthesis.cancel()}catch(e){}
}
function voiceFor(){
  if(!("speechSynthesis" in window))return null;
  const l=tr().tts.slice(0,2);
  return speechSynthesis.getVoices().find(v=>v.lang&&v.lang.toLowerCase().startsWith(l))||null;
}
function speak(text){
  if(muted||!("speechSynthesis" in window))return;
  try{
    speechSynthesis.cancel();
    const v=voiceFor();
    if(lang==="am"&&!v){$("hint").textContent=tr().novoice;return}
    const u=new SpeechSynthesisUtterance(text);u.lang=tr().tts;if(v)u.voice=v;u.rate=.95;speechSynthesis.speak(u);
  }catch(e){}
}
function hideAll(){["s1","s2","s3","s4"].forEach(i=>$(i).classList.remove("show"))}

function season(){const m=new Date().getMonth(),t=tr().seas;return m>=5&&m<=8?t[0]:(m>=2&&m<=4?t[1]:t[2])}
async function run(){
  const text=$("said").value.trim();if(!text)return;
  const t=tr(),loc=$("loc").value,place=t.loc[loc].split(" (")[0];
  hideAll();
  $("heard").textContent="“"+text+"”";$("s1").classList.add("show");
  const asking=t.ask.test(text)||T.en.ask.test(text);
  let r={sign:null,used:null,hits:0,source:"",collection:""};
  try{
    const q=new URLSearchParams({text,place:loc,last:asking&&lastSign?lastSign.id:""});
    const res=await extFetch("/api/analyze?"+q);
    if(res.ok)r=await res.json();
  }catch(e){}
  const sign=SIGNS.find(s=>s.id===r.sign)||null;
  setTimeout(()=>{
    if(sign)lastSign=sign;
    const use=SIGNS.find(s=>s.id===r.used)||null;
    if(!use){
      $("und").innerHTML=`<b>${t.kv[0]}</b><span>${t.unkSign}</span><b>${t.kv[1]}</b><span>${place}</span>`;
      $("test").innerHTML=`<p>${t.unkTest}</p>`;
      $("s2").classList.add("show");$("s3").classList.add("show");
      finish(t.unk);return;
    }
    const d=use[lang];
    $("und").innerHTML=`<b>${t.kv[0]}</b><span>${d.name}</span><b>${t.kv[1]}</b><span>${place}</span><b>${t.kv[2]}</b><span>${season()}</span><b>${t.kv[3]}</b><span>${d.pred}</span><b>${t.kv[4]}</b><span>${d.lag}</span>`;
    $("s2").classList.add("show");
    setTimeout(()=>{
      const h=r.hits;let bars="";for(let i=0;i<10;i++)bars+=`<i class="${i<h?"y":"n"}"></i>`;
      const lvl=h>=8?[t.strong,"b-ok"]:h>=6?[t.fair,"b-mid"]:[t.weak,"b-low"];
      $("test").innerHTML=`<div class="bars">${bars}</div><p style="margin:0">${t.seasonTxt(h)} ${t.trust}: <span class="badge ${lvl[1]}">${lvl[0]}</span></p>`;
      $("srcline").textContent=r.source+(r.collection?" · "+r.collection:"");$("s3").classList.add("show");
      setTimeout(()=>{
        const a=(asking&&!sign)?t.follow(d.name,d.advice,t.rain[loc],t.crop[loc]):`${t.thanks} ${t.strength(h)} ${d.advice}`;
        finish(a);
      },700);
    },700);
  },500);
}
function finish(a){lastAdvice=a;$("adv").textContent=a;$("s4").classList.add("show");speak(a);$("s4").scrollIntoView({behavior:"smooth",block:"nearest"})}

$("go").onclick=run;
$("said").addEventListener("keydown",e=>{if(e.key==="Enter")run()});
$("rep").onclick=()=>{const m=muted;muted=false;speak(lastAdvice);muted=m};
$("mute").onclick=()=>{muted=!muted;$("mute").textContent=muted?tr().unmute:tr().mute;if(muted&&"speechSynthesis" in window)speechSynthesis.cancel()};
$("l-en").onclick=()=>{lang="en";applyLang()};
$("l-am").onclick=()=>{lang="am";applyLang()};
if("speechSynthesis" in window)speechSynthesis.onvoiceschanged=()=>{};

const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
let rec=null;
if(SR){
  rec=new SR();rec.interimResults=false;rec.maxAlternatives=1;
  rec.onresult=e=>{$("said").value=e.results[0][0].transcript;run()};
  rec.onend=()=>{on=false;$("mic").classList.remove("on");$("hint").textContent=tr().hint};
  rec.onerror=e=>{on=false;$("mic").classList.remove("on");$("hint").textContent=(e.error==="not-allowed"||e.error==="service-not-allowed")?tr().blocked:tr().nohear};
}
$("mic").onclick=()=>{
  if(!rec){$("hint").textContent=tr().nosr;return}
  if(on){rec.stop();return}
  try{speechSynthesis.cancel();rec.lang=tr().sr;rec.start();on=true;$("mic").classList.add("on");$("hint").textContent=tr().listen}catch(e){$("hint").textContent=tr().nostart}
};
applyLang();
const who=document.querySelector(".wrap").dataset.user;if(who)$("signed").textContent="Signed in as "+who;
