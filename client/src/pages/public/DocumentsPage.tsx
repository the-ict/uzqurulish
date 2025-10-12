import { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  Eye,
  Calendar,
  Tag,
  X,
} from "lucide-react";
import jsPDF from "jspdf";
import DocumentsFunctions from "../../functions/documents.func";
import ProjectsFunc from "../../functions/projects.func";
import DocumentViewModal from "../../components/DocumentViewModal.tsx";
import type { IDocument } from "../../types/documents.types";
import type { IProject } from "../../types/projects.types";

const documentsFunc = new DocumentsFunctions();
const projectsFunc = new ProjectsFunc();

const documentTypes = ["Barchasi", "PDF", "DOCX", "XLSX", "PPTX", "JPG", "PNG"];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Barchasi");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<IDocument | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newDocument, setNewDocument] = useState({ name: "", type: "Asosiy" });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await projectsFunc.getProjects();
        setProjects(projectsData || []);
        if (projectsData && projectsData.length > 0) {
          setSelectedProjectId(projectsData[0].id);
        }
      } catch (err) {
        console.error("Failed to load projects:", err);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      const loadDocuments = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const documentsData = await documentsFunc.getDocuments(selectedProjectId);
          setDocuments(documentsData);
        } catch (err: any) {
          setError(err.message || "Failed to load documents");
        } finally {
          setIsLoading(false);
        }
      };
      loadDocuments();
    }
  }, [selectedProjectId]);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "Barchasi" || doc.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setNewDocument({ ...newDocument, name: file.name.split(".")[0] });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !newDocument.name || !selectedProjectId) {
      setError("Please select a file, enter a name, and select a project");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const uploadedDoc = await documentsFunc.uploadDocument(
        selectedProjectId,
        selectedFile,
        { name: newDocument.name, type: newDocument.type }
      );
      setDocuments([uploadedDoc, ...documents]);
      setNewDocument({ name: "", type: "Asosiy" });
      setSelectedFile(null);
      setShowUploadModal(false);
    } catch (err: any) {
      setError(err.message || "Failed to upload document");
    } finally {
      setIsLoading(false);
    }
  };

  const byteSize = (str: string): string => {
    const bytes = new Blob([str || ""]).size;
    const mb = bytes / 1024 / 1024;
    return mb.toFixed(2);
  };

  const handleDownloadPDF = (doc: IDocument) => {
    const generatedText = doc.content || "Hujjat tarkibi mavjud emas.";
    const jsdoc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const margin = 15;
    const lineHeight = 7;
    const pageHeight = jsdoc.internal.pageSize.getHeight();
    const pageWidth = jsdoc.internal.pageSize.getWidth();
    const wrappedText = jsdoc.splitTextToSize(generatedText, pageWidth - margin * 2);

    let cursorY = 20;

    wrappedText.forEach((line: string) => {
      if (cursorY + lineHeight > pageHeight - margin) {
        jsdoc.addPage();
        cursorY = 20;
      }
      jsdoc.text(line, margin, cursorY);
      cursorY += lineHeight;
    });

    jsdoc.save(`${doc.name}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Hujjatlar</h1>
        <div className="flex items-center space-x-4">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
            value={selectedProjectId || ""}
            onChange={(e) => setSelectedProjectId(Number(e.target.value))}
          >
            <option value="">Loyiha tanlang</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents */}
      {isLoading ? (
        <div className="text-center text-gray-500 py-8">Yuklanmoqda...</div>
      ) : filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl shadow hover:shadow-md transition p-5"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <FileText className="text-indigo-600" size={24} />
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-1">{doc.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{byteSize(doc.content)} MB</p>

              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedDoc(doc);
                      setShowViewModal(true);
                    }}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg cursor-pointer"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleDownloadPDF(doc)}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg cursor-pointer"
                  >
                    <Download size={18} />
                  </button>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm("Haqiqatan ham bu hujjatni o'chirmoqchimisiz?")) {
                      documentsFunc
                        .deleteDocument(doc.id)
                        .then(() =>
                          setDocuments(documents.filter((d) => d.id !== doc.id))
                        )
                        .catch(() =>
                          setError("Hujjatni o'chirishda xatolik yuz berdi")
                        );
                    }
                  }}
                  className="p-2 text-red-500 hover:text-red-700 rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">Hujjatlar topilmadi</p>
      )}

      {/* View Modal */}
      {showViewModal && selectedDoc && (
        <DocumentViewModal doc={selectedDoc} onClose={() => setShowViewModal(false)} />
      )}
    </div>
  );
}
