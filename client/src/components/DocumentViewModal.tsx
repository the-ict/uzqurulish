import { X, Download } from "lucide-react";
import jsPDF from "jspdf";
import type { IDocument } from "../types/documents.types";

interface Props {
  doc: IDocument;
  onClose: () => void;
}

export default function DocumentViewModal({ doc, onClose }: Props) {
  const handleDownloadPDF = () => {
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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold text-gray-900">{doc.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <X size={22} />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto whitespace-pre-wrap text-gray-800 text-sm">
          {doc.content || "Matn mavjud emas."}
        </div>

        <div className="border-t p-4 flex justify-end">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center cursor-pointer"
          >
            <Download size={18} className="mr-2" /> PDF yuklab olish
          </button>
        </div>
      </div>
    </div>
  );
}
