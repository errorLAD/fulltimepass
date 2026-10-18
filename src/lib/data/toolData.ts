// Comprehensive data, questions, templates and logic for all 20 FullTimePass tools
// Ultra-funny, relatable, desi Hinglish comedy data crafted for maximum viral sharing!

// ==========================================
// TOOL 1: Roast My Friend 🔥
// ==========================================

export const ROAST_TRAITS = [
  { id: "always_late", label: "Always late by 2 hours ('Bhai bas nikal gaya')", icon: "⏰" },
  { id: "iphone_emi", label: "iPhone 15 on 24-month EMI, asks for ₹20 split", icon: "📱" },
  { id: "free_food", label: "Treat ke time gayab, free food pe VIP attendance", icon: "🍕" },
  { id: "goa_planner", label: "Goa plan 50 baar banaya, auto se aage nahi gaya", icon: "🏖️" },
  { id: "gym_dropout", label: "Gym membership li thi, sirf story daal ke wapas aa gaya", icon: "💪" },
  { id: "overthinker", label: "Seen ke baad 3 ghante sochna ki usne full stop kyu lagaya", icon: "🤯" },
  { id: "fake_busy", label: "Reels dekh raha hai par status 'Extremely Busy' rakhta hai", icon: "🎬" },
  { id: "audio_podcaster", label: "Typing aati nahi, 4-minute ka voice note bhejta hai", icon: "🎙️" },
  { id: "gyaan_guru", label: "Khud single hai par poore mohalle ko relationship advice deta hai", icon: "🧠" },
  { id: "tapri_ceo", label: "Tapri pe baith ke Ambani ko business tips deta hai", icon: "☕" },
  { id: "splitwise_chor", label: "Splitwise pe 'Settled' click karta hai bina actual paise transfer kiye", icon: "💳" },
  { id: "story_viewer", label: "Message 2 din se unread hai, par Instagram story 15 second mein dekhta hai", icon: "👁️" },
  { id: "rickshaw_bargainer", label: "₹20 ke auto fare ke liye 15 minute driver se Mahabharat ladta hai", icon: "🛺" },
  { id: "charger_chor", label: "Ghar aate hi 'Bhai tera Type-C charger kahan hai?' bol ke chura leta hai", icon: "🔌" },
  { id: "screenshot_fbi", label: "Ladaai ke time 2019 ke WhatsApp screenshots folder se nikal leta hai", icon: "📑" },
];

export const ROAST_STYLES = [
  { id: "friendly", label: "Friendly 😄", description: "Halka-fulka mazak, dil pe nahi lagega" },
  { id: "savage", label: "Savage 🔥", description: "Emotional damage confirmed, ro dega" },
  { id: "best_friend", label: "Best Friend 🤝", description: "Chaddi-buddy level beizzati, no filter" },
];

export const ROAST_TEMPLATES = {
  friendly: [
    "{name} ka confidence uski bank balance se 100x zyada speed pe daudta hai. Dil ka saaf hai... bas dimaag thoda off-peak hours pe chalta hai!",
    "Agar 'Bas 5 minute mein pahunch raha hoon' bolne pe tax lagta, toh {name} abhi Tihar jail mein lifetime sentence kaat raha hota.",
    "{name} bhai ki life mein bas do hi rules hain: Plan banate waqt sabse aage rehna, aur trip ke din subah 6 baje phone switch off kar lena!",
    "{name} ko dekh ke lagta hai ki bhagwan ne banate time thoda masala daala, thoda drama daala, aur dimaag daalna bhool gaye!",
    "{name} ke life plans itne jaldi drop hote hain jitni jaldi Monday subah ki neend. Par phir bhi squad ki jaan hai apna bhai!",
    "Dekh {name}, teri baatein sun ke lagta hai tu agla PM banega, par harkatein dekh ke lagta hai colony ka chowkidar bhi tujhe lift nahi dega!",
    "{name} canteen mein order aise deta hai jaise King Charles ho, aur bill aate hi achanak 'Mera UPI server down hai' bol ke gayab ho jata hai.",
    "Bhai {name}, tu single isliye nahi hai ki kismat kharab hai... tu single isliye hai kyunki opposite gender ke paas aankhein aur kaan dono hain!",
    "{name} ke paas har problem ka solution hai, bas apni zindagi ki problems ko chhod ke. Certified tapri philosopher!",
    "Agar bakchodi Olympic sport hoti, toh {name} ke gale mein abhi 14 gold medal latak rahe hote!",
  ],
  savage: [
    "{name} ka attitude CEO wala hai aur bank balance dekh ke intern bhi tars kha ke ₹20 de de. Bhai WhatsApp DP badalne se aukaat nahi badalti!",
    "Scientists are still researching ki {name} dimaag se sochta hai ya reels ke background music se. Zero brain cells, maximum high-voltage drama!",
    "{name} ke life goals itne blur hain ki Hubble Telescope bhi unhe focus nahi kar sakta. Bhai tu pehle pichhle saal ka ₹120 ka udhaar wapas kar!",
    "Bhai {name}, teri baatein sun ke Google bhi 404 Error de deta hai. Tu shakal se seedha aur harkaton se high-level financial scam lagta hai!",
    "{name} party mein aise ghusta hai jaise dulhe ka saga chacha ho, aur bill split hote hi washroom ka darwaza andar se lock kar leta hai!",
    "Agar aukaat aur overconfidence ka koi graph banta, toh {name} us graph ke bahar sadak pe gira hua milta. Total emotional disaster!",
    "{name} ka dimaag 2G speed pe chalta hai, par muh 5G fiber optic connection se fast chalta hai. Unfiltered bakwas ka live broadcast!",
    "Duniya mein do tarah ke log hote hain: Ek jo mehnat karte hain, aur doosra {name} jo sirf doosron ki treat pe 'Thank you bro' bol ke photo daalta hai.",
    "{name} ko dekh ke lagta hai Bhagwan ne prototype banaya tha, phir socha 'Chhodo yaar, kaun mehnat kare' aur draft mode mein hi publish kar diya!",
    "Teri shakal dekh ke street dogs bhi bhaunkna band kar dete hain ki 'Chhodo yaar, iska pehle se hi kat chuka hai'. Brutal reality check!",
    "{name} gym jaata hai weight uthane nahi, gym ke AC mein baith ke 4 angle se biceps ki photo kheenchne aur 3 ghante baad delete karne!",
    "Bhai {name}, teri aukat itni hi hai ki tu Netflix ka subscription mangne ke liye 2 saal purane classmate ko 'Bhai yaad aa rahi thi' likhta hai!",
  ],
  best_friend: [
    "Dekh {name}, tu mera chaddi-buddy hai isliye sach bol raha hoon: Teri harkatein aisi hain ki tere gharwale bhi rishtedaaron ko batate nahi ki tu unka saga beta hai!",
    "{name} ke sath ghoomne jao toh izzat ka faluda 100% guaranteed hai. Ya toh police wale se faltu argument karega ya bill split karte time kidney failure ka natak karega!",
    "Pura mohalla jaanta hai ki {name} ke paas dimaag hai... bas activate karna bhool gaya bhagwan! Har situation mein Galat decision lena iska superpower hai.",
    "{name} itna bada pro hai ki single rehne ke 100 philosophical bahane bana leta hai, jabki sach ye hai ki gali ka kutta bhi isko bhav nahi deta!",
    "Teri dosti ke liye dil se dua nikalti hai {name}, par tera chehra dekh ke lagta hai bhagwan ne bina update kiye purana version roll out kar diya tha!",
    "Bhai {name}, tu mera sabse achha dost hai, par agar mujhe Titanic pe tere sath aakhri life jacket mile toh main khud pehen ke tujhe flying kiss de dunga!",
    "{name} ko lagta hai wo Ranbir Kapoor hai, par reality mein wo Rajpal Yadav ke deleted scenes jaisa behave karta hai. Forever unhinged!",
    "Jab bhi {name} bolta hai 'Bhai mere paas ek solid plan hai', mera pehla reaction hota hai apne saare bank accounts password change karna!",
    "Dost toh maine bohot dekhe, par {name} jaisa parasite nahi dekha jo meri bike ka petrol uda ke mujhe hi gyaan deta hai ki 'Walk karna health ke liye achha hai'!",
    "Bhai {name}, teri izzat utni hi hai jitni YouTube video mein 5 second ke unskippable ad ki hoti hai. Sab bas skip hone ka wait karte hain!",
  ],
};

// Trait-specific targeted savage burns that attack the friend's exact chosen flaw!
export const ROAST_TRAIT_BURNS: Record<string, string[]> = {
  always_late: [
    "Iski ghadi mein IST ka matlab 'Indian Standard Time' nahi, 'Inshallah agle janam' hota hai. 'Bas 5 minute mein nikla' bolke kambal ke andar reels dekh raha hota hai!",
    "Train chhoot jaye, flight cancel ho jaye par {name} kabhi time pe nahi aayega. Iske antim-sanskaar mein bhi pandit ji ko 2 ghante wait karna padega!",
    "NASA wale Mars pe rover land karwa dete hain par {name} ko colony ke main gate se tapri tak aane mein 3 sadiyaan lagti hain.",
  ],
  iphone_emi: [
    "iPhone 15 Pro Max 24-month EMI pe le rakha hai, par phone uthate hi bolta hai 'Bhai hotspot on kar na, data pack khatam ho gaya'!",
    "Mirror selfie aisi leta hai jaise Apple company iske chacha ki ho, par canteen mein ₹15 ki chai split karne ke liye 4 din tak reminder mangta hai!",
    "Phone ki battery 98% hoti hai par bank balance ₹0.98! Apple logo dikhane ke chakkar mein jeb mein hole ho chuka hai.",
  ],
  free_food: [
    "Apni treat ke din iska phone hamesha hospital visit pe chala jata hai, par jaise hi group pe 'Bhai biryani party hai' aao, ye bina invitation ke spoon leke pehle se khada milta hai!",
    "Iske pet mein GPS tracker laga hai jo sirf doosron ke kharche wale buffet pe activate hota hai. Free ka pani bhi 2 litre pi jata hai!",
    "Buffet mein aise plate bharta hai jaise aakhri baar 1947 mein khana khaya tha. Sharam iske dictionary mein 'Not Found 404' hai.",
  ],
  goa_planner: [
    "Goa ke 78 WhatsApp group bana chuka hai, Excel sheets aur aesthetic beach photos save hain, par ground reality yeh hai ki aaj tak colony ke divider se aage nahi gaya!",
    "Iska Goa plan Titanic se bhi bada disaster hai. Har saal May mein bolta hai 'Is baar pakka', aur June aate aate momo kha ke so jata hai!",
    "Iske Goa trip ka budget sun ke toh Ambani bhi hands-up kar le, par ticket book karne bolo toh 'Mummy ne mana kar diya' bol ke muh chupa leta hai.",
  ],
  gym_dropout: [
    "Gym ki 12-month membership li thi ₹15,000 ki. Pehle din 3 selfie li, story pe 'No Pain No Gain' likha, aur agle din se painkiller leke bed pe so gaya!",
    "Gym shaker bottle mein Rooh Afza pi ke bodybuilder banta hai. Dumble uthane se zyada isne gym ke mirror ke aage pose maare hain.",
    "Protein powder ka dabba sofa ke side mein table-stand bana ke rakha hai. Fitness iski bas Instagram bio mein exist karti hai!",
  ],
  overthinker: [
    "Usne 'Ok' ki jagah sirf 'K' likh diya tha, {name} ne 4 ghante blank ceiling ko dekh ke apni poori existence aur future divorce tak soch li!",
    "Instagram seen ke baad full stop kyu aaya, blue tick 3 second late kyu hua — iske dimaag mein CBI se zyada deep investigation chal rahi hoti hai.",
    "Menu card dekh ke order karne mein 45 minute lagata hai, aur order aane ke baad bolta hai 'Yaar tera wala zyada achha lag raha hai'.",
  ],
  fake_busy: [
    "WhatsApp status 'Extremely Busy | Do Not Disturb' laga rakha hai, aur background mein 6 ghante se billi ke funny videos scroll kar raha hai!",
    "Aise behave karta hai jaise World Bank ka quarterly audit iske sign ke bina ruk jayega, jabki office mein bas alt-tab karke YouTube dekh raha hota hai.",
    "'Super packed schedule bro' bol ke 3 baje tak bed pe ulti taraf muh karke so raha hota hai. Berozgaari ka CEO!",
  ],
  audio_podcaster: [
    "Typing karne mein iski ungliyon mein dard ho jata hai! 4 minute 48 second ka audio note bhejta hai jisme 4 minute sirf peeche pressure cooker ki seetee aur gaadiyon ke horn sunte hain.",
    "Bhai WhatsApp voice note bhejta hai ya Spotify pe apna unreleased motivational podcast drop karta hai? Sunte sunte insaan coma mein chala jaye!",
    "Ek word ka answer chahiye tha 'Haan ya Na', isne 5 minute ka bhashan bhej diya jaise Red Fort se address kar raha ho.",
  ],
  gyaan_guru: [
    "Khud pichhle 24 saal se shuddh single hai, kisi ne palat ke 'Hello' bhi nahi bola, par group pe Sandeep Maheshwari ban ke relationship advice deta hai!",
    "Iska gyaan sun ke lagta hai love marriage ka inventor yehi tha, jabki sach ye hai ki iski crush ko iska naam tak nahi pata.",
    "Life advice aisi dega jaise 40 saal ka Himalayan sanyasi ho, par khud se ₹20 ka Maggi bina jalaye nahi banti!",
  ],
  tapri_ceo: [
    "Tapri pe ₹10 ki cutting chai aur ek biscuit leke baithta hai, aur Elon Musk ko Twitter chalane ke 5 tips deta hai!",
    "'Bro I have a million dollar startup idea, bas funding chahiye' — yeh dialogue pichhle 5 saal se tapri ke bench pe bol raha hai.",
    "Iske business model ka ek hi rule hai: Dost se chai sponsor karwao aur aukaat se 500 guna badi baatein pelo!",
  ],
  splitwise_chor: [
    "Splitwise pe 'Settled' click karta hai bina actual paise transfer kiye! Iska credit score dekh ke bank wale phone cut kar dete hain.",
    "Bill aate hi bolta hai 'Bhai mere phone mein GPay update ho raha hai, tu bhar de' — aur wo update pichhle 3 saal se 99% pe atka hua hai!",
    "Isse ₹100 wapas lena matlab Swiss Bank se black money nikalwane jaisa mission impossible hai.",
  ],
  story_viewer: [
    "WhatsApp pe 3 din se message unread pada hai, par jaise hi Instagram pe koi reel ya story daalo, 4 second mein iska view aa jata hai! Stalker Pro Max!",
    "Blue tick band karke silent mode mein ghoomta hai, par reels tag karne pe turant haha emoji bhej deta hai. Hypocrisy ki bhi seema hoti hai!",
    "Dost emergency mein call kare toh phone silent, par crush story daale toh instant reaction. Prioritize karna koi isse seekhe!",
  ],
  rickshaw_bargainer: [
    "₹20 ke auto fare ke liye 15 minute auto wale bhaiya se ladta hai, aur wahi bache hue ₹5 se tapri pe cigarette ka dhuan udata hai!",
    "Auto wale bhaiya ne meter se bola toh bolta hai 'Bhaiya main roz yahin se jaata hoon, ₹10 se ek rupya zyada nahi dunga'. International negotiator!",
    "Mall mein ₹450 ki popcorn bina bole kharid lega, par auto wale ke ₹10 ke liye pura mohalla ikattha kar lega.",
  ],
  charger_chor: [
    "Ghar mein ghuste hi pehla question: 'Bhai tera Type-C charger kahan hai?' — aur jaate waqt wo charger iske bag mein mysteriously teleport ho jata hai!",
    "Iske paas khud ka koi charger nahi hai, iski poori zindagi doston ke adapter aur cables pe depend karti hai. Parasite behavior!",
    "Charger leke bolega 'Bhai kal pakka lauta dunga' — aur wo kal pichhle 14 mahine se nahi aaya!",
  ],
  screenshot_fbi: [
    "Normal ladaai mein bhi 2019 ke WhatsApp screenshots folder se nikal ke saamne rakh deta hai! CBI wale bhi isse tution lene aate hain.",
    "Iske phone ki gallery mein memories kam aur doston ke khilaf black-mail evidence zyada save rehte hain. Secret agent of Bakchodi!",
    "Har baat pe bolta hai 'Mere paas proof hai'. Bhai tu dost hai ya forensic science laboratory ka head?",
  ],
};

export const ROAST_BADGES = [
  "Aukaat Out of Bounds 💀",
  "Emotional Damage: 999% 🔥",
  "Zero Brain Cells Detected 🧠",
  "Certified Tapri CEO ☕",
  "National Splitwise Defaulter 💸",
  "Olympic Procrastinator 🛋️",
  "Pyaar Bhari Beizzati 🥰",
  "Chaddi-Buddy Roast Special 🤝",
  "Katora King Pro Max 🥣",
  "High Voltage Drama Queen/King 👑",
];

export const ROAST_METRICS_LIST = [
  [
    { label: "Savage Level", value: "11/10 🔥" },
    { label: "Brain Cells", value: "0.04% 🧠" },
    { label: "Sharam Factor", value: "404 Not Found ❌" },
  ],
  [
    { label: "Emotional Damage", value: "Fatal 💀" },
    { label: "Aukaat Index", value: "Negative 📉" },
    { label: "Splitwise Debt", value: "₹4,200 💸" },
  ],
  [
    { label: "Drama Level", value: "99.9% 🎭" },
    { label: "Excuse Speed", value: "Mach 3 ⚡" },
    { label: "Loyalty Score", value: "Condition: Free Food 🍕" },
  ],
  [
    { label: "Recovery Chance", value: "0.00% 🪦" },
    { label: "Confidence", value: "Delusional 🚀" },
    { label: "Common Sense", value: "Out of Stock 🛒" },
  ],
];

// ==========================================
// TOOL 2: GF/BF Red Flag Meter 🚩
// ==========================================

export const RED_FLAG_QUESTIONS = [
  {
    id: "q1",
    question: "WhatsApp ya Instagram pe reply kitni der mein aata hai? ⏳",
    hint: "Sach bolna, screenshots ready hain!",
    options: [
      { text: "Within 30 seconds (Green Flag VIP)", score: 5, tag: "fast" },
      { text: "2-3 hours later ('Yaar main so gaya tha')", score: 25, tag: "slow" },
      { text: "8 ghante baad, jabki active 24/7 online dikh rahe hain", score: 75, tag: "toxic" },
      { text: "Reply tab aata hai jab unka WiFi hotspot ya assignment chahiye", score: 95, tag: "selfish" },
    ],
  },
  {
    id: "q2",
    question: "Phone unlock karke table pe kaise rakhte hain? 📱",
    hint: "Physics of suspicious behavior",
    options: [
      { text: "Screen upar, koi tension nahi (Open book)", score: 5, tag: "innocent" },
      { text: "Screen ulta face karke, military secret mode", score: 45, tag: "suspicious" },
      { text: "Phone jeb se nikalte hi nahi, Face ID + PIN + biometric lock", score: 75, tag: "super_spy" },
      { text: "Do phones rakhte hain (Ek mummy wala, ek private mafia)", score: 95, tag: "agent_47" },
    ],
  },
  {
    id: "q3",
    question: "Ex aur 'Besties' ke sath kya equation hai? 🚩",
    hint: "The forbidden territory & bestie network",
    options: [
      { text: "Complete block, zero contact (Peace of mind)", score: 5, tag: "clean" },
      { text: "'Just a good friend yaar, family friend hain'", score: 40, tag: "danger" },
      { text: "Daily streak banti hai aur raat ko 2 baje nostalgia calls", score: 75, tag: "red_fort" },
      { text: "14 besties hain jinka naam 'Airtel Customer Care' ke naam se save hai 💀", score: 95, tag: "heartbreaker" },
    ],
  },
];

// Rich, varied diagnosis pools for Red Flag Meter!
export const RED_FLAG_DIAGNOSES = {
  danger: [
    {
      title: "Walking Red Fort (Lal Qila) 🚩",
      desc: "Bhai inka toxicity quotient dekh ke Chernobyl ke nuclear scientists bhi PPE kit pehen ke bhaag jayein! Reply 8 ghante baad, online 24/7, aur phone screen hamesha ulta face karke table pe rakhna!",
      punchline: "Emergency Recommendation: Turant runners shoes pehno aur bina peeche dekhe 100m sprint maaro!",
    },
    {
      title: "International Heartbreak Mafia 💀🚩",
      desc: "Inke paas 14 'Besties' hain jinka naam phone mein 'Airtel Customer Care' ke naam se save hai. Ladaai hone par silent treatment aur 2019 ke screenshots ka arsenal deploy karte hain!",
      punchline: "Caution: Inke phone ka Wi-Fi hotspot connect karoge toh 3 OTP aayenge!",
    },
    {
      title: "Toxic Pro Max With Aesthetic Filters 🐍",
      desc: "Shakal angel jaisi par harkatein Game of Thrones ke villains jaisi! Ek minute mein 'You are my world' aur agle minute mein Instagram pe soft-launching another 'favorite human'!",
      punchline: "Prescription: Ek bottle Gangajal se phone dhulwao aur block list update karo!",
    },
  ],
  moderate: [
    {
      title: "Yellow Signal With High Drama ⚠️",
      desc: "Kuch ajeeb harkatein hain (like achanak 3 ghante gayab hona ya story se tumhein hide karna), par momos aur dairy milk khila ke theek kiya ja sakta hai. High maintenance par manageable!",
      punchline: "Advice: Thoda GPS tracking aur regular password audit mandatory hai!",
    },
    {
      title: "Mood Swing Rollercoaster 🎢",
      desc: "Inke mood ka weather forecast IMD wale bhi nahi bata sakte. Subah pyaar ki barsaat, dopahar mein kalesh, aur shaam ko 'Pata nahi yaar main aisi kyu hoon'!",
      punchline: "Survival Tip: Fridge mein hamesha chocolate aur backup patience ready rakhein.",
    },
  ],
  safe: [
    {
      title: "Pure Green Forest (Devdoot) 🌲💚",
      desc: "Itne green flag hain ki lagta hai bhagwan ne direct heaven se special delivery bheji hai! 30 second mein reply, bill 50-50 split, aur phone screen bina lock ke table pe!",
      punchline: "Recommendation: Turant pandit ji ko bulao aur rishta pakka karo, aisi prajati extinct ho chuki hai!",
    },
    {
      title: "Rare Kohinoor Diamond 💎",
      desc: "Zero manipulation, 100% honesty aur ladaai hone par direct baat karke sort out karne wale devta/devi! Inko sambhal ke rakho dost, lottery lag chuki hai tumhari.",
      punchline: "Verdict: Inki nazar utaro aur Mummy ko bio-data forward kar do!",
    },
  ],
};

// ==========================================
// TOOL 3: Ex Yaad Aa Rahi Hai Meter 💔
// ==========================================

export const EX_YAAD_QUESTIONS = [
  {
    id: "ey1",
    question: "Raat ko 2:00 AM phone / Spotify pe kya chal raha hota hai? 🎧",
    hint: "Midnight thoughts and playlist check",
    options: [
      { text: "Tech podcasts ya comedy videos dekh ke mast so jata hoon", score: 5, tag: "healed" },
      { text: "Lofi chill beats to sleep peacefully", score: 25, tag: "neutral" },
      { text: "Arijit Singh, Atif Aslam & B Praak unreleased sad versions", score: 75, tag: "devdas" },
      { text: "'Hamari Adhuri Kahani' loop pe chalate hue rona 😭", score: 95, tag: "kabir_singh" },
    ],
  },
  {
    id: "ey2",
    question: "Unka WhatsApp ya Instagram profile kitni baar check hota hai? 🕵️",
    hint: "Digital stalking surveillance",
    options: [
      { text: "Pata bhi nahi wo zinda hain ya mars pe chale gaye 🙅", score: 5, tag: "moved_on" },
      { text: "Mahine mein ek baar agar explore page pe dikh jaye", score: 25, tag: "casual" },
      { text: "Daily morning attendance — DP badli kya? Bio kiske liye hai?", score: 75, tag: "stalker" },
      { text: "Friend ke fake account se daily new followers aur likes track karna 💀", score: 95, tag: "cid" },
    ],
  },
  {
    id: "ey3",
    question: "Agar abhi unka message aaye 'Hey, can we talk?', toh kya reaction hoga? 📱",
    hint: "Instant reaction test",
    options: [
      { text: "Direct Ignore & Mark as Spam / Block list update 🗿", score: 5, tag: "chad" },
      { text: "Seen karke agle din casual reply karunga 😎", score: 25, tag: "controlled" },
      { text: "3 second mein reply: 'I was waiting for your text!' 🥺", score: 75, tag: "hopeless" },
      { text: "Rote hue mummy ko bolunga pandit ji se shaadi ka muhurat nikalo 😭", score: 95, tag: "delusional" },
    ],
  },
];

export const EX_YAAD_DIAGNOSES = {
  devdas: [
    {
      title: "Devdas Pro Max With Jio Data 🍺",
      desc: "Bhai moving-on status: 4%! Unki DP badalna tumhare liye share market ka crash ban chuka hai. Raat ko 2:30 AM Arijit Singh ke sad songs loop pe chala ke blank ceiling ko ghoorna band karo!",
      punchline: "Prescription: Ek plate spicy schezwan momo khao aur sad playlist turant delete karo!",
    },
    {
      title: "Unpaid Digital Security Guard 🕵️💔",
      desc: "Unhone aage badh ke naye relationships bana liye, naya career shuru kar diya, aur tum abhi bhi fake account se unke follower count ki daily excel sheet maintain kar rahe ho!",
      punchline: "Reality Check: Unko tumhara naam tak yaad nahi hai bhai, thoda self-respect laao!",
    },
    {
      title: "Nostalgia Ka Chronic Mareez 📻",
      desc: "2021 ke birthday text ka screenshot zoom karke dekh rahe ho ki unhone heart emoji yellow wala kyu bheja tha red wala kyu nahi! High-level emotional self-harm chal raha hai.",
      punchline: "Advice: Phone ko doosre kamre mein rakh ke so jao dost!",
    },
  ],
  relapse: [
    {
      title: "Daytime Healed, Night-time Devdas ⚠️",
      desc: "Din mein lagta hai tum Gautam Buddha ban chuke ho, par jaise hi raat ke 1:45 baje lights off hoti hain, flashback ka projector shuru ho jata hai. Relapse hazard 85%!",
      punchline: "Advice: Raat ko phone flight mode pe daal ke so jao, tabahi se bachoge.",
    },
    {
      title: "Fragile Recovery Mode 🩹",
      desc: "Move on toh ho chuke ho, par galti se cafe mein unki pasandida cold coffee ka smell aa jaye toh halki si aah nikal jaati hai. Thoda aur sabr chahiye!",
      punchline: "Verdict: 14 din aur gym jao, trauma evaporate ho jayega.",
    },
  ],
  healed: [
    {
      title: "Freedom Fighter (Completely Immune) 🦅",
      desc: "Kamaal kar diya dost! Ex ki yaad toh door, agar wo road pe saamne aa ke 'Hi' bhi bole toh tum 'Excuse me bhaiya/didi' bol ke momo khane nikal jaoge. Supreme respect!",
      punchline: "Prescription: Squad ko party do, tum officially toxic matrix se azaad ho chuke ho!",
    },
    {
      title: "Cold-Blooded Sigma Chad 🗿",
      desc: "Block list se bhi nikaal diya kyunki fark hi nahi padta! Zero stalking, zero sad songs, sirf career, gym aur sukoon ki neend. King behavior!",
      punchline: "Status: Unstoppable Growth & Zero Nostalgia.",
    },
  ],
};

// ==========================================
// TOOL 4: Group Chat Roles 😂
// ==========================================

export const CHAT_ROLES_POOL = [
  {
    role: "Plan Cancel CEO 🏖️",
    badge: "Executive Flaker",
    description: "Goa ticket book hone se 10 min pehle 'Bhai papa gussa hain' bolne wala professional saanp. Iske ghar wale kabhi mana nahi karte, yeh khud bahana banata hai!",
    color: "from-red-500 to-rose-600",
  },
  {
    role: "Seen-Zone Terrorist 👁️",
    badge: "Blue Tick Mafioso",
    description: "Message padhega 2 second mein, par reply aane mein agla Kumbh mela lag jayega. Emergency mein bhi sirf reaction thumbs-up dega!",
    color: "from-blue-500 to-indigo-600",
  },
  {
    role: "Gossip CBI Director 🕵️",
    badge: "Desi Investigation Head",
    description: "Pura mohalla, college aur office kiske sath cafe mein baitha tha, iske paas unverified 4K proof aur screenshot backup ready rehta hai.",
    color: "from-purple-500 to-pink-600",
  },
  {
    role: "Splitwise Ka Defaulter 💸",
    badge: "Official Sponsor of Excuses",
    description: "Bill aate hi washroom break leta hai aur baad mein 'Bhai tune kitna bola tha?' pooch ke philosophical ban jata hai. Forever unpaid creditor!",
    color: "from-emerald-500 to-teal-600",
  },
  {
    role: "Forward University Dean 🗞️",
    badge: "WhatsApp Gold Medalist",
    description: "Subah 5:15 AM 'Om Surya Devay Namah' aur 100 gulab ke phool ke images bhejta hai. 'UNESCO ne Indian train ko best bola' ka blind believer.",
    color: "from-amber-500 to-yellow-600",
  },
  {
    role: "Voice Note Podcaster 🎙️",
    badge: "Audio Terrorism Expert",
    description: "Typing aati hi nahi! Har baat ke liye 4 minute 38 second ka audio note bhejega jisme 4 minute sirf pressure cooker ki seetee aur gaadiyon ke horn sunte hain.",
    color: "from-violet-500 to-purple-600",
  },
  {
    role: "Sticker Spammer (Zero Braincells) 🤪",
    badge: "Digital Joker",
    description: "Tum breakup ka dukh share kar rahe ho ya exam fail hue ho, ye Babu Bhaiya aur Rajpal Yadav ka sticker pel ke gayab ho jayega. No situation is sacred!",
    color: "from-pink-500 to-rose-600",
  },
  {
    role: "Ghost Member (Free Food Sensor) 👻",
    badge: "Silent Food Parasite",
    description: "Poore saal mute rehta hai, lekin jaise hi 'Bhai free biryani party hai' likho, 0.2 second mein 'Location bhej' likhega.",
    color: "from-slate-500 to-gray-700",
  },
  {
    role: "Grammar Police & Typo Hunter 🤓",
    badge: "Chief Correction Officer",
    description: "Tum emotional break-up note likh rahe ho, ye 'your' aur 'you're' ka difference correct karega. Isko squad mein koi pasand nahi karta par sab jhelte hain.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    role: "Bakchod Supreme & Kalesh Head 👑",
    badge: "Chaos Coordinator",
    description: "Group ke dange karwane ka master! Do logon ke beech purani baat chhed ke popcorn kha ke spectator mode mein baithta hai.",
    color: "from-orange-500 to-amber-600",
  },
  {
    role: "Midnight Emotional Philosopher 🍷",
    badge: "2:00 AM Poet",
    description: "Raat ke 2:15 AM group pe 'Tum sab mere sachhe dost ho yaar, I love you all' likhega, aur subah hote hi sharam ke maare 'Delete for Everyone' karega.",
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    role: "Plan Maker, Never Goes 🗺️",
    badge: "Excel Itinerary Specialist",
    description: "Puri trip ka Excel sheet banayega, hotel list nikalega, budget calculate karega, aur trip ke din subah 6 baje phone switch off karke mast soyega.",
    color: "from-teal-500 to-emerald-600",
  },
  {
    role: "Treat Ka Chronic Bhikhari 🍕",
    badge: "Free Loader Elite",
    description: "Kiske birthday mein 4 mahine bache hain uska countdown chala ke 'Bhai treat kab de raha hai?' poochne wala. Khud kabhi ₹5 ki chewing gum nahi khilayi!",
    color: "from-lime-500 to-green-600",
  },
  {
    role: "Screenshot Blackmailer 📑",
    badge: "Vault Administrator",
    description: "Tumne 2018 mein jo ajeeb si photo bheji thi, wo isne vault folder mein rakhi hai leverage ke liye. Jab ladaai hogi toh drop karega!",
    color: "from-sky-500 to-blue-600",
  },
  {
    role: "Tapri Geopolitics Expert 🧠",
    badge: "Berozgaar Chanakya",
    description: "Khud 3 backlogs leke baitha hai, par group pe Russia-Ukraine crisis aur Elon Musk ke decisions pe 1,000 words ka lecture jhaadega.",
    color: "from-rose-500 to-red-600",
  },
];

// ==========================================
// TOOL 5: Shaadi Market Value 💍
// ==========================================

export const SHAADI_QUESTIONS = [
  {
    id: "sm1",
    label: "Aapki Cooking Skills ka kya level hai?",
    options: [
      { text: "Maggi banana aata hai (wo bhi kabhi geeli, kabhi jali)", score: 15 },
      { text: "Chai, toast aur Swiggy track karne ki PhD", score: 25 },
      { text: "Daal-Chawal, Sabzi aur basic desi khana", score: 60 },
      { text: "Sanjeev Kapoor level MasterChef (Biryani to Pasta)", score: 95 },
    ],
  },
  {
    id: "sm2",
    label: "Weekend pe sabse zyada kya karte ho?",
    options: [
      { text: "Kumbhkaran jaisi 16 ghante ki neend", score: 20 },
      { text: "Cafe hopping aur Instagram aesthetic reels banana", score: 40 },
      { text: "Ghar ki safai, mandir darshan aur mummy ke sath gappe", score: 85 },
      { text: "Side hustle, Crypto portfolio monitor aur LinkedIn networking", score: 70 },
    ],
  },
  {
    id: "sm3",
    label: "Sasuraal / In-Laws tolerance power kitni hai?",
    options: [
      { text: "Ek sarcastic comment sunte hi WW3 shuru", score: 10 },
      { text: "Smile karke andar hi andar revenge plan karna", score: 50 },
      { text: "Sanskaari mode on: 'Ji Mummyji, Bilkul Papaji'", score: 90 },
      { text: "Separate flat pehle se booked hai, no interference policy", score: 75 },
    ],
  },
  {
    id: "sm4",
    label: "Chai vs Coffee pe stand kya hai?",
    options: [
      { text: "Tapri ki Adrak Chai is pure emotion", score: 80 },
      { text: "Iced Latte with Almond Milk (₹450 daily kharcha)", score: 45 },
      { text: "Pani peeta hoon bas (Economical Rishta)", score: 65 },
      { text: "Kadha peene wale sanskari prani", score: 85 },
    ],
  },
];

export const SHAADI_VALUATIONS = [
  {
    value: "₹4.5 Crore Duas + 1 Platonic Samosa 🥟",
    title: "Sanskaari Disruptor (High Demand) 🕉️",
    desc: "Expectations international, cooking skills Maggi tak! Subah uthne ka koi guarantee nahi hai, par dil saaf hai, Netflix password shared hai, aur sasuraal ke kalesh mein mute button dabana aata hai.",
    punchline: "Special Feature: Fufaji ke naraz hone par instant Thums Up serve karne ki ninja technique!",
  },
  {
    value: "Priceless (Zero Warranty, Maximum Sleep) 🛌",
    title: "Kumbhkaran Rishta Edition 💤",
    desc: "Shaadi ke baad inko disturb mat karna jab tak subah ki chai aur biscuit ready na ho. Peaceful partner, zero interference in household politics, bas 14 ghante neend chahiye!",
    punchline: "Matrimonial Clause: Weekend pe uthana strictly non-bailable offense maana jayega.",
  },
  {
    value: "₹10 Crore Duas + Unlimited Paneer Tikka 🍳",
    title: "MasterChef Sanskari Gold Standard 👑",
    desc: "Khana itna lajawab banate hain ki sasuraal wale roz shaam ko dinner table pe aarti utarenge. Biodata certified A+++ by Sharma Uncle & Colony Committee!",
    punchline: "Verdict: Inka rishta pakka karne ke liye relatives line laga ke token le rahe hain.",
  },
  {
    value: "₹250 Ka Shagun Lifafa + 12 Unanswered Photos ✉️",
    title: "Budget Clearance Section 🏷️",
    desc: "Swiggy ke bina kitchen mein paani ka glass nahi milta. Ladaai hone par 3 din silent treatment aur WhatsApp bio badalna inka signature move hai!",
    punchline: "Warranty Status: Return or exchange policy strictly not applicable.",
  },
];

// ==========================================
// TOOL 6: Aukaat Checker 💸
// ==========================================

export const AUKAAT_QUESTIONS = [
  {
    id: "ac1",
    question: "Mahine ke aakhri hafte mein bank balance ka kya nazara hota hai? 🏦",
    options: [
      { text: "₹47.50 (Google Pay scratch card se umeed)", score: 10, label: "Struggle Pro Max" },
      { text: "₹2,000 - ₹5,000 (Momo aur tapri chai secure hai)", score: 35, label: "Survivable" },
      { text: "₹20,000+ (Savings account mein disciplined dhan)", score: 75, label: "Middle class king" },
      { text: "Mutual Fund, FD, Stocks sab green (Ambani's distant relative)", score: 95, label: "Crorepati in making" },
    ],
  },
  {
    id: "ac2",
    question: "Swiggy / Zomato pe food order karte time sabse pehla protocol? 🍕",
    options: [
      { text: "Cart mein items daal ke delivery charge dekh ke cancel karna", score: 10, label: "Aukaat realisation" },
      { text: "Coupon code 'TRYNEW' ya ₹120 OFF dhoondhna mandatory", score: 35, label: "Discount Hunter" },
      { text: "Rating 4.5+ aur delivery under 30 mins (Comfort first)", score: 70, label: "Sensible" },
      { text: "Gourmet Section & Artisan Cafe desserts bina price dekhe", score: 95, label: "Kothi Bangle Wala" },
    ],
  },
  {
    id: "ac3",
    question: "Goa trip ka plan bante hi aapka sabse pehla reaction kya hota hai? 🏖️",
    options: [
      { text: "'Haan haan chalte hain' (Dil mein pata hai aukaat colony park tak hai)", score: 10, label: "Dreamer" },
      { text: "'Bhai sleeper train mein chalte hain aur hostel mein 6 log rukenge'", score: 35, label: "Budget Backpacker" },
      { text: "'Flight tickets book kar li hain, 4-star resort kaisa rahega?'", score: 75, label: "Middle Class Hero" },
      { text: "'Private yacht book kar raha hoon, SoBo / South Delhi crowd only'", score: 95, label: "South Delhi / SoBo vibe" },
    ],
  },
];

export const AUKAAT_DIAGNOSES = {
  broke: [
    {
      title: "Living on Dua & Cashback 🥣",
      desc: "Google Pay pe ₹3 ka cashback aane pe mini-celebration! Swiggy cart mein 40 minute tak butter chicken aur naan add karke ₹49 delivery fee dekhte hi app close karne ki aadat hai. Account balance dekh ke ATM machine bhi sympathy mein extra slip nikaal deti hai!",
      punchline: "Financial Prescription: Agle 14 din Parle-G ko paani mein duba ke khao, financial moksha wahin milega!",
    },
    {
      title: "Katora King Certified Pro Max 🪦",
      desc: "Dost ke birthday pe 'Mera aashirwad tere sath hai' bol ke nikal jata hai. Mahine ke aakhri 10 din Splitwise pe 'Ignore' button dabana aapki primary daily activity ban chuki hai!",
      punchline: "Aukaat Status: Minus ₹420 (Dost ki bike ka petrol udhaar).",
    },
  ],
  emi: [
    {
      title: "EMI Wala Ambani (Pro Max Broke) 💳",
      desc: "Starbucks ki ₹450 wali coffee haath mein, iPhone latest 24 months EMI pe, aur bank account mein exactly ₹37.50 bache hain! Dikhawa 100%, savings -500%. Card swipe karte waqt dil mein Hanuman Chalisa chalti hai!",
      punchline: "Verdict: Tapri pe wapas aao dost, cutting chai aur biscuit hi tumhara sachha aukaat hai!",
    },
  ],
  middle: [
    {
      title: "Middle Class Warren Buffett 📈",
      desc: "Savings account disciplined, discount coupons ke ustaad, bina 50% off ke socks bhi nahi kharidte! Paisa bachana aapke DNA mein hai aur colony ke sabse sensible citizen award goes to you.",
      punchline: "Verdict: Fixed Deposit ka aashirwad hamesha aapke sath rahega!",
    },
  ],
  rich: [
    {
      title: "Kothi Bangle Ka Shahzada / Shahzadi 🏰",
      desc: "Bina price tag dekhe shopping cart swipe! Splitwise download bhi nahi kiya kyunki bill hamesha tum hi bhar dete ho. Squad ke official sponsor aur financial savior!",
      punchline: "Status: Ambani's distant spiritual relative confirmed.",
    },
  ],
};

// ==========================================
// TOOL 7: Fake Family WhatsApp Chat 👨‍👩‍👧‍👦
// ==========================================

export const FAMILY_CHAT_THEMES = [
  {
    id: "shaadi_pressure",
    title: "Shaadi Pressure & Rishta Bio-data 👰",
    subtitle: "Mummyji sends photo of Canada NRI with 50 acres",
    messages: [
      { sender: "Mummyji", text: "Beta ye bio-data dekho. Ladka Canada mein software engineer hai, 50 acre zameen hai aur bilkul shakahari hai! 🙏🌸", time: "10:14 AM" },
      { sender: "Me", text: "Mummy abhi meri umar hi kya hai, mujhe pehle career banana hai aur thoda explore karna hai...", time: "10:16 AM" },
      { sender: "Papaji", text: "Tumhare umar mein humare 2 bachhe the aur ghar ka loan chukta ho gaya tha. Abhi career ka gyaan mat do, chupchap photo dekho. 😾", time: "10:17 AM" },
      { sender: "Sharma Uncle", text: "Humare Ritesh ne toh 24 saal mein shaadi kar li. Abhi Google mein VP hai, roz subah 4 baje uth ke yoga karta hai.", time: "10:19 AM" },
      { sender: "Chintu (Brother)", text: "Didi/Bhaiya please shaadi kar lo jaldi, mujhe aapka bada wala room gaming setup ke liye chahiye! 😂🎮", time: "10:20 AM" },
      { sender: "Mummyji", text: "Pandit ji ne bola hai agle 2 mahine mein kundli nahi baithi toh 14 saal tak manglik dosh rahega!! Jaldi haan bolo!", time: "10:22 AM" },
      { sender: "Me", text: "Main Himalaya sanyaas lene ja raha hoon... Bye family. 🏃‍♂️💨", time: "10:23 AM" },
    ],
  },
  {
    id: "cricket_chaos",
    title: "India vs Pak World Cup Match Drama 🏏",
    subtitle: "Papaji coaches Team India from the sofa",
    messages: [
      { sender: "Papaji", text: "Maine pehle hi kaha tha Rohit ko toss jeet ke batting leni chahiye thi! Inko cricket khelna humse seekhna chahiye! 😤📺", time: "7:45 PM" },
      { sender: "Chintu (Brother)", text: "Papaji last ball pe 6 maara usne, calm down pura mohalla aawaaz sun raha hai!! 🇮🇳🔥", time: "7:46 PM" },
      { sender: "Mummyji", text: "Sab log TV ki aawaaz kam karo, main mandir mein agarbatti jala ke aayi hoon jeet pakki hai. Kisi ne hilla toh dekhna! 🪔🙏", time: "7:48 PM" },
      { sender: "Sharma Uncle", text: "Dhoni hota toh ye over 18th mein hi nipat jata. Modern players mein bas baal banane aur Instagram reel ka jazba hai.", time: "7:50 PM" },
      { sender: "Me", text: "MATCH JEET GAYE!! INDIAAA INDIAAA! 🥳🇮🇳🎉", time: "7:55 PM" },
      { sender: "Papaji", text: "Jeet toh gaye par 19th over bekaar phenka tha. Kal subah sab 5:30 AM uthenge running ke liye.", time: "7:56 PM" },
    ],
  },
  {
    id: "good_morning_spam",
    title: "6:00 AM Suvichar & WhatsApp University 🌹",
    subtitle: "Curing cancer with lemon juice & 100 rose bouquets",
    messages: [
      { sender: "Papaji", text: "🌅 ॐ नमः शिवाय! प्रातः कालीन वंदन! आपका दिन मंगलमय हो! 🌺🌸🌼 (Forwarded many times)", time: "5:58 AM" },
      { sender: "Sharma Uncle", text: "🚨 ALERT: NASA ne declare kiya hai ki mobile ko raat ko takiye ke paas rakhne se dimag mein WiFi radiation jam jata hai! Forward to 21 groups! ⚠️📱", time: "6:15 AM" },
      { sender: "Mummyji", text: "Beta ye lemon water aur adrak garam karke peena, WhatsApp pe doctor ne bataya hai 108 bimariyan theek ho jaati hain. 🍋☕", time: "6:45 AM" },
      { sender: "Me", text: "Uncle wo NASA wali news 2008 ka fake forward hai, Fact check kar liya karo please...", time: "8:30 AM" },
      { sender: "Papaji", text: "Bado se behas mat karo! Phone chalane ke alawa kuch kaam hai? Chup chaap yoga karo. 😡", time: "8:32 AM" },
      { sender: "Chintu (Brother)", text: "Good morning mummyji, ₹200 GPay kardo assignment print karwana hai college ka 🙏😂", time: "8:35 AM" },
    ],
  },
  {
    id: "goa_trip_denial",
    title: "Goa Trip Permission Request 🏖️",
    subtitle: "Rejected faster than a failed UPI transaction",
    messages: [
      { sender: "Me", text: "Mummy, college ke friends ke sath 3 din ke educational industry study tour pe Goa ja rahe hain...", time: "2:15 PM" },
      { sender: "Mummyji", text: "Goa mein kaun si study hoti hai beta? Wahan toh log bina kapdon ke ghoomte hain! Ram Ram Ram! 🙈🌴", time: "2:16 PM" },
      { sender: "Papaji", text: "Kitna kharcha aayega iss 'study tour' ka?", time: "2:18 PM" },
      { sender: "Me", text: "Bas ₹4,000 bhaiya ke dost ke hotel mein 50% discount hai...", time: "2:19 PM" },
      { sender: "Papaji", text: "₹4,000 mein ghar ka pure mahine ka ration aata hai. Colony park mein ghoom lo, wahan bhi nariyal ke ped hain. Permission DENIED.", time: "2:20 PM" },
      { sender: "Chintu (Brother)", text: "Hahaha maine pehle hi bola tha! Mummy mujhe ₹500 de do main chup rahunga 🤫🤐", time: "2:21 PM" },
      { sender: "Me", text: "Mere dushman mere ghar mein hi paida hue hain... 💀", time: "2:22 PM" },
    ],
  },
  {
    id: "sharma_ji_ctc",
    title: "Sharma Ji Ke Bete Ka 85 LPA Package 💼",
    subtitle: "Dinner table emotional damage session",
    messages: [
      { sender: "Sharma Uncle", text: "Aap sabko batate hue khushi ho rahi hai ki humare Ritesh ko US se ₹85 Lakh CTC ka offer mila hai. Mithai ghar bhijwa rahe hain. 🙏🍰", time: "8:00 PM" },
      { sender: "Papaji", text: "Badhai ho Sharma ji! Bahut honhaar bachha hai aapka. (Turns to Me) Aur ek tum ho jo ₹25 ki cutting chai pe discuss kar rahe ho.", time: "8:05 PM" },
      { sender: "Me", text: "Papaji uska CTC paper pe hai, in-hand tax kat ke aadha aata hai...", time: "8:07 PM" },
      { sender: "Papaji", text: "Uska aadha bhi tumhare poore saal ke stipend se 4 guna zyada hai! Muh band rakho aur padhai karo.", time: "8:08 PM" },
      { sender: "Mummyji", text: "Beta Ritesh ko bolna humare Chintu ko bhi referral de de company mein. 🌸", time: "8:10 PM" },
      { sender: "Chintu (Brother)", text: "Mera referral chhod do, main toh gaming YouTuber banunga! 🎮🔥", time: "8:12 PM" },
    ],
  },
  {
    id: "late_night_entry",
    title: "11:05 PM Home Entry Interrogation 🚪",
    subtitle: "CID crime investigation at the front door",
    messages: [
      { sender: "Papaji", text: "Ghar aane ka time 10:00 baje tha. Abhi 11:05 PM ho raha hai. Darwaza lock hai. Kahan ho? 😾🔒", time: "11:05 PM" },
      { sender: "Me", text: "Papaji bas colony ke bahar auto se utra hoon, traffic bohot tha...", time: "11:06 PM" },
      { sender: "Mummyji", text: "Traffic? Raat ko 11 baje kaun sa traffic hota hai? Kiske sath ghoom rahe the sach batao!", time: "11:07 PM" },
      { sender: "Chintu (Brother)", text: "Mummy main balcony se dekh raha hoon, Scooty pe koi dost drop karke bhaag gaya! 🛵👀", time: "11:08 PM" },
      { sender: "Me", text: "Chintu tu kal subah college mein mil tujhe batata hoon... 😡", time: "11:09 PM" },
      { sender: "Papaji", text: "Chupchap bell bajao. Aaj se night out aur parties permanently ban. Agle hafte subah 6 baje se morning walk shuru.", time: "11:10 PM" },
    ],
  },
];

// ==========================================
// TOOL 8: Asli Personality Test 🧠
// ==========================================

export const PERSONALITY_QUESTIONS = [
  {
    id: "pt1",
    question: "Metro ya Bus mein seat dekhte hi aapka survival instinct kya karta hai? 🚇",
    options: [
      { text: "Roomal/Bag phenk ke 10 meter door se seat claim karna", type: "Certified Bakchod", score: 6 },
      { text: "Aaram se khade rehna, seat mangne mein sharam aati hai", type: "Overthinking Minister", score: 1 },
      { text: "Baithe hue insaan ko aisi guilt wali nazron se ghoorna ki wo khud uth jaye", type: "Drama Department Head", score: 2 },
      { text: "Gate ke kone mein earphone laga ke duniya bhool jana", type: "Bare Minimum Genius", score: 3 },
    ],
  },
  {
    id: "pt2",
    question: "Jab restaurant mein bill aata hai, toh aapka immediate reaction? 🧾",
    options: [
      { text: "Turant calculator khol ke ₹2 ka GST split bhi barabar karna", type: "Secret Mastermind", score: 5 },
      { text: "Washroom nikal jana ya fake call ka natak karna", type: "Certified Bakchod", score: 6 },
      { text: "'Bhai tu de de main ghar jaake Google Pay karta hoon' (Kabhi nahi karta)", type: "Professional Procrastinator", score: 4 },
      { text: "Chupchap 100% pay karke agle 2 hafte maggi pe guzarna", type: "Overthinking Minister", score: 1 },
    ],
  },
  {
    id: "pt3",
    question: "Shaadi mein food buffet pe aapki kya strategy hoti hai? 🍛",
    options: [
      { text: "Pehle 20 minute shorba aur chaat, phir paneer tikka raid", type: "Secret Mastermind", score: 5 },
      { text: "Dulhe se milne se pehle seedha plate utha ke tut padna", type: "Certified Bakchod", score: 6 },
      { text: "Ice cream counter pe 4 baar alag shakal bana ke jana", type: "Bare Minimum Genius", score: 3 },
      { text: "Sharam ke maare sirf 1 papad aur salad leke side mein khade hona", type: "Overthinking Minister", score: 1 },
    ],
  },
];

export const PERSONALITY_RESULTS: Record<string, { title: string; badge: string; quote: string; desc: string; strengths: string[]; weaknesses: string[]; desiQuote: string }> = {
  "Overthinking Minister": {
    title: "Overthinking Minister 🧠",
    badge: "Supreme Brain Burner",
    quote: "Usne 'Ok' ki jagah sirf 'K' kyu likha? Is our 7-year friendship over?",
    desc: "Aapke dimaag mein 24 ghante 40 browser tabs khuli rehti hain, aur sab mein heavy buffering chal rahi hai! 2017 ke school argument ka savage comeback raat ko 3:15 AM sochte hue rona aapki national hobby hai.",
    strengths: ["CBI level detail analysis", "Friend ke har problem ka free psychological breakdown", "Worst-case scenarios pehle se ready"],
    weaknesses: ["Restaurant menu decide karne mein 45 minute", "Unsent messages folder overfilled", "Neend gayab over trivial punctuation marks"],
    desiQuote: "Chinta chita samaan hai, par overthinking meri identity hai!",
  },
  "Drama Department Head": {
    title: "Drama Department Head 🎭",
    badge: "Kyunki Saas Bhi Kabhi Bahu Thi Director",
    quote: "Life is not cinema, but I am definitely the main character with 3 camera angle zooms!",
    desc: "Aapke jeevan mein agar din mein ek baar melodrama aur existential crisis na ho toh khana hazam nahi hota. Minor inconvenience aate hi aapka background music Arijit Singh se KGF mein switch ho jata hai!",
    strengths: ["Oscar-level storytelling skills", "Emotional intensity 100%", "Party mein instant attention grabber"],
    weaknesses: ["Chhoti si baat ka babool banana", "Text read na hone pe 10 missed calls", "Oscar speech ready for small awards"],
    desiQuote: "Zindagi bewafa hai, par meri acting 100% genuine hai!",
  },
  "Bare Minimum Genius": {
    title: "Bare Minimum Genius 🛋️",
    badge: "Efficiency Ka Ustaad",
    quote: "Kaam utna hi karo jisme daant na pade aur nikaala na jaye.",
    desc: "Aapne energy conservation ki aisi mastery ki hai ki NASA ko aapse tips leni chahiye. Minimum effort mein maximum survivability nikalna aapka superpower hai. Couch se hilna strictly anti-philosophy hai!",
    strengths: ["Zero stress level", "Shortcuts and hacks ke encyclopedia", "Crisis mein calm rehne ki natural art"],
    weaknesses: ["Bed se uthne mein 2 ghante", "Reply length = 'k' ya 'haan'", "Ambition mode on low battery"],
    desiQuote: "Aaram haram nahi, aaram hi param satya hai!",
  },
  "Professional Procrastinator": {
    title: "Professional Procrastinator ⏳",
    badge: "Kal Kare So Parso Chairman",
    quote: "Deadlines are just suggestions created by people with weak imagination.",
    desc: "Aapka 'Kal se pakka shuru karunga' ek aisi timeless melody hai jo pichhle 5 saal se baj rahi hai. Adrenaline rush tabhi aata hai jab submit button dabane mein exactly 14 second bache hon!",
    strengths: ["Last minute god-level clutch performance", "Creative excuses generator", "Pressure mein unexpected brilliance"],
    weaknesses: ["Calendar reminders ignore karna", "Gym shuru hona agle janam", "Pending to-do list length > Eiffel Tower"],
    desiQuote: "Aaj ka kaam kal pe chhod do, aur kal ka parso pe!",
  },
  "Secret Mastermind": {
    title: "Secret Mastermind 🕵️",
    badge: "Shadow Politician",
    quote: "Main chup hoon iska matlab ye nahi ki mujhe sab pata nahi hai.",
    desc: "Aap group ke Chanakya hain. Sabko lagta hai aap bas innocent smile kar rahe hain, par aapke dimaag mein har friend ki aukaat, udhaar aur secrets ka cloud backup saved hai. Never gets caught!",
    strengths: ["Strategic diplomacy", "Never gets caught in scams", "Always 3 steps ahead in the game"],
    weaknesses: ["Trust issues with everyone", "Revenge plans kept in Excel sheet", "Calculated smile instead of pure laughter"],
    desiQuote: "Chup chaap shikaar karte hain, shor nahi machate!",
  },
  "Certified Bakchod": {
    title: "Certified Bakchod 🚀",
    badge: "Chaos Ambassador",
    quote: "Bhai kuch toofani karte hain... police aayegi toh dekha jayega!",
    desc: "Aap jahan jate hain wahan hasi, kalesh aur hungama compulsory hai! Aapke sath baithne pe shanti 5 minute se zyada nahi tik sakti. You are the beating heart of the squad, filter zero!",
    strengths: ["Instant mood booster", "Fearless personality", "Unlimited supply of desi one-liners"],
    weaknesses: ["Serious situation mein hasi aana", "Friend ke purse se paise nikaal ke treat mangna", "Filter zero"],
    desiQuote: "Jaan jaye par bakchodi na jaye!",
  },
};

// ==========================================
// TOOL 9: Udhaar Recovery Notice 📜
// ==========================================

export const UDHAAR_LINE_ITEMS = [
  { item: "Mool Rakam (Original Udhaar Amount)", code: "RBB-001" },
  { item: "Friendship Maintenance Cess @ 420%", code: "FMC-420" },
  { item: "'Bhai kal pakka deta hoon' Jhooth Penalty", code: "BJP-99" },
  { item: "Tapri Chai & Samosa Compound Interest", code: "TCI-108" },
  { item: "Call Seen Karke Ignore Karne Ka Mental Harassment Tax", code: "MHT-404" },
  { item: "Bouncer Bhejne Ka Travel Allowance", code: "BB-007" },
];

export const UDHAAR_PUNCHLINES = [
  "Agar agle 10 minute mein Google Pay nahi kiya, toh group chat mein tumhari 10th class ki farewell wali photo upload ho jayegi!",
  "Reserve Bank of Bhaichara (RBB) ke Section 420 ke tahat tumhara dosti license cancel karne ki karyawahi shuru ki ja rahi hai!",
  "Tune jo ₹500 liya tha, usme Ambani ne 2 naye towers khade kar diye aur tera 'Kal deta hoon' abhi tak nahi aaya!",
  "Warning: Defaulter ki photo mohalle ke momo stall aur colony ke notice board par chipka di jayegi!",
];

// ==========================================
// TOOL 10: Shaadi Kalesh Predictor 🥁
// ==========================================

export const KALESH_QUESTIONS = [
  {
    id: "sk1",
    question: "Fufaji / Chachaji ke VIP aadar-satkaar ka kya status hai? 😾",
    options: [
      { text: "Special room with AC, kaju katli & dedicated attendant", score: 10 },
      { text: "Standard room, par sofa pe baithne ki frontline seat mil gayi", score: 35 },
      { text: "Unki Alto car ko parking mein thoda peeche khada kar diya", score: 80 },
      { text: "Baraat aate waqt unka naam stage se announce karna bhool gaye 💀", score: 95 },
    ],
  },
  {
    id: "sk2",
    question: "Menu mein Paneer aur Sweet Dish ka kya intezam hai? 🧀",
    options: [
      { text: "Unlimited Live Counters & 5 types of Paneer", score: 15 },
      { text: "Single Shahi Paneer counter with aggressive security guard", score: 75 },
      { text: "Rasgulla count per plate strictly monitored by relatives", score: 95 },
      { text: "9:30 PM pe halwai bol diya 'Bhaisaab paneer khatam ho gaya'", score: 99 },
    ],
  },
  {
    id: "sk3",
    question: "DJ Playlist aur Naagin Dance ka kya protocol hai? 🐍",
    options: [
      { text: "Sufi & Soft English acoustic songs only (Sanskari)", score: 15 },
      { text: "Commercial Bollywood hits strictly until 10:00 PM", score: 45 },
      { text: "Punjabi dhol + Rumal mooh mein daba ke compulsory Naagin dance", score: 85 },
      { text: "DJ wale babu se mic chheen ke chachaji singing & fight at 11:30 PM", score: 99 },
    ],
  },
];

export const KALESH_DIAGNOSES = {
  riot: [
    {
      title: "High Voltage Mohalla Riot Alert 💥🥁",
      desc: "Paneer khatam hote hi Fufaji ka ego 400% blast ho gaya! DJ wale bhaiya ko Chachaji ne stage se utha ke Naagin dance pe lagaya, aur car parking mein Alto vs Fortuner ki ladai tay hai!",
      punchline: "Kalesh Forecast: Bouncer bulane ki tayaari abhi se shuru kar do, plate-throwing ceremony pending hai!",
    },
    {
      title: "Fufaji Ego Meltdown Protocol 🚨",
      desc: "Baraat aate waqt Fufaji ko pehla haar nahi pehnaya gaya! Unhone shaadi chhod ke gaadi mein AC on karke baithne ka threaten kar diya hai. Rasgulla counter pe physical wrestling hone wali hai!",
      punchline: "Emergency Action: Do packet Kaju Katli aur chilled cold drink leke Fufaji ke aage hath jodo!",
    },
  ],
  moderate: [
    {
      title: "Moderate Desi Tamasha (Standard Indian Drama) 🍿",
      desc: "Thoda sa cold drink issue, thoda sa dulhe ke joota chupai mein 15 minute ki garma-garmi. Chachaji ne 2 peg ke baad mic pe unreleased geet gaana shuru kar diya hai!",
      punchline: "Kalesh Forecast: Mausiji ghar jaake poore parivaar ko call karke buffet ki burai karengi.",
    },
  ],
  calm: [
    {
      title: "Suspiciously Sanskaari Shanti 🕊️",
      desc: "Sab rishtedaar fake smile kar rahe hain, khana sabko mila. Lekin dhyan rakhna, shaant paani mein hi gehra kalesh chhupa hota hai! Parda girte hi gossips shuru hongi.",
      punchline: "Kalesh Forecast: Album banne ke baad photo angle pe kalesh hoga.",
    },
  ],
};

// ==========================================
// TOOLS 11-20 DATA, QUESTIONS & TEMPLATES
// ==========================================

// TOOL 11: Trip Cancellation CBI 🕵️‍♂️
export const TRIP_DESTINATIONS = [
  "Goa (Sun, Sand & 100% Fake Commitments)",
  "Manali (Snow & 'Bhai Thand Zyada Hai Bahana')",
  "Rishikesh (Rafting Dreams, Spiritual Excuses)",
  "Ladakh (Royal Enfield Fantasy, Scooty Reality)",
  "Kasol (Vibe dhundne gaye the, neend aayi)",
  "Lonavala / Khandala (Chikki kharid ke wapas aane ka plan)",
  "Pondicherry (French Colony Aesthetic Photoshoot)",
  "Udaipur (Royal Palace Budget Shocker)",
];

export const CBI_EXCUSES = [
  { id: "mummy_mana", label: "'Mummy ne achanak mana kar diya' (Candidate age: 26 years)", icon: "👵" },
  { id: "boss_emergency", label: "Boss ne Friday 6 PM ko urgent PPT de di", icon: "💼" },
  { id: "budget_issue", label: "Budget sunte hi bank account ka 404 error", icon: "💸" },
  { id: "fake_sick", label: "Trip se 2 ghante pehle achanak gala kharab aur bukhar", icon: "🤒" },
  { id: "seen_ghost", label: "Group pe ticket booking screenshot maangte hi silent", icon: "👻" },
  { id: "partner_nakhre", label: "Partner ne bola 'Mere bina jaoge toh seedha breakup'", icon: "💔" },
];

export const CBI_ROLES_POOL = [
  { role: "The Mastermind 🧠", desc: "Isne trip ka seed boya tha, itinerary banayi, aur pehla ticket cancel bhi isne hi karwaya!" },
  { role: "Last-Minute Saanp 🐍", desc: "Packing complete ka jhooth bolke bag pack hone se 10 min pehle drop out marne wala gaddar." },
  { role: "Budget Minister 💸", desc: "Har 4-star hotel ke aage 'Bhai tent mein rukte hain na ₹200 bachenge' bolne wala kanjoos." },
  { role: "The Innocent Victim 🥺", desc: "Isne kapde press kar liye the, leave approve karwa li thi, par baki sab ne dhokha de diya." },
  { role: "The Ghost Agent 👻", desc: "Group mein messages dekhta hai, par response tab dega jab sab log apne apne ghar wapas aa chuke hon." },
  { role: "Photographer Contractor 📸", desc: "Sirf camera phone ke liye invite hua tha, actual decision making se poori tarah anjaan." },
];

// TOOL 12: Reply Ka Bhikhari Meter ⏳
export const REPLY_WAIT_TIMES = [
  { time: "15-30 Minutes", label: "Halka sa anxiety attack, screen 14 baar on-off", score: 20 },
  { time: "2-4 Hours", label: "'Phone silent pe hoga shayad' (Self-delusion phase)", score: 45 },
  { time: "8-12 Hours", label: "Instagram pe 6 reels like ki, par chat pe dust jam rahi hai", score: 75 },
  { time: "24-48 Hours", label: "Chat ka digital antim-sanskaar karne ka samay", score: 92 },
  { time: "3+ Days", label: "'Network tower gir gaya hoga bro' (Extreme Copium)", score: 99 },
];

export const REPLY_MESSAGE_TYPES = [
  { type: "Casual Check-in", text: "'Aur bata, kya chal raha hai?'", score: 30 },
  { type: "Double Texting", text: "Two question marks ('??') bhej ke 30 second mein delete karna", score: 85 },
  { type: "Emotional Paragraph", text: "450 words ka retrospective essay on our connection", score: 95 },
  { type: "Meme Forward", text: "Relatable reel bhej ke reaction ka wait karna", score: 40 },
  { type: "Free Food Trap", text: "'Bhai treats meri taraf se free pizza party'", score: 10 },
];

// TOOL 13: Salary Aayi, Gayab Hui 💸
export const SALARY_BRACKETS = [
  { label: "₹15,000 - ₹30,000 (Student / Fresher Survival)", value: 25000 },
  { label: "₹30,000 - ₹60,000 (Middle Class Warrior)", value: 45000 },
  { label: "₹60,000 - ₹1,20,000 (Corporate Majdoor)", value: 90000 },
  { label: "₹1,20,000+ (Taxpayer with Tech CTC Illusion)", value: 150000 },
];

export const EXPENSE_SINKHOLES = [
  { id: "emi", label: "iPhone / Car / Personal Loan 24-Month EMI Trap", drain: 40, icon: "📱" },
  { id: "swiggy", label: "Late Night Swiggy Biryani, Momos & Desserts", drain: 20, icon: "🍕" },
  { id: "credit_card", label: "Credit Card Minimum Due (Forever Bondage)", drain: 25, icon: "💳" },
  { id: "cafe_coffee", label: "Starbucks & Aesthetic Artisanal Cafe Flexing", drain: 15, icon: "☕" },
  { id: "rent", label: "PG / Flat Rent + Brokerage Trauma", drain: 30, icon: "🏠" },
  { id: "impulse_shopping", label: "Myntra / Amazon Sale impulsiveness ('I need this aesthetic bottle')", drain: 20, icon: "🛍️" },
];

// TOOL 14: Kal Se Pakka Generator 🛋️
export const GOAL_OPTIONS = [
  { id: "gym", label: "Gym & 6-Pack Abs Transformation 💪", unit: "Days Postponed" },
  { id: "coding", label: "Daily LeetCode & FullStack Portfolio 💻", unit: "Github Streaks Broken" },
  { id: "upsc", label: "UPSC / Govt Exam Serious Prep 📚", unit: "Highlighters Dried" },
  { id: "wake_early", label: "Subah 6:00 AM Uthenge 🌅", unit: "Alarms Snoozed" },
  { id: "diet", label: "Diet Control & Sugar Free Life 🥗", unit: "Gulab Jamuns Sneaked" },
];

export const PROCRASTINATION_EXCUSES = [
  { id: "one_more_reel", label: "Pehle 1 reel dekh lu (turns into 3 hours of Russian circus clips)", score: 25 },
  { id: "monday_rule", label: "Aadha hafta nikal gaya, ab next Monday se fresh start", score: 35 },
  { id: "gear_preparation", label: "Shoes aur notebook aa gaye, ab auspicious muhurat ka wait", score: 20 },
  { id: "mood_off", label: "Dost ne call nahi uthaya, pura focus kharab ho gaya", score: 15 },
  { id: "weather_blame", label: "Mausam thoda cloudy hai, blanket se nikalna illegal hai", score: 25 },
];

// TOOL 15: Main Character Syndrome 🎬
export const MAIN_CHARACTER_QUESTIONS = [
  {
    id: "mc1",
    question: "Auto ya Cab mein baithke window se baarish dekhte waqt kya hota hai? 🌧️",
    options: [
      { text: "Sochta hoon fare kitna lagega (Normal citizen)", score: 10 },
      { text: "Earphones pe sad acoustic song lagake imaginary flashback shuru", score: 85 },
      { text: "Driver se traffic pe argue karta hoon", score: 25 },
      { text: "Camera dhundta hoon jo mujhe slow-motion mein shoot kar raha ho", score: 95 },
    ],
  },
  {
    id: "mc2",
    question: "Shower lete waqt dimaag mein kya scene play hota hai? 🚿",
    options: [
      { text: "Garam paani khatam hone ka tension", score: 10 },
      { text: "2019 mein school/college argument ka savage monologue", score: 85 },
      { text: "Grammy / Filmfare victory speech in front of shampoo bottles", score: 95 },
      { text: "Office meeting mein sabko silent karwane ka daydream", score: 75 },
    ],
  },
  {
    id: "mc3",
    question: "Corridor ya public place mein walk karte waqt kya feel aati hai? 🚶‍♂️",
    options: [
      { text: "Normal insaan jaisa walk karta hoon", score: 10 },
      { text: "KGF / Animal background music baj raha hai, slow-motion entry", score: 95 },
      { text: "Sab log secretly mujhe admire kar rahe hain", score: 85 },
      { text: "Kahi trip hoke gir na jau uska dhyan rakhta hoon", score: 20 },
    ],
  },
];

// TOOL 16: Food Delivery Detective 🍕
export const DELIVERY_DELAY_OPTIONS = [
  { label: "15-20 Mins ('Rider is on the way')", factor: 1.2 },
  { label: "35-45 Mins ('Rider took an interesting detour')", factor: 1.8 },
  { label: "60+ Mins ('Delivery partner entered a wormhole')", factor: 2.5 },
];

export const HUNGER_LEVELS = [
  { label: "Halka Snacks Mood 🍟", desc: "Sabr hai abhi" },
  { label: "Intense Bhookh 🍕", desc: "Plate aur katori leke darwaze pe khada hoon" },
  { label: "Cannibalistic Hangry Monster 🦖", desc: "Delivery bag ke sath rider ko bhi kha jaunga" },
];

export const FOOD_CRIME_LOGS = [
  "Rider accepted order, immediately parked at Sharma Ji ki tea stall for 14 minutes.",
  "GPS tracking shows delivery bike taking 4 clockwise loops around a random roundabout.",
  "Rider called asking 'Bhaiya landmark kya hai?' while currently 8 km in opposite direction.",
  "Delivery status changed to 'Order picked up', but rider's recorded speed is 2.5 km/h.",
  "Suspect entered your colony gate, then mysteriously disappeared into a 4th dimension.",
  "Delivery partner was spotted eating one of your French fries at the red light signal.",
];

// TOOL 17: Photo Kheench, Delete Kar 📸
export const PHOTO_FLAWS = [
  { id: "double_chin", label: "Double chin detected under 4K camera resolution", count: 42 },
  { id: "bad_light", label: "Lighting aisi thi jaise Aadhar card center ka photo ho", count: 35 },
  { id: "fake_smile", label: "Smile aisi aayi jaise kidnap hoke hostage video shoot ho rahi ho", count: 50 },
  { id: "photobomb", label: "Background mein anjaan uncle ji camera ghoor rahe the", count: 28 },
  { id: "hair_mess", label: "Hawa aate hi baal Maggi noodles ban gaye", count: 38 },
];

// TOOL 18: Fake Richness Certificate 💳
export const FAKE_RICH_HABITS = [
  { id: "starbucks_cup", label: "Starbucks ka cup 4 hafte tak table pe rakh ke normal filtered water refill", points: 25 },
  { id: "mall_sunglasses", label: "Air-conditioned shopping mall ke andar dark shades pehanna", points: 20 },
  { id: "car_photo", label: "Parking lot mein anjaan Audi/BMW ke bonnet ke aage casual pose", points: 30 },
  { id: "fake_accent", label: "Waiter se 'Can you like, fetch some warm water, ya?' bolna", points: 25 },
  { id: "credit_swipe", label: "Card swipe karke dil mein Gayatri Mantra padhna ki decline na ho", points: 35 },
  { id: "luxury_bag", label: "Zara / Gucci ka empty paper bag carry karke colony mein ghoomna", points: 30 },
];

// TOOL 19: Chai Pe Startup Founder 🚀
export const STARTUP_IDEAS = [
  "Uber for Tapri Chai & Sutta ☕",
  "AI-Powered Sanskaari Rishta Matchmaker 💍",
  "Blockchain Samosa Authentication Network 🥟",
  "Drone Delivery of Pan Masala to Red Lights 🏎️",
  "Tinder for Boring Family WhatsApp Groups 📱",
  "SaaS Platform for Managing Fufaji's Ego 😾",
  "Bhaichara as a Service (BaaS) for Udhaar Recovery 💸",
];

export const PRE_REVENUE_HABITS = [
  { id: "domain_logo", label: "Code ka ek word nahi likha, par ₹8,000 ka .ai domain book kar liya" },
  { id: "linkedin_stealth", label: "LinkedIn bio: 'Founder & CEO | Building in Stealth | Ex-Nothing'" },
  { id: "coffee_meetings", label: "Din mein 6 ghante Blue Tokai mein baith ke pitch deck dekhna" },
  { id: "ted_gestures", label: "Mirror ke saamne Steve Jobs wala black turtleneck pehen ke gyaan" },
  { id: "merch_first", label: "Company ka t-shirt, sticker aur hoodie print pehle, MVP baad mein" },
];

// TOOL 20: Treat Kaun Dega Roulette 🎲
export const TREAT_OCCASIONS = [
  "Sunday Biryani & Cold Drink Feast 🍗",
  "Evening Chai, Bun Maska & Samosa Tapri ☕",
  "Midnight Fast Food & Pizza Raid 🍕",
  "Random 'Aaj Mera Mood Hai' Treat 🍨",
  "Placement / Salary Credit Celebration Bounty 🎂",
];
