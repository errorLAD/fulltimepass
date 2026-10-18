import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Privacy-preserving country detection API route.
 * Used ONLY as a fallback for automatic language selection.
 * Does NOT log, record, or track individual users or IP addresses.
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Inspect standard edge/CDN country headers (Cloudflare, Vercel, AWS CloudFront, Fastly)
    const headers = request.headers;
    const countryHeader =
      headers.get("x-vercel-ip-country") ||
      headers.get("cf-ipcountry") ||
      headers.get("x-country-code") ||
      headers.get("cloudfront-viewer-country") ||
      headers.get("x-geo-country");

    if (countryHeader && countryHeader.length === 2) {
      const countryCode = countryHeader.toUpperCase();
      return NextResponse.json(
        {
          country: countryCode,
          isIndia: countryCode === "IN",
          source: "header",
        },
        {
          headers: {
            "Cache-Control": "private, no-store, max-age=0",
          },
        }
      );
    }

    // 2. Fallback check for local development or non-CDN environments
    // Check client IP header (without logging or storing)
    const forwardedFor = headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : null;

    // Check if loopback/private IP (local development)
    const isLocalhost =
      !clientIp ||
      clientIp === "127.0.0.1" ||
      clientIp === "::1" ||
      clientIp.startsWith("192.168.") ||
      clientIp.startsWith("10.") ||
      clientIp.startsWith("172.16.");

    if (isLocalhost) {
      // For local development, check client's Accept-Language or default to unknown
      const acceptLanguage = headers.get("accept-language") || "";
      const isIndianLocale =
        acceptLanguage.includes("hi") ||
        acceptLanguage.includes("IN") ||
        acceptLanguage.includes("en-IN");

      return NextResponse.json(
        {
          country: isIndianLocale ? "IN" : "UNKNOWN",
          isIndia: isIndianLocale,
          source: "local-dev",
        },
        {
          headers: {
            "Cache-Control": "private, no-store, max-age=0",
          },
        }
      );
    }

    // 3. Fallback: If external IP check is available and fast, do a lightweight query with 1s timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);

      const res = await fetch(`https://ipapi.co/${clientIp}/country/`, {
        signal: controller.signal,
        headers: { "User-Agent": "FullTimePass-GeoCheck/1.0" },
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const text = (await res.text()).trim().toUpperCase();
        if (text && text.length === 2) {
          return NextResponse.json(
            {
              country: text,
              isIndia: text === "IN",
              source: "fallback-lookup",
            },
            {
              headers: {
                "Cache-Control": "private, no-store, max-age=0",
              },
            }
          );
        }
      }
    } catch {
      // Graceful fallback if external lookup fails or times out
    }

    // Default failure case: default to unknown (client will default to English)
    return NextResponse.json(
      {
        country: "UNKNOWN",
        isIndia: false,
        source: "default",
      },
      {
        headers: {
          "Cache-Control": "private, no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        country: "UNKNOWN",
        isIndia: false,
        source: "error",
      },
      { status: 200 }
    );
  }
}
