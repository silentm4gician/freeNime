export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response("Missing url parameter", { status: 400 });
  }

  // Check if the URL is already being proxied and extract the actual URL
  let targetUrl = url;
  if (url.includes("/api/proxy?url=")) {
    try {
      // Extract the actual URL from the nested proxy URL
      const nestedUrlMatch = url.match(/\/api\/proxy\?url=([^&]+)/);
      if (nestedUrlMatch && nestedUrlMatch[1]) {
        targetUrl = decodeURIComponent(nestedUrlMatch[1]);
      }
    } catch (e) {
      console.error("Error parsing nested proxy URL:", e);
    }
  }

  try {
    // console.log("Proxying request to:", targetUrl);

    // Create a fetch request with appropriate headers
    const response = await fetch(targetUrl, {
      headers: {
        Origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        Referer: new URL(targetUrl).origin,
        "User-Agent":
          request.headers.get("User-Agent") ||
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
      },
    });

    if (!response.ok) {
      return new Response(
        `Upstream server responded with ${response.status}: ${response.statusText}`,
        {
          status: response.status,
        }
      );
    }
    // Forward all headers from the original response
    const headers = new Headers();
    response.headers.forEach((value, key) => {
      // Don't forward content-encoding as we're going to decode it
      if (key.toLowerCase() !== "content-encoding") {
        headers.set(key, value);
      }
    });

    // Add CORS headers
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Special handling for m3u8 files
    const contentType = response.headers.get("content-type");
    if (
      url.includes(".m3u8") ||
      (contentType && contentType.includes("application/vnd.apple.mpegurl"))
    ) {
      const text = await response.text();

      // Extract domain from original URL
      const urlObj = new URL(url);
      const basePath = url.substring(0, url.lastIndexOf("/") + 1);

      // Rewrite relative URLs to absolute ones
      const rewrittenText = text
        .replace(/(#EXT-X-STREAM-INF:.+\n)(.+)/g, (match, p1, p2) => {
          if (!p2.startsWith("http")) {
            // Relative URL - make it absolute
            return `${p1}${new URL(p2, basePath).toString()}`;
          }
          return match;
        })
        .replace(/(#EXTINF:.+\n)(.+)/g, (match, p1, p2) => {
          if (!p2.startsWith("http")) {
            // Relative URL - make it absolute
            return `${p1}${new URL(p2, basePath).toString()}`;
          }
          return match;
        });

      headers.set("Content-Type", "application/vnd.apple.mpegurl");
      return new Response(rewrittenText, {
        status: response.status,
        headers,
      });
    }

    // For VTT subtitle files
    if (
      url.includes(".vtt") ||
      (contentType && contentType.includes("text/vtt"))
    ) {
      headers.set("Content-Type", "text/vtt");
      const text = await response.text();
      return new Response(text, {
        status: response.status,
        headers,
      });
    }

    // For all other content, stream the response
    return new Response(response.body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(`Proxy error: ${error.message}`, { status: 500 });
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
