"use client";

import React from "react";
import { useLanguage } from "@/lib/language/LanguageContext";

const BRO_RULES_HI = [
  "RULE #1: Dost ki beizzati karna is compulsory love 👊",
  "RULE #2: Goa plan sirf baatein karne ke liye banta hai, jaane ke liye nahi 🏖️",
  "RULE #3: Bill split pe 'Bhai meri UPI hang ho gayi' bolna is high-level crime 💸",
  "RULE #4: Raat 2:00 AM ex ko message bheja toh group chat mein boycott 🚫",
  "RULE #5: Tapri pe baith ke Ambani ko business advice dena mandatory hai ☕",
  "RULE #6: Treat ke time washroom mein chhupne wale ko samosa cess lagega 🥟",
  "RULE #7: 'Bas 5 minute mein pahunch raha hoon' means agle janam milenge ⏰",
  "RULE #8: Dost ke phone ka lock khole bina gallery scroll karna illegal hai 📱",
  "RULE #9: Har result ko Desi Bhai ya Comedy Uncle ki aawaz mein sunna compulsory hai 🎙️",
];

const BRO_RULES_EN = [
  "RULE #1: Roasting your best friend is mandatory unconditional love 👊",
  "RULE #2: Beach vacation plans exist purely for group chat hype, never for departure 🏖️",
  "RULE #3: Claiming 'My payment app crashed' when the check arrives is a felony 💸",
  "RULE #4: Texting your ex after 2:00 AM results in an immediate squad boycott 🚫",
  "RULE #5: Drinking cheap coffee while giving Fortune 500 business advice is mandatory ☕",
  "RULE #6: Hiding in the bathroom when the bill drops incurs a mandatory dessert penalty 🍰",
  "RULE #7: 'I'm 5 minutes away' means I haven't crawled out of bed yet ⏰",
  "RULE #8: Borrowing your friend's fast charger without asking is strictly universal law 🔌",
  "RULE #9: Listening to your results in Comedy Uncle or Desi Bhai voice is squad law 🎙️",
];

export default function BroCodeTicker() {
  const { language } = useLanguage();
  const rules = language === "en" ? BRO_RULES_EN : BRO_RULES_HI;

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-amber-100/70 via-orange-50 to-amber-100/70 border-y border-amber-200 py-2.5 select-none relative z-20 shadow-xs">
      <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
        {[...rules, ...rules].map((rule, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="text-slate-800 font-semibold text-xs sm:text-sm tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <span>{rule}</span>
            </span>
            <span className="text-amber-500 font-bold text-xs sm:text-sm">⚡</span>
          </div>
        ))}
      </div>
    </div>
  );
}
