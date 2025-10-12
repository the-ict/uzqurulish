// pages/dashboard/ProjectDetailPage.tsx
import { useState, } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    FileText,
    CheckCircle,
    Clock,
    AlertCircle,
    MoreHorizontal,
    Edit,
    Download,
    MessageSquare,
    Plus,
    Activity,
    Eye
} from 'lucide-react';

interface Project {
    id: string;
    name: string;
    type: string;
    status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
    startDate: string;
    endDate?: string;
    budget: string;
    location: string;
    description: string;
    progress: number;
    team: { id: string; name: string; role: string; avatar?: string }[];
    documents: { id: string; name: string; type: string; date: string }[];
    activities: { id: string; user: string; action: string; time: string }[];
}

const mockProject: Project = {
    id: '1',
    name: 'Oila uyi qurilishi',
    type: 'residential',
    status: 'in-progress',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    budget: '$120,000',
    location: 'Toshkent, Mirzo Ulug\'bek tumani',
    description: 'Zamonaviy dizayndagi 2 qavatli oila uyi. Umumiy maydoni 150 m². 3 xonali, 2 hojali, oshxona va garaj.',
    progress: 65,
    team: [
        { id: '1', name: 'Abdulloh Karimov', role: 'Loyiha menejeri' },
        { id: '2', name: 'Dilnoza Rahimova', role: 'Arxitektor' },
        { id: '3', name: 'Saidov Akmal', role: 'Muhandis' },
        { id: '4', name: 'Toshmatov Jasur', role: 'Quruvchi' }
    ],
    documents: [
        { id: '1', name: 'Qurilish deklaratsiyasi', type: 'PDF', date: '2023-09-15' },
        { id: '2', name: 'Joylashuv rejalari', type: 'PDF', date: '2023-09-20' },
        { id: '3', name: 'Texnik hisobot', type: 'DOCX', date: '2023-10-05' }
    ],
    activities: [
        { id: '1', user: 'Abdulloh Karimov', action: 'Loyiha yaratildi', time: '2023-09-01 10:30' },
        { id: '2', user: 'Dilnoza Rahimova', action: 'Dizayn yuklandi', time: '2023-09-05 14:15' },
        { id: '3', user: 'Saidov Akmal', action: 'Texnik hisobot tayorlandi', time: '2023-09-10 11:20' },
        { id: '4', user: 'Abdulloh Karimov', action: 'Qurilish boshlandi', time: '2023-09-15 09:00' },
        { id: '5', user: 'Toshmatov Jasur', action: 'Poydevor qurildi', time: '2023-10-01 16:45' }
    ]
};

const statusLabels = {
    'planning': 'Rejalashtirish',
    'in-progress': 'Jarayonda',
    'completed': 'Tugallangan',
    'on-hold': 'Kutishda'
};

const statusColors = {
    'planning': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-green-100 text-green-800',
    'on-hold': 'bg-red-100 text-red-800'
};

export default function ProjectDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [project] = useState<Project>(mockProject);
    const [activeTab, setActiveTab] = useState('overview');
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            // Mock add comment
            setNewComment('');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center">
                <Link to="/dashboard/projects" className="mr-4">
                    <ArrowLeft className="text-gray-500" size={20} />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
            </div>

            {/* Project Info */}
            <div className="bg-white rounded-xl shadow p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center mb-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status]}`}>
                                {statusLabels[project.status]}
                            </span>
                            <span className="ml-3 text-sm text-gray-500">{project.type}</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{project.name}</h2>
                        <p className="text-gray-600 mt-1">{project.description}</p>
                    </div>

                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center">
                            <Edit className="mr-2" size={16} />
                            Tahrirlash
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center">
                            <Download className="mr-2" size={16} />
                            Hisobot
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Boshlanish sanasi</p>
                        <p className="font-medium">{project.startDate}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Tugash sanasi</p>
                        <p className="font-medium">{project.endDate || 'Belgilanmagan'}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Byudjet</p>
                        <p className="font-medium">{project.budget}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Joylashuv</p>
                        <p className="font-medium">{project.location}</p>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow">
                <div className="flex border-b border-gray-200">
                    <button
                        className={`px-4 py-3 font-medium text-sm ${activeTab === 'overview'
                                ? 'text-indigo-600 border-b-2 border-indigo-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Umumiy ko\'rinish
                    </button>

                    <button
                        className={`px-4 py-3 font-medium text-sm ${activeTab === 'team'
                                ? 'text-indigo-600 border-b-2 border-indigo-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('team')}
                    >
                        Jamoa
                    </button>

                    <button
                        className={`px-4 py-3 font-medium text-sm ${activeTab === 'documents'
                                ? 'text-indigo-600 border-b-2 border-indigo-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('documents')}
                    >
                        Hujjatlar
                    </button>

                    <button
                        className={`px-4 py-3 font-medium text-sm ${activeTab === 'activity'
                                ? 'text-indigo-600 border-b-2 border-indigo-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('activity')}
                    >
                        Faoliyatlar
                    </button>
                </div>

                <div className="p-6">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Loyiha tafsilotlari</h3>
                                <p className="text-gray-600">{project.description}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Vaqt chizig'i</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-500">Boshlanish</span>
                                        <span className="text-sm text-gray-500">Tugash</span>
                                    </div>
                                    <div className="relative pt-1">
                                        <div className="h-2 bg-gray-200 rounded-full">
                                            <div
                                                className="absolute top-0 left-0 h-2 bg-indigo-600 rounded-full"
                                                style={{ width: `${project.progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="absolute top-0 left-0 h-2 w-2 bg-white rounded-full border-2 border-indigo-600"></div>
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <span className="text-sm font-medium">{project.startDate}</span>
                                        <span className="text-sm font-medium">{project.endDate || 'Belgilanmagan'}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Muhim bosqichlar</h3>
                                <div className="space-y-3">
                                    {[
                                        { title: 'Rejalashtirish', status: 'completed', date: '2023-09-01' },
                                        { title: 'Dizayn', status: 'completed', date: '2023-09-10' },
                                        { title: 'Ruxsatnoma olish', status: 'in-progress', date: '' },
                                        { title: 'Qurilish', status: 'in-progress', date: '' },
                                        { title: 'Tugatish', status: 'pending', date: '' }
                                    ].map((step, index) => (
                                        <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                                            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${step.status === 'completed' ? 'bg-green-500' :
                                                    step.status === 'in-progress' ? 'bg-yellow-500' :
                                                        step.status === 'pending' ? 'bg-gray-300' : 'bg-red-500'
                                                }`}>
                                                {step.status === 'completed' ? <CheckCircle size={14} className="text-white" /> :
                                                    step.status === 'in-progress' ? <Clock size={14} className="text-white" /> :
                                                        step.status === 'pending' ? <span className="text-xs text-gray-600">{index + 1}</span> :
                                                            <AlertCircle size={14} className="text-white" />}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium">{step.title}</h4>
                                                {step.date && <p className="text-sm text-gray-500">{step.date}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Team Tab */}
                    {activeTab === 'team' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Jamoa a'zolari</h3>
                                <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
                                    <Plus className="mr-1" size={14} />
                                    Qo'shish
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.team.map((member) => (
                                    <div key={member.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            {member.avatar ? (
                                                <img className="h-10 w-10 rounded-full" src={member.avatar} alt="" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                    <span className="text-indigo-800 font-medium">
                                                        {member.name.charAt(0)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-medium text-gray-900">{member.name}</h4>
                                            <p className="text-sm text-gray-500">{member.role}</p>
                                        </div>
                                        <button className="ml-auto p-1 text-gray-500 hover:text-gray-700">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Documents Tab */}
                    {activeTab === 'documents' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Hujjatlar</h3>
                                <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
                                    <Plus className="mr-1" size={14} />
                                    Hujjat qo'shish
                                </button>
                            </div>

                            <div className="space-y-3">
                                {project.documents.map((doc) => (
                                    <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                                                <FileText className="text-indigo-600" size={16} />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">{doc.name}</h4>
                                                <p className="text-sm text-gray-500">{doc.type} • {doc.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="p-1 text-gray-500 hover:text-gray-700">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-1 text-gray-500 hover:text-gray-700">
                                                <Download size={16} />
                                            </button>
                                            <button className="p-1 text-gray-500 hover:text-gray-700">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Activity Tab */}
                    {activeTab === 'activity' && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Faoliyatlar</h3>

                            <div className="space-y-4">
                                {project.activities.map((activity) => (
                                    <div key={activity.id} className="flex items-start">
                                        <div className="flex-shrink-0 mt-1 mr-3">
                                            <Activity className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-900">
                                                <span className="font-medium">{activity.user}</span> {activity.action}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <h4 className="text-sm font-medium text-gray-900 mb-3">Izoh qoldiring</h4>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Izohingizni yozing..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                    />
                                    <button
                                        onClick={handleAddComment}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center"
                                    >
                                        <MessageSquare className="mr-2" size={16} />
                                        Yuborish
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}