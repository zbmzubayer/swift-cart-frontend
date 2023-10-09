import { LoaderIcon } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <div>
        <LoaderIcon className="w-14 h-14 text-amber-800 animate-ping" />
      </div>
    </div>
  );
}
