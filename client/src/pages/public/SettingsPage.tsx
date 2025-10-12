// pages/dashboard/SettingsPage.tsx
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  Bell,
  Shield,
  Monitor,
  Mail,
  Smartphone,
  Moon,
  Sun,
  Save,
  Trash2,
  CreditCard,
  Key,
} from "lucide-react";
import SettingsFunctions from "../../functions/settings.func";
import type { IUser } from "../../types/user.types";

const settingsFunctions = new SettingsFunctions();

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  frequency: "immediate" | "daily" | "weekly";
}

interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  language: "uz" | "ru" | "en";
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  sessionTimeout: number;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      email: true,
      push: true,
      sms: false,
      frequency: "immediate",
    });
  const [appearanceSettings, setAppearanceSettings] =
    useState<AppearanceSettings>({
      theme: "light",
      language: "uz",
    });
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30,
  });
  const [profileData, setProfileData] = useState<IUser>({
    name: "",
    email: "",
    company: "",
    role: "user",
    subscriptionType: "free",
    subscriptionExpires: new Date(),
    avatarUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 0,
    password: "",
  });

  useEffect(() => {
    settingsFunctions
      .getProfileInfo()
      .then((res) => {
        if (res && "user" in res) {
          setProfileData(res.user);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  const handleNotificationChange = (
    key: keyof NotificationSettings,
    value: any
  ) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value,
    });
  };

  const handleAppearanceChange = (
    key: keyof AppearanceSettings,
    value: any
  ) => {
    setAppearanceSettings({
      ...appearanceSettings,
      [key]: value,
    });
  };

  const handleSecurityChange = (key: keyof SecuritySettings, value: any) => {
    setSecuritySettings({
      ...securitySettings,
      [key]: value,
    });
  };

  const handleProfileChange = (key: string, value: string) => {
    setProfileData({
      ...profileData,
      [key]: value,
    });
  };

  const saveSettings = () => {
    const {
      id,
      email,
      password,
      createdAt,
      updatedAt,
      deletedAt,
      role,
      subscriptionType,
      subscriptionExpires,
      avatarUrl,
      ...rest
    } = profileData;

    settingsFunctions.updateProfile(rest).then((res) => {
      window.location.reload();
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Sozlamalar</h1>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-3 font-medium text-sm cursor-pointer ${
              activeTab === "profile"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profil
          </button>
        </div>

        <div className="p-6">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">
                Profil ma'lumotlari
              </h2>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ism
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={profileData.name}
                    onChange={(e) =>
                      handleProfileChange("name", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kompaniya
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={profileData.company}
                    onChange={(e) =>
                      handleProfileChange("company", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={saveSettings}
                  className="px-4 py-2 bg-indigo-600 cursor-pointer text-white rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  <Save className="mr-2" size={18} />
                  Saqlash
                </button>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">
                Bildirishnoma sozlamalari
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Mail className="text-gray-500 mr-3" size={20} />
                    <div>
                      <h3 className="font-medium">Email bildirishnomalari</h3>
                      <p className="text-sm text-gray-500">
                        Muhim yangiliklar va yangilanishlar
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="email-notifications"
                      className="sr-only"
                      checked={notificationSettings.email}
                      onChange={() =>
                        handleNotificationChange(
                          "email",
                          !notificationSettings.email
                        )
                      }
                    />
                    <label
                      htmlFor="email-notifications"
                      className={`block h-6 w-10 rounded-full cursor-pointer ${
                        notificationSettings.email
                          ? "bg-indigo-600"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                          notificationSettings.email
                            ? "transform translate-x-4"
                            : ""
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Smartphone className="text-gray-500 mr-3" size={20} />
                    <div>
                      <h3 className="font-medium">Push bildirishnomalari</h3>
                      <p className="text-sm text-gray-500">
                        Brauzer orqali bildirishnomalar
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="push-notifications"
                      className="sr-only"
                      checked={notificationSettings.push}
                      onChange={() =>
                        handleNotificationChange(
                          "push",
                          !notificationSettings.push
                        )
                      }
                    />
                    <label
                      htmlFor="push-notifications"
                      className={`block h-6 w-10 rounded-full cursor-pointer ${
                        notificationSettings.push
                          ? "bg-indigo-600"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                          notificationSettings.push
                            ? "transform translate-x-4"
                            : ""
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Smartphone className="text-gray-500 mr-3" size={20} />
                    <div>
                      <h3 className="font-medium">SMS bildirishnomalari</h3>
                      <p className="text-sm text-gray-500">
                        Muhim xabarlarni SMS orqali oling
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="sms-notifications"
                      className="sr-only"
                      checked={notificationSettings.sms}
                      onChange={() =>
                        handleNotificationChange(
                          "sms",
                          !notificationSettings.sms
                        )
                      }
                    />
                    <label
                      htmlFor="sms-notifications"
                      className={`block h-6 w-10 rounded-full cursor-pointer ${
                        notificationSettings.sms
                          ? "bg-indigo-600"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                          notificationSettings.sms
                            ? "transform translate-x-4"
                            : ""
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium mb-3">
                    Bildirishnomalar chastotasi
                  </h3>
                  <div className="space-y-2">
                    {[
                      { value: "immediate", label: "Darhol" },
                      { value: "daily", label: "Kunlik yig'indisi" },
                      { value: "weekly", label: "Haftalik yig'indisi" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          id={`frequency-${option.value}`}
                          name="frequency"
                          className="mr-3"
                          checked={
                            notificationSettings.frequency === option.value
                          }
                          onChange={() =>
                            handleNotificationChange("frequency", option.value)
                          }
                        />
                        <label
                          htmlFor={`frequency-${option.value}`}
                          className="text-sm"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={saveSettings}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  <Save className="mr-2" size={18} />
                  Saqlash
                </button>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">
                Ko'rinish sozlamalari
              </h2>

              <div className="space-y-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium mb-3">Mavzu</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        value: "light",
                        label: "Yorug'",
                        icon: <Sun size={24} />,
                      },
                      {
                        value: "dark",
                        label: "Qorong'u",
                        icon: <Moon size={24} />,
                      },
                      {
                        value: "system",
                        label: "Tizim",
                        icon: <Monitor size={24} />,
                      },
                    ].map((theme) => (
                      <div
                        key={theme.value}
                        className={`p-4 border rounded-lg cursor-pointer text-center ${
                          appearanceSettings.theme === theme.value
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() =>
                          handleAppearanceChange("theme", theme.value)
                        }
                      >
                        <div className="flex justify-center mb-2">
                          {theme.icon}
                        </div>
                        <span className="text-sm">{theme.label}</span>
                        {appearanceSettings.theme === theme.value && (
                          <div className="mt-2 flex justify-center">
                            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium mb-3">Til</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { value: "uz", label: "O'zbekcha" },
                      { value: "ru", label: "Русский" },
                      { value: "en", label: "English" },
                    ].map((lang) => (
                      <div
                        key={lang.value}
                        className={`p-4 border rounded-lg cursor-pointer text-center ${
                          appearanceSettings.language === lang.value
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() =>
                          handleAppearanceChange("language", lang.value)
                        }
                      >
                        <span className="text-sm">{lang.label}</span>
                        {appearanceSettings.language === lang.value && (
                          <div className="mt-2 flex justify-center">
                            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={saveSettings}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  <Save className="mr-2" size={18} />
                  Saqlash
                </button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-6" id="security">
              <h2 className="text-xl font-bold text-gray-900">
                Xavfsizlik sozlamalari
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Shield className="text-gray-500 mr-3" size={20} />
                    <div>
                      <h3 className="font-medium">
                        Ikki faktorli autentifikatsiya
                      </h3>
                      <p className="text-sm text-gray-500">
                        Hisobingizni qo'shimcha himoya qiling
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="two-factor"
                      className="sr-only"
                      checked={securitySettings.twoFactorAuth}
                      onChange={() =>
                        handleSecurityChange(
                          "twoFactorAuth",
                          !securitySettings.twoFactorAuth
                        )
                      }
                    />
                    <label
                      htmlFor="two-factor"
                      className={`block h-6 w-10 rounded-full cursor-pointer ${
                        securitySettings.twoFactorAuth
                          ? "bg-indigo-600"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                          securitySettings.twoFactorAuth
                            ? "transform translate-x-4"
                            : ""
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Bell className="text-gray-500 mr-3" size={20} />
                    <div>
                      <h3 className="font-medium">Kirish haqida xabar</h3>
                      <p className="text-sm text-gray-500">
                        Yangi qurilma kiritilganda xabar berish
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="login-alerts"
                      className="sr-only"
                      checked={securitySettings.loginAlerts}
                      onChange={() =>
                        handleSecurityChange(
                          "loginAlerts",
                          !securitySettings.loginAlerts
                        )
                      }
                    />
                    <label
                      htmlFor="login-alerts"
                      className={`block h-6 w-10 rounded-full cursor-pointer ${
                        securitySettings.loginAlerts
                          ? "bg-indigo-600"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                          securitySettings.loginAlerts
                            ? "transform translate-x-4"
                            : ""
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium mb-3">Seans timeouti (daqiqa)</h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="5"
                      max="120"
                      step="5"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) =>
                        handleSecurityChange(
                          "sessionTimeout",
                          parseInt(e.target.value)
                        )
                      }
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-16 text-center">
                      {securitySettings.sessionTimeout}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Faol bo'lmagan seans avtomatik ravishda yopiladi
                  </p>
                </div>

                <div className="p-4 border border-red-100 rounded-lg bg-red-50">
                  <h3 className="font-medium text-red-800 mb-2">
                    Xavfli sozlamalar
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <Key className="text-red-500 mr-3" size={18} />
                        <span>Parolni o'zgartirish</span>
                      </div>
                    </button>

                    <button className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <Trash2 className="text-red-500 mr-3" size={18} />
                        <span>Hisobni o'chirish</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={saveSettings}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  <Save className="mr-2" size={18} />
                  Saqlash
                </button>
              </div>
            </div>
          )}

          {/* Billing Settings */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">
                To'lov sozlamalari
              </h2>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-medium">Joriy reja: Pro</h3>
                    <p className="text-sm text-gray-500">$29/oy</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Faol
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Keyingi to'lov sanasi</span>
                    <span className="font-medium">2023-11-01</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">To'lov usuli</span>
                    <div className="flex items-center">
                      <CreditCard className="text-gray-500 mr-2" size={16} />
                      <span className="font-medium">Visa •••• 4242</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Avtomatik uzaytirish</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        id="auto-renew"
                        className="sr-only"
                        defaultChecked
                      />
                      <label
                        htmlFor="auto-renew"
                        className="block h-6 w-10 rounded-full cursor-pointer bg-indigo-600"
                      >
                        <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-4"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 py-2 px-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition">
                    To'lov usulini o'zgartirish
                  </button>
                  <button className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    Rejani yangilash
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">To'lov tarixi</h3>

                <div className="space-y-3">
                  {[
                    {
                      date: "2023-10-01",
                      amount: "$29.00",
                      status: "To'landi",
                    },
                    {
                      date: "2023-09-01",
                      amount: "$29.00",
                      status: "To'landi",
                    },
                    {
                      date: "2023-08-01",
                      amount: "$29.00",
                      status: "To'landi",
                    },
                  ].map((payment, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{payment.date}</p>
                        <p className="text-sm text-gray-500">Pro reja</p>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-4">
                          {payment.amount}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
