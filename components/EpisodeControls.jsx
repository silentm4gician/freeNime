import { ChevronLeft, ChevronRight, Download } from "lucide-react";

export default function EpisodeControls({
  onPrevious,
  onNext,
  onDownload,
  hasPrevious,
  hasNext,
  hasDownload,
}) {
  return (
    <div className="mt-6 flex items-center justify-end gap-4">
      <div className="flex gap-2">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`flex items-center px-1 py-1 rounded-lg transition-colors ${
            !hasPrevious
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`flex items-center px-1 py-1 rounded-lg transition-colors ${
            !hasNext
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {hasDownload && (
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
        >
          <Download className="w-5 h-5" />
          Download
        </button>
      )}
    </div>
  );
}
