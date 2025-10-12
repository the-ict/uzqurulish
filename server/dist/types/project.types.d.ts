export interface INeededDocument {
    name: string;
    type: string;
    about: string;
    how_to_get: string;
    required: boolean;
    status: 'pending' | 'in-progress' | 'completed';
    createdAt: Date;
    updatedAt: Date;
    id: number;
}
export interface IProject {
    id: number;
    name: string;
    description?: string;
    type: 'residential' | 'commercial' | 'industrial';
    area: number;
    location: string;
    status: 'pending' | 'in-progress' | 'approved' | 'rejected';
    progress: number;
    deadline?: Date;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    needed_documents: INeededDocument[];
}
export interface IProjectStep {
    id: number;
    projectId: number;
    stepName: string;
    stepOrder: number;
    status: 'pending' | 'in-progress' | 'completed';
    deadline?: Date;
    completedAt?: Date;
    createdAt: Date;
}
export interface IComment {
    id: number;
    projectId: number;
    userId: number;
    content: string;
    createdAt: Date;
}
export interface ICreateProjectInput {
    name: string;
    description?: string;
    type: 'residential' | 'commercial' | 'industrial';
    area: number;
    location: string;
    deadline?: Date;
    needed_documents?: INeededDocument[];
}
export interface IUpdateProjectInput {
    name?: string;
    description?: string;
    type?: 'residential' | 'commercial' | 'industrial';
    area?: number;
    location?: string;
    status?: 'pending' | 'in-progress' | 'approved' | 'rejected';
    progress?: number;
    deadline?: Date;
    needed_documents?: INeededDocument[];
}
//# sourceMappingURL=project.types.d.ts.map