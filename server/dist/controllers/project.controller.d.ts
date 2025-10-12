import { Request, Response } from "express";
export declare class ProjectController {
    private projectService;
    private deepseekService;
    constructor();
    createProject: (req: Request, res: Response) => Promise<void>;
    getProjects: (req: Request, res: Response) => Promise<void>;
    getProject: (req: Request, res: Response) => Promise<void>;
    updateProject: (req: Request, res: Response) => Promise<void>;
    deleteProject: (req: Request, res: Response) => Promise<void>;
    getProjectSteps: (req: Request, res: Response) => Promise<void>;
    updateProjectStep: (req: Request, res: Response) => Promise<void>;
    getProjectComments: (req: Request, res: Response) => Promise<void>;
    addProjectComment: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=project.controller.d.ts.map