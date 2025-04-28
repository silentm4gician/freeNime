export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  // Prepare CORS headers for all responses
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Cross-Origin-Resource-Policy": "cross-origin",
    "Cross-Origin-Opener-Policy": "same-origin",
  };

  if (!url) {
    return new Response("Missing url parameter", { status: 400, headers: corsHeaders });
  }

  // Extract actual target URL if nested
  let targetUrl = url;
  if (url.includes("/api/subtitle?url=")) {
    try {
      const nestedUrlMatch = url.match(/\/api\/subtitle\?url=([^&]+)/);
      if (nestedUrlMatch && nestedUrlMatch[1]) {
        targetUrl = decodeURIComponent(nestedUrlMatch[1]);
      }
    } catch (e) {
      console.error("Error parsing nested proxy URL:", e);
    }
  }

  try {
    console.log("Proxying subtitle request to:", targetUrl);

    // Fetch subtitle file with comprehensive headers
    const response = await fetch(targetUrl, {
      headers: {
        Origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        Referer: new URL(targetUrl).origin,
        "User-Agent":
          request.headers.get("User-Agent") ||
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (!response.ok) {
      return new Response(
        `Upstream server responded with ${response.status}: ${response.statusText}`,
        {
          status: response.status,
          headers: corsHeaders,
        }
      );
    }

    // Always force Content-Type to text/vtt for .vtt files or if upstream is text/vtt
    const isVtt = targetUrl.toLowerCase().endsWith(".vtt") ||
      response.headers.get("Content-Type")?.includes("text/vtt");

    if (isVtt) {
      const text = await response.text();
      return new Response(text, {
        status: response.status,
        headers: {
          ...corsHeaders,
          "Content-Type": "text/vtt",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    // For all other content, stream response and forward headers
    const headers = new Headers();
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "content-encoding") {
        headers.set(key, value);
      }
    });
    Object.entries(corsHeaders).forEach(([k, v]) => headers.set(k, v));

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(`Proxy error: ${error.message}`, { status: 500, headers: corsHeaders });
  }
}

// Add OPTIONS method handler for CORS preflight requests
export async function OPTIONS() {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  });

  return new Response(null, {
    status: 204,
    headers,
  });
}
