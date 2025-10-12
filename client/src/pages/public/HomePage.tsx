import { useState } from 'react';
import { Link } from 'react-router-dom';
import ResponsiveMenu from '../../components/ResponsiveMenu';
import HeroSection from '../../components/HeroSection';
import FeaturesSection from '../../components/FeaturesSection';
import Footer from '../../components/Footer';
import {
  ArrowRight,
  CheckCircle,
  Star,
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Ro'yxatdan o'ting",
    description: "Platformaga ro'yxatdan o'ting va profilingizni yarating"
  },
  {
    id: 2,
    title: "Loyihangizni yarating",
    description: "Yangi loyiha ma'lumotlarini kiritib, boshlang"
  },
  {
    id: 3,
    title: "Hujjatlarni tayyorlang",
    description: "AI yordamida zarur hujjatlarni avtomatik yarating"
  },
  {
    id: 4,
    title: "Tekshiruvdan o'ting",
    description: "Qoidalar bo'yicha tekshiruvdan o'ting va tuzatishlar kiriting"
  },
  {
    id: 5,
    title: "Ruxsatnomangizni oling",
    description: "Barcha bosqichlardan o'tib, ruxsatnomangizni oling"
  }
];

// const pricingPlans = [
//   {
//     id: 1,
//     name: "Free",
//     price: "$0",
//     period: "oyiga",
//     description: "Kichik loyihalar va boshlang'ich foydalanuvchilar uchun",
//     features: [
//       "3 ta loyiha",
//       "Asosiy hujjatlar",
//       "Cheklangan qo'llab-quvvatlash"
//     ],
//     cta: "Bepul boshlang",
//     popular: false
//   },
//   {
//     id: 2,
//     name: "Pro",
//     price: "$29",
//     period: "oyiga",
//     description: "O'sib borayotgan bizneslar va professional foydalanuvchilar uchun",
//     features: [
//       "Cheksiz loyihalar",
//       "Barcha hujjatlar",
//       "Prioritet qo'llab-quvvatlash",
//       "AI tavsiyalari"
//     ],
//     cta: "Hoziroq boshlang",
//     popular: true
//   },
//   {
//     id: 3,
//     name: "Business",
//     price: "$99",
//     period: "oyiga",
//     description: "Katta kompaniyalar va jamoalar uchun to'liq yechim",
//     features: [
//       "Cheksiz loyihalar",
//       "Barcha hujjatlar",
//       "24/7 qo'llab-quvvatlash",
//       "Shaxsiy menejer",
//       "API kirish"
//     ],
//     cta: "Aloqaga chiqing",
//     popular: false
//   }
// ];

const testimonials = [
  {
    id: 1,
    name: "Abdulloh Karimov",
    role: "Quruvchi",
    company: "BuildPro",
    content: "UzQurilish AI meni uchun vaqtni tejashda juda yordam berdi. Oddiygina 3 hafta o'rniga 3 kunda ruxsatnoma oldim!",
    rating: 5
  },
  {
    id: 2,
    name: "Dilnoza Rahimova",
    role: "Arxitektor",
    company: "Modern Design",
    content: "Hujjatlar tayyorlash jarayoni avtomatlashtirilgani juda qulay. Endi men loyihaga ko'proq vaqt ajratishim mumkin.",
    rating: 4
  },
  {
    id: 3,
    name: "Saidov Akmal",
    role: "Loyiha menejeri",
    company: "Construction Plus",
    content: "Platformadan foydalanib, bizning kompaniyamiz samaradorlikni 40% ga oshirdi. Qoidalar tekshiruvi ayniqsa foydali bo'ldi.",
    rating: 5
  }
];

const faqs = [
  {
    id: 1,
    question: "UzQurilish AI nima?",
    answer: "UzQurilish AI - bu qurilish ruxsatnomasini olish jarayonini avtomatlashtiruvchi sun'iy intellekt asosidagi platforma. U hujjatlar tayyorlash, qoidalar tekshiruvi va hududiy cheklovlarni aniqlash kabi funksiyalarni taklif etadi."
  },
  {
    id: 2,
    question: "Platformadan kimlar foydalanishi mumkin?",
    answer: "Platformadan uy egalari, kichik qurilish firmalari, me'morlar va injinerlar foydalanishi mumkin. Barcha darajadagi foydalanuvchilar uchun mos keladigan obuna rejalari mavjud."
  },
  {
    id: 3,
    question: "Qancha vaqt tejash mumkin?",
    answer: "An'anaviy usulda ruxsatnoma olish odatda 2-4 hafta vaqt oladi. UzQurilish AI yordamida bu jarayon 3-5 kunga qisqarishi mumkin, bu 80% gacha vaqt tejash imkonini beradi."
  },
  {
    id: 4,
    question: "Ma'lumotlarim xavfsizmi?",
    answer: "Albatta, biz foydalanuvchi ma'lumotlarining xavfsizligiga katta ahamiyat beramiz. Barcha ma'lumotlar zamonaviy shifrlash texnologiyalari bilan himoyalangan va hech qachon uchinchi tomonlarga berilmaydi."
  },
  {
    id: 5,
    question: "Qanday to'lov usullari qabul qilinadi?",
    answer: "Biz Visa, Mastercard, Uzcard, Humo kabi barcha asosiy kredit kartalari, shuningdek, bank o'tkazmalari va elektron hamyonlar orqali to'lovlarni qabul qilamiz."
  }
];

export default function Homepage() {
  const [email, setEmail] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock newsletter subscription
    alert("Newsletterga muvaffaqiyatli obuna bo'ldingiz!");
    setEmail("");
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <ResponsiveMenu />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-indigo-600">80%</div>
              <div className="mt-2 text-gray-600">Vaqt tejash</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-indigo-600">500+</div>
              <div className="mt-2 text-gray-600">Mamnun foydalanuvchi</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-indigo-600">24/7</div>
              <div className="mt-2 text-gray-600">Qo'llab-quvvatlash</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-indigo-600">99%</div>
              <div className="mt-2 text-gray-600">Muvaffaqiyat darajasi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Qanday ishlaydi
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Faqat 5 oddiy qadam bilan qurilish ruxsatnomasini oling
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="relative">
                  <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                    <div className="w-12 h-12 flex items-center justify-center bg-indigo-600 text-white rounded-full text-lg font-bold mb-4">
                      {step.id}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 flex-grow">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <div className="w-8 h-0.5 bg-indigo-300"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/dashboard/overview"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Hoziroq boshlang <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Sizga mos keladigan rejalarni tanlang
            </h2>
            <div className="mt-6 flex justify-center">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100">
                  Oylik
                </button>
                <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100">
                  Yillik (20% chegirma)
                </button>
                <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100">
                  Korporativ
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan) => (
                <div key={plan.id} className={`bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ${plan.popular ? 'ring-2 ring-indigo-500 relative' : ''}`}>
                  {plan.popular && (
                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                      Eng ommabop
                    </div>
                  )}
                  <div className="p-6 flex flex-col h-full justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="mt-2 text-gray-600">{plan.description}</p>
                    <div className="mt-6">
                      <p className="text-4xl font-extrabold text-gray-900">
                        {plan.price}
                        <span className="text-lg font-medium text-gray-500">/{plan.period}</span>
                      </p>
                    </div>
                    <ul className="mt-6 space-y-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/dashboard/overview"
                      className={`mt-8 block w-full py-3 px-6 text-center font-medium rounded-md ${plan.popular
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                        } transition-colors duration-300`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Foydalanuvchilarimiz nima deydi
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              UzQurilish AI dan foydalanib, qurilish jarayonini soddalashtirgan minglab foydalanuvchilardan ba'zilari
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Ko'p so'raladigan savollar
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              UzQurilish AI haqida ko'p beriladigan savollarga javoblar
            </p>
          </div>

          <div className="mt-16 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-6 text-left font-medium text-gray-900 hover:bg-gray-50 focus:outline-none"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`h-5 w-5 text-gray-500 transform ${activeFaq === faq.id ? 'rotate-180' : ''} transition-transform duration-300`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeFaq === faq.id && (
                  <div className="px-6 pb-6 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Qurilish ruxsatnomasini olishni boshlang
            </h2>
            <p className="mt-4 text-xl text-indigo-200 max-w-3xl mx-auto">
              UzQurilish AI sizga vaqtni tejashga va jarayonni soddalashtirishga yordam beradi. Hoziroq ro'yxatdan o'ting!
            </p>
            <div className="mt-10">
              <Link
                to="/dashboard/overview"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Hoziroq boshlang <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Yangiliklarimizdan xabardor bo'ling
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Platformadagi yangilanishlar va maxsus takliflar uchun email manzilingizni qoldiring
            </p>
          </div>

          <div className="mt-10 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="sm:flex">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                placeholder="Email manzilingiz"
              />
              <button
                type="submit"
                className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto flex-shrink-0 inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Obuna bo'lish
              </button>
            </form>
            <p className="mt-3 text-sm text-gray-500">
              Spam yubormaymiz. Har doim bekor qilishingiz mumkin.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}