// English comedy dataset for FullTimePass.in
// Sharply written, punchy, hilarious, culturally universal comedy data for global visitors

import { QuizQuestion } from "../types";

// ==========================================
// TOOL 1: Roast My Friend 🔥 (English)
// ==========================================

export const ROAST_TRAITS_EN = [
  { id: "always_late", label: "Always 2 hours late ('Just around the corner, bro!')", icon: "⏰" },
  { id: "iphone_emi", label: "Latest iPhone on 24-month financing, begs for $1 Venmo split", icon: "📱" },
  { id: "free_food", label: "Disappears when bill arrives, VIP attendance at free buffets", icon: "🍕" },
  { id: "goa_planner", label: "Planned 50 beach vacations, never left the couch", icon: "🏖️" },
  { id: "gym_dropout", label: "Bought gym membership, took 1 mirror selfie, never returned", icon: "💪" },
  { id: "overthinker", label: "Spends 3 hours analyzing why their crush replied with a period", icon: "🤯" },
  { id: "fake_busy", label: "Binge-watching reels all day but keeps status as 'Extremely Busy'", icon: "🎬" },
  { id: "audio_podcaster", label: "Refuses to type, sends 4-minute unhinged voice memos", icon: "🎙️" },
  { id: "gyaan_guru", label: "Chronically single but hands out relationship advice like a licensed therapist", icon: "🧠" },
  { id: "tapri_ceo", label: "Drinks $1 street coffee while giving Elon Musk unsolicited business tips", icon: "☕" },
  { id: "splitwise_chor", label: "Marks group expenses as 'Settled' without actually sending cash", icon: "💳" },
  { id: "story_viewer", label: "Leaves your text unread for 3 days, views your Instagram story in 12 seconds", icon: "👁️" },
  { id: "rickshaw_bargainer", label: "Argues with Uber drivers for 15 minutes over a $0.50 surcharge", icon: "🛺" },
  { id: "charger_chor", label: "Enters your house and immediately steals your fast charger", icon: "🔌" },
  { id: "screenshot_fbi", label: "Pulls up receipts and screenshots from 2019 during harmless debates", icon: "📑" },
];

export const ROAST_STYLES_EN = [
  { id: "friendly", label: "Friendly 😄", description: "Playful banter, harmless giggles" },
  { id: "savage", label: "Savage 🔥", description: "Emotional damage guaranteed, might cry" },
  { id: "best_friend", label: "Best Friend 🤝", description: "Unfiltered best-friend slander, zero mercy" },
];

export const ROAST_TEMPLATES_EN = {
  friendly: [
    "{name}'s confidence moves at 100x the speed of their actual bank balance. Great heart... just operating on off-peak mental hours!",
    "If 'I'm arriving in 5 minutes' were a taxable offense, {name} would be serving three consecutive life sentences right now.",
    "{name} lives by two simple rules: Loudest voice when organizing the outing, completely unreachable at 6 AM on trip day!",
    "Looking at {name}, it seems God poured in lots of spice, infinite drama, and completely forgot the common sense module!",
    "{name}'s life goals dissolve faster than Monday morning motivation. But hey, the squad wouldn't be complete without our resident clown!",
    "Honestly {name}, hearing you speak sounds like a Fortune 500 CEO, but watching you operate looks like a confused penguin navigating IKEA.",
    "{name} orders appetizers like British royalty, then mysteriously develops sudden Wi-Fi failure when the bill drops on the table.",
    "Listen {name}, you're not single because of bad luck... you're single because the opposite gender possesses functioning eyes and ears!",
    "{name} has a theoretical solution for world peace, but cannot figure out their own laundry basket.",
    "If procrastination were an Olympic sport, {name} would already have 14 gold medals hanging from their bedpost!",
  ],
  savage: [
    "{name} has a CEO attitude with a bank account that qualifies for humanitarian relief. Changing your profile picture won't upgrade your tax bracket!",
    "Scientists are still researching whether {name} thinks with actual brain cells or background sound effects from viral TikToks. Zero logic, maximum drama!",
    "{name}'s long-term vision is so blurry that the Hubble Telescope couldn't focus on it. Bro, pay back that $10 you borrowed last summer first!",
    "{name}, talking to you gives Google a 404 Error. You look innocent on paper, but in real life you're a walking, talking financial hazard!",
    "{name} struts into parties like the guest of honor, and instantly locks themselves inside the bathroom the moment the check is split!",
    "If self-awareness and delusion were mapped on a chart, {name} would be found stranded somewhere outside the observable universe.",
    "{name}'s brain processes at 2G dial-up speeds, but their mouth broadcasts unfiltered opinions on an ultra-wide fiber connection!",
    "There are two types of humans: people who contribute to society, and {name} who just mooches off everyone else's fries while saying 'Thanks, appreciate it!'",
    "God clearly created a rough prototype with {name}, said 'Whatever, who has the time to fix this', and pushed it straight to production!",
    "Street dogs stop barking when {name} walks by out of sheer pity. A complete, unadulterated emotional catastrophe!",
    "{name} doesn't go to the gym to lift weights; they go to stand in front of the mirror, take 47 angles of their bicep, and post 'Grind never stops'!",
    "The peak of {name}'s audacity is texting a high school friend they haven't seen in 4 years just to ask for their Netflix login password!",
  ],
  best_friend: [
    "Look {name}, you're my best friend so I can say this: Even your parents introduce you to guests as their 'eccentric distant relative'!",
    "Hanging out in public with {name} guarantees 100% secondhand embarrassment. Either starting arguments with security or faking an illness at checkout!",
    "Everyone knows {name} has potential... it's just locked behind 14 layers of questionable life choices and chronic laziness!",
    "{name} can produce 100 philosophical theories on why being single is superior, when the plain truth is that even stray cats don't find them approachable!",
    "I pray for your success every day {name}, but seeing your face reminds me of software that shipped without its day-one security patch!",
    "Listen {name}, you're my best friend on earth, but if we were both on the Titanic with one life vest left, I'd blow you a polite farewell kiss!",
    "{name} genuinely thinks they're the brooding hero in a Hollywood thriller, when in reality they're comic relief in deleted scene extras!",
    "Every single time {name} says 'Hear me out, I have a master plan', my immediate instinct is to freeze all my credit cards!",
    "I've known freeloaders, but {name} is a biological miracle who burns through my car's gas tank and lectures me on how walking is good for cardio!",
    "{name}'s social respect level is equivalent to a 5-second unskippable YouTube ad. Everyone is just counting down the seconds until it's over!",
  ],
};

export const ROAST_TRAIT_BURNS_EN: Record<string, string[]> = {
  always_late: [
    "Their clock doesn't run on standard time; it runs on 'Whenever I feel like crawling out of bed'. Texts 'Almost there!' while still wrapped in bed sheets!",
    "Trains will derail, flights will get grounded, but {name} will still find a way to be 90 minutes late to their own retirement party!",
    "NASA can land an autonomous rover on Mars faster than {name} can walk from their front door to the corner store.",
  ],
  iphone_emi: [
    "Purchased the top-tier iPhone on a 3-year payment plan, yet the moment you meet they ask 'Can you hotspot me? My mobile data ran out!'",
    "Takes mirror selfies like they hold major equity in Apple, but needs 4 polite reminders to venmo $2 for a slice of pizza!",
    "Phone battery is at 99%, but checking account is at $0.42! Emptied their life savings just to flaunt three camera lenses.",
  ],
  free_food: [
    "When it's their turn to treat, their phone mysteriously enters hospital emergency mode. But say 'Free buffet' and they arrive with their own Tupperware!",
    "Has an internal radar that activates exclusively when someone else opens a snack box. Will drink 3 liters of complimentary iced water just to get their money's worth!",
    "Piles food onto their plate at the buffet like humanity hasn't discovered agriculture yet. Shame is a concept foreign to their vocabulary.",
  ],
  goa_planner: [
    "Created 47 group chats titled 'Trip of a Lifetime', saved aesthetic travel pins, yet hasn't traveled beyond their local grocery parking lot in 3 years!",
    "Their vacation plans are a greater disaster than the Titanic. Every May they swear 'We are definitely going', and by June they are snoring on the rug!",
    "Outlines an extravagant multi-thousand-dollar itinerary, but when it's time to book the tickets, claims their cat has emotional separation anxiety.",
  ],
  gym_dropout: [
    "Signed up for an annual gym contract for $800. Took 3 mirror selfies on day one, captioned it 'Beast Mode', and hasn't touched a dumbbell since!",
    "Drinks fruit punch out of a fitness shaker bottle pretending it's pre-workout. Has flexed in gym mirrors far more times than actually working out.",
    "Uses their giant tub of unopened whey protein powder as a bedside lamp stand. Fitness exists solely in their bio!",
  ],
  overthinker: [
    "Will spend 4 days psychoanalyzing why someone didn't use an exclamation mark in a work email. Creates elaborate catastrophe scenarios out of thin air!",
    "Gets left on 'Read' for 7 minutes and immediately drafts an internal apology speech for a crime they never committed.",
    "Could win an international detective award for connecting 3 completely unrelated Instagram likes into a grand conspiracy theory.",
  ],
  fake_busy: [
    "Claims they are 'drowning in meetings', yet watches 180 Instagram reels within a 2-hour window. Chronic fake hustle champion!",
    "Sends calendar invite rejections with 'Crazy week!' while actively wearing pajamas at 3:15 PM watching raccoon documentaries.",
    "Too busy to reply to a 2-word question, but has enough spare time to design a full aesthetic mood board for their imaginary weekend cottage.",
  ],
  audio_podcaster: [
    "Thinks they are hosting an NPR broadcast. Instead of typing 'Yes', sends a 5-minute rambling audio note complete with heavy breathing and street noise!",
    "Nobody in recorded history has ever listened to {name}'s voice notes at 1x speed. The entire group chat plays them at 2x just to survive.",
    "Starts voice memos with 'So basically...' and proceeds to narrate their breakfast routine for 3 continuous minutes.",
  ],
  gyaan_guru: [
    "Has been single for 7 consecutive years yet writes 8-paragraph relationship essays analyzing everyone else's dating milestones.",
    "Gives life coaching speeches like a certified guru while currently owing $14 for laundry detergent.",
    "Offers profound career wisdom to friends while having an unread email count in their inbox of 14,291.",
  ],
  tapri_ceo: [
    "Sits on plastic patio chairs sipping instant coffee while casually explaining how tech giants are running their operations all wrong.",
    "Has 'Entrepreneur | Visionary | Disruptor' in their bio, but currently lacks the liquidity to buy a medium combo meal.",
    "Explains cryptocurrency market trends to friends while their personal savings account balance is hovering around $4.18.",
  ],
  splitwise_chor: [
    "Taps 'Mark as Paid' on expense splitting apps with the confidence of a diplomat, without sending a single cent of actual currency!",
    "Remembers that you owe them $0.75 from November 2021, but develops instantaneous amnesia regarding the $50 dinner check last Friday.",
    "A master of financial evasion: whenever someone opens an invoice, their phone battery conveniently drops to 1%.",
  ],
  story_viewer: [
    "Leaves your urgent question unopened on WhatsApp for 48 hours, yet watches your Instagram story 9 seconds after you post it!",
    "Active on every social media radar on earth, but replying to a direct text requires an act of international diplomacy.",
    "Has the fastest thumb swipe in the western hemisphere for watching stories, but typing an answer is apparently physically impossible.",
  ],
  rickshaw_bargainer: [
    "Will argue with an Uber driver for 20 minutes to save $1, then willingly spend $12 on a lukewarm iced matcha latte 10 minutes later.",
    "Treats routine ride-share fares like high-stakes hostage negotiations. Zero self-awareness, maximum confrontation!",
  ],
  charger_chor: [
    "Enters your apartment, does not greet your pets, does not take off their shoes—immediately yells 'Where is your high-speed charging brick?'",
    "Has collected 14 phone chargers in their backpack over the last 3 years, none of which they legally purchased.",
  ],
  screenshot_fbi: [
    "During a casual disagreement about movie trivia, pulls up an annotated screenshot of your text message from April 14, 2018 at 11:42 PM!",
    "Keeps an indexed external hard drive of friend group receipts. Could easily consult for the FBI if they weren't so deeply unhinged.",
  ],
};

export const ROAST_BADGES_EN = [
  {
    title: "Nuclear Grade Savage Roast 💀",
    minScore: 80,
    icon: "💀",
    description: "Emotional damage confirmed. May require 3 business days of recovery therapy.",
  },
  {
    title: "Spicy Squad Burn 🔥",
    minScore: 55,
    icon: "🔥",
    description: "Crispy, direct hit. Humorous slander certified by the friend group council.",
  },
  {
    title: "Playful Banter Level 😊",
    minScore: 0,
    icon: "😊",
    description: "Lighthearted poking. Won't cause tears, but will definitely get laughed at in the group chat.",
  },
];

export const ROAST_METRICS_LIST_EN = [
  { label: "Excuses Speed", icon: "⚡", baseValue: 92, color: "#EF4444" },
  { label: "Ego to Balance Ratio", icon: "📈", baseValue: 98, color: "#F59E0B" },
  { label: "Drama Generation", icon: "🎭", baseValue: 88, color: "#8B5CF6" },
  { label: "Bill Evasion Rate", icon: "🏃", baseValue: 95, color: "#10B981" },
  { label: "Overthinking Index", icon: "🧠", baseValue: 90, color: "#EC4899" },
  { label: "Squad Loyalty", icon: "🤝", baseValue: 82, color: "#06B6D4" },
];

// ==========================================
// TOOL 2: Red Flag Meter 🚩 (English)
// ==========================================

export const RED_FLAG_QUESTIONS_EN: QuizQuestion[] = [
  {
    id: "q1",
    question: "How long does it take for them to reply to your texts?",
    hint: "Think about their routine habits, not the rare emergencies!",
    options: [
      { text: "Within 2 minutes (sometimes while I'm still typing!)", score: 5, tag: "Green Flag 🟢" },
      { text: "30 mins to 2 hours (normal human functioning)", score: 25, tag: "Acceptable 🟡" },
      { text: "6 to 8 hours later, but their Instagram story was posted 5 mins ago", score: 75, tag: "Red Flag 🚩" },
      { text: "Replies after 3 business days with 'Hey, crazy week!'", score: 95, tag: "Toxic Alert 🚨" },
    ],
  },
  {
    id: "q2",
    question: "When a disagreement occurs, how do they handle it?",
    hint: "How is conflict resolved between you two?",
    options: [
      { text: "Calm communication, healthy listening, and mutual apologies", score: 5, tag: "Pure Gold 🟢" },
      { text: "Gets moody for an hour, then suggests ordering takeout together", score: 30, tag: "Cute Moods 🟡" },
      { text: "Hits you with 'I'm totally fine' followed by 48 hours of total silence", score: 70, tag: "Silent Warfare 🚩" },
      { text: "Somehow reverses everything so YOU end up apologizing for their mistake", score: 95, tag: "Gaslight Master 🚨" },
    ],
  },
  {
    id: "q3",
    question: "What is their stance on your phone and privacy?",
    hint: "Trust boundaries and digital surveillance check!",
    options: [
      { text: "Zero insecurity. Both phones sit openly unlocked on the coffee table", score: 5, tag: "Total Trust 🟢" },
      { text: "Occasional playful 'Who you texting?', nothing obsessive", score: 25, tag: "Casual Curiosity 🟡" },
      { text: "Keeps their phone screen-down at all times and angles it away", score: 65, tag: "Suspicious 🚩" },
      { text: "Demands your passwords and audits your following list weekly", score: 95, tag: "FBI Interrogation 🚨" },
    ],
  },
];

export const RED_FLAG_DIAGNOSES_EN = {
  safe: [
    {
      title: "24-Carat Pure Green Forest 🌲",
      desc: "Practically endangered! Zero manipulation, instantaneous replies, and shares snacks without passive-aggressive sighs. If you let this one go, your squad will never forgive you.",
      punchline: "Clean conscience, zero drama, and 100% wholesome vibes!",
    },
    {
      title: "Certified Wholesome Partner 💚",
      desc: "Healthy communication habits, great listening skills, and genuinely wants to see you win. In the chaotic jungle of modern dating, you stumbled upon a five-star retreat.",
      punchline: "Treat them to dinner right now before someone else recognizes their value!",
    },
  ],
  moderate: [
    {
      title: "Mild Weather with Sporadic Thunderstorms ⛅",
      desc: "50% sweet romantic gestures, 50% moody silence whenever their sports team loses or their favorite diner is closed. Manageable with regular doses of good food and sincere apologies.",
      punchline: "Keep takeout menus on speed dial and don't argue after 10 PM!",
    },
    {
      title: "Yellow Flag on Probation ⚠️",
      desc: "Not quite toxic, but definitely not a walk in the park. Expect occasional passive-aggressive sighs and overanalyzing harmless remarks. Proceed with diplomatic caution.",
      punchline: "Handle with patience, regular snacks, and tactical diplomacy!",
    },
  ],
  danger: [
    {
      title: "Walking Radioactive Hazard ☢️",
      desc: "This isn't a red flag—it's an entire crimson parade! Running background background investigations every 15 minutes while leaving you on read for 12 hours. Run like you're competing in the Olympic hurdles!",
      punchline: "Sprint away immediately and update all your account passwords!",
    },
    {
      title: "Supreme Commander of Gaslighting 🚩",
      desc: "You could catch them with their hand in the cookie jar and by the end of the argument you'll be writing them an apology letter for placing the cookies there. Pure emotional roller coaster!",
      punchline: "Delete the contact, block on socials, and go touch some grass!",
    },
  ],
};

// ==========================================
// TOOL 3: Ex Yaad Meter 💔 (English)
// ==========================================

export const EX_YAAD_QUESTIONS_EN: QuizQuestion[] = [
  {
    id: "q1",
    question: "When you hear an emotional heartbreak song in the car, what happens?",
    hint: "Your immediate involuntary reaction!",
    options: [
      { text: "I enjoy the melody and sing along without a second thought", score: 5, tag: "Completely Healed ✨" },
      { text: "A tiny wave of nostalgia for 10 seconds, then back to my day", score: 30, tag: "Occasional Flashback ⛅" },
      { text: "I stare out of the window pretending I'm in a tragic music video", score: 75, tag: "Relapse Alert 🌧️" },
      { text: "Full tears, pulling over to check their Instagram from a burner account", score: 95, tag: "Tragic Heartbreak 😭" },
    ],
  },
  {
    id: "q2",
    question: "How often do you check their social media profiles?",
    hint: "Be completely honest—nobody else is watching!",
    options: [
      { text: "Never. Unfollowed/blocked and genuinely forgot their handle", score: 5, tag: "Detox Master 🔒" },
      { text: "Only when mutual friends post something where they happen to appear", score: 25, tag: "Casual Coincidence 👀" },
      { text: "Once a week, usually late on a Sunday night when boredom strikes", score: 65, tag: "Habitual Stalker 🔍" },
      { text: "Daily attendance. I notice when their following count changes by 1", score: 95, tag: "Full-Time Surveillance 🕵️" },
    ],
  },
  {
    id: "q3",
    question: "If they texted you 'Hey, you up?' at 1:30 AM tonight, what would you do?",
    hint: "Your unfiltered midnight impulse!",
    options: [
      { text: "Leave it on unread forever, screenshot it, and laugh with the squad", score: 5, tag: "Ice Cold Legend 🧊" },
      { text: "Wait until tomorrow afternoon and send a cold, polite 'Who is this?'", score: 25, tag: "Measured Distance 🕶️" },
      { text: "Heart rate spikes to 180 BPM, agonize over drafting a response for an hour", score: 70, tag: "High Vulnerability 💓" },
      { text: "Reply in 4 seconds flat with 'I couldn't sleep either, what's wrong?'", score: 95, tag: "Zero Dignity Remaining 🤡" },
    ],
  },
];

export const EX_YAAD_DIAGNOSES_EN = {
  healed: [
    {
      title: "Certified Moved-On Legend 🏆",
      desc: "Total freedom achieved! Their name causes zero heart palpitations, their pictures evoke zero tears, and you've reclaimed your peace of mind. Truly a model citizen of emotional health.",
      punchline: "Ex who? You can't even remember their middle name anymore!",
    },
    {
      title: "Permanently Cleared from the Recycle Bin 🗑️",
      desc: "Emotional baggage successfully discarded! You look at the past with amused detachment and your playlist is 100% upbeat bangers. High five!",
      punchline: "Treat the squad to dessert to celebrate your full emotional liberation!",
    },
  ],
  relapse: [
    {
      title: "50-50 Recovery Zone ⛅",
      desc: "You are doing great by daylight, but midnight nostalgia attacks are still a real hazard. Put the phone in the other room when going to bed and avoid moody acoustic ballads!",
      punchline: "Drink a glass of cold water and put the smartphone down!",
    },
    {
      title: "One Sad Song Away from a Relapse 🌧️",
      desc: "Healing is in progress, but you still keep that one archived photo folder 'just in case'. Time to delete the archives and stop checking their Spotify listening activity!",
      punchline: "Stay strong: looking backwards only gives you a stiff neck!",
    },
  ],
  devdas: [
    {
      title: "Chief Executive Officer of Heartbreak 😭",
      desc: "Moving on status: 4%. They are out living their best life ordering dessert with new friends, and you are over here writing unsent essays in your Notes app. Have some dignity and put on upbeat music!",
      punchline: "Delete the burner accounts, block the profile, and get some sleep!",
    },
    {
      title: "Tragic Romantic in Chronic Nostalgia 🍷",
      desc: "Extreme devastation alert! You analyze old text timestamps like they contain the secrets of the universe. Turn off the sad songs and go outside for a brisk walk!",
      punchline: "They moved on 6 months ago, it's high time you caught up!",
    },
  ],
};

// ==========================================
// TOOL 4: Group Chat Roles 😂 (English)
// ==========================================

export const CHAT_ROLES_POOL_EN = [
  {
    id: "seen_zone",
    role: "Minister of the Seen-Zone 👁️",
    title: "Minister of the Seen-Zone 👁️",
    badge: "Official Phantom",
    icon: "EyeOff",
    description: "Reads every message within 14 seconds, contributes nothing, surfaces 3 weeks later with 'Haha true'.",
    salary: "$0 / Zero Contributions",
    perk: "Immunity from being asked to organize anything",
    favoriteLine: "“My bad guys, just saw this!”",
    color: "from-slate-500 to-gray-700",
  },
  {
    id: "plan_killer",
    role: "Chief Vacation Sabotage Officer 🏖️",
    title: "Chief Vacation Sabotage Officer 🏖️",
    badge: "Certified Flake",
    icon: "ShieldX",
    description: "The loudest hype-man during the initial planning phase, inevitably drops out 6 hours before departure.",
    salary: "50 Unspent Deposits",
    perk: "Special talent for inventing phantom family emergencies",
    favoriteLine: "“Guys something sudden came up, you all go without me!”",
    color: "from-red-500 to-rose-600",
  },
  {
    id: "meme_dealer",
    role: "3:00 AM Black Market Meme Dealer 📦",
    title: "3:00 AM Black Market Meme Dealer 📦",
    badge: "No Sleep Club",
    icon: "Laugh",
    description: "Sends 42 unhinged reels between 2 AM and 5 AM. Completely silent during normal business hours.",
    salary: "Unlimited Screen Time",
    perk: "Algorithmically wired directly to comedy trends",
    favoriteLine: "“Watch this, this is literally you 😂”",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "audio_podcaster",
    role: "Unlicensed Podcast Broadcaster 🎙️",
    title: "Unlicensed Podcast Broadcaster 🎙️",
    badge: "Never Types",
    icon: "Mic",
    description: "Sends 6-minute voice memos complete with background traffic noise to deliver news that could be 3 words.",
    salary: "Infinite Vocal Chords",
    perk: "Forces the entire chat to listen at 2x playback speed",
    favoriteLine: "“Listen, I'm too lazy to type, so basically...”",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "drama_queen",
    role: "Head of Group Chat Melodrama 🎭",
    title: "Head of Group Chat Melodrama 🎭",
    badge: "Maximum Chaos",
    icon: "Flame",
    description: "Takes minor jokes deeply personal, leaves the group chat dramatically, waits for someone to add them back.",
    salary: "14 Oscars",
    perk: "Turns a lunch decision into a 3-act Shakespearean play",
    favoriteLine: "“I just think it's funny how none of you remembered...”",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "bill_dodger",
    role: "Undercover Checkout Ghost 💸",
    title: "Undercover Checkout Ghost 💸",
    badge: "Stingy Legend",
    icon: "Ghost",
    description: "Orders the most expensive beverage on the menu, magically vanishes to the restroom when the check arrives.",
    salary: "Free Meals for Life",
    perk: "Remarkable bladder timing matched exactly to check drops",
    favoriteLine: "“Hey my payment app is glitching, someone cover me!”",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "group_mom",
    role: "Designated Squad Guardian 🛡️",
    title: "Designated Squad Guardian 🛡️",
    badge: "Responsible Adult",
    icon: "HeartHandshake",
    description: "Carries wet wipes, checks everyone's arrival safely, reminds the group to stay hydrated like a mother hen.",
    salary: "Priceless Gratitude",
    perk: "The only reason this friend group hasn't ended up on the news",
    favoriteLine: "“Text me the second you get home safely!”",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "sticker_spammer",
    role: "Chief Sticker & GIF Commander 🎨",
    title: "Chief Sticker & GIF Commander 🎨",
    badge: "Visual Warfare",
    icon: "Sparkles",
    description: "Has never typed an English sentence in 3 years. Communicates exclusively through reaction GIFs and stickers.",
    salary: "10,000 Custom Stickers",
    perk: "Has the perfect reaction image for every human tragedy",
    favoriteLine: "[Dramatic Popcorn Eating GIF]",
    color: "from-amber-500 to-yellow-600",
  },
  {
    id: "grammar_cop",
    role: "Unsolicited Grammar Police 🤓",
    title: "Unsolicited Grammar Police 🤓",
    badge: "Chief Correction Officer",
    icon: "BookOpen",
    description: "You could be pouring your heart out about a tragedy, and they will reply: *you're. Nobody likes them, everybody tolerates them.",
    salary: "Zero Friends",
    perk: "Spotting a typo from 45 feet away",
    favoriteLine: "“*Their, not there.”",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "free_food_detector",
    role: "Silent Food Parasite 🍕",
    title: "Silent Food Parasite 🍕",
    badge: "Free Loader Elite",
    icon: "Pizza",
    description: "Silent in the chat for 11 months straight, but the exact second anyone types 'free pizza', they reply within 0.2 seconds.",
    salary: "Infinite Calories",
    perk: "Can smell a birthday cake through mobile cellular signals",
    favoriteLine: "“Send me the location, I'm already nearby.”",
    color: "from-lime-500 to-green-600",
  },
  {
    id: "midnight_philosopher",
    role: "2:00 AM Existential Philosopher 🍷",
    title: "2:00 AM Existential Philosopher 🍷",
    badge: "Midnight Poet",
    icon: "Moon",
    description: "Sends an unprompted 800-word essay about cosmic solitude at 2:45 AM, then deletes for everyone out of shame at 8:00 AM.",
    salary: "Unfiltered Regret",
    perk: "Writes poetry nobody asked to receive",
    favoriteLine: "“Do you guys ever feel like we're just spinning in space?”",
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    id: "screenshot_archivist",
    role: "Blackmail Screenshot Archivist 📑",
    title: "Blackmail Screenshot Archivist 📑",
    badge: "Vault Administrator",
    icon: "Lock",
    description: "Preserves embarrassing selfies from 2017 in a locked vault folder, patiently waiting for the right moment of extortion.",
    salary: "Maximum Leverage",
    perk: "Unquestioned diplomatic immunity in group arguments",
    favoriteLine: "“Should I drop the 2019 photo right now?”",
    color: "from-sky-500 to-blue-600",
  },
];

// ==========================================
// TOOL 5: Shaadi Market Value 💍 (English)
// ==========================================

export const SHAADI_QUESTIONS_EN: QuizQuestion[] = [
  {
    id: "sq1",
    question: "What is your culinary capability in the kitchen?",
    hint: "Cooking competence evaluation!",
    options: [
      { text: "Can prepare a 4-course banquet effortlessly", score: 95, tag: "MasterChef 👨‍🍳" },
      { text: "Solid comfort food: pasta, eggs, rice, and simple meals", score: 70, tag: "Dependable 🍳" },
      { text: "Can boil water and prepare instant noodles without burning the house down", score: 35, tag: "Noodle Specialist 🍜" },
      { text: "I consider opening food delivery apps as active cooking", score: 10, tag: "Takeout VIP 📱" },
    ],
  },
  {
    id: "sq2",
    question: "What is your financial stability profile?",
    hint: "Economic standing and wealth health!",
    options: [
      { text: "Solid career, diversified investments, retirement fund on track", score: 95, tag: "Wall Street Ready 📈" },
      { text: "Comfortable salary, pays rent on time, occasional impulse purchases", score: 65, tag: "Stable Working Class 💼" },
      { text: "Lives paycheck to paycheck, but my sneaker collection is priceless", score: 35, tag: "Aesthetic Broke 👟" },
      { text: "Currently supported by parents' goodwill and infinite optimism", score: 10, tag: "Visionary Dreamer 🛋️" },
    ],
  },
  {
    id: "sq3",
    question: "How do you handle in-laws and family gatherings?",
    hint: "Patience and diplomatic tolerance check!",
    options: [
      { text: "Extremely charming, touches everyone's heart, flawless etiquette", score: 95, tag: "Beloved In-Law 🌸" },
      { text: "Smiles politely, nods along to controversial opinions for 2 hours", score: 65, tag: "Diplomatic Saint 🕊️" },
      { text: "Hides in the kitchen petting the host family's dog all evening", score: 40, tag: "Introvert Shield 🐕" },
      { text: "Will start a heated debate about politics before the appetizers arrive", score: 10, tag: "Walk-in Hazard 💣" },
    ],
  },
];

export const SHAADI_VALUATIONS_EN = [
  {
    minScore: 230,
    maxScore: 300,
    title: "Platinum Royal Matrimonial Trophy 🏆",
    valuation: "$10,000,000 + Country Club Membership",
    value: "$10,000,000 + Country Club Membership",
    tag: "High Demand VIP",
    description: "Every parent's dream partner! Great career, culinary skills, and diplomatic patience of a UN ambassador. Matchmakers are currently bidding on your bio-data.",
    desc: "Every parent's dream partner! Great career, culinary skills, and diplomatic patience of a UN ambassador. Matchmakers are currently bidding on your bio-data.",
    punchline: "Start negotiating prenuptial agreements immediately!",
    perks: ["Complimentary gourmet dinners", "Zero family drama guarantee", "In-laws brag about you at every dinner party"],
  },
  {
    minScore: 160,
    maxScore: 229,
    title: "Solid Everyday Premium Catch 💎",
    valuation: "$500,000 + Decent 2-Bedroom Condo",
    value: "$500,000 + Decent 2-Bedroom Condo",
    tag: "Highly Desirable",
    description: "Dependable, fun, financially responsible, with a mild addiction to weekend Netflix binges. A wonderful life partner with minimal maintenance headaches.",
    desc: "Dependable, fun, financially responsible, with a mild addiction to weekend Netflix binges. A wonderful life partner with minimal maintenance headaches.",
    punchline: "Safe, reliable, and definitely worth the matrimonial investment!",
    perks: ["Can cook delicious comfort food", "Splits the bills fairly", "Handles social events with grace"],
  },
  {
    minScore: 90,
    maxScore: 159,
    title: "Clearance Sale Discount Bundle 🏷️",
    valuation: "$49.99 + Free Box of Cookies",
    value: "$49.99 + Free Box of Cookies",
    tag: "Needs TLC",
    description: "Cooking skills limited to microwaving leftovers and financial planning consists of checking balance right before ordering dessert. Still lovable if partnered with someone patient!",
    desc: "Cooking skills limited to microwaving leftovers and financial planning consists of checking balance right before ordering dessert. Still lovable if partnered with someone patient!",
    punchline: "No returns, no refunds, exchange only with extended warranty!",
    perks: ["Great sense of humor", "Never asks you to wake up early", "Expert at selecting streaming movies"],
  },
  {
    minScore: 0,
    maxScore: 89,
    title: "Hazardous Matrimonial Liability 💣",
    valuation: "$1.50 + Unpaid Parking Ticket",
    value: "$1.50 + Unpaid Parking Ticket",
    tag: "Proceed at Own Risk",
    description: "Cannot locate the kitchen light switch, bank account currently running on hope, and starts family arguments for sport. Matchmakers take one look and switch their careers.",
    desc: "Cannot locate the kitchen light switch, bank account currently running on hope, and starts family arguments for sport. Matchmakers take one look and switch their careers.",
    punchline: "Best suited for living alone with 4 cats or a houseplant!",
    perks: ["Provides constant comic relief", "Unpredictable daily adventures", "Keeps expectations comfortably low"],
  },
];

// ==========================================
// TOOL 6: Aukaat Checker 💸 (English)
// ==========================================

export const AUKAAT_QUESTIONS_EN: QuizQuestion[] = [
  {
    id: "aq1",
    question: "How do you handle your daily coffee routine?",
    hint: "Lifestyle habits audit!",
    options: [
      { text: "Brews simple coffee at home for $0.20 a cup", score: 20, tag: "Frugal King ☕" },
      { text: "Standard cafe visits 2-3 times a week, mindful of spending", score: 50, tag: "Balanced ☕" },
      { text: "$8 iced oat-milk caramel macchiato with extra foam every morning", score: 85, tag: "Fancy & Broke 💸" },
      { text: "Orders fancy coffee through delivery apps with a $6 delivery fee", score: 98, tag: "Financial Disaster 🤡" },
    ],
  },
  {
    id: "aq2",
    question: "When shopping for clothes, what is your mindset?",
    hint: "Wardrobe expenditure check!",
    options: [
      { text: "Buys quality basics on seasonal clearance sales", score: 20, tag: "Smart Shopper 🏷️" },
      { text: "Fast fashion stores, occasional treat during birthday month", score: 50, tag: "Normal Citizen 👕" },
      { text: "Designer logos on 12-month payment installments", score: 85, tag: "Credit Card Slave 💳" },
      { text: "Buys $300 sneakers to impress people I don't even like", score: 99, tag: "Aesthetic Ruin 👟" },
    ],
  },
  {
    id: "aq3",
    question: "What does your bank account look like on the 25th of the month?",
    hint: "Month-end liquidity check!",
    options: [
      { text: "Healthy emergency fund untouched, investments automated", score: 10, tag: "Warren Buffett 📈" },
      { text: "Decent surplus, ready for the upcoming paycheck", score: 40, tag: "Comfortable 👍" },
      { text: "Sub-$20 balance, surviving purely on instant ramen and hope", score: 80, tag: "Danger Zone ⚠️" },
      { text: "Negative balance with overdraft fee alert emails pending", score: 99, tag: "Financial ICU 🚨" },
    ],
  },
];

export const AUKAAT_DIAGNOSES_EN = {
  rich: [
    {
      title: "Wealthy Aristocrat in Disguise 👑",
      desc: "Financial discipline on point! You save consistently, invest wisely, and don't feel the need to broadcast your wealth through flashy leased luxury cars. True financial royalty.",
      punchline: "Silent wealth, zero debt stress, and solid peace of mind!",
    },
  ],
  middle: [
    {
      title: "Upper-Middle-Class Juggler 💼",
      desc: "You make respectable money and spend it with reasonable care, though occasional impulse online shopping sprees keep your savings from reaching escape velocity.",
      punchline: "Comfortable and happy, just watch out for midnight shopping!",
    },
  ],
  emi: [
    {
      title: "Broke Royalty / Bougie on Credit 💳",
      desc: "Your lifestyle screams luxury yacht, but your bank account is barely keeping a rubber dinghy afloat. Flaunting high-end sneakers while checking account balance before buying eggs!",
      punchline: "Cancel those 14 subscriptions you forgot you signed up for!",
    },
  ],
  broke: [
    {
      title: "Certified Financial Comedy Special 🪦",
      desc: "Emergency state declared! Your paycheck disappears into food deliveries and credit interest in under 72 hours. Even your banking app sends you push notifications begging you to cook at home.",
      punchline: "Delete the food apps and learn how to boil rice!",
    },
  ],
  // Backwards compatibility aliases
  get high() { return this.rich; },
  get medium() { return this.middle; },
  get low() { return this.emi; },
};

// ==========================================
// TOOL 7: Fake Family WhatsApp Chat 🤣 (English)
// ==========================================

export const FAMILY_CHAT_THEMES_EN = [
  {
    id: "shaadi_pressure",
    title: "Arranged Marriage Pressure & Matchmaking 👰",
    subtitle: "Mom sends photo of an overseas engineer with 50 acres",
    messages: [
      { sender: "Mom", text: "Honey, look at this profile! He's a software architect in Canada, owns 50 acres, and doesn't even drink coffee! 🙏🌸", time: "10:14 AM" },
      { sender: "Me", text: "Mom, I'm literally focused on my career right now, I need to explore my potential...", time: "10:16 AM" },
      { sender: "Dad", text: "At your age I was managing 2 kids, a mortgage, and a full department. Stop making excuses and look at the photo. 😾", time: "10:17 AM" },
      { sender: "Uncle Bob", text: "My son Kevin got married at 23. Now he's VP at Google and runs 10 miles every morning at 5 AM.", time: "10:19 AM" },
      { sender: "Little Bro", text: "Please get married quickly, I need your bedroom for my triple-monitor gaming setup! 😂🎮", time: "10:20 AM" },
      { sender: "Mom", text: "The family astrologer said if you don't marry this year, you'll stay single for 14 straight years!! Say yes!", time: "10:22 AM" },
      { sender: "Me", text: "I'm packing my bags and moving to the Himalayas... Bye family. 🏃‍♂️💨", time: "10:23 AM" },
    ],
  },
  {
    id: "cricket_chaos",
    title: "World Cup Finals Family Chaos 🏆",
    subtitle: "Dad coaches the national team from his favorite armchair",
    messages: [
      { sender: "Dad", text: "I told them from the beginning: they should have chosen defense first! These players should take coaching lessons from me! 😤📺", time: "7:45 PM" },
      { sender: "Little Bro", text: "Dad they literally just scored in stoppage time, calm down the entire neighborhood can hear you yelling!! 🔥", time: "7:46 PM" },
      { sender: "Mom", text: "Everyone turn the TV down, I lit candles in the living room and prayed. If anyone changes seats, we'll lose! 🪔🙏", time: "7:48 PM" },
      { sender: "Uncle Bob", text: "Back in my day players had grit. Modern athletes just care about hair gel and posting TikTok dances.", time: "7:50 PM" },
      { sender: "Me", text: "WE WON THE GAME!! CHAMPIONS OF THE WORLD! 🥳🎉", time: "7:55 PM" },
      { sender: "Dad", text: "A lucky win, terrible defense in the second half. Tomorrow morning everyone wakes up at 5:30 AM for jogging.", time: "7:56 PM" },
    ],
  },
  {
    id: "good_morning_spam",
    title: "6:00 AM Motivational Quotes & Chain Forwards 🌹",
    subtitle: "Curing everything with lemon water & 100 glitter rose bouquets",
    messages: [
      { sender: "Dad", text: "🌅 Rise and shine! May this blessed morning bring abundance and harmony to your spirit! 🌺🌸 (Forwarded many times)", time: "5:58 AM" },
      { sender: "Uncle Bob", text: "🚨 URGENT: Scientists confirm sleeping within 10 feet of your phone turns your brain into soup! Forward to 20 friends! ⚠️📱", time: "6:15 AM" },
      { sender: "Mom", text: "Drink warm ginger lemon water first thing, a Facebook doctor said it cures 108 distinct medical ailments. 🍋☕", time: "6:45 AM" },
      { sender: "Me", text: "Uncle, that phone article is an urban legend from 2004, please fact-check before forwarding...", time: "8:30 AM" },
      { sender: "Dad", text: "Do not lecture your elders! Put your phone down, go touch grass and do some morning stretches. 😡", time: "8:32 AM" },
      { sender: "Little Bro", text: "Good morning Mom, can you Venmo me $20 for college printing expenses please 🙏😂", time: "8:35 AM" },
    ],
  },
  {
    id: "goa_trip_denial",
    title: "Squad Vacation Permission Request 🏖️",
    subtitle: "Denied faster than an expired coupon code",
    messages: [
      { sender: "Me", text: "Mom, dad... my college friends and I are planning a 3-day educational study retreat to the beach...", time: "2:15 PM" },
      { sender: "Mom", text: "What kind of 'education' happens at the beach? People running around with barely any clothes on! Absolutely not! 🙈🌴", time: "2:16 PM" },
      { sender: "Dad", text: "How much is this alleged 'study retreat' going to cost?", time: "2:18 PM" },
      { sender: "Me", text: "Just $150, my friend's cousin gets us a 50% discount at their cabin...", time: "2:19 PM" },
      { sender: "Dad", text: "$150 buys two weeks of family groceries. You can walk around the local community park, it has trees too. Permission DENIED.", time: "2:20 PM" },
      { sender: "Little Bro", text: "Hahaha I told you so! Mom give me $10 and I promise not to tell dad what happened yesterday 🤫", time: "2:21 PM" },
      { sender: "Me", text: "My biggest haters share my DNA... 💀", time: "2:22 PM" },
    ],
  },
];

// ==========================================
// TOOL 8: Personality Test 🧠 (English)
// ==========================================

export const PERSONALITY_QUESTIONS_EN: QuizQuestion[] = [
  {
    id: "pq1",
    question: "When you have a massive project deadline tomorrow morning, what is your strategy?",
    hint: "Work habits and panic behavior!",
    options: [
      { text: "Start panicking at 11 PM, clean my entire room, and start work at 3 AM", score: 85, type: "Professional Procrastinator" },
      { text: "Overthink 47 different worst-case failure scenarios until my head hurts", score: 90, type: "Overthinking Minister" },
      { text: "Do the absolute bare minimum required to pass, and somehow it works out", score: 70, type: "Bare Minimum Genius" },
      { text: "Delegate tasks to others while taking full credit as 'Project Director'", score: 80, type: "Secret Mastermind" },
    ],
  },
  {
    id: "pq2",
    question: "In a chaotic squad group chat, what is your primary function?",
    hint: "Social dynamics profile!",
    options: [
      { text: "Stir the pot, drop controversial memes, and watch the chaos unfold", score: 95, type: "Certified Chaos Champion" },
      { text: "Leave long dramatic paragraphs analyzing everyone's emotional state", score: 85, type: "Drama Department Head" },
      { text: "Quietly observe everything, never type, but know all the secrets", score: 75, type: "Secret Mastermind" },
      { text: "Mute the group for 1 year and ignore 4,000 unread messages", score: 65, type: "Bare Minimum Genius" },
    ],
  },
  {
    id: "pq3",
    question: "When picking where to eat dinner with friends, how do you behave?",
    hint: "Decision-making style!",
    options: [
      { text: "Say 'I'm fine with anything', then veto all 6 options proposed", score: 90, type: "Drama Department Head" },
      { text: "Read 87 reviews on Yelp and Google Maps for 45 minutes straight", score: 95, type: "Overthinking Minister" },
      { text: "Suggest whatever is closest so I don't have to walk more than 50 feet", score: 60, type: "Professional Procrastinator" },
      { text: "Find a restaurant with a 2-for-1 coupon and convince everyone it's gourmet", score: 75, type: "Certified Chaos Champion" },
    ],
  },
];

export const PERSONALITY_RESULTS_EN: Record<
  string,
  { title: string; badge: string; quote: string; desc: string; strengths: string[]; weaknesses: string[]; desiQuote: string }
> = {
  "Overthinking Minister": {
    title: "Supreme Minister of Overthinking 🤯",
    badge: "Overthinking Minister",
    quote: "Why did they use a thumbs-up emoji instead of saying thank you?",
    desc: "Your brain is an unclosed 700-tab browser window playing loud circus music in the background. You analyze tone, punctuation, and eye contact like a forensic scientist.",
    strengths: ["Prepares for disasters that will never happen", "Elite memory for tiny details", "High emotional empathy"],
    weaknesses: ["Cannot pick a restaurant in under 40 minutes", "Loses sleep over 2017 conversations"],
    desiQuote: "Calm down: it's not a conspiracy, they were just driving!",
  },
  "Drama Department Head": {
    title: "Global Head of Melodrama 🎭",
    badge: "Drama Department Head",
    quote: "Nobody understands the depth of what I'm going through right now!",
    desc: "A minor inconvenience like rain on your weekend turns into a 3-act theatrical production. Life is your cinematic stage and everyone else is an unpaid extra.",
    strengths: ["Master storyteller", "Infinitely entertaining at dinner parties", "Expressive and passionate"],
    weaknesses: ["Zero chill", "Turns harmless misunderstandings into high diplomacy crises"],
    desiQuote: "Take a deep breath: it's just a spilled latte!",
  },
  "Bare Minimum Genius": {
    title: "Bare Minimum Maestro 🛋️",
    badge: "Bare Minimum Genius",
    quote: "If 50% is passing, why put in 51% effort?",
    desc: "A certified prodigy at calculating the exact least amount of energy required to achieve an acceptable outcome. Efficiency at its purest, laziest peak.",
    strengths: ["Zero burnout", "Immaculate stress management", "Incredible shortcuts and life hacks"],
    weaknesses: ["Will not move if the TV remote is 3 inches out of reach"],
    desiQuote: "Legendary conservation of biological energy!",
  },
  "Professional Procrastinator": {
    title: "Grandmaster of Procrastination ⏳",
    badge: "Professional Procrastinator",
    quote: "I'll definitely start tomorrow morning at 6:00 AM sharp!",
    desc: "You thrive on the terrifying adrenaline of impending disaster. You will vacuum the ceiling and reorganize your bookshelf before starting your actual assignment.",
    strengths: ["Superhuman speed under extreme deadline panic", "Cleans entire house during exam week"],
    weaknesses: ["'Tomorrow' is your favorite mythical location"],
    desiQuote: "Tomorrow never comes, bro—start typing today!",
  },
  "Secret Mastermind": {
    title: "Silent Strategic Mastermind ♟️",
    badge: "Secret Mastermind",
    quote: "I already predicted your next three moves before you sat down.",
    desc: "Quiet, observant, and subtly maneuvering friends and family like chess pawns. You know all the gossip, owe nobody money, and always leave the party on time.",
    strengths: ["Impeccable foresight", "Always has an exit strategy", "Zero public scandals"],
    weaknesses: ["Hard to read", "Trust issues dialed up to eleven"],
    desiQuote: "Keep playing chess while everyone else plays checkers!",
  },
  "Certified Bakchod": {
    title: "Certified Chaos Champion 🌪️",
    badge: "Certified Chaos Champion",
    quote: "Rules were meant to be lightly ignored for comedic value.",
    desc: "Unpredictable, hilarious, and the absolute heartbeat of the squad. You can turn a mundane DMV line into a stand-up comedy routine in under 3 minutes.",
    strengths: ["Infectious energy", "Cures squad depression instantly", "Fearless conversationalist"],
    weaknesses: ["Cannot be taken anywhere formal or serious"],
    desiQuote: "The world would be dreadfully boring without you!",
  },
};

// ==========================================
// TOOL 9: Udhaar Recovery Notice 💰 (English)
// ==========================================

export const UDHAAR_LINE_ITEMS_EN = [
  { label: "Principal Debt Amount", amount: 500, category: "Base Principal" },
  { label: "Emotional Distress & WhatsApp Ghosting Tax", amount: 2100, category: "Penalty" },
  { label: "Coffee, Snacks & Fuel Compensation", amount: 250, category: "Surcharge" },
  { label: "Audit Fee for Pathetic Excuses", amount: 150, category: "Administrative" },
];

export const UDHAAR_PUNCHLINES_EN = [
  "Warning: Continued evasion will result in loudspeaker announcements outside your apartment complex!",
  "Legal Notice: 'I will Venmo you tomorrow' has officially expired as a valid defense!",
  "Reserve Bank of Friendship clause: Shame on you, open your payment app and settle up!",
  "Defaulter Alert: Stop posting $15 brunch stories on Instagram and return my money first!",
];

// ==========================================
// TOOL 10: Shaadi Kalesh Predictor 🥁 (English)
// ==========================================

export const KALESH_QUESTIONS_EN: QuizQuestion[] = [
  {
    id: "kq1",
    question: "What is the wedding food and catering situation?",
    hint: "Catering quality and guest satisfaction!",
    options: [
      { text: "Unlimited gourmet appetizers, zero wait times, open bar", score: 10, tag: "Smooth Sailing 🥂" },
      { text: "Great food, but the dessert line stretches around the venue", score: 35, tag: "Minor Grumbling 🍰" },
      { text: "Appetizers run out 30 minutes in, uncles begin frowning", score: 75, tag: "Rising Tension 😤" },
      { text: "Cold food, delayed dinner by 3 hours, vegetarian guests starving", score: 98, tag: "Full-Blown Riot 💥" },
    ],
  },
  {
    id: "kq2",
    question: "What is the status of the DJ dance floor at 10:30 PM?",
    hint: "Music volume and generational clashes!",
    options: [
      { text: "Joyful crowd dancing together, volume balanced, pure fun", score: 10, tag: "Harmony 💃" },
      { text: "Boring tracklist, cousins complaining about lack of modern beats", score: 40, tag: "Boredom 🥱" },
      { text: "Loud argument over song choices between rival friend groups", score: 75, tag: "Mic Dispute 🎤" },
      { text: "Drunk uncle takes over the microphone and refuses to leave the stage", score: 98, tag: "Absolute Chaos 📢" },
    ],
  },
  {
    id: "kq3",
    question: "How are the extended family in-laws feeling right now?",
    hint: "Ego tolerance and perceived respect levels!",
    options: [
      { text: "Delighted, laughing, showering compliments on the couple", score: 10, tag: "Blessed 🌸" },
      { text: "Polite smiles, minor gossip about floral arrangements", score: 35, tag: "Standard Whisper 🤫" },
      { text: "Older relatives upset their names weren't announced first", score: 75, tag: "Ego Bruised 😾" },
      { text: "Threatening to boycott the reception dinner over seating arrangements", score: 98, tag: "Defcon 1 Alert 🚨" },
    ],
  },
];

const calmWeddingDiagnoses = [
  {
    title: "Peaceful Fairy Tale Wedding 🕊️",
    desc: "Miraculous! The food stayed warm, the DJ played crowd-pleasers, and in-laws were too busy enjoying the cake to start any drama. A 10/10 celebration.",
    punchline: "Zero drama detected—a true statistical miracle!",
  },
];

const moderateWeddingDiagnoses = [
  {
    title: "Simmering In-Law Discontent ⛅",
    desc: "Mild dramatic tension in the air. Two uncles are debating politics near the bar and someone complained about their hotel room view, but the party survives.",
    punchline: "Keep the desserts coming and nobody gets hurt!",
  },
];

const riotWeddingDiagnoses = [
  {
    title: "Royal Rumble Wedding Brawl 💥",
    desc: "Full theatrical catastrophe! The mic was seized, table centerpieces were knocked over, and the videographer has enough footage for a 6-part Netflix true crime documentary.",
    punchline: "Grab some popcorn and enjoy the reality TV show!",
  },
  {
    title: "High-Voltage Reception Drama ⚡",
    desc: "Danger level elevated! Appetizers ran short, the DJ skipped someone's favorite song, and the family elders are currently having an emergency summit in the lobby.",
    punchline: "Call in diplomatic reinforcements immediately!",
  },
];

export const KALESH_DIAGNOSES_EN = {
  calm: calmWeddingDiagnoses,
  moderate: moderateWeddingDiagnoses,
  riot: riotWeddingDiagnoses,
  low: calmWeddingDiagnoses,
  medium: moderateWeddingDiagnoses,
  high: riotWeddingDiagnoses,
  nuclear: riotWeddingDiagnoses,
};

// ==========================================
// TOOL 11: Trip Cancellation CBI 🕵️‍♂️ (English)
// ==========================================

export const TRIP_DESTINATIONS_EN = [
  "Beach Resort Getaway 🏖️",
  "Mountain Hiking Cabin 🏔️",
  "Weekend Vegas Road Trip 🎲",
  "European Backpacking Dream ✈️",
  "Lakefront Camping Weekend ⛺",
];

export const CBI_EXCUSES_EN = [
  { id: "mummy_mana", label: "“My parents suddenly said no” (Candidate age: 27 years)", icon: "👵" },
  { id: "boss_emergency", label: "Boss scheduled an emergency Friday 6 PM presentation", icon: "💼" },
  { id: "budget_issue", label: "Bank account threw a 404 Not Found error upon seeing the flight price", icon: "💸" },
  { id: "fake_sick", label: "Sudden phantom fever and scratchy throat 2 hours before takeoff", icon: "🤒" },
  { id: "seen_ghost", label: "Instant ghosting the second someone asked for booking deposits", icon: "👻" },
  { id: "partner_nakhre", label: "Partner said 'If you go without me, we are permanently over'", icon: "💔" },
];

export const CBI_ROLES_POOL_EN = [
  { role: "The Mastermind 🧠", desc: "Planted the seed for the trip, built the spreadsheet, and was the first to secretly back out!" },
  { role: "Last-Minute Flake 🐍", desc: "Claimed bags were packed, dropped out 15 minutes before the airport ride arrived." },
  { role: "Budget Negotiator 💸", desc: "Suggests camping in a tent outside an airport to save $14 on lodging." },
  { role: "The Innocent Victim 🥺", desc: "Packed clean clothes, took paid time off, and was left abandoned by the squad." },
  { role: "The Ghost Agent 👻", desc: "Reads all messages instantly, responds only after everyone has returned home." },
  { role: "Photographer Contractor 📸", desc: "Only invited because they own the latest camera phone, completely unaware of the conspiracy." },
];

// ==========================================
// TOOL 12: Reply Ka Bhikhari ⏳ (English)
// ==========================================

export const REPLY_WAIT_TIMES_EN = [
  { time: "15-30 Minutes", label: "Mild anxiety attack, checking lock screen 14 times", score: 20 },
  { time: "2-4 Hours", label: "“Their phone must be on silent” (Early delusion phase)", score: 45 },
  { time: "8-12 Hours", label: "Liked 6 memes on Instagram, but direct message is growing moss", score: 75 },
  { time: "24-48 Hours", label: "Time to hold a digital funeral service for this conversation", score: 92 },
  { time: "3+ Days", label: "“Maybe cellular towers in their city collapsed” (Terminal copium)", score: 99 },
];

export const REPLY_MESSAGE_TYPES_EN = [
  { type: "Casual Check-in", text: "“Hey, what are you up to today?”", score: 30 },
  { type: "Double Texting", text: "Sending two question marks ('??') and deleting in shame 30s later", score: 85 },
  { type: "Emotional Paragraph", text: "A 450-word retrospective essay analyzing our connection", score: 95 },
  { type: "Meme Forward", text: "Sending a hilarious reel and waiting anxiously for an LOL", score: 40 },
  { type: "Free Food Trap", text: "“Hey pizza treats are on me tonight!”", score: 10 },
];

// ==========================================
// TOOL 13: Salary Gayab 💸 (English)
// ==========================================

export const SALARY_BRACKETS_EN = [
  { label: "$1,500 - $3,000 (Student / Entry Survival)", value: 2500 },
  { label: "$3,000 - $6,000 (Middle Class Warrior)", value: 4500 },
  { label: "$6,000 - $12,000 (Corporate Grinder)", value: 9000 },
  { label: "$12,000+ (High Income Illusion)", value: 15000 },
];

export const EXPENSE_SINKHOLES_EN = [
  { id: "emi", label: "Smartphone / Car Loan / Student Debt Monthly Payment", drain: 40, icon: "📱" },
  { id: "swiggy", label: "Late Night Food Delivery, Cocktails & Dessert Orders", drain: 20, icon: "🍕" },
  { id: "credit_card", label: "Credit Card Minimum Balance (Infinite Bondage)", drain: 25, icon: "💳" },
  { id: "rent", label: "Apartment Rent & Utility Extortion", drain: 35, icon: "🏠" },
  { id: "subscriptions", label: "14 Unused Digital Streaming Subscriptions", drain: 15, icon: "📺" },
];

// ==========================================
// TOOL 14: Kal Se Pakka 🛋️ (English)
// ==========================================

export const GOAL_OPTIONS_EN = [
  { id: "gym", label: "Start Daily Gym & 6-Pack Fitness", icon: "💪" },
  { id: "study", label: "Study 4 Hours Daily & Master a Language", icon: "📚" },
  { id: "diet", label: "Quit Sugar, Junk Food & Eat Clean", icon: "🥗" },
  { id: "early", label: "Wake Up at 5:30 AM Every Single Day", icon: "⏰" },
];

export const PROCRASTINATION_EXCUSES_EN = [
  { id: "one_more_reel", label: "Just 1 more reel before starting (spirals into 3 hours of niche memes)", score: 25 },
  { id: "monday_rule", label: "Half the week is already gone, Monday is the true spiritual restart", score: 35 },
  { id: "gear_preparation", label: "Waiting for matching athletic gear and auspicious planetary alignment", score: 20 },
  { id: "mood_off", label: "Friend took 15 minutes to reply to my meme, completely ruined my productivity", score: 15 },
  { id: "weather_blame", label: "Atmosphere feels slightly overcast; leaving this blanket is officially illegal", score: 25 },
];

// ==========================================
// TOOL 15: Main Character Syndrome 🎬 (English)
// ==========================================

export const MAIN_CHARACTER_QUESTIONS_EN: QuizQuestion[] = [
  {
    id: "mc1",
    question: "When walking down the street with headphones on, what goes through your mind?",
    hint: "Soundtrack mindset check!",
    options: [
      { text: "Just enjoying the podcast or playlist, minding my own business", score: 10, tag: "Normal Citizen 🚶" },
      { text: "Walking exactly to the beat of the music, feeling slightly cool", score: 40, tag: "Rhythm Walker 🎧" },
      { text: "Pretending I'm the mysterious protagonist entering the city in a movie teaser", score: 85, tag: "Hollywood Lead 🎬" },
      { text: "Giving dramatic side-glances to strangers like they're background extras", score: 98, tag: "Full Main Character 🌟" },
    ],
  },
  {
    id: "mc2",
    question: "When it begins raining while you are in a car or bus, what do you do?",
    hint: "Rainy melodrama test!",
    options: [
      { text: "Check if the windshield wipers are working and look at the road", score: 10, tag: "Practical 🌧️" },
      { text: "Appreciate the cozy weather with a hot drink", score: 35, tag: "Cozy Vibe ☕" },
      { text: "Rest your forehead against the glass window looking deeply sorrowful", score: 80, tag: "Music Video Star 💔" },
      { text: "Imagine your entire tragic backstory being narrated by Morgan Freeman", score: 98, tag: "Oscar Nominated 🏆" },
    ],
  },
];

// ==========================================
// TOOL 16: Food Delivery Detective 🍕 (English)
// ==========================================

export const DELIVERY_DELAY_OPTIONS_EN = [
  { label: "15-20 Mins ('Driver is on the way')", factor: 1.2 },
  { label: "35-45 Mins ('Driver took an interesting detour')", factor: 1.8 },
  { label: "60+ Mins ('Delivery courier entered a wormhole')", factor: 2.5 },
];

export const HUNGER_LEVELS_EN = [
  { label: "Light Snack Craving 🍟", desc: "Patient and composed" },
  { label: "Proper Hunger 🍕", desc: "Standing by the front door holding a fork" },
  { label: "Hangry Apex Predator 🦖", desc: "Prepared to intercept and consume the entire courier bag" },
];

export const FOOD_CRIME_LOGS_EN = [
  "Courier accepted order, immediately parked outside a coffee kiosk for 14 unexplained minutes.",
  "GPS tracking shows delivery scooter making 4 clockwise loops around a random roundabout.",
  "Courier called asking 'What is your building landmark?' while currently 5 miles in opposite direction.",
  "Delivery status changed to 'Order picked up', but courier's recorded speed is 1.5 mph.",
  "Suspect entered your complex gates, then mysteriously vanished into another dimension.",
  "Delivery courier was spotted quality-testing one of your french fries at a red light.",
];

// ==========================================
// TOOL 17: Photo Delete Meter 📸 (English)
// ==========================================

export const PHOTO_FLAWS_EN = [
  { id: "double_chin", label: "Double chin detected under unforgiving high-resolution camera", count: 42 },
  { id: "bad_light", label: "Lighting makes me look like an escapee from passport photo control", count: 35 },
  { id: "fake_smile", label: "Smile looks like a hostage proof-of-life proof photograph", count: 50 },
  { id: "photobomb", label: "Random confused pedestrian staring directly into the lens", count: 28 },
  { id: "hair_mess", label: "Slight gust of wind turned my hairstyle into instant instant noodles", count: 38 },
];

// ==========================================
// TOOL 18: Fake Richness 💳 (English)
// ==========================================

export const FAKE_RICH_HABITS_EN = [
  { id: "starbucks_cup", label: "Keeping an empty Starbucks cup on desk for 4 weeks refilling tap water", points: 25 },
  { id: "mall_sunglasses", label: "Wearing dark designer sunglasses inside an air-conditioned mall", points: 20 },
  { id: "car_photo", label: "Casually leaning on an unfamiliar sports car hood in the valet lot", points: 30 },
  { id: "fake_accent", label: "Asking the diner server 'Could you fetch some lukewarm filtered water, ya?'", points: 25 },
  { id: "credit_swipe", label: "Reciting silent prayers during credit card reader authorization", points: 35 },
  { id: "luxury_bag", label: "Carrying an empty designer boutique shopping bag around downtown", points: 30 },
];

// ==========================================
// TOOL 19: Chai Startup Founder 🚀 (English)
// ==========================================

export const STARTUP_IDEAS_EN = [
  "Uber for Artisanal Doughnuts & Espresso ☕",
  "AI-Powered Relationship Dispute Mediator ⚖️",
  "Blockchain Sourdough Authentication Network 🍞",
  "Web3 Pet Mood Translator with Zero Retention 🐱",
  "SaaS Platform for Organizing Roommate Arguments 📱",
  "Disruptive Nap-As-A-Service for Tech Remote Workers 🛌",
];

export const PRE_REVENUE_HABITS_EN = [
  { id: "domain_logo", label: "Haven't written a single line of code, but bought a $2,500 .ai domain" },
  { id: "linkedin_stealth", label: "LinkedIn bio: 'Founder & CEO | Building in Stealth | Ex-Nothing'" },
  { id: "coffee_meetings", label: "Sitting 6 hours daily at third-wave coffee shops staring at pitch deck templates" },
  { id: "ted_gestures", label: "Rehearsing Steve Jobs product launches in front of the bathroom mirror" },
  { id: "merch_first", label: "Ordered embroidered company hoodies and stickers before building the MVP" },
];

// ==========================================
// TOOL 20: Treat Roulette 🎡 (English)
// ==========================================

export const TREAT_OCCASIONS_EN = [
  "Friday Night Pizza & Wings 🍕",
  "Post-Work Coffee & Pastries ☕",
  "Celebratory Promotion Feast 🥂",
  "Casual Weekend Lunch Outing 🍔",
  "Late-Night Taco Run 🌮",
];

export const TREAT_ENFORCEMENT_PUNCHLINES_EN = [
  "Enforcement Rule: The exit doors have been locked, escape is strictly impossible!",
  "Clause 420: If {name} claims their payment app is down, the squad will confiscate their phone and hotspot it!",
  "Penalty Warning: Taking longer than 2 minutes to scan the check incurs an mandatory extra dessert fee!",
  "Squad Verdict: Friendship is priceless, but tonight's dinner check belongs 100% to you!",
];
