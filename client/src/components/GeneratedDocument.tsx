import { useState } from "react";
import { jsPDF } from "jspdf";
import { FileText, Download, Loader2, X } from "lucide-react";

interface IGeneratedDocumentProps {
  generatedText: string;
  selectedDocument: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function GeneratedDocumentModal({
  generatedText,
  selectedDocument,
  isOpen,
  onClose,
}: IGeneratedDocumentProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = () => {
    setIsDownloading(true);
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
      generatedText,
      pageWidth - margin * 2
    );

    let cursorY = 20;

    wrappedText.forEach((line: string) => {
      // Agar sahifa to‘lib qolsa, yangi sahifa ochamiz
      if (cursorY + lineHeight > pageHeight - margin) {
        doc.addPage();
        cursorY = 20; // yangi sahifada boshidan boshlaymiz
      }

      doc.text(line, margin, cursorY);
      cursorY += lineHeight;
    });

    doc.save(`${selectedDocument.name}.pdf`);
    setTimeout(() => setIsDownloading(false), 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex min-h-screen items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-10 relative animate-[fadeIn_0.2s_ease-in-out]"
        style={{
          animation: "fadeIn 0.25s ease-in-out",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 cursor-pointer right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Yaratilgan hujjat
          </h2>

          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className={`flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer ${
              isDownloading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Yuklanmoqda...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                PDF yuklab olish
              </>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="border border-gray-200 rounded-lg bg-gray-50 p-4 overflow-y-auto max-h-[500px]">
          <pre className="whitespace-pre-wrap text-gray-800 font-sans leading-relaxed text-sm">
            {generatedText}
          </pre>
        </div>
      </div>
    </div>
  );
}
