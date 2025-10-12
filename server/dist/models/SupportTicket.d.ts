import { Model, Optional } from 'sequelize';
import { ISupportTicket } from '../types/support.types';
interface SupportTicketCreationAttributes extends Optional<ISupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'priority' | 'category'> {
}
declare class SupportTicket extends Model<ISupportTicket, SupportTicketCreationAttributes> implements ISupportTicket {
    id: number;
    userId: number;
    subject: string;
    description: string;
    category: 'texnik' | 'moliyaviy' | 'hisob' | 'boshqa';
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
    updatedAt: Date;
    static associate(models: any): void;
}
export default SupportTicket;
//# sourceMappingURL=SupportTicket.d.ts.map