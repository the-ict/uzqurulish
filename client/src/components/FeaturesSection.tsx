// components/FeaturesSection.tsx
import { useState } from 'react';
import { CheckCircle, FileText, MapPin, BarChart3, Clock, Users } from 'lucide-react';

const features = [
  {
    id: 1,
    title: "Permit Navigator",
    description: "Qurilish ruxsatnomasi olish jarayonini bosqichma-bosqich kuzatib boring",
    icon: <FileText className="text-indigo-600" size={24} />,
    benefits: [
      "Bosqichma-bosqich yo'llanma",
      "Hujjatlar holatini kuzatish",
      "Deadline eslatmalari",
      "Progress monitoring"
    ]
  },
  {
    id: 2,
    title: "Document Generator",
    description: "AI yordamida zarur hujjatlarni avtomatik yarating",
    icon: <BarChart3 className="text-indigo-600" size={24} />,
    benefits: [
      "Avtomatik hujjat yaratish",
      "Shablonlar kutubxonasi",
      "Hujjatni tahrirlash",
      "PDF/DOC formatda yuklab olish"
    ]
  },
  {
    id: 3,
    title: "Compliance Checker",
    description: "Loyihangiz qoidalarga mosligini tekshiring",
    icon: <CheckCircle className="text-indigo-600" size={24} />,
    benefits: [
      "Qoidalar bilan solishtirish",
      "Xatoliklarni aniqlash",
      "Tuzatish tavsiyalari",
      "To'liq hisobot"
    ]
  },
  {
    id: 4,
    title: "Zoning Advisor",
    description: "Hududiy cheklovlar va tavsiyalarni oling",
    icon: <MapPin className="text-indigo-600" size={24} />,
    benefits: [
      "Hududiy cheklovlar",
      "Ruxsat etilgan balandlik",
      "Qurilish turlari",
      "Xarita integratsiyasi"
    ]
  },
  {
    id: 5,
    title: "Project Management",
    description: "Loyihalaringizni boshqaring va kuzatib boring",
    icon: <Users className="text-indigo-600" size={24} />,
    benefits: [
      "Loyihalar ro'yxati",
      "Progress tracking",
      "Jamoa a'zolari",
      "Muddatlar"
    ]
  },
  {
    id: 6,
    title: "Time Saving",
    description: "Vaqtni 80% gacha tejash imkoniyati",
    icon: <Clock className="text-indigo-600" size={24} />,
    benefits: [
      "Jarayonni tezlashtirish",
      "Avtomatlashtirish",
      "Hujjatlarni tez tayyorlash",
      "Qisqa muddatda ruxsatnoma"
    ]
  }
];

const stats = [
  { value: "80%", label: "Vaqt tejash" },
  { value: "500+", label: "Mamnun foydalanuvchi" },
  { value: "24/7", label: "Qo'llab-quvvatlash" },
  { value: "99%", label: "Muvaffaqiyat darajasi" }
];

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(1);

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Platformaning asosiy imkoniyatlari
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            UzQurilish AI qurilish jarayonining barcha bosqichlarini qamrab oluvchi to'liq yechim
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center transform hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                activeFeature === feature.id ? 'ring-2 ring-indigo-500' : ''
              }`}
              onClick={() => setActiveFeature(feature.id)}
            >
              <div className="p-6">
                <div className="w-14 h-14 flex items-center justify-center bg-indigo-100 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {feature.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Barcha imkoniyatlarni ko'ring
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}