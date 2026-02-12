import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <Loader className="animate-spin w-8 h-8 text-gray-500" />
        
      </div>
    </div>
  );
}
