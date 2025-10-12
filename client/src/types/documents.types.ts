export interface IDocument {
  id: number;
  name: string;
  type: string;
  projectId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  content: string;
  status: "pending" | "in-progress" | "completed" | "rejected";
}

export interface ICreateDocumentInput {
  name: string;
  type: string;
  projectId: number;
}

export interface IGenerateApplicationParametrs {
  name: string;
  description?: string;
  type: string;
  area: number;
  location: string;
  promptToGenerate?: string;
  required: boolean;
  fullName: string;
  email: string;
  phone: string;
  projectId: number;
  userId: number;
}


export interface IGenerateDocumentParametrs {
  name: string;
  field: number;
  type: 'residential' | 'commercial' | 'industrial';
  additionalInfo: string;
  userId: number
}


export interface IUpdateDocumentInput {
  name?: string;
  type?: string;
}