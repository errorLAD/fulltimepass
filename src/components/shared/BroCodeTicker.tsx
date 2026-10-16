"use client";

import React from "react";
import { Zap, Skull, Flame, Sparkles } from "lucide-react";

const BRO_RULES = [
  "RULE #1: Dost ki beizzati karna is compulsory love 👊",
  "RULE #2: Goa plan sirf baatein karne ke liye banta hai, jaane ke liye nahi 🏖️",
  "RULE #3: Bill split pe 'Bhai meri UPI hang ho gayi' bolna is high-level crime 💸",
  "RULE #4: Raat 2:00 AM ex ko message bheja toh group chat mein boycott 🚫",
  "RULE #5: Tapri pe baith ke Ambani ko business advice dena mandatory hai ☕",
  "RULE #6: Treat ke time washroom mein chhupne wale ko samosa cess lagega 🥟",
  "RULE #7: 'Bas 5 minute mein pahunch raha hoon' means agle janam milenge ⏰",
  "RULE #8: Dost ke phone ka lock khole bina gallery scroll karna illegal hai 📱",
];

export default function BroCodeTicker() {
  return (
    <div className="w-full overflow-hidden bg-funky-yellow border-y-4 border-black py-2.5 shadow-brutal select-none relative z-20">
      <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
        {[...BRO_RULES, ...BRO_RULES].map((rule, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black shrink-0" />
              <span>{rule}</span>
            </span>
            <span className="text-black/40 font-black text-sm">⚡</span>
          </div>
        ))}
      </div>
    </div>
  );
}
