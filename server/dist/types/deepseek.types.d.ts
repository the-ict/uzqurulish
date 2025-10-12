export interface IGenerateNeededDocumentsParametrs {
    name: string;
    description?: string;
    type: 'residential' | 'commercial' | 'industrial';
    area: number;
    location: string;
    deadline?: Date;
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
    signature: number[];
    userId: number;
}
export interface IGenerateDocumentParametrs {
    name: string;
    field: number;
    type: 'residential' | 'commercial' | 'industrial';
    additionalInfo: string;
    userId: number;
}
//# sourceMappingURL=deepseek.types.d.ts.map