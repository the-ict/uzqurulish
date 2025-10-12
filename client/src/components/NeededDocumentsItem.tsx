import DocumentsFunctions from "@/functions/documents.func";
import type { INeededDocument } from "@/types/projects.types";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  HelpCircle,
  Send,
} from "lucide-react";
import { useState } from "react";

interface Props {
  doc: INeededDocument;
  index: number;
  setShowGuidance: (guidance: string) => void;
  setShowApplicationForm: (show: boolean) => void;
  setSelectedDocument: (doc: INeededDocument) => void;
  showGuidance: string | null;
  projectId: number;
}

const documentsFunc = new DocumentsFunctions();

export default function NeededDocuments({
  doc,
  index,
  setShowGuidance,
  setShowApplicationForm,
  setSelectedDocument,
  showGuidance,
  projectId,
}: Props) {
  const [document, setDocument] = useState<INeededDocument>({
    name: doc.name,
    about: doc.about,
    how_to_get: doc.how_to_get,
    required: doc.required,
    isNeedApplication: doc.isNeedApplication,
    type: doc.type,
    status: doc.status,
    id: doc.id,
    promptToGenerate: doc.promptToGenerate,
    updatedAt: doc.updatedAt,
    createdAt: doc.createdAt,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const changeNeededDocStatus = async (docId: number, status: string) => {
    setIsLoading(true);
    const response = await documentsFunc.updateNeededDocStatus(
      projectId,
      docId,
      status
    );

    if (response) {
      setIsLoading(false);
      setDocument(prev => ({...prev, status: status as "pending" | "in-progress" | "completed" | "rejected"}))
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                document.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : document.status === "in-progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {document.status === "completed" && (
                <CheckCircle className="w-3 h-3 mr-1" />
              )}
              {document.status === "in-progress" && (
                <Clock className="w-3 h-3 mr-1" />
              )}
              {document.status === "pending" && (
                <AlertCircle className="w-3 h-3 mr-1" />
              )}
              {document.status === "rejected" && (
                <AlertCircle className="w-3 h-3 mr-1 text-red-600" />
              )}
              {document.status === "completed"
                ? "Tayyor"
                : document.status === "in-progress"
                ? "Ko'rib chiqilmoqda"
                : document.status === "rejected"
                ? "Rad etilgan"
                : "Kutilmoqda"}
            </span>
            <span className="ml-2 text-sm text-gray-500">#{index + 1}</span>
          </div>
          <h4 className="font-medium text-gray-900">{document.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{document.about}</p>
          <div className="text-xs text-gray-500 space-y-1">
            <p>
              <strong>Turi:</strong> {document.type}
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-2 gap-2 justify-center">
          <button
            onClick={() => setShowGuidance(document.name)}
            disabled={isLoading}
            className="px-3 py-1 text-sm cursor-pointer bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            <HelpCircle className="w-4 h-4 inline mr-1" />
            Qanday olinadi ?
          </button>
          {document.required && document.isNeedApplication && (
            <button
              disabled={
                document.status === "in-progress" ||
                document.status === "completed" ||
                isLoading
              }
              onClick={() => {
                setShowApplicationForm(true);
                setSelectedDocument(document);
              }}
              className="px-3 py-1 cursor-pointer text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 inline mr-1" />
              Ariza yaratish
            </button>
          )}
          <select
            value={document.status}
            className="px-2 py-1 text-sm border rounded"
            onChange={(e) =>
              changeNeededDocStatus(Number(document.id), e.target.value)
            }
          >
            <option value="pending">Kutilmoqda</option>
            <option value="in-progress">Ko'rib chiqilmoqda</option>
            <option value="completed">Tayyor</option>
            <option value="rejected">Rad etilgan</option>
          </select>
        </div>
      </div>
      {showGuidance === document.name && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">{document.how_to_get}</p>
        </div>
      )}
    </div>
  );
}
