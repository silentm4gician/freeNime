export default function LoadingSkeleton({ type = "card" }) {
  if (type === "hero") {
    return (
      <div className="w-full h-[500px] bg-secondary rounded-xl animate-pulse" />
    );
  }

  if (type === "card") {
    return (
      <div className="bg-card rounded-xl overflow-hidden shadow-lg animate-pulse">
        <div className="aspect-2/3 bg-secondary" />
        <div className="p-4 space-y-2">
          <div className="h-4 bg-secondary rounded w-3/4" />
          <div className="h-3 bg-secondary rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (type === "episode") {
    return (
      <div className="bg-card rounded-xl overflow-hidden shadow-lg animate-pulse">
        <div className="aspect-video bg-secondary" />
        <div className="p-3 space-y-2">
          <div className="h-3 bg-secondary rounded w-2/3" />
          <div className="h-2 bg-secondary rounded w-1/2" />
        </div>
      </div>
    );
  }

  return null;
}
