// components/ui/SearchResults.tsx
import { Link } from 'react-router-dom';
import { FileText, MapPin, BarChart3, FolderOpen, Calendar, User } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'project' | 'document' | 'zone' | 'user';
  title: string;
  description: string;
  url: string;
  date?: string;
  author?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  onClose: () => void;
}

export default function SearchResults({ results, query, onClose }: SearchResultsProps) {
  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'project':
        return <FolderOpen className="h-5 w-5 text-indigo-600" />;
      case 'document':
        return <FileText className="h-5 w-5 text-green-600" />;
      case 'zone':
        return <MapPin className="h-5 w-5 text-yellow-600" />;
      case 'user':
        return <User className="h-5 w-5 text-blue-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'project':
        return 'Loyiha';
      case 'document':
        return 'Hujjat';
      case 'zone':
        return 'Hudud';
      case 'user':
        return 'Foydalanuvchi';
      default:
        return 'Boshqa';
    }
  };

  const highlightText = (text: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 font-medium">{part}</span>
      ) : (
        part
      )
    );
  };

  if (results.length === 0) {
    return (
      <div className="py-8 text-center">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Hech narsa topilmadi</h3>
        <p className="mt-1 text-sm text-gray-500">
          "{query}" bo'yicha hech qanday natija topilmadi
        </p>
      </div>
    );
  }

  return (
    <div className="py-2">
      <div className="px-4 py-2 border-b border-gray-200">
        <p className="text-sm text-gray-500">
          {results.length} ta natija "{query}" uchun
        </p>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {results.map((result) => (
          <Link
            key={result.id}
            to={result.url}
            onClick={onClose}
            className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                {getIcon(result.type)}
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {highlightText(result.title)}
                  </p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {getTypeLabel(result.type)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 truncate">
                  {highlightText(result.description)}
                </p>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  {result.date && (
                    <>
                      <Calendar className="mr-1 h-3 w-3" />
                      <span className="mr-3">{result.date}</span>
                    </>
                  )}
                  {result.author && (
                    <>
                      <User className="mr-1 h-3 w-3" />
                      <span>{result.author}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="px-4 py-3 border-t border-gray-200 text-center">
        <Link
          to="/search"
          state={{ query }}
          onClick={onClose}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Barcha natijalarni ko'rish
        </Link>
      </div>
    </div>
  );
}