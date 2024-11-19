export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let url = searchParams.get("url");

  if (!url) {
    return new Response("URL parameter is required", { status: 400 });
  }

  try {
    // Decodificar la URL completamente y remover referencias al proxy
    while (url.includes("%")) {
      const prevUrl = url;
      url = decodeURIComponent(url);
      if (prevUrl === url) break;
    }

    // Remover cualquier referencia previa al proxy
    if (url.includes("/api/proxy?url=")) {
      url = url.split("/api/proxy?url=").pop();
    }

    const response = await fetch(url, {
      headers: {
        Origin: "null",
        Referer: new URL(url).origin,
        "User-Agent": request.headers.get("user-agent") || "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      console.error(`Proxy error: ${response.status} ${response.statusText}`);
      return new Response(
        `Proxy error: ${response.status} ${response.statusText}`,
        {
          status: response.status,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type":
        response.headers.get("content-type") || "application/vnd.apple.mpegurl",
      "Cache-Control": "no-cache",
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("mpegurl")) {
      const text = await response.text();
      return new Response(text, { headers });
    }

    return new Response(response.body, {
      headers,
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response("Error fetching content: " + error.message, {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
