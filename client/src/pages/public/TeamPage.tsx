// pages/dashboard/TeamPage.tsx
import { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Building, 
  Calendar, 
  MoreHorizontal,
  Search,
  Filter,
  Edit,
  Trash2,
  Shield,
  X
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  department: string;
  joinDate: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Abdulloh Karimov',
    email: 'abdulloh@example.com',
    phone: '+998 90 123 45 67',
    role: 'Loyiha menejeri',
    department: 'Qurilish',
    joinDate: '2022-03-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Dilnoza Rahimova',
    email: 'dilnoza@example.com',
    phone: '+998 91 234 56 78',
    role: 'Arxitektor',
    department: 'Dizayn',
    joinDate: '2022-05-20',
    status: 'active'
  },
  {
    id: '3',
    name: 'Saidov Akmal',
    email: 'akmal@example.com',
    role: 'Muhandis',
    department: 'Texnik',
    joinDate: '2022-07-10',
    status: 'active'
  },
  {
    id: '4',
    name: 'Karimova Gulnora',
    email: 'gulnora@example.com',
    role: 'Hisobchi',
    department: 'Moliya',
    joinDate: '2022-09-05',
    status: 'inactive'
  },
  {
    id: '5',
    name: 'Toshmatov Jasur',
    email: 'jasur@example.com',
    phone: '+998 93 345 67 89',
    role: 'Quruvchi',
    department: 'Qurilish',
    joinDate: '2023-01-15',
    status: 'active'
  }
];

const departments = [
  'Barchasi',
  'Qurilish',
  'Dizayn',
  'Texnik',
  'Moliya'
];

const roles = [
  'Barchasi',
  'Loyiha menejeri',
  'Arxitektor',
  'Muhandis',
  'Hisobchi',
  'Quruvchi'
];

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Barchasi');
  const [selectedRole, setSelectedRole] = useState('Barchasi');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: ''
  });

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'Barchasi' || member.department === selectedDepartment;
    const matchesRole = selectedRole === 'Barchasi' || member.role === selectedRole;
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.email && newMember.role && newMember.department) {
      const member: TeamMember = {
        id: (teamMembers.length + 1).toString(),
        name: newMember.name,
        email: newMember.email,
        phone: newMember.phone,
        role: newMember.role,
        department: newMember.department,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      setTeamMembers([...teamMembers, member]);
      setNewMember({ name: '', email: '', phone: '', role: '', department: '' });
      setShowAddModal(false);
    }
  };

  const handleDeleteMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const toggleMemberStatus = (id: string) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id 
        ? { ...member, status: member.status === 'active' ? 'inactive' : 'active' }
        : member
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Jamoa</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center"
        >
          <UserPlus className="mr-2" size={18} />
          Jamoa a'zosini qo'shish
        </button>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-4">
              <Users className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Jami a'zolar</p>
              <p className="font-bold text-xl">{teamMembers.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg mr-4">
              <Shield className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Faol a'zolar</p>
              <p className="font-bold text-xl">{teamMembers.filter(m => m.status === 'active').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg mr-4">
              <Building className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Bo'limlar</p>
              <p className="font-bold text-xl">{Array.from(new Set(teamMembers.map(m => m.department))).length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg mr-4">
              <Calendar className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Oxgi qo'shilgan</p>
              <p className="font-bold text-xl">2 kun oldin</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Jamoa a'zolarini qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-500" size={18} />
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Team Members */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  A'zo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bo'lim
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aloqa
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qo'shilgan sana
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Holati
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
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
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {member.phone || 'Ko\'rsatilmagan'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.joinDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {member.status === 'active' ? 'Faol' : 'Nofaol'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => toggleMemberStatus(member.id)}
                          className={`p-1 rounded ${
                            member.status === 'active' ? 'text-yellow-600 hover:text-yellow-800' : 'text-green-600 hover:text-green-800'
                          }`}
                        >
                          <Shield size={16} />
                        </button>
                        <button className="p-1 text-indigo-600 hover:text-indigo-900">
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteMember(member.id)}
                          className="p-1 text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <Users className="mx-auto text-gray-300" size={48} />
                    <p className="mt-4 text-gray-500">Jamoa a'zolari topilmadi</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Yangi a'zo qo'shish</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ism</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    placeholder="Ism familiya"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    placeholder="email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                    placeholder="+998 90 123 45 67"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  >
                    <option value="">Rolni tanlang</option>
                    <option value="Loyiha menejeri">Loyiha menejeri</option>
                    <option value="Arxitektor">Arxitektor</option>
                    <option value="Muhandis">Muhandis</option>
                    <option value="Hisobchi">Hisobchi</option>
                    <option value="Quruvchi">Quruvchi</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bo'lim</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={newMember.department}
                    onChange={(e) => setNewMember({...newMember, department: e.target.value})}
                  >
                    <option value="">Bo'limni tanlang</option>
                    <option value="Qurilish">Qurilish</option>
                    <option value="Dizayn">Dizayn</option>
                    <option value="Texnik">Texnik</option>
                    <option value="Moliya">Moliya</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={handleAddMember}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Qo'shish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}