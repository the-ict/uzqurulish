import { useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  HelpCircle,
  Info,
  Send,
  X,
  Loader2,
} from "lucide-react";
import PermitInformationsModal from "@/components/PermitInformationsModal";
import type { IProject } from "@/types/projects.types";
import ProjectsFunc from "@/functions/projects.func";
import DocumentsFunctions from "@/functions/documents.func";
import SettingsFunctions from "@/functions/settings.func";
import type { IUser } from "@/types/user.types";
import { jsPDF } from "jspdf";
import GeneratedDocument from "@/components/GeneratedDocument";
import NeededDocuments from "@/components/NeededDocumentsItem";

const projectsFunc = new ProjectsFunc();
const documentsFunc = new DocumentsFunctions();
const settingsFunc = new SettingsFunctions();

const PermitNavigator = () => {
  const [selectedProject, setSelectedProject] = useState<IProject>();
  const [showGuidance, setShowGuidance] = useState<string | null>(null);

  const [generatedApplication, setGeneratedApplication] =
    useState<boolean>(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [isOpenInformation, setIsOpenInformation] = useState(false);
  const [generatedText, setGeneratedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [profile, setProfile] = useState<IUser | null>();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectsFunc.getProjects();
        setProjects(res || []);
        console.log(res);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects([]);
      }
    };
    fetchProjects();

    const fetchProfile = async () => {
      try {
        const res = await settingsFunc.getProfileInfo();
        setProfile(res.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setProfile(null);
      }
    };
    fetchProfile();
  }, []);

  const generateApplication = async () => {
    setIsLoading(true);
    const response = await documentsFunc.generateApplicationByPrompt({
      name: selectedDocument.name,
      type: selectedDocument.type,
      location: selectedProject?.location ?? "",
      description: selectedDocument.description,
      area: selectedDocument.area,
      promptToGenerate: selectedDocument.promptToGenerate,
      required: selectedDocument.required,
      fullName: profile?.name || "",
      email: profile?.email || "",
      phone: "",
      projectId: selectedProject?.id ?? 0,
      userId: profile?.id ?? 0,
    });

    if (response) {
      setGeneratedText(response);
      setGeneratedApplication(true);
      setShowApplicationForm(false);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert("Xatolik yuz berdi!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Permit Navigator</h1>
        <button
          className="bg-indigo-500 cursor-pointer text-white px-4 py-2 rounded-lg"
          onClick={() => setIsOpenInformation(true)}
        >
          Jarayon haqida malumot olish
        </button>

        {isOpenInformation && (
          <PermitInformationsModal
            isOpen={isOpenInformation}
            setIsOpen={setIsOpenInformation}
          />
        )}
      </div>

      {/* Project tanlash */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Loyiha tanlash</h2>
        </div>
        <select
          value={selectedProject?.id ?? ""}
          onChange={(e) => {
            const selectedProjectData = projects.find(
              (p) => p.id === Number(e.target.value)
            );

            setSelectedProject(selectedProjectData);
            setShowGuidance(null);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Loyihani tanlang...</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {selectedProject && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
              <div>
                <p className="font-medium text-blue-800">Tanlangan loyiha:</p>
                <p className="text-blue-700">{selectedProject.name}</p>
                <p className="text-sm text-blue-600">
                  {selectedProject.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {generatedApplication && (
        <GeneratedDocument
          generatedText={generatedText}
          selectedDocument={selectedDocument}
          isOpen={generatedApplication}
          onClose={() => setGeneratedApplication(false)}
        />
      )}

      {/* Document Workflow */}
      {selectedProject && (
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold text-lg mb-4">Hujjatlar jarayoni</h3>
          <div className="space-y-4">
            {selectedProject.needed_documents.map((doc, index) => {
              return (
                <NeededDocuments
                key={index}
                  doc={doc}
                  index={index}
                  setShowGuidance={setShowGuidance}
                  setShowApplicationForm={setShowApplicationForm}
                  setSelectedDocument={setSelectedDocument}
                  showGuidance={showGuidance}
                  projectId={selectedProject.id}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {showApplicationForm && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Ariza yaratish</h3>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">{selectedDocument.name}</h4>
                  <p className="text-sm text-gray-600">
                    {selectedDocument.description}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Bu hujjat uchun ariza Document Generator orqali yaratish mumkin!. Buni qilish uchun Ariza yaratish va yuklab olish tugmasiga bosing!
                  </p>
                </div>
                <div className="flex items-center justify-between space-x-3 w-full">
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-800 cursor-pointer rounded-lg hover:bg-gray-200"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={generateApplication}
                    disabled={isLoading}
                    className={`px-4 py-2 bg-indigo-600 text-white cursor-pointer rounded-lg hover:bg-indigo-700 ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <p>Biroz vaqt oladi!</p>
                        <Loader2 className="animate-spin" />
                      </div>
                    ) : (
                      <p>Ariza yaratish va yuklab olish</p>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermitNavigator;
