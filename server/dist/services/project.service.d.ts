import { IProject, ICreateProjectInput, IUpdateProjectInput, IProjectStep, IComment, INeededDocument } from "../types/project.types";
export declare class ProjectService {
    checkUserExists(userId: number): Promise<boolean>;
    createProject(userId: number, projectData: ICreateProjectInput): Promise<IProject>;
    getProjectsByUserId(userId: number): Promise<IProject[]>;
    getProjectById(id: number): Promise<IProject>;
    updateProject(id: number, userId: number, updateData: IUpdateProjectInput): Promise<IProject>;
    deleteProject(id: number, userId: number): Promise<void>;
    getProjectSteps(projectId: number): Promise<IProjectStep[]>;
    updateProjectStep(stepId: number, status: "pending" | "in-progress" | "completed"): Promise<IProjectStep>;
    getProjectComments(projectId: number): Promise<IComment[]>;
    addProjectComment(projectId: number, userId: number, content: string): Promise<IComment>;
    updateProjectNeededDocuments(id: number, userId: number, neededDocuments: INeededDocument[]): Promise<IProject>;
}
//# sourceMappingURL=project.service.d.ts.map