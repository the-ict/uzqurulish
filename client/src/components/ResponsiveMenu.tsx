import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  ChevronDown,
  Globe,
  Home,
  FileText,
  MapPin,
  BarChart3,
  Settings,
  LogOut,
  Star,
} from "lucide-react";
import { authFunctions } from "../functions/auth.func";
import SettingsFunctions from "@/functions/settings.func";
import type { IUser } from "@/types/user.types";

const menuItems = [
  { id: "home", label: "Bosh sahifa", icon: <Home size={18} />, path: "/" },
  {
    id: "features",
    label: "Xususiyatlar",
    icon: <Star size={18} />,
    path: "/#features",
  },
  {
    id: "how-it-works",
    label: "Qanday ishlaydi",
    icon: <FileText size={18} />,
    path: "/#how-it-works",
  },
  // {
  //   id: "pricing",
  //   label: "Narxlar",
  //   icon: <BarChart3 size={18} />,
  //   path: "/#pricing",
  // },
  // {
  //   id: "zoning",
  //   label: "Zoning Advisor",
  //   icon: <MapPin size={18} />,
  //   path: "/dashboard/zoning",
  // },
  // {
  //   id: "dashboard",
  //   label: "Dashboard",
  //   icon: <BarChart3 size={18} />,
  //   path: "/dashboard/overview",
  // },
];

const userMenuItems = [
  {
    id: "profile",
    label: "Profil",
    icon: <User size={16} />,
    path: "/dashboard/settings",
  },
  {
    id: "settings",
    label: "Sozlamalar",
    icon: <Settings size={16} />,
    path: "/dashboard/settings",
  },
  {
    id: "logout",
    label: "Chiqish",
    icon: <LogOut size={16} />,
    path: "/logout",
  },
];

const settingsFunctions = new SettingsFunctions()

export default function ResponsiveMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<IUser>()

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    settingsFunctions.getProfileInfo().then((profile) =>{
      setProfile(profile.user)
    })

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isUserMenuOpen) setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const isActive = (path: string) => {
    return location.hash === path.split("/")[1];
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold">UQI</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
                UzQurilish AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4"> 
            {/* Language Selector */}
            

            {/* User Menu */}
            {authFunctions.isAuthenticated() && (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-indigo-600" />
                  </div>
                  <ChevronDown
                    size={16}
                    className={`ml-1 text-gray-500 transform transition-transform duration-200 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isUserMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {authFunctions.isAuthenticated() ? (
              <Link
                to="/dashboard/overview"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors duration-200"
              >
                Kirish
              </Link>
            ) : (
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors duration-200"
              >
                Ro'yhatdan o'ting!
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>


      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </a>
            ))}
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {profile?.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {profile?.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 px-2 space-y-1">
              {userMenuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => {
                    if(item.id === "logout") {
                      authFunctions.logout();
                      setIsOpen(false);
                    }else {
                      window.location.href = item.path;
                    }
                  }}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </div>
              ))}
            </div>


            <div className="mt-4 px-4">
              <Link
                to="/dashboard/overview"
                className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-center font-medium hover:bg-indigo-700 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Kirish
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
