import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-purple-500 animate-spin">
        <Loader2 size={32} />
      </div>
    </div>
  );
}
