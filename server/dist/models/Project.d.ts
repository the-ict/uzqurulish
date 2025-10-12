import { Model, Optional } from "sequelize";
import { IProject, INeededDocument } from "../types/project.types";
interface ProjectCreationAttributes extends Optional<IProject, "id" | "createdAt" | "updatedAt" | "needed_documents"> {
}
declare class Project extends Model<IProject, ProjectCreationAttributes> implements IProject {
    id: number;
    name: string;
    description?: string;
    type: "residential" | "commercial" | "industrial";
    area: number;
    location: string;
    status: "pending" | "in-progress" | "approved" | "rejected";
    progress: number;
    deadline?: Date;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    needed_documents: INeededDocument[];
    static associate(models: any): void;
}
export default Project;
//# sourceMappingURL=Project.d.ts.map