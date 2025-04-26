export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response("Missing url parameter", { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        Origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      },
    });

    // Forward all headers from the original response
    const headers = new Headers();
    response.headers.forEach((value, key) => {
      headers.set(key, value);
    });

    // Add CORS headers
    headers.set("Access-Control-Allow-Origin", "*");

    // Get the response body as an array buffer
    const data = await response.arrayBuffer();

    return new Response(data, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(`Proxy error: ${error.message}`, { status: 500 });
  }
}
