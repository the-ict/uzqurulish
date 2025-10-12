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

export interface IUpdateDocumentInput {
  name?: string;
  type?: string;
}

export interface IDocumentGenerator {
  name: string;
  field: number;
  type: 'residential' | 'commercial' | 'industrial',
  description: string;
  location: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface IChangeNeededDocumentParams {
  projectId: number;
  neededDocumentId: number;
  status: 'pending' | 'approved' | 'rejected';
}