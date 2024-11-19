// export default function EpisodeList({ episodes, currentIndex, onEpisodeClick }) {
//   return (
//     <div className="mt-8">
//       <h2 className="text-xl font-semibold mb-4">All Episodes</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         {episodes.map((ep, index) => (
//           <button
//             key={ep.id}
//             onClick={() => onEpisodeClick(ep.id)}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//               index === currentIndex
//                 ? 'bg-purple-600 text-white'
//                 : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
//             }`}
//           >
//             Episode {ep.number}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// components/EpisodeList.jsx
import React from "react";
import Link from "next/link";
import { Play, Star } from "lucide-react";

export function EpisodeList({ formatedEP, animeData, anime }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-2">
      {formatedEP.map((episode) => (
        <Link
          key={episode.id}
          href={`/watch/${episode.id}`}
          className="group bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all"
        >
          <div className="aspect-video relative">
            <img
              src={animeData.name ? episode.image : anime.image}
              alt={episode.name || episode.id}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play className="w-12 h-12 text-purple-500" />
            </div>
            <div className="absolute top-2 right-2 px-2 py-1 bg-purple-500/80 rounded text-sm font-semibold">
              EP {episode.number}
            </div>
            {animeData.name && (
              <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 rounded-md text-sm font-semibold flex justify-center items-center gap-1">
                <Star size={15} className="text-yellow-400" />
                {episode.vote_average}
              </div>
            )}
          </div>
          <div className="p-3 flex justify-between">
            <h3 className="font-semibold line-clamp-2 group-hover:text-purple-400 transition-colors">
              {animeData.name ? episode.name : `Episode ${episode.number}`}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
