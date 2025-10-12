// pages/DocumentGenerator.tsx
import { useState } from "react";
import { FileText, Download, Send } from "lucide-react";
import DocumentsFunctions from "@/functions/documents.func";
import jsPDF from "jspdf";

const documentsFunc = new DocumentsFunctions();

export default function DocumentGenerator() {
  const [projectData, setProjectData] = useState({
    name: "",
    area: "",
    type: "residential",
    description: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [documentContent, setDocumentContent] = useState("");
  const [activeTab, setActiveTab] = useState("create");

  const handleGenerate = async () => {
    setIsLoading(true);
    const response = await documentsFunc.generateDocument({
      name: projectData.name,
      field: 1,
      type: projectData.type as "residential" | "commercial" | "industrial",
      additionalInfo: projectData.description,
      userId: 1,
    });

    if (response) setDocumentContent(response.document);
    setIsLoading(false);
  };

  const handleSaveDocument = async () => {
    setIsLoading(true);
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const margin = 15;
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const wrappedText = doc.splitTextToSize(
      documentContent,
      pageWidth - margin * 2
    );

    let cursorY = 20;
    wrappedText.forEach((line: string) => {
      if (cursorY + lineHeight > pageHeight - margin) {
        doc.addPage();
        cursorY = 20;
      }
      doc.text(line, margin, cursorY);
      cursorY += lineHeight;
    });

    doc.save(`${projectData.name || "hujjat"}.pdf`);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Document Generator</h1>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-3 cursor-pointer font-medium text-sm cursor-pointer ${
              activeTab === "create"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("create")}
          >
            Hujjat yaratish
          </button>
        </div>

        <div className="p-6">
          {activeTab === "create" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div className="space-y-5">
                <h2 className="font-bold text-lg text-gray-800 mb-2">
                  Loyiha ma'lumotlari
                </h2>

                {/* Loyiha nomi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loyiha nomi
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    value={projectData.name}
                    onChange={(e) =>
                      setProjectData({ ...projectData, name: e.target.value })
                    }
                  />
                </div>

                {/* Maydon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maydoni (m²)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    value={projectData.area}
                    onChange={(e) =>
                      setProjectData({ ...projectData, area: e.target.value })
                    }
                  />
                </div>

                {/* Qurilish turi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Qurilish turi
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    value={projectData.type}
                    onChange={(e) =>
                      setProjectData({ ...projectData, type: e.target.value })
                    }
                  >
                    <option value="">Tanlang</option>
                    <option value="residential">Aholi binosi</option>
                    <option value="commercial">Tijorat binosi</option>
                    <option value="industrial">Sanoat binosi</option>
                  </select>
                </div>

                {/* Qo'shimcha ma'lumotlar */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Qo'shimcha ma'lumotlar
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    rows={3}
                    placeholder="Qo'shimcha ma'lumotlarda qanday hujjat kerakligi va nimalar bo‘lishi kerakligini yozing..."
                    value={projectData.description}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center disabled:opacity-50"
                >
                  <FileText className="mr-2" size={18} />
                  {isLoading ? "Yaratilmoqda..." : "Hujjat yaratish"}
                </button>
              </div>

              {/* Document Editor */}
              <div className="flex flex-col h-full">
                <h2 className="font-bold text-lg text-gray-800 mb-4">
                  Hujjat tahriri
                </h2>

                {documentContent ? (
                  <div className="flex flex-col justify-between bg-white border border-gray-200 rounded-xl shadow-sm p-4 h-full">
                    <textarea
                      className="w-full flex-1 min-h-[300px] resize-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none mb-4"
                      value={documentContent}
                      onChange={(e) => setDocumentContent(e.target.value)}
                    ></textarea>

                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                      <button
                        onClick={handleSaveDocument}
                        disabled={isLoading}
                        className="flex-1 py-2 px-4 cursor-pointer bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition flex items-center justify-center disabled:opacity-50"
                      >
                        <Download className="mr-2" size={18} />
                        {isLoading ? "Saqlanmoqda..." : "PDF yuklab olish"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FileText className="mx-auto text-gray-300" size={48} />
                    <p className="mt-2 text-gray-500">
                      Hujjat yaratish uchun formani to‘ldiring
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
