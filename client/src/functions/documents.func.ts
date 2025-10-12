import { axiosClient } from "../configs/api";
import type { IDocument, ICreateDocumentInput, IUpdateDocumentInput, IGenerateApplicationParametrs, IGenerateDocumentParametrs } from "../types/documents.types";

class DocumentsFunctions {
    public async uploadDocument(
        projectId: number,
        file: File,
        documentData: Omit<ICreateDocumentInput, 'projectId'>
    ): Promise<IDocument> {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', documentData.name);
            formData.append('type', documentData.type);
            formData.append('projectId', projectId.toString());

            const response = await axiosClient.post('/api/documents/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.document;
        } catch (error) {
            throw error;
        }
    }

    public async getDocuments(projectId: number): Promise<IDocument[]> {
        try {
            const response = await axiosClient.get(`/documents/get/docs?projectId=${projectId}`);
            return response.data.documents;
        } catch (error) {
            throw error;
        }
    }

    public async getDocument(id: number): Promise<IDocument> {
        try {
            const response = await axiosClient.get(`/documents/${id}`);
            return response.data.document;
        } catch (error) {
            throw error;
        }
    }

    public async updateDocument(id: number, updateData: IUpdateDocumentInput): Promise<IDocument> {
        try {
            const response = await axiosClient.put(`/documents/${id}`, updateData);
            return response.data.document;
        } catch (error) {
            throw error;
        }
    }

    public async deleteDocument(id: number): Promise<void> {
        try {
            await axiosClient.delete(`/documents/${id}`);
        } catch (error) {
            throw error;
        }
    }

    public async generateApplicationByPrompt(data: IGenerateApplicationParametrs) {
        try {
            const reponse = await axiosClient.post("/documents/document-generate-by-prompt", data)
            return reponse.data;
        } catch (error) {
            throw error;
        }
    }

    public async updateNeededDocStatus (projectId: number, documentId: number, status: string) {
        try {
            const response = await axiosClient.put(`/documents/update-doc/update-needed-doc-status`, { projectId, neededDocumentId: documentId, status });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async generateDocument (data: IGenerateDocumentParametrs) {
        try {
            const response = await axiosClient.post("/documents/document-generate", data)
            return response.data;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getAllDocuments() {
        try {
            const response = await axiosClient.get('/documents/documents/all')
            return response.data.documents
        } catch (error) {
            throw new Error("Failed to get all documents!")
        }
    }
}

export default DocumentsFunctions;