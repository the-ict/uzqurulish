// components/HeroSection.tsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, Star, Clock, X } from 'lucide-react';
import tutorialVideo from '../assets/tutorials/tutorialvideo.mp4';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const slides = [
    {
      title: "Qurilish ruxsatnomasini oson va tez oling",
      subtitle: "UzQurilish AI - bu sun'iy intellekt asosidagi platforma sizga qurilish ruxsatnomasini olish jarayonini avtomatlashtirishga yordam beradi",
      cta: "Hoziroq boshlang",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Vaqtni 80% gacha tejang",
      subtitle: "An'anaviy usulda 2-4 hafta davom etadigan jarayon endi atigi 3-5 kunda",
      cta: "Batafsil",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Barcha hujjatlaringiz bir joyda",
      subtitle: "Hujjatlarni tayyorlash, tekshirish va saqlash uchun bitta platforma",
      cta: "Ko'rish",
      image: "/api/placeholder/600/400"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "80%", label: "Vaqt tejash" },
    { value: "500+", label: "Mamnun foydalanuvchi" },
    { value: "24/7", label: "Qo'llab-quvvatlash" },
    { value: "99%", label: "Muvaffaqiyat darajasi" }
  ];

  return (
    <section className="relative bg-gradient-to-r from-indigo-50 to-blue-50 py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-indigo-300"></div>
          <div className="absolute top-40 right-20 w-60 h-60 rounded-full bg-blue-300"></div>
          <div className="absolute bottom-20 left-1/4 w-32 h-32 rounded-full bg-indigo-400"></div>
          <div className="absolute bottom-40 right-10 w-48 h-48 rounded-full bg-blue-400"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">4.8/5 (120+ sharh)</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              {slides[currentSlide].subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link 
                to="/dashboard/overview" 
                className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center justify-center"
              >
                {slides[currentSlide].cta} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="px-8 py-3 bg-white cursor-pointer text-indigo-600 font-medium rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center justify-center"
              >
                <Play className="mr-2 h-5 w-5" /> Demo ko'rish
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Image/Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-2 transform rotate-3 hover:rotate-0 transition duration-500">
              <div className="bg-white rounded-xl p-6 shadow-inner">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Loyiha: Oila uyi</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Tasdiqlangan
                  </span>
                </div>
                
                <div className="space-y-4 mb-6">
                  {[
                    { name: "Hujjatlar tayyorlash", progress: 100 },
                    { name: "Qoidalar tekshiruvi", progress: 100 },
                    { name: "To'lov", progress: 100 },
                    { name: "Ruxsatnoma olish", progress: 100 }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{item.name}</span>
                        <span className="font-medium">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${item.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>3 kun</span>
                  </div>
                  <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">
                    Batafsil
                  </button>
                </div>
              </div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 transform -rotate-6 hover:rotate-0 transition duration-500">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                  <CheckCircle className="text-indigo-600 h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Hujjatlar tayyorlandi</p>
                  <p className="text-sm font-medium">2 soat oldin</p>
                </div>
              </div>
            </div>
            
            {/* User Avatars */}
            <div className="absolute -top-4 right-4 flex items-center">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-xs font-medium text-indigo-800">
                    {item}
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">500+ mamnun foydalanuvchi</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="flex justify-center mt-10 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentSlide === index ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X size={32} />
            </button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                onLoadedData={() => {
                  if (videoRef.current) {
                    videoRef.current.play();
                  }
                }}
              >
                <source src={tutorialVideo} type="video/quicktime" />
                <source src={tutorialVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;