// pages/PaymentsSubscription.tsx
import { useState, useEffect } from 'react';
import { CreditCard, Download, Check, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import axios from 'axios';

const mockPlans = [
  { 
    id: 1, 
    name: "Free", 
    price: "$0", 
    period: "oyiga", 
    features: [
      "3 ta loyiha",
      "Asosiy hujjatlar",
      "Cheklangan qo'llab-quvvatlash"
    ],
    current: true
  },
  { 
    id: 2, 
    name: "Pro", 
    price: "$29", 
    period: "oyiga", 
    features: [
      "Cheksiz loyihalar",
      "Barcha hujjatlar",
      "Prioritet qo'llab-quvvatlash",
      "AI tavsiyalari"
    ],
    popular: true
  },
  { 
    id: 3, 
    name: "Business", 
    price: "$99", 
    period: "oyiga", 
    features: [
      "Cheksiz loyihalar",
      "Barcha hujjatlar",
      "24/7 qo'llab-quvvatlash",
      "Shaxsiy menejer",
      "API kirish"
    ]
  },
];

const mockPayments = [
  { id: 1, date: "2023-10-01", amount: "$29.00", status: "completed", invoice: "INV-2023-001" },
  { id: 2, date: "2023-09-01", amount: "$29.00", status: "completed", invoice: "INV-2023-002" },
  { id: 3, date: "2023-08-01", amount: "$29.00", status: "completed", invoice: "INV-2023-003" },
];

const mockUsageData = [
  { month: 'Yan', usage: 2, projects: 3 },
  { month: 'Fev', usage: 3, projects: 5 },
  { month: 'Mar', usage: 5, projects: 8 },
  { month: 'Apr', usage: 4, projects: 6 },
  { month: 'May', usage: 6, projects: 9 },
  { month: 'Iyun', usage: 8, projects: 12 },
];

interface Subscription {
  id: number;
  userId: number;
  order_id: string;
  amount: number;
  receipt_id: string;
  card_token?: string;
  status: "pending" | "held" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

interface Payment {
  id: number;
  userId: number;
  subs_type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface UsageStats {
  usageData: Array<{ month: string; usage: number; projects: number }>;
  stats: {
    totalSpent: number;
    totalProjects: number;
    subscriptionMonths: number;
  };
}

export default function PaymentsSubscription() {
  const [autoRenew, setAutoRenew] = useState(true);
  const [currentPlan, setCurrentPlan] = useState("Free");
  const [activeTab, setActiveTab] = useState("plans");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subsRes, paymentsRes, usageRes] = await Promise.all([
          axios.get('/api/payment/user/subscriptions'),
          axios.get('/api/payment/user/payment-history'),
          axios.get('/api/payment/user/usage-stats')
        ]);

        if (subsRes.data.success) {
          setSubscriptions(subsRes.data.subscriptions);
        }
        if (paymentsRes.data.success) {
          setPayments(paymentsRes.data.payments);
        }
        if (usageRes.data.success) {
          setUsageStats(usageRes.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadUsageReport = () => {
    try {
      const jsdoc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pageWidth = jsdoc.internal.pageSize.getWidth();
      const pageHeight = jsdoc.internal.pageSize.getHeight();

      // Title
      jsdoc.setFontSize(20);
      jsdoc.text("Foydalanish statistikasi", pageWidth / 2, 20, { align: "center" });

      // Summary statistics
      jsdoc.setFontSize(12);
      let yPosition = 40;

      jsdoc.text("Umumiy ko'rsatkichlar:", 20, yPosition);
      yPosition += 10;

      const totalSpent = usageStats?.stats.totalSpent || 0;
      const totalProjects = usageStats?.stats.totalProjects || 0;
      const subscriptionMonths = usageStats?.stats.subscriptionMonths || 0;

      jsdoc.text(`Jami sarflangan: $${totalSpent}.00`, 20, yPosition);
      yPosition += 8;
      jsdoc.text(`Loyihalar soni: ${totalProjects}`, 20, yPosition);
      yPosition += 8;
      jsdoc.text(`Obuna muddati: ${subscriptionMonths} oy`, 20, yPosition);
      yPosition += 20;

      // Monthly data table
      jsdoc.text("Oylik ma'lumotlar:", 20, yPosition);
      yPosition += 10;

      jsdoc.setFontSize(10);
      jsdoc.text("Oy", 20, yPosition);
      jsdoc.text("Hujjatlar", 60, yPosition);
      jsdoc.text("Loyihalar", 100, yPosition);

      yPosition += 8;

      (usageStats?.usageData || []).forEach((data) => {
        jsdoc.text(data.month, 20, yPosition);
        jsdoc.text(data.usage.toString(), 60, yPosition);
        jsdoc.text(data.projects.toString(), 100, yPosition);
        yPosition += 6;
      });

      // Footer
      jsdoc.setFontSize(8);
      const footerY = pageHeight - 15;
      jsdoc.text(`Hisobot yaratilgan sana: ${new Date().toLocaleDateString('uz-UZ')}`, 20, footerY);
      jsdoc.text("UzQurilish AI - Foydalanish statistikasi", pageWidth - 20, footerY, { align: "right" });

      // Save the PDF
      const fileName = `usage-statistics-${new Date().toISOString().split('T')[0]}.pdf`;
      jsdoc.save(fileName);

    } catch (error) {
      console.error("Error generating usage report PDF:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">To'lovlar va obuna</h1>
      
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === "plans"
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab("plans")}
          >
            Obuna rejalari
          </button>

          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === "subscriptions"
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab("subscriptions")}
          >
            Mening obunalarim
          </button>

          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === "billing"
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab("billing")}
          >
            To'lov sozlamalari
          </button>

          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === "history"
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab("history")}
          >
            To'lov tarixi
          </button>

          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === "usage"
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab("usage")}
          >
            Foydalanish statistikasi
          </button>
        </div>
        
        <div className="p-6">
          {/* User Subscriptions */}
          {activeTab === "subscriptions" && (
            <div className="space-y-4">
              <h2 className="font-bold text-lg mb-4">Mening obunalarim</h2>

              {loading ? (
                <div className="text-center py-4">Yuklanmoqda...</div>
              ) : (
                <div className="space-y-3">
                  {subscriptions.length > 0 ? subscriptions.map(subscription => (
                    <div key={subscription.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium">Obuna #{subscription.id}</h3>
                        <p className="text-sm text-gray-500">Order ID: {subscription.order_id}</p>
                        <p className="text-sm text-gray-500">Sana: {new Date(subscription.createdAt).toLocaleDateString('uz-UZ')}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-4">${subscription.amount / 100}.00</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          subscription.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          subscription.status === 'held' ? 'bg-blue-100 text-blue-800' :
                          subscription.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {subscription.status === 'confirmed' ? 'Tasdiqlangan' :
                           subscription.status === 'held' ? 'Ushlab turilgan' :
                           subscription.status === 'cancelled' ? 'Bekor qilingan' :
                           'Kutilmoqda'}
                        </span>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-4 text-gray-500">Obuna mavjud emas</div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Subscription Plans */}
          {activeTab === "plans" && (
            <div className="space-y-4">
              <h2 className="font-bold text-lg mb-4">Obuna paketlari</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockPlans.map(plan => (
                  <div 
                    key={plan.id} 
                    className={`border rounded-lg p-5 flex flex-col justify-between ${
                      plan.popular ? 'border-indigo-500 ring-2 ring-indigo-100 relative' : 'border-gray-200'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white text-xs px-3 py-1 rounded-full">
                        Ommabop
                      </div>
                    )}
                    
                    <div className="text-center mb-4">
                      <h3 className="font-bold text-lg">{plan.name}</h3>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-gray-500">/{plan.period}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                    onClick={() => window.location.href = "/dashboard/payme-payment"}
                      className={`w-full py-2 px-4 rounded-lg cursor-pointer transition ${
                        plan.current
                          ? 'bg-gray-100 text-gray-800 cursor-default'
                          : plan.popular
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                      disabled={plan.current}
                    >
                      {plan.current ? 'Joriy paket' : 'Tanlash'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Billing Settings */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              <h2 className="font-bold text-lg mb-4">To'lov usuli</h2>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-lg mr-4">
                      <CreditCard className="text-gray-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Visa •••• 4242</h3>
                      <p className="text-sm text-gray-500">Amal qilish muddati: 05/2025</p>
                    </div>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                    O'zgartirish
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Avtomatik uzaytirish</h3>
                    <p className="text-sm text-gray-500">Obuna muddati tugaganda avtomatik uzaytirilsin</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="auto-renew"
                      className="sr-only"
                      checked={autoRenew}
                      onChange={() => setAutoRenew(!autoRenew)}
                    />
                    <label 
                      htmlFor="auto-renew" 
                      className={`block h-6 w-10 rounded-full cursor-pointer ${
                        autoRenew ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        autoRenew ? 'transform translate-x-4' : ''
                      }`}></span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h3 className="font-medium text-blue-800 flex items-center">
                    <Calendar className="mr-2" size={18} />
                    Keyingi to'lov sanasi
                  </h3>
                  <p className="mt-2 text-blue-700">
                    2023-11-01 kuni $29.00 miqdorida to'lov amalga oshiriladi
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Payment History */}
          {activeTab === "history" && (
           <div className="space-y-4">
             <h2 className="font-bold text-lg mb-4">To'lov tarixi</h2>

             {loading ? (
               <div className="text-center py-4">Yuklanmoqda...</div>
             ) : (
               <div className="space-y-3">
                 {payments.length > 0 ? payments.map(payment => (
                   <div key={payment.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                     <div>
                       <h3 className="font-medium">{new Date(payment.createdAt).toLocaleDateString('uz-UZ')}</h3>
                       <p className="text-sm text-gray-500">ID: {payment.id}</p>
                     </div>
                     <div className="flex items-center">
                       <span className="font-medium mr-4">${payment.subs_type === 'basic' ? '29' : payment.subs_type === 'premium' ? '99' : '0'}.00</span>
                       <span className={`px-2 py-1 rounded-full text-xs ${
                         payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                       }`}>
                         {payment.status === 'completed' ? 'To\'landi' : 'Kutilmoqda'}
                       </span>
                       <button className="ml-2 text-gray-500 hover:text-indigo-600">
                         <Download size={18} />
                       </button>
                     </div>
                   </div>
                 )) : (
                   <div className="text-center py-4 text-gray-500">To'lov tarixi mavjud emas</div>
                 )}
               </div>
             )}
           </div>
         )}
          
          {/* Usage Statistics */}
          {activeTab === "usage" && (
            <div className="space-y-6">
              <h2 className="font-bold text-lg mb-4">Foydalanish statistikasi</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-4">
                      <DollarSign className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Jami sarflangan</p>
                      <p className="font-bold text-xl">${usageStats?.stats.totalSpent || 0}.00</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg mr-4">
                      <TrendingUp className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Loyihalar soni</p>
                      <p className="font-bold text-xl">{usageStats?.stats.totalProjects || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg mr-4">
                      <Calendar className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Obuna muddati</p>
                      <p className="font-bold text-xl">{usageStats?.stats.subscriptionMonths || 0} oy</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Oylik foydalanish</h3>
                  <button
                    onClick={handleDownloadUsageReport}
                    className="flex items-center px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
                  >
                    <Download size={16} className="mr-1" />
                    Yuklab olish
                  </button>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={usageStats?.usageData || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="usage" name="Hujjatlar" stroke="#6366f1" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="projects" name="Loyihalar" stroke="#10b981" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}