import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary Aayi, Gayab Hui 💸 — Lightning-Fast Financial Demise",
  description: "Find out how many minutes your salary survives after EMIs, Swiggy, and credit cards. A hilarious financial survival audit.",
  openGraph: {
    title: "Salary Aayi, Gayab Hui 💸 | FullTimePass.in",
    description: "Salary 9 baje aayi, 9:07 par EMI ne shraddhanjali de di! Check your salary lifespan.",
    url: "https://fulltimepass.in/salary-gayab",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
