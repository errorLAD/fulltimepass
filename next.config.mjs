/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverComponentsExternalPackages: ["msedge-tts", "ws"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/delulumeter", destination: "/red-flag-meter", permanent: false },
      { source: "/delulu-meter", destination: "/red-flag-meter", permanent: false },
      { source: "/shaadikabhogi", destination: "/shaadi-market-value", permanent: false },
      { source: "/shaadi-kab-hogi", destination: "/shaadi-market-value", permanent: false },
      { source: "/groupkagadhaa", destination: "/group-chat-roles", permanent: false },
      { source: "/group-ka-gadhaa", destination: "/group-chat-roles", permanent: false },
      { source: "/futurebelike", destination: "/chai-startup-founder", permanent: false },
      { source: "/future-be-like", destination: "/chai-startup-founder", permanent: false },
      { source: "/mummykomatbatana", destination: "/family-whatsapp-chat", permanent: false },
      { source: "/mummy-ko-mat-batana", destination: "/family-whatsapp-chat", permanent: false },
      { source: "/guesskaroindia", destination: "/trip-cancellation-cbi", permanent: false },
      { source: "/guess-karo-india", destination: "/trip-cancellation-cbi", permanent: false },
      { source: "/bahanagenerator", destination: "/kal-se-pakka", permanent: false },
      { source: "/bahana-generator", destination: "/kal-se-pakka", permanent: false },
    ];
  },
};

export default nextConfig;
