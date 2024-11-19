'use client';

import { Loader2 } from 'lucide-react';

export default function LoadingScreen({ message = 'Loading...' }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
      <p className="text-lg text-gray-400">{message}</p>
    </div>
  );
}