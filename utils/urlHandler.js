// utils/urlHandler.js
export function normalizeUrl(url) {
  try {
    // Primero decodificamos la URL completamente
    let decodedUrl = url;
    while (decodedUrl.includes("%")) {
      const prevUrl = decodedUrl;
      decodedUrl = decodeURIComponent(decodedUrl);
      if (prevUrl === decodedUrl) break;
    }

    // Removemos cualquier referencia previa al proxy
    if (decodedUrl.includes("/api/proxy?url=")) {
      decodedUrl = decodedUrl.split("/api/proxy?url=").pop();
    }

    // Ahora codificamos una sola vez
    return encodeURIComponent(decodedUrl);
  } catch (error) {
    console.error("Error normalizing URL:", error);
    return url;
  }
}
