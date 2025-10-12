import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100">
            <Search className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">404</h1>
          <h2 className="mt-2 text-xl font-medium text-gray-900">Sahifa topilmadi</h2>
          <p className="mt-2 text-sm text-gray-500">
            Siz qidirayotgan sahifa mavjud emas yoki ko'chirib yuborilgan.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Home className="mr-2 h-4 w-4" />
              Bosh sahifaga qaytish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}