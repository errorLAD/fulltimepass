import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Feedback | FullTimePass.in",
  description:
    "Have a hilarious desi tool idea, feedback, or custom roast dialogue? Reach out to the FullTimePass.in team.",
  alternates: {
    canonical: "https://fulltimepass.in/contact",
  },
  openGraph: {
    title: "Contact Us & Feedback | FullTimePass.in",
    description:
      "Have a hilarious desi tool idea or feedback? Drop a note to the FullTimePass.in squad.",
    url: "https://fulltimepass.in/contact",
    siteName: "FullTimePass.in",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us & Feedback | FullTimePass.in",
    description:
      "Have a hilarious desi tool idea or feedback? Drop a note to the FullTimePass.in squad.",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://fulltimepass.in",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Contact Us",
      "item": "https://fulltimepass.in/contact",
    },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {children}
    </>
  );
}
