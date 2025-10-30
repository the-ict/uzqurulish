import {
  LayoutDashboard,
  FileText,
  CheckCircle,
  Map,
  FolderOpen,
  LogOut,
  X,
  Bell,
  CreditCard,
  File,
  User2Icon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { authFunctions } from "../functions/auth.func";

const menuItems = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} />, path: "/dashboard/overview" },
  { id: "projects", label: "Projects", icon: <FolderOpen size={18} />, path: "/dashboard/projects" },
  { id: "navigator", label: "Permit Navigator", icon: <FileText size={18} />, path: "/dashboard/navigator" },
  { id: "documents", label: "Document Generator", icon: <FileText size={18} />, path: "/dashboard/documents" },
  { id: "compliance", label: "Compliance Checker", icon: <CheckCircle size={18} />, path: "/dashboard/compliance" },
  { id: "zoning", label: "Zoning Advisor", icon: <Map size={18} />, path: "/dashboard/zoning" },
  { id: "support", label: "Support", icon: <FileText size={18} />, path: "/dashboard/support" },
  { id: "profile", label: "Profile", icon: <User2Icon size={18} />, path: "/dashboard/settings" },
  { id: "documents-page", label: "All Documents", icon: <File size={18} />, path: "/dashboard/documents-page" },
  { id: "subscription", label: "Subscription", icon: <CreditCard size={18} />, path: "/dashboard/subscription" },
];

export default function Sidebar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)}></div>
      )}

      <aside
        className={`fixed lg:static z-40 bg-white w-64 border-r border-gray-200 flex flex-col transform transition-transform duration-200 
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          <span className="text-xl font-bold text-indigo-600 cursor-pointer">UzQurilish AI</span>
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center px-3 py-2 text-sm rounded-lg transition ${location.pathname === item.path
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center text-gray-600 hover:text-red-500 transition cursor-pointer" onClick={() => authFunctions.logout()}>
            <LogOut size={14} className="mr-2" /> Chiqish
          </button>
        </div>
      </aside>
    </>
  );
}
