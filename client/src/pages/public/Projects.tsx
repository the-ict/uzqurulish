// pages/Projects.tsx
import { useEffect, useState, useMemo } from "react";
import {
  Plus,
  Search,
  Filter,
  FolderOpen,
  Edit,
  Eye,
  Trash2,
  Grid,
  List,
  Calendar,
} from "lucide-react";
import AddProjectModal from "../../components/NewProjectModal";
import ProjectsFunc from "../../functions/projects.func";
import type { IProject } from "../../types/projects.types";
import ChangeProjectModal from "@/components/ChangeProjectModal";

const getTypeLabel = (type: string) => {
  switch (type) {
    case "residential":
      return "Aholi binosi";
    case "commercial":
      return "Tijorat binosi";
    case "industrial":
      return "Sanoat binosi";
    default:
      return type;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending":
      return "Kutilmoqda";
    case "approved":
      return "Tasdiqlangan";
    case "rejected":
      return "Rad etilgan";
    case "in-progress":
      return "Jarayonda";
    default:
      return status;
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "approved":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "in-progress":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const projectsFunc = new ProjectsFunc();

export default function Projects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenChangeModal, setIsOpenChangeModal] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "all" || project.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [projects, searchTerm, filter]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await projectsFunc.getProjects();
        setProjects(res || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again.");
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDeleteProject = async (projectId: number) => {
    if (!projectId) return "project id is required";
    await projectsFunc.deleteProject(projectId).then(() => {
      projectsFunc.getProjects().then(setProjects).catch(console.error);
    });
  };

  return (
    <div className="space-y-6">
      {isOpenModal && (
        <AddProjectModal
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          onSuccess={() => setIsOpenModal(false)}
        />
      )}

      {isOpenChangeModal && selectedProject && (
        <ChangeProjectModal
          isOpen={isOpenChangeModal}
          onClose={() => {
            setIsOpenChangeModal(false);
            setSelectedProject(null);
          }}
          project={selectedProject}
          onSuccess={() => {
            setIsOpenChangeModal(false);
            setSelectedProject(null);
            projectsFunc.getProjects().then(setProjects).catch(console.error);
          }}
        />
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">Loading projects...</div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Loyihalar</h1>
          <button
            onClick={() => setIsOpenModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white cursor-pointer rounded-lg hover:bg-indigo-700 transition flex items-center"
          >
            <Plus className="mr-2" size={18} />
            Yangi loyiha
          </button>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Loyihalarni qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="text-gray-500" size={18} />
            <select
              className="px-3 py-2 border border-gray-300 appearance-none rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Barchasi</option>
              <option value="pending">Kutilmoqda</option>
              <option value="approved">Tasdiqlangan</option>
              <option value="rejected">Rad etilgan</option>
              <option value="in-progress">Jarayonda</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg cursor-pointer ${
                viewMode === "table" ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg  cursor-pointer ${
                viewMode === "grid" ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <Grid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Table View */}
      {viewMode === "table" && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Loyiha
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Turi
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Progress
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Deadline
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects?.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <FolderOpen className="text-indigo-600" size={20} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {project.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {project.area}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {getTypeLabel(project.type)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                            project.status
                          )}`}
                        >
                          {getStatusLabel(project.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  project.status === "approved"
                                    ? "bg-green-500"
                                    : project.status === "pending"
                                    ? "bg-yellow-500"
                                    : project.status === "rejected"
                                    ? "bg-red-500"
                                    : "bg-blue-500"
                                }`}
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-500">
                              {project.progress}%
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="mr-1 text-gray-400" size={14} />
                          {project.deadline}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                            <Eye size={18} />
                          </button>
                          <button
                            className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                            onClick={() => {
                              setSelectedProject(project);
                              setIsOpenChangeModal(true);
                            }}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-600 hover:text-red-900 cursor-pointer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <FolderOpen className="mx-auto text-gray-300" size={48} />
                      <p className="mt-4 text-gray-500">Loyihalar topilmadi</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Projects Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow overflow-hidden hover:shadow-md transition"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                        <FolderOpen className="text-indigo-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-500">{project.area}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                        project.status
                      )}`}
                    >
                      {getStatusLabel(project.status)}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          project.status === "approved"
                            ? "bg-green-500"
                            : project.status === "pending"
                            ? "bg-yellow-500"
                            : project.status === "rejected"
                            ? "bg-red-500"
                            : "bg-blue-500"
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-2 text-gray-400" size={14} />
                      <span>Deadline: {project.deadline}</span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-3 border-t border-gray-100">
                    <button className="text-indigo-600 hover:text-indigo-800 flex items-center cursor-pointer">
                      <Eye size={16} className="mr-1" />
                      Ko'rish
                    </button>
                    <button
                      className="text-yellow-600 hover:text-yellow-800 flex items-center cursor-pointer"
                      onClick={() => {
                        setSelectedProject(project);
                        setIsOpenChangeModal(true);
                      }}
                    >
                      <Edit size={16} className="mr-1" />
                      Tahrirlash
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 flex items-center cursor-pointer"
                      onClick={() => {
                        setSelectedProject(project);
                        handleDeleteProject(project.id);
                      }}
                    >
                      <Trash2 size={16} className="mr-1" />
                      O'chirish
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-xl shadow p-12 text-center">
              <FolderOpen className="mx-auto text-gray-300" size={48} />
              <p className="mt-4 text-gray-500">Loyihalar topilmadi</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
