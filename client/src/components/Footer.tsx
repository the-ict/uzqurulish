// components/Footer.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Send,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Xususiyatlar', href: '#features' },
    { name: 'Narxlar', href: '#pricing' },
    { name: 'Demo', href: '#' },
    { name: 'Integratsiyalar', href: '#' },
  ],
  resources: [
    { name: 'Blog', href: '#' },
    { name: 'Qo\'llanmalar', href: '#' },
    { name: 'Qo\'llab-quvvatlash', href: '#' },
    { name: 'API hujjatlari', href: '#' },
  ],
  company: [
    { name: 'Biz haqimizda', href: '#' },
    { name: 'Jamoa', href: '#' },
    { name: 'Karyera', href: '#' },
    { name: 'Aloqa', href: '#' },
  ],
  legal: [
    { name: 'Maxfiylik siyosati', href: '#' },
    { name: 'Foydalanish shartlari', href: '#' },
    { name: 'Cookie siyosati', href: '#' },
  ]
};

const socialLinks = [
  { name: 'Facebook', icon: <Facebook size={20} />, href: '#' },
  { name: 'Twitter', icon: <Twitter size={20} />, href: '#' },
  { name: 'Instagram', icon: <Instagram size={20} />, href: '#' },
  { name: 'LinkedIn', icon: <Linkedin size={20} />, href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert('Newsletterga muvaffaqiyatli obuna bo\'ldingiz!');
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold">UQ</span>
              </div>
              <span className="ml-2 text-xl font-bold">UzQurilish AI</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Qurilish ruxsatnomasini olish jarayonini soddalashtiruvchi sun'iy intellekt platformasi. Vaqtni tejang va jarayonni tezlashtiring!
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-colors duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Mahsulot</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Resurslar</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Yangiliklarimizdan xabardor bo'ling</h3>
            <p className="text-gray-400 mb-4">
              Platformadagi yangilanishlar va maxsus takliflar uchun email manzilingizni qoldiring
            </p>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email manzilingiz"
                  required
                  className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-lg transition-colors duration-300"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-500">Spam yubormaymiz. Har doim bekor qilishingiz mumkin.</p>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
              <Mail className="text-indigo-400" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-gray-300">info@uzqurilish.ai</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
              <Phone className="text-indigo-400" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Telefon</p>
              <p className="text-gray-300">+998 90 123 45 67</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
              <MapPin className="text-indigo-400" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Manzil</p>
              <p className="text-gray-300">Toshkent, Uzbekistan</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} UzQurilish AI. Barcha huquqlar himoyalangan.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-4">
            {footerLinks.legal.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            to="/dashboard/overview"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
          >
            Hoziroq boshlang <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}