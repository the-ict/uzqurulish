// pages/Notifications.tsx
import { useState } from 'react';
import { Bell, Check, Trash2, Clock, FileText, AlertCircle, Settings, Mail, Smartphone } from 'lucide-react';

const mockNotifications = [
  { 
    id: 1, 
    title: "Loyiha tasdiqlandi", 
    description: "Sizning 'Ofis binosi' loyihaingiz tasdiqlandi", 
    date: "2 soat oldin", 
    read: false,
    type: "success",
    priority: "high"
  },
  { 
    id: 2, 
    title: "Hujjatlar deadline", 
    description: "Ekologik ekspertiza hujjatlarini topshirish muddati yaqinlashmoqda", 
    date: "1 kun oldin", 
    read: true,
    type: "warning",
    priority: "medium"
  },
  { 
    id: 3, 
    title: "Rad etilgan ariza", 
    description: "Sizning 'Magazin' loyihaingiz qoidalar buzgani uchun rad etildi", 
    date: "3 kun oldin", 
    read: true,
    type: "error",
    priority: "high"
  },
  { 
    id: 4, 
    title: "Yangi xabar", 
    description: "Sizga yangi xabar yuborildi", 
    date: "5 kun oldin", 
    read: true,
    type: "info",
    priority: "low"
  },
];

const notificationCategories = [
  { id: "all", name: "Barchasi", count: 4 },
  { id: "success", name: "Tasdiqlangan", count: 1 },
  { id: "warning", name: "Ogohlantirish", count: 1 },
  { id: "error", name: "Xatolik", count: 1 },
  { id: "info", name: "Ma'lumot", count: 1 },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeCategory, setActiveCategory] = useState("all");
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    frequency: "immediate",
  });

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = activeCategory === "all"
    ? notifications 
    : notifications.filter(n => n.type === activeCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Xabarnomalar</h1>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition flex items-center"
          >
            <Check className="mr-2" size={18} />
            Hammasini o'qilgan deb belgilash
          </button>
        )}
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-4">
              <Bell className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Jami xabarlar</p>
              <p className="font-bold text-xl">{notifications.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg mr-4">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">O'qilmagan</p>
              <p className="font-bold text-xl">{unreadCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg mr-4">
              <FileText className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tasdiqlangan</p>
              <p className="font-bold text-xl">8</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg mr-4">
              <AlertCircle className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Rad etilgan</p>
              <p className="font-bold text-xl">1</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow">
          <div className="p-5 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">Xabarnomalar</h2>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Settings size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex overflow-x-auto py-3 px-5 border-b border-gray-200">
            <div className="flex space-x-4">
              {notificationCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                    activeCategory === category.id 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className="ml-1 bg-white bg-opacity-50 px-1.5 py-0.5 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Notifications */}
          <div className="divide-y divide-gray-100">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-50 transition ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 mt-1 mr-4 ${
                      notification.type === 'success' ? 'text-green-600' : 
                      notification.type === 'warning' ? 'text-yellow-600' : 
                      notification.type === 'error' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {notification.type === 'success' ? <Check size={20} /> : 
                       notification.type === 'warning' ? <Clock size={20} /> : 
                       notification.type === 'error' ? <AlertCircle size={20} /> : <Bell size={20} />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className={`font-medium ${notification.read ? 'text-gray-800' : 'text-gray-900'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex space-x-2">
                          {!notification.read && (
                            <button 
                              onClick={() => markAsRead(notification.id)}
                              className="text-gray-500 hover:text-indigo-600"
                            >
                              <Check size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-500 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className={`text-sm mt-1 ${notification.read ? 'text-gray-600' : 'text-gray-700'}`}>
                        {notification.description}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-gray-500">{notification.date}</p>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(notification.priority)}`}>
                          {notification.priority === 'high' ? 'Yuqori' : 
                           notification.priority === 'medium' ? 'O\'rta' : 'Past'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <Bell className="mx-auto text-gray-300" size={48} />
                <p className="mt-4 text-gray-500">Xabarnomalar yo'q</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow">
          <div className="p-5 border-b border-gray-200">
            <h2 className="font-bold text-lg">Bildirishnoma sozlamalari</h2>
          </div>
          
          <div className="p-5 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Qaysi kanallar orqali bildirishnoma olishni xohlaysiz?</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Mail className="text-gray-500 mr-3" size={18} />
                    <span>Email</span>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="email-notifications"
                      className="sr-only"
                      checked={notificationSettings.email}
                      onChange={() => setNotificationSettings({...notificationSettings, email: !notificationSettings.email})}
                    />
                    <label 
                      htmlFor="email-notifications" 
                      className={`block h-6 w-10 rounded-full cursor-pointer ${
                        notificationSettings.email ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        notificationSettings.email ? 'transform translate-x-4' : ''
                      }`}></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Smartphone className="text-gray-500 mr-3" size={18} />
                    <span>Push bildirishnomalar</span>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="push-notifications"
                      className="sr-only"
                      checked={notificationSettings.push}
                      onChange={() => setNotificationSettings({...notificationSettings, push: !notificationSettings.push})}
                    />
                    <label 
                      htmlFor="push-notifications" 
                      className={`block h-6 w-10 rounded-full cursor-pointer ${
                        notificationSettings.push ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        notificationSettings.push ? 'transform translate-x-4' : ''
                      }`}></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Smartphone className="text-gray-500 mr-3" size={18} />
                    <span>SMS</span>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="sms-notifications"
                      className="sr-only"
                      checked={notificationSettings.sms}
                      onChange={() => setNotificationSettings({...notificationSettings, sms: !notificationSettings.sms})}
                    />
                    <label 
                      htmlFor="sms-notifications" 
                      className={`block h-6 w-10 rounded-full cursor-pointer ${
                        notificationSettings.sms ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        notificationSettings.sms ? 'transform translate-x-4' : ''
                      }`}></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Qancha tez-tek bildirishnomalarni olishni xohlaysiz?</h3>
              
              <div className="space-y-2">
                <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    id="immediate"
                    name="frequency"
                    className="mr-3"
                    checked={notificationSettings.frequency === "immediate"}
                    onChange={() => setNotificationSettings({...notificationSettings, frequency: "immediate"})}
                  />
                  <label htmlFor="immediate">Darhol</label>
                </div>
                
                <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    id="daily"
                    name="frequency"
                    className="mr-3"
                    checked={notificationSettings.frequency === "daily"}
                    onChange={() => setNotificationSettings({...notificationSettings, frequency: "daily"})}
                  />
                  <label htmlFor="daily">Kunlik yig'indisi</label>
                </div>
                
                <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    id="weekly"
                    name="frequency"
                    className="mr-3"
                    checked={notificationSettings.frequency === "weekly"}
                    onChange={() => setNotificationSettings({...notificationSettings, frequency: "weekly"})}
                  />
                  <label htmlFor="weekly">Haftalik yig'indisi</label>
                </div>
              </div>
            </div>
            
            <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Sozlamalarni saqlash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}