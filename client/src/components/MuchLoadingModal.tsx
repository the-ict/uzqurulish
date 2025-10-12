import { Loader2 } from "lucide-react";


export default function MuchLoadingModal() {
  return (
    <div className="h-screen w-screen bg-black/70 flex items-center justify-center fixed top-0 left-0 z-50">
      <div className="w-20 h-20 rounded-lg flex items-center flex-col justify-center">
        <h1 className="text-center font-medium text-sm text-gray-500">
          Bu jarayon biroz vaqt olishi mumkin{" "}
          <span className="text-red-500">iltimos sahifani yopmang!</span>
        </h1>
        <div className="w-12 h-12">
          <Loader2 className="animate-spin"/>
        </div>
      </div>
    </div>
  );
}
