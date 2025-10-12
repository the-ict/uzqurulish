import { Model, Optional } from 'sequelize';
interface ICompliance {
    id: number;
    projectId: number;
    ruleName: string;
    status: 'pending' | 'passed' | 'failed' | 'warning';
    score: number;
    details?: string;
    createdAt: Date;
}
interface ComplianceCreationAttributes extends Optional<ICompliance, 'id' | 'createdAt'> {
}
declare class Compliance extends Model<ICompliance, ComplianceCreationAttributes> implements ICompliance {
    id: number;
    projectId: number;
    ruleName: string;
    status: 'pending' | 'passed' | 'failed' | "warning";
    score: number;
    details?: string;
    createdAt: Date;
    static associate(models: any): void;
}
export default Compliance;
//# sourceMappingURL=Complience.d.ts.map