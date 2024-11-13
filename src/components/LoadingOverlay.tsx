import React from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  message: string;
}

export default function LoadingOverlay({ message }: Props) {
  return (
    <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center rounded-lg">
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-lg">
        <Loader2 className="animate-spin text-indigo-600" size={20} />
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}