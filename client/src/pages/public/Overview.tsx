import { useState, useEffect, useMemo } from "react";
import {
  User,
  FileText,
  Clock,
  Bell,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import jsPDF from "jspdf";
import SettingsFunctions from "@/functions/settings.func";
import type { IUser } from "@/types/user.types";
import ProjectsFunc from "@/functions/projects.func";
import type { IProject } from "@/types/projects.types";
import DocumentsFunctions from "@/functions/documents.func";
import type { IDocument } from "@/types/documents.types";

const mockProjects = [
  {
    id: 1,
    name: "Oila uyi",
    status: "pending",
    date: "2023-10-15",
    progress: 65,
  },
  {
    id: 2,
    name: "Ofis binosi",
    status: "approved",
    date: "2023-09-22",
    progress: 100,
  },
  {
    id: 3,
    name: "Magazin",
    status: "rejected",
    date: "2023-08-30",
    progress: 30,
  },
];

const mockNotifications = [
  { id: 1, text: "Loyiha tasdiqlandi", date: "2 soat oldin", read: false },
  {
    id: 2,
    text: "Hujjatlar deadline yaqinlashmoqda",
    date: "1 kun oldin",
    read: true,
  },
];

const months: string[] = [
  "Yan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Iyun",
  "Iyul",
  "Avg",
  "Sen",
  "Okt",
  "Noy",
  "Dek",
];

const mockChartData = [
  { name: "Yan", projects: 2, approved: 1 },
  { name: "Fev", projects: 3, approved: 2 },
  { name: "Mar", projects: 5, approved: 3 },
  { name: "Apr", projects: 4, approved: 2 },
  { name: "May", projects: 6, approved: 4 },
  { name: "Iyun", projects: 8, approved: 5 },
];

const settingsFunctions = new SettingsFunctions();
const projectsFunctions = new ProjectsFunc();
const documentFunctions = new DocumentsFunctions();

export default function DashboardOverview() {
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    company: "",
    role: "user",
    subscriptionType: "free",
    subscriptionExpires: new Date(),
    avatarUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 0,
    password: "",
  });
  const [projects, setProjects] = useState<IProject[]>();
  const [documents, setDocuments] = useState<IDocument[]>();

  const [darkMode, setDarkMode] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    handleGetProjects();
    handleGetDocuments();
    handleGetProfileInfos();
  }, []);

  const handleGetProjects = async () => {
    await projectsFunctions.getProjects().then((res) => {
      setProjects(res);
      setAnimatedValue(res?.length);
    });
  };

  const handleGetDocuments = async () => {
    await documentFunctions.getAllDocuments().then((res) => {
      setDocuments(res);
      console.log(res, "documents");
    });
  };

  const handleGetProfileInfos = async () => {
    await settingsFunctions.getProfileInfo().then((res) => {
      setUser(res.user);
    });
  };

  const chartData = useMemo(() => {
    if (!documents || !user.createdAt) return mockChartData;

    return months.map((monthName, index) => {
      const docsInMonth = documents.filter((doc) => {
        return new Date(doc.createdAt).getMonth() === index;
      });

      return {
        name: monthName,
        projects: docsInMonth.length,
        approved: docsInMonth.filter((doc) => doc.status === "completed").length,
      };
    }).filter((_, index) => new Date(user.createdAt).getMonth() <= index);
  }, [documents, user.createdAt]);



  const renderCategoryDocumentsLength = (
    filterByStatus: "pending" | "in-progress" | "completed" | "rejected"
  ) => {
    if ((documents?.length as number) > 0) {
      const result = documents?.filter((doc) => doc.status === filterByStatus);
      return result?.length;
    } else {
      return 0;
    }
  };

  const handleExportChart = () => {
    setIsExporting(true);

    try {
      const jsdoc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pageWidth = jsdoc.internal.pageSize.getWidth();
      const pageHeight = jsdoc.internal.pageSize.getHeight();

      // Title
      jsdoc.setFontSize(20);
      jsdoc.text("Loyihalar statistikasi", pageWidth / 2, 20, { align: "center" });

      // Chart data table
      jsdoc.setFontSize(12);
      let yPosition = 40;

      // Headers
      jsdoc.text("Oy", 20, yPosition);
      jsdoc.text("Jami loyihalar", 60, yPosition);
      jsdoc.text("Tasdiqlangan", 120, yPosition);

      yPosition += 10;

      // Data rows
      chartData.forEach((data) => {
        jsdoc.text(data.name, 20, yPosition);
        jsdoc.text(data.projects.toString(), 60, yPosition);
        jsdoc.text(data.approved.toString(), 120, yPosition);
        yPosition += 8;
      });

      // Summary statistics
      yPosition += 20;
      jsdoc.setFontSize(14);
      jsdoc.text("Umumiy statistika:", 20, yPosition);
      yPosition += 10;

      jsdoc.setFontSize(12);
      const totalProjects = documents?.length || 0;
      const completedProjects = renderCategoryDocumentsLength("completed");
      const pendingProjects = renderCategoryDocumentsLength("in-progress");
      const rejectedProjects = renderCategoryDocumentsLength("rejected");

      jsdoc.text(`Jami loyihalar: ${totalProjects}`, 20, yPosition);
      yPosition += 8;
      jsdoc.text(`Tasdiqlangan: ${completedProjects}`, 20, yPosition);
      yPosition += 8;
      jsdoc.text(`Kutilmoqda: ${pendingProjects}`, 20, yPosition);
      yPosition += 8;
      jsdoc.text(`Rad etilgan: ${rejectedProjects}`, 20, yPosition);

      // Save the PDF
      const fileName = `loyiha-statistikasi-${new Date().toISOString().split('T')[0]}.pdf`;
      jsdoc.save(fileName);

    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`space-y-6 ${darkMode ? "dark bg-gray-900" : ""}`}>

      <div className="bg-white rounded-xl shadow p-6 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-100  p-3 rounded-full">
            <User className="text-indigo-600" size={24} />
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-800 ">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <span className="inline-block mt-1 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
              {user.subscriptionType} obuna
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-5 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-4">
              <FileText className="text-blue-600 " size={20} />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Jami loyihalar
              </p>
              <p className="font-bold text-xl text-gray-800">{animatedValue}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
              <CheckCircle
                className="text-green-600 dark:text-green-300"
                size={20}
              />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Tasdiqlangan
              </p>
              <p className="font-bold text-xl text-gray-800">
                {renderCategoryDocumentsLength("completed")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg mr-4">
              <Clock
                className="text-yellow-600 dark:text-yellow-300"
                size={20}
              />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Kutilmoqda
              </p>
              <p className="font-bold text-xl text-gray-800">
                {renderCategoryDocumentsLength("in-progress")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg mr-4">
              <XCircle className="text-red-600 dark:text-red-300" size={20} />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Rad etilgan
              </p>
              <p className="font-bold text-xl text-gray-800">
                {renderCategoryDocumentsLength("rejected")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-gray-800">
            Loyihalar statistikasi
          </h2>
          <button
            onClick={handleExportChart}
            disabled={isExporting}
            className="text-indigo-600 cursor-pointer dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center disabled:opacity-50"
          >
            <Download size={16} className="mr-1" /> Export
          </button>

          {isExporting && (
            <div className="ml-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="mt-1 text-xs text-gray-400 flex items-center">
                <span>Pdf sifatida yuklanmoqda...</span>
                <svg
                  className="animate-spin ml-2 h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                strokeOpacity={darkMode ? 0.1 : 1}
              />
              <XAxis dataKey="name" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
              <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
              <Tooltip
                contentStyle={
                  darkMode
                    ? { backgroundColor: "#1f2937", borderColor: "#374151" }
                    : {}
                }
                labelStyle={darkMode ? { color: "#f9fafb" } : {}}
              />
              <Legend />
              <Bar dataKey="projects" name="Jami hujjatlar" fill="#6366f1" />
              <Bar dataKey="approved" name="Tasdiqlangan" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-lg text-gray-800">Oxirgi loyihalar</h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="p-4 flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium text-gray-800">{project.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      project.status === "approved"
                        ? "bg-green-500"
                        : project.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${project.status === "approved" ? 100 : project.status === "pending" ? 50 : 0}%` }}
                  ></div>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  project.status === "approved"
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : project.status === "pending"
                    ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                    : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                }`}
              >
                {project.status === "approved"
                  ? "Tasdiqlangan"
                  : project.status === "pending"
                  ? "Kutilmoqda"
                  : "Rad etilgan"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
