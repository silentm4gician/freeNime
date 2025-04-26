import Image from "next/image";
import Link from "next/link";

export default function CharactersList({ characters }) {
  if (!characters || characters.length === 0) return null;

  return (
    <section className="bg-gray-900 rounded-lg p-6 border border-purple-900/20">
      <h2 className="text-xl font-bold mb-4 text-white">
        Characters & Voice Actors
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {characters.map((item, index) => (
          <div
            key={index}
            className="flex bg-gray-800 rounded-lg overflow-hidden"
          >
            {/* Character */}
            <div className="flex items-center p-2 flex-1">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                <Image
                  src={item.character.poster || "/placeholder.svg"}
                  alt={item.character.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <Link
                  href={`/character/${item.character.id}`}
                  className="text-white hover:text-purple-400 font-medium text-sm"
                >
                  {item.character.name}
                </Link>
                <p className="text-gray-400 text-xs">{item.character.cast}</p>
              </div>
            </div>

            {/* Voice Actor */}
            {item.voiceActor && (
              <div className="flex items-center p-2 flex-1 bg-gray-850">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                  <Image
                    src={item.voiceActor.poster || "/placeholder.svg"}
                    alt={item.voiceActor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <Link
                    href={`/voice-actor/${item.voiceActor.id}`}
                    className="text-white hover:text-purple-400 font-medium text-sm"
                  >
                    {item.voiceActor.name}
                  </Link>
                  <p className="text-gray-400 text-xs">
                    {item.voiceActor.cast}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {characters.length > 6 && (
        <div className="mt-4 text-center">
          <button className="text-purple-400 hover:text-purple-300 text-sm">
            View All Characters
          </button>
        </div>
      )}
    </section>
  );
}
