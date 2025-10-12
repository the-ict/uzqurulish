export interface INeededDocument {
    name: string;
    type: string;
    about: string;
    how_to_get: string;
    required: boolean;
    status: 'pending' | 'in-progress' | 'completed' | "rejected";
    isNeedApplication: boolean;
    promptToGenerate?: string;
    createdAt: Date;
    updatedAt: Date;
    id: string;
  }
  

interface IProject {
    id: number;
    name: string;
    description?: string;
    type: 'residential' | 'commercial' | 'industrial';
    area: string;
    location: string;
    status: 'pending' | 'in-progress' | 'approved' | 'rejected';
    progress: number;
    deadline: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    needed_documents: INeededDocument[];
}


interface IUpdateProjectPayload {
    name?: string;
    description?: string;
    type?: 'residential' | 'commercial' | 'industrial';
    area?: number;
    location?: string;
    status?: 'pending' | 'in-progress' | 'approved' | 'rejected';
    progress?: number;
    deadline?: Date;
}

export type {IProject,IUpdateProjectPayload}