export default function VideoSection({ videos }) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="bg-gray-900 rounded-lg p-6 border border-purple-900/20">
      <h2 className="text-xl font-bold mb-4 text-white">Trailers & Videos</h2>

      <div className="grid grid-cols-1 gap-4">
        {videos.map((video, index) => (
          <div key={index} className="space-y-2">
            {video.title && (
              <h3 className="text-white font-medium">{video.title}</h3>
            )}
            <div className="relative pt-[56.25%] overflow-hidden rounded-lg">
              <iframe
                src={video.source}
                title={video.title || `Video ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
