// Comprehensive data, questions, templates and logic for all 10 FullTimePass tools

// TOOL 1: Roast My Friend
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
];

export const ROAST_STYLES = [
  { id: "friendly", label: "Friendly 😄", description: "Halka-fulka mazak, dil pe nahi lagega" },
  { id: "savage", label: "Savage 🔥", description: "Emotional damage confirmed, ro dega" },
  { id: "best_friend", label: "Best Friend 🤝", description: "Chaddi-buddy level beizzati, no filter" },
];

export const ROAST_TEMPLATES = {
  friendly: [
    "{name} ka confidence uski salary se 10x zyada chalta hai. Lekin dil ka saaf hai... bas dimaag thoda off rehta hai!",
    "Agar 'bas 5 minute mein pahunch raha hoon' bolne pe tax lagta, toh {name} abhi Tihar jail mein hota.",
    "{name} bhai ki life mein bas do hi rules hain: Plan cancel karna aur chai pe gyaan pelna.",
    "{name} ko dekh ke lagta hai ki bhagwan ne banate time extra timepass daal diya tha!",
    "{name} ke plans itne jaldi drop hote hain jitni jaldi Monday subah ki neend.",
  ],
  savage: [
    "{name} ka attitude CEO wala hai aur bank balance dekh ke intern bhi tars kha jaaye. Bhai WhatsApp DP badalne se aukaat nahi badalti!",
    "Scientists are still researching ki {name} dimaag se sochta hai ya reels ke background music se. Zero brain cells, maximum drama!",
    "{name} ke life goals itne blur hain ki camera lens bhi unhe focus nahi kar sakta. Bhai tu pehle ₹50 ka udhaar wapas kar!",
    "Bhai {name}, teri baatein sun ke Google bhi 404 Error de deta hai. Tu shakal se seedha aur harkaton se high-level fraud lagta hai!",
    "{name} party mein aise ghusta hai jaise dulhe ka saga chacha ho, aur bill aate hi washroom ka darwaza lock kar leta hai.",
  ],
  best_friend: [
    "Dekh {name}, tu mera bhai hai isliye bol raha hoon: Teri harkatein aisi hain ki tere gharwale bhi rishtedaaron ko batate nahi ki tu unka beta hai!",
    "{name} ke sath ghoomne jao toh izzat ka faluda pakka hai. Ya toh police se argument karega ya bill split karte time phone switch off!",
    "Pura mohalla jaanta hai ki {name} ke paas dimaag hai... bas activate karna bhool gaya bhagwan!",
    "{name} itna bada pro hai ki single rehne ke 100 bahane bana leta hai, jabki sach ye hai ki koi bhaav nahi deta!",
    "Teri dosti ke liye dil se dua nikalti hai {name}, par tera chehra dekh ke lagta hai bhagwan ne draft mode mein publish kar diya tha!",
  ],
};

// TOOL 2: GF/BF Red Flag Meter
export const RED_FLAG_QUESTIONS = [
  {
    id: "q1",
    question: "WhatsApp/Instagram pe reply kitni der mein aata hai?",
    hint: "Sach bolna, screenshots ready hain!",
    options: [
      { text: "Within 30 seconds (Green Flag VIP)", score: 5, tag: "fast" },
      { text: "2-3 hours later ('Yaar main so gaya tha')", score: 25, tag: "slow" },
      { text: "8 ghante baad, jabki active 24/7 online dikh rahe hain", score: 50, tag: "toxic" },
      { text: "Reply tab aata hai jab unka WiFi hotspot chahiye", score: 40, tag: "selfish" },
    ],
  },
  {
    id: "q2",
    question: "Phone unlock karke table pe kaise rakhte hain?",
    hint: "Physics of suspicious behavior",
    options: [
      { text: "Screen upar, koi tension nahi", score: 5, tag: "innocent" },
      { text: "Screen ulta face karke, military secret mode", score: 45, tag: "suspicious" },
      { text: "Phone jeb se nikalte hi nahi, biometric + face + PIN lock", score: 50, tag: "super_spy" },
      { text: "Do phones rakhte hain (Ek mummy wala, ek private)", score: 60, tag: "agent_47" },
    ],
  },
  {
    id: "q3",
    question: "Instagram/Snapchat pe 'besties' ki sankhya kitni hai?",
    hint: "Bhai-behen bol ke ghumane wale",
    options: [
      { text: "2-3 childhood friends", score: 5, tag: "normal" },
      { text: "15+ besties jinka naam 'Pookie' ya 'Bro' hai", score: 40, tag: "suspect" },
      { text: "Har story pe 'With my favorite human' with face hidden", score: 50, tag: "soft_launcher" },
      { text: "Pure batch ko bestie bolte hain except you", score: 55, tag: "heartbreaker" },
    ],
  },
  {
    id: "q4",
    question: "Jab ladai hoti hai toh reaction kaisa hota hai?",
    hint: "Drama quotient check",
    options: [
      { text: "Aaram se baat karke sort out karte hain", score: 5, tag: "mature" },
      { text: "'It's fine' bol ke 3 din tak silent treatment", score: 35, tag: "passive_aggressive" },
      { text: "Sad reels aur status lagana shuru ('People always leave...')", score: 45, tag: "melodrama" },
      { text: "Seedha block karke friend ko bolte hain 'use bol message kare'", score: 55, tag: "childish" },
    ],
  },
  {
    id: "q5",
    question: "Ex ke sath equation kya hai?",
    hint: "The forbidden territory",
    options: [
      { text: "Complete block, zero contact", score: 5, tag: "clean" },
      { text: "'Just a good friend yaar, family friend hain'", score: 45, tag: "danger" },
      { text: "Daily streak banti hai aur raat ko nostalgia talks", score: 60, tag: "red_fort" },
      { text: "Ex ke kutte ka birthday bhi celebrate karte hain", score: 55, tag: "bizarre" },
    ],
  },
  {
    id: "q6",
    question: "Bill pay karne ke time kaun sa superpower activate hota hai?",
    hint: "Financial red flag sensor",
    options: [
      { text: "Always 50-50 split ya alternate turns", score: 5, tag: "gem" },
      { text: "Card swipe hone se pehle 'Yaar mera UPI issue kar raha hai'", score: 40, tag: "bhikhari_pro" },
      { text: "Bas phone pe fake call attend karne lagte hain", score: 50, tag: "escapist" },
      { text: "'Tum pay kardo, main ghar jaake Google Pay karta hoon' (Never happens)", score: 45, tag: "fake_promiser" },
    ],
  },
];

// TOOL 3: Ex Yaad Aa Rahi Hai Meter
export const EX_YAAD_QUESTIONS = [
  {
    id: "ey1",
    question: "Raat ko 2 baje YouTube/Spotify pe kya chal raha hota hai?",
    options: [
      { text: "Tech podcasts ya coding tutorials", score: 10, tag: "healed" },
      { text: "Lofi beats to sleep/relax", score: 25, tag: "neutral" },
      { text: "Arijit Singh, Atif Aslam and B Praak unreleased sad versions", score: 80, tag: "devdas" },
      { text: "'Hamari Adhuri Kahani' remix loop pe", score: 95, tag: "kabir_singh" },
    ],
  },
  {
    id: "ey2",
    question: "Unka WhatsApp / Instagram profile kitni baar check hota hai?",
    options: [
      { text: "Pata bhi nahi wo zinda hain ya mars pe", score: 5, tag: "moved_on" },
      { text: "Mahine mein ek baar by chance explore page pe aa jaye", score: 25, tag: "casual" },
      { text: "Daily morning attendance, DP badli kya?", score: 75, tag: "stalker" },
      { text: "Friend ke fake account se unke new follower count ka tracking", score: 95, tag: "cid" },
    ],
  },
  {
    id: "ey3",
    question: "Purani photos aur screenshots ka kya haal hai?",
    options: [
      { text: "Permanently deleted from trash folder too", score: 10, tag: "salute" },
      { text: "Google Photos ke 'Archive' folder mein lock hai", score: 45, tag: "fragile" },
      { text: "Hidden album with passcode, hafte mein ek baar rona compulsory", score: 85, tag: "emotional_baggage" },
      { text: "2021 ke WhatsApp chat backup ka PDF print nikal rakha hai", score: 98, tag: "legend" },
    ],
  },
  {
    id: "ey4",
    question: "Agar abhi unka message aaye 'Hey, can we talk?', toh kya karoge?",
    options: [
      { text: "Ignore & Mark as Spam", score: 5, tag: "chad" },
      { text: "Seen karke chhod dunga", score: 30, tag: "controlled" },
      { text: "3 second mein reply: 'I was waiting for this!'", score: 90, tag: "hopeless" },
      { text: "Rote hue mummy ko bolunga pandit ji se muhurat nikalo", score: 99, tag: "delusional" },
    ],
  },
  {
    id: "ey5",
    question: "Unki pasandida jagah (cafe/park) se guzarte waqt kya feeling aati hai?",
    options: [
      { text: "Bas lagta hai yahan ki coffee bekaar thi", score: 10, tag: "chill" },
      { text: "Halka sa flashback aata hai par momo kha ke bhool jata hoon", score: 35, tag: "normal" },
      { text: "Background mein slow-motion sad violin bajne lagta hai", score: 80, tag: "filmy" },
      { text: "Ghar aakar 4 ghante blank wall ko ghoorta hoon", score: 95, tag: "broken" },
    ],
  },
];

// TOOL 4: Group Chat Roles
export const CHAT_ROLES_POOL = [
  {
    role: "Plan Cancel CEO 🏖️",
    badge: "Executive Flaker",
    description: "Goa se lekar tapri tak, iske 'Bhai mummy ne mana kar diya' bolne se har plan shmashan ghat banta hai.",
    color: "from-red-500 to-rose-600",
  },
  {
    role: "Seen-Zone Minister 👁️",
    badge: "Blue Tick Terrorist",
    description: "Message padhega turant, par reply karne mein agla janam lega. Emergency mein bhi sirf reaction emoji dega.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    role: "Gossip Minister & CID 🕵️",
    badge: "Desi Investigation Head",
    description: "Pura mohalla aur colony kiske sath ghoom raha hai, iske paas unverified full HD report rehti hai.",
    color: "from-purple-500 to-pink-600",
  },
  {
    role: "Group ATM 💸",
    badge: "Official Sponsor",
    description: "Bill aate hi QR code scan karta hai, par udhaar wapas lene mein sharam aati hai. Forever unpaid creditor.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    role: "Forward King / Queen 🗞️",
    badge: "WhatsApp University Topper",
    description: "Subah 5:30 AM 'Om' aur gulab ke phool ke 40 images bhejta hai. 'UNESCO ne Indian national anthem ko best bola' fan.",
    color: "from-amber-500 to-yellow-600",
  },
  {
    role: "Podcast Note Recordist 🎙️",
    badge: "Voice Note Addict",
    description: "Typing aati hi nahi! Har baat ke liye 3 minute 47 second ka podcast bhejta hai jisme sirf hawa ki aawaaz hoti hai.",
    color: "from-violet-500 to-purple-600",
  },
  {
    role: "Sticker & Meme Spammer 🤪",
    badge: "Digital Joker",
    description: "Serious conversation mein bhi Rajpal Yadav aur Babu Bhaiya ka sticker pel dega. No situation is sacred.",
    color: "from-pink-500 to-rose-600",
  },
  {
    role: "Ghost Member 👻",
    badge: "Silent Spectator",
    description: "Poore saal mute rehta hai, lekin jaise hi 'Bhai free biryani party hai' likho, 0.2 second mein 'Location bhej' likhega.",
    color: "from-slate-500 to-gray-700",
  },
  {
    role: "Grammar Police & Fact Checker 🤓",
    badge: "Chief Correction Officer",
    description: "Tum emotional break-up note likh rahe ho, ye 'your' aur 'you're' ka difference correct karega.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    role: "Bakchod Supreme 👑",
    badge: "Chaos Coordinator",
    description: "Group ke dange karwane ka master. Do logon ki ladai shuru karwa ke popcorn kha ke spectator mode mein baithta hai.",
    color: "from-orange-500 to-amber-600",
  },
];

// TOOL 5: Shaadi Market Value
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

// TOOL 6: Aukaat Checker
export const AUKAAT_QUESTIONS = [
  {
    id: "ac1",
    question: "Mahine ke aakhri hafte mein bank balance ka kya nazara hota hai?",
    options: [
      { text: "₹47.50 (Google Pay scratch card se umeed)", score: 10, label: "Kangana Ranaut level struggle" },
      { text: "₹2,000 - ₹5,000 (Momo aur tapri chai secure hai)", score: 35, label: "Survivable" },
      { text: "₹20,000+ (Savings account mein disciplined dhan)", score: 75, label: "Middle class king" },
      { text: "Mutual Fund, FD, Stocks sab green (Ambani's distant relative)", score: 95, label: "Crorepati in making" },
    ],
  },
  {
    id: "ac2",
    question: "Swiggy / Zomato pe food order karte time sabse pehla filter kya lagate ho?",
    options: [
      { text: "Coupon code 'TRYNEW' ya ₹120 OFF wala mandatory", score: 20, label: "Discount Hunter" },
      { text: "Rating 4.5+ aur delivery under 30 mins", score: 50, label: "Comfort first" },
      { text: "Gourmet Section & Artisan Cafe desserts", score: 90, label: "Kothi Bangle Wala" },
      { text: "Cart mein item daal ke delivery charge dekh ke cancel karna", score: 10, label: "Aukaat realisation" },
    ],
  },
  {
    id: "ac3",
    question: "Phone kaun sa use kar rahe ho aur finance kaise hua?",
    options: [
      { text: "Cracked screen Android, speaker tape se chipka hua", score: 15, label: "Desi Survivor" },
      { text: "Mid-range OnePlus/Samsung cash pe liya tha", score: 55, label: "Sensible Citizen" },
      { text: "Latest iPhone on 24-month No-Cost EMI", score: 30, label: "Show-off Daridrata" },
      { text: "Latest Pro Max, Apple watch & MacBook fully paid", score: 95, label: "Tech Nawab" },
    ],
  },
  {
    id: "ac4",
    question: "Goa trip ka plan bante hi aapka sabse pehla dialogue kya hota hai?",
    options: [
      { text: "'Bhai sleeper train mein chalte hain aur hostel mein rukenge'", score: 20, label: "Budget Backpacker" },
      { text: "'Flight tickets book kar li hain, Taj Vivanta kaisa rahega?'", score: 95, label: "South Delhi / SoBo vibe" },
      { text: "'Pehle purana 500 ka udhaar de phir Goa chal'", score: 40, label: "Realistic Accountant" },
      { text: "'Haan haan chalte hain' (Dil mein pata hai aukaat colony park tak hai)", score: 10, label: "Dreamer" },
    ],
  },
  {
    id: "ac5",
    question: "Brand shopping karte time price tag dekhne ka protocol kya hai?",
    options: [
      { text: "Seedha tag ultata hoon, 4 digits dekhte hi shirt wapas rack pe", score: 15, label: "Sarojini / Chor Bazaar Loyal" },
      { text: "50% End of Season Sale ka wait karta hoon", score: 45, label: "Smart Bargainer" },
      { text: "Price nahi dekhta, quality aur fit pasand aana chahiye", score: 95, label: "Financial Nirvana" },
      { text: "Trial room mein photo khinch ke wapas nikal aata hoon", score: 5, label: "Instagram Influencer" },
    ],
  },
];

// TOOL 7: Fake Family WhatsApp Chat
export const FAMILY_CHAT_THEMES = [
  {
    id: "shaadi_pressure",
    title: "Shaadi Pressure & Rishta Bio-data 👰",
    subtitle: "Mummyji sends photo of Canada NRI with 50 acres",
    messages: [
      { sender: "Mummyji", text: "Beta ye bio-data dekho. Ladka Canada mein software engineer hai, kothi hai aur shakahari hai! 🙏🌸", time: "10:14 AM" },
      { sender: "Me", text: "Mummy abhi meri umar hi kya hai, career pe focus karna hai...", time: "10:16 AM" },
      { sender: "Papaji", text: "Tumhare umar mein humare 2 bachhe the aur ghar ka loan chukta ho gaya tha. Abhi career ka gyaan mat do. 😾", time: "10:17 AM" },
      { sender: "Sharma Uncle", text: "Humare Ritesh ne toh 24 saal mein shaadi kar li. Abhi Apple mein 80 Lakh package le raha hai beta.", time: "10:19 AM" },
      { sender: "Chintu (Brother)", text: "Didi/Bhaiya shaadi kar lo, mujhe aapka room gaming setup ke liye chahiye please! 😂🎮", time: "10:20 AM" },
      { sender: "Mummyji", text: "Pandit ji ne bola hai agle 3 mahine mein kundli nahi baithi toh 7 saal tak dosh rahega!! Jaldi haan bolo!", time: "10:22 AM" },
      { sender: "Me", text: "Group left this chat... (Mentally) 🏃‍♂️💨", time: "10:23 AM" },
    ],
  },
  {
    id: "cricket_chaos",
    title: "India vs Pak World Cup Match Drama 🏏",
    subtitle: "Papaji coaches Team India from the sofa",
    messages: [
      { sender: "Papaji", text: "Maine pehle hi kaha tha Rohit ko toss jeet ke batting leni chahiye thi! Inko cricket khelna nahi aata! 😤", time: "7:45 PM" },
      { sender: "Chintu (Brother)", text: "Papaji last ball pe 6 maara usne, calm down!! 🇮🇳🔥", time: "7:46 PM" },
      { sender: "Mummyji", text: "Sab log TV ki aawaaz kam karo, main mandir mein agarbatti jala ke aayi hoon jeet pakki hai. 🪔🙏", time: "7:48 PM" },
      { sender: "Sharma Uncle", text: "Dhoni hota toh ye over 18th mein hi khatam ho jata. Modern players mein wo jazba nahi hai.", time: "7:50 PM" },
      { sender: "Me", text: "Match hum jeet gaye!! Celebration time! 🥳🇮🇳", time: "7:55 PM" },
      { sender: "Papaji", text: "Jeet toh gaye par 19th over bekaar phenka tha. Kal subah sab 6 baje uthenge walk ke liye.", time: "7:56 PM" },
    ],
  },
  {
    id: "good_morning_spam",
    title: "6:00 AM Suvichar & WhatsApp University 🌹",
    subtitle: "Curing cancer with lemon juice & 100 rose bouquets",
    messages: [
      { sender: "Papaji", text: "🌅 ॐ नमः शिवाय! प्रातः कालीन वंदन! आपका दिन मंगलमय हो! 🌺🌸🌼", time: "5:58 AM" },
      { sender: "Sharma Uncle", text: "🚨 ALERT: NASA ne declare kiya hai ki mobile ko raat ko takiye ke paas rakhne se dimag mein WiFi signal freeze ho jata hai! Forward to 11 groups! ⚠️", time: "6:15 AM" },
      { sender: "Mummyji", text: "Beta ye lemon water aur adrak garam karke peena, WhatsApp pe doctor ne bataya hai sab theek ho jata hai. 🍋☕", time: "6:45 AM" },
      { sender: "Me", text: "Uncle wo NASA wali news 2012 ka fake forward hai...", time: "8:30 AM" },
      { sender: "Papaji", text: "Bado se behas mat karo. Padhai karo chup chaap. 😡", time: "8:32 AM" },
      { sender: "Chintu (Brother)", text: "Good morning mummy 100 rupay bhejo assignment print karwana hai 🙏", time: "8:35 AM" },
    ],
  },
  {
    id: "goa_trip_denial",
    title: "Goa Trip Permission Request 🏖️",
    subtitle: "Rejected faster than a failed UPI transaction",
    messages: [
      { sender: "Me", text: "Mummy, college ke friends ke sath 3 din ke study tour/seminar pe Goa ja rahe hain...", time: "2:15 PM" },
      { sender: "Mummyji", text: "Goa mein kaun si study hoti hai beta? Wahan toh log bina kapdon ke ghoomte hain! Ram Ram! 🙈", time: "2:16 PM" },
      { sender: "Papaji", text: "Kitna kharcha aayega?", time: "2:18 PM" },
      { sender: "Me", text: "Bas ₹4,000 bhaiya ke hotel mein discount hai...", time: "2:19 PM" },
      { sender: "Papaji", text: "₹4,000 mein ghar ka mahine ka ration aata hai. Colony park mein ghoom lo, wahan bhi nariyal ke ped hain. Permission DENIED.", time: "2:20 PM" },
      { sender: "Chintu (Brother)", text: "Hahaha maine pehle hi bola tha! Mummy mujhe ₹500 de do main chup rahunga 🤫", time: "2:21 PM" },
    ],
  },
];

// TOOL 8: Asli Personality Test
export const PERSONALITY_QUESTIONS = [
  {
    id: "pt1",
    question: "Metro ya Bus mein seat dekhte hi aapka survival instinct kya karta hai?",
    options: [
      { text: "Roomal/Bag phenk ke 10 meter door se seat claim karna", type: "Certified Bakchod", score: 6 },
      { text: "Aaram se khade rehna, seat mangne mein sharam aati hai", type: "Overthinking Minister", score: 1 },
      { text: "Baithe hue insaan ko aisi guilt wali nazron se ghoorna ki wo khud uth jaye", type: "Drama Department Head", score: 2 },
      { text: "Gate ke kone mein earphone laga ke duniya bhool jana", type: "Bare Minimum Genius", score: 3 },
    ],
  },
  {
    id: "pt2",
    question: "Jab restaurant mein bill aata hai, toh aapka reaction?",
    options: [
      { text: "Turant calculator khol ke ₹2 ka GST split bhi barabar karna", type: "Secret Mastermind", score: 5 },
      { text: "Washroom nikal jana ya fake call ka natak karna", type: "Certified Bakchod", score: 6 },
      { text: "'Bhai tu de de main ghar jaake Google Pay karta hoon' (Kabhi nahi karta)", type: "Professional Procrastinator", score: 4 },
      { text: "Chupchap 100% pay karke agle 2 hafte maggi pe guzarna", type: "Overthinking Minister", score: 1 },
    ],
  },
  {
    id: "pt3",
    question: "Shaadi mein food buffet pe aapki strategy?",
    options: [
      { text: "Pehle 20 minute shorba aur chaat, phir paneer tikka raid", type: "Secret Mastermind", score: 5 },
      { text: "Dulhe se milne se pehle seedha plate uthana", type: "Certified Bakchod", score: 6 },
      { text: "Ice cream counter pe 4 baar alag shakal bana ke jana", type: "Bare Minimum Genius", score: 3 },
      { text: "Sharam ke maare sirf 1 papad aur salad leke side mein khade hona", type: "Overthinking Minister", score: 1 },
    ],
  },
  {
    id: "pt4",
    question: "Monday morning ka pehla alarm sunke kya hota hai?",
    options: [
      { text: "8 alarms set hain 5-5 minute ke gap pe, sab snooze!", type: "Professional Procrastinator", score: 4 },
      { text: "'Kya hi rakha hai corporate majduri mein?' sochte hue rona", type: "Drama Department Head", score: 2 },
      { text: "5:30 AM uthke bed sheet straight karke jogging jana", type: "Secret Mastermind", score: 5 },
      { text: "Meeting mein bina video on kiye phone bed pe rakh ke so jana", type: "Bare Minimum Genius", score: 3 },
    ],
  },
  {
    id: "pt5",
    question: "Lift mein jab koi stranger khada ho, tab kya karte ho?",
    options: [
      { text: "Aise phone scroll karna jaise World Bank ka transaction handle kar rahe ho", type: "Overthinking Minister", score: 1 },
      { text: "'Aur bhai, kahan ja rahe ho?' bolke lift mein hi dosti kar lena", type: "Certified Bakchod", score: 6 },
      { text: "Floor indicator lights ko aisi concentration se ghoorna jaise laser nikal rahi ho", type: "Bare Minimum Genius", score: 3 },
      { text: "Halka sa cough karke unhe uncomfortable feel karwana", type: "Drama Department Head", score: 2 },
    ],
  },
  {
    id: "pt6",
    question: "Jab WhatsApp pe koi 3 minute ka audio note bhejta hai:",
    options: [
      { text: "2x speed pe sunna aur 1 word ka reply dena: 'ok'", type: "Bare Minimum Genius", score: 3 },
      { text: "Agle hafte tak ignore karna, 'audio load nahi hua'", type: "Professional Procrastinator", score: 4 },
      { text: "Sochna ki pakka koi emergency ya kalesh ho gaya hai", type: "Overthinking Minister", score: 1 },
      { text: "Uske audio note ka roast bana ke dusre friend ko bhejna", type: "Certified Bakchod", score: 6 },
    ],
  },
  {
    id: "pt7",
    question: "Rishtedaar jab poochte hain 'Beta aage ka kya socha hai?':",
    options: [
      { text: "'Uncle bas aapki blessings chahiye' bolke gayab ho jana", type: "Secret Mastermind", score: 5 },
      { text: "Aise heavy tech jargon bolna (AI, Blockchain, Quantum) ki unka dimaag ghoom jaye", type: "Bare Minimum Genius", score: 3 },
      { text: "'Bas shaadi karke sanyaas lene ka plan hai' bolke shock dena", type: "Certified Bakchod", score: 6 },
      { text: "Andar hi andar existential crisis mein chala jana", type: "Overthinking Minister", score: 1 },
    ],
  },
  {
    id: "pt8",
    question: "Online shopping cart mein kitne items saalon se pade hain?",
    options: [
      { text: "47 items wishlist mein hain, account balance ₹140 hai", type: "Drama Department Head", score: 2 },
      { text: "Sale ka wait karte karte wo product hi discontinue ho gaya", type: "Professional Procrastinator", score: 4 },
      { text: "Cart mein add karta hoon dopamin ke liye, buy kabhi nahi karta", type: "Overthinking Minister", score: 1 },
      { text: "Cart empty hai, direct buy karta hoon impulse pe", type: "Certified Bakchod", score: 6 },
    ],
  },
  {
    id: "pt9",
    question: "Road pe jab koi wrong side se gaadi laake horn bajaye:",
    options: [
      { text: "Gaadi se bahar nikal ke 'Tu jaanta hai mera baap kaun hai' mode", type: "Drama Department Head", score: 2 },
      { text: "Side se chupchap nikal ke unke dimaag ke liye dua karna", type: "Bare Minimum Genius", score: 3 },
      { text: "Unke aage gaadi rok ke mirror adjust karne lagna", type: "Certified Bakchod", score: 6 },
      { text: "Pure din sochna ki maine kyu nahi kuch bola", type: "Overthinking Minister", score: 1 },
    ],
  },
  {
    id: "pt10",
    question: "Aap kisi boring phone call ko kaise cut karte ho?",
    options: [
      { text: "Flight mode on karke call drop ka illusion create karna", type: "Secret Mastermind", score: 5 },
      { text: "'Hello? Hello? Aawaaz nahi aa rahi!' bolte hue cut", type: "Certified Bakchod", score: 6 },
      { text: "'Battery 1% hai bhai baad mein karta hoon'", type: "Professional Procrastinator", score: 4 },
      { text: "Boring call 45 minute tak sunte rehna sharam ke maare", type: "Overthinking Minister", score: 1 },
    ],
  },
];

export const PERSONALITY_RESULTS: Record<string, { title: string; badge: string; quote: string; desc: string; strengths: string[]; weaknesses: string[]; desiQuote: string }> = {
  "Overthinking Minister": {
    title: "Overthinking Minister 🧠",
    badge: "Supreme Brain Burner",
    quote: "Usne 'Ok' ki jagah 'K' kyu likha? Is our friendship over?",
    desc: "Aapke dimaag mein 24 ghante 40 browser tabs khuli rehti hain, aur sab mein buffering chal rahi hai. Past ke 5 saal purane conversations ka post-mortem karna aapki national hobby hai.",
    strengths: ["World-class risk management", "Details ko 100x zoom pe dekhna", "Doston ke problems ka free psychological gyaan"],
    weaknesses: ["Menu decide karne mein 45 minute", "Unsent messages folder overfilled", "Neend gayab over trivial things"],
    desiQuote: "Chinta chita samaan hai, par overthinking meri identity hai!",
  },
  "Drama Department Head": {
    title: "Drama Department Head 🎭",
    badge: "Kyunki Saas Bhi Kabhi Bahu Thi Director",
    quote: "Life is not cinema, but I am definitely the main character with 3 camera angle zooms!",
    desc: "Aapke jeevan mein agar din mein ek baar melodrama na ho toh khana hazam nahi hota. Minor inconvenience aate hi aapka background score change ho jata hai.",
    strengths: ["Top tier storytelling skills", "Emotional intensity 100%", "Party mein instant attention grabber"],
    weaknesses: ["Chhoti si baat ka babool banana", "Text read na hone pe 10 missed calls", "Oscar speech ready for small awards"],
    desiQuote: "Zindagi bewafa hai, par meri acting 100% genuine hai!",
  },
  "Bare Minimum Genius": {
    title: "Bare Minimum Genius 🛋️",
    badge: "Efficiency Ka Ustaad",
    quote: "Kaam utna hi karo jisme daant na pade aur nikaala na jaye.",
    desc: "Aapne energy conservation ki aisi mastery ki hai ki NASA ko aapse tips leni chahiye. Minimum effort mein maximum survivability nikalna aapka superpower hai.",
    strengths: ["Zero stress level", "Shortcuts and hacks ke encyclopedia", "Crisis mein calm rehne ki natural art"],
    weaknesses: ["Bed se uthne mein 2 ghante", "Reply length = 'k' ya 'haan'", "Ambition mode on low battery"],
    desiQuote: "Aaram haram nahi, aaram hi param satya hai!",
  },
  "Professional Procrastinator": {
    title: "Professional Procrastinator ⏳",
    badge: "Kal Kare So Parso Chairman",
    quote: "Deadlines are just suggestions created by people with weak imagination.",
    desc: "Aapka 'Kal se pakka shuru karunga' ek aisi timeless melody hai jo pichhle 5 saal se baj rahi hai. Adrenaline rush tabhi aata hai jab submit button dabane mein 45 second bache hon.",
    strengths: ["Last minute god-level clutch performance", "Creative excuses generator", "Pressure mein unexpected brilliance"],
    weaknesses: ["Calendar reminders ignore karna", "Gym shuru hona agle saal", "Pending to-do list length > Eiffel Tower"],
    desiQuote: "Aaj ka kaam kal pe chhod do, aur kal ka parso pe!",
  },
  "Secret Mastermind": {
    title: "Secret Mastermind 🕵️",
    badge: "Shadow Politician",
    quote: "Main chup hoon iska matlab ye nahi ki mujhe sab pata nahi hai.",
    desc: "Aap group ke Chanakya hain. Sabko lagta hai aap bas smile kar rahe hain, par aapke dimaag mein har friend ki aukaat, udhaar aur secrets ka cloud backup saved hai.",
    strengths: ["Strategic diplomacy", "Never gets caught in scams", "Always 3 steps ahead in the game"],
    weaknesses: ["Trust issues with everyone", "Revenge plans kept in Excel sheet", "Calculated smile instead of pure laughter"],
    desiQuote: "Chup chaap shikaar karte hain, shor nahi machate!",
  },
  "Certified Bakchod": {
    title: "Certified Bakchod 🚀",
    badge: "Chaos Ambassador",
    quote: "Bhai kuch toofani karte hain... police aayegi toh dekha jayega!",
    desc: "Aap jahan jate hain wahan hasi, kalesh aur hungama compulsory hai. Aapke sath baithne pe shanti 5 minute se zyada nahi tik sakti. You are the heartbeat of the squad!",
    strengths: ["Instant mood booster", "Fearless personality", "Unlimited supply of desi one-liners"],
    weaknesses: ["Serious situation mein hasi aana", "Friend ke purse se paise nikaal ke treat mangna", "Filter zero"],
    desiQuote: "Jaan jaye par bakchodi na jaye!",
  },
};

// TOOL 9: Udhaar Recovery Notice
export const UDHAAR_LINE_ITEMS = [
  { item: "Mool Rakam (Original Udhaar Amount)", code: "RBB-001" },
  { item: "Friendship Maintenance Cess @ 420%", code: "FMC-420" },
  { item: "'Bhai kal pakka deta hoon' Jhooth Penalty", code: "BJP-99" },
  { item: "Tapri Chai & Samosa Compound Interest", code: "TCI-108" },
  { item: "Call Seen Karke Ignore Karne Ka Mental Harassment Tax", code: "MHT-404" },
  { item: "Bouncer Bhejne Ka Travel Allowance", code: "BB-007" },
];

// TOOL 10: Shaadi Kalesh Predictor
export const KALESH_QUESTIONS = [
  {
    id: "sk1",
    question: "Shaadi mein guests ki approximate sankhya kitni hai?",
    options: [
      { text: "Intimate family wedding (Under 100 people)", score: 15, hint: "Low Kalesh zone" },
      { text: "Standard Indian wedding (400-600 relatives)", score: 50, hint: "Medium Kalesh alert" },
      { text: "Colony + Mohalla + Door ke chacha ke saale (1,500+ log)", score: 90, hint: "Maximum Kalesh explosion" },
    ],
  },
  {
    id: "sk2",
    question: "Menu mein Paneer aur Sweet Dish ka kya intezam hai?",
    options: [
      { text: "Unlimited Live Counters & 5 types of Paneer", score: 25 },
      { text: "Single Shahi Paneer counter with aggressive guard", score: 85 },
      { text: "Rasgulla count per plate strictly monitored by Fufaji", score: 95 },
      { text: "Ghar ka halwai with limited batch kadhai", score: 70 },
    ],
  },
  {
    id: "sk3",
    question: "DJ Playlist aur Naagin Dance ka kya protocol hai?",
    options: [
      { text: "Sufi & Soft English acoustic songs only", score: 20 },
      { text: "Commercial Bollywood hits until 10 PM", score: 45 },
      { text: "Strictly Punjabi dhol + Rumal mooh mein daba ke Naagin dance", score: 95 },
      { text: "DJ wale babu se mic chheen ke chachaji singing", score: 99 },
    ],
  },
  {
    id: "sk4",
    question: "Fufaji / Chachaji ke VIP aadar-satkaar ka status?",
    options: [
      { text: "Special room with AC, kaju katli & dedicated attendant", score: 10 },
      { text: "Standard room, par sofa pe baithne ki seat mil gayi", score: 40 },
      { text: "Unki Alto car ko parking mein thoda peeche khada kar diya", score: 95 },
      { text: "Baraat aate waqt unka naam stage se announce karna bhool gaye", score: 99 },
    ],
  },
  {
    id: "sk5",
    question: "Bar / Drinks counter ka scene kya hai?",
    options: [
      { text: "Strictly Dry Sanskari Wedding (Only Rooh Afza)", score: 40 },
      { text: "Official open bar with imported scotch", score: 65 },
      { text: "Car boot open bar in parking with plastic cups & chips", score: 95 },
      { text: "Daaru khatam at 11:15 PM while baraatis still thirsty", score: 99 },
    ],
  },
];
