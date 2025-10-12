import SettingsFunctions from "@/functions/settings.func";
import type { IUser } from "@/types/user.types";
import { User, Menu } from "lucide-react";
import { useEffect, useState } from "react";

const settingsFunctions = new SettingsFunctions()

export default function Topbar({ setSidebarOpen }: { setSidebarOpen: (v: boolean) => void }) {
  const [profile, setProfile] = useState<IUser>()

  useEffect(() => {
    settingsFunctions.getProfileInfo().then(res => setProfile(res.user))
  }, [])

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu size={22} className="text-gray-600" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <User size={20} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">{profile?.name}</span>
        </div>
      </div>
    </header>
  );
}
