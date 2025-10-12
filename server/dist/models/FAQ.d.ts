import { Model, Optional } from 'sequelize';
import { IFAQ } from '../types/support.types';
interface FAQCreationAttributes extends Optional<IFAQ, 'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'category'> {
}
declare class FAQ extends Model<IFAQ, FAQCreationAttributes> implements IFAQ {
    id: number;
    question: string;
    answer: string;
    category: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export default FAQ;
//# sourceMappingURL=FAQ.d.ts.map