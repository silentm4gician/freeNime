import Image from "next/image";
import Link from "next/link";

export default function SeasonsList({ seasons }) {
  if (!seasons || seasons.length === 0) return null;

  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-purple-900/20">
      <h3 className="text-lg font-semibold mb-4 text-white">Seasons</h3>

      <div className="space-y-3">
        {seasons.map((season) => (
          <Link
            key={season.id}
            href={`/anime/${season.id}`}
            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
              season.isCurrent ? "bg-purple-900/30" : "hover:bg-gray-800"
            }`}
          >
            <div className="relative w-10 h-14 flex-shrink-0">
              <Image
                src={season.poster || "/placeholder.svg"}
                alt={season.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white line-clamp-1">
                {season.title}
              </h4>
              <p className="text-xs text-gray-400 line-clamp-1">
                {season.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
