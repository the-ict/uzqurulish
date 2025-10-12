import { Model, Optional } from 'sequelize';
interface IProjectStep {
    id: number;
    projectId: number;
    stepName: string;
    stepOrder: number;
    status: 'pending' | 'in-progress' | 'completed';
    deadline?: Date;
    completedAt?: Date;
    createdAt: Date;
}
interface ProjectStepCreationAttributes extends Optional<IProjectStep, 'id' | 'createdAt'> {
}
declare class ProjectStep extends Model<IProjectStep, ProjectStepCreationAttributes> implements IProjectStep {
    id: number;
    projectId: number;
    stepName: string;
    stepOrder: number;
    status: 'pending' | 'in-progress' | 'completed';
    deadline?: Date;
    completedAt?: Date;
    createdAt: Date;
    static associate(models: any): void;
}
export default ProjectStep;
//# sourceMappingURL=ProjectStep.d.ts.map