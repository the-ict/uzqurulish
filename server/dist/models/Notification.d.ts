import { Model, Optional } from 'sequelize';
interface INotification {
    id: number;
    userId: number;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    read: boolean;
    createdAt: Date;
}
interface NotificationCreationAttributes extends Optional<INotification, 'id' | 'createdAt'> {
}
declare class Notification extends Model<INotification, NotificationCreationAttributes> implements INotification {
    id: number;
    userId: number;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    read: boolean;
    createdAt: Date;
    static associate(models: any): void;
}
export default Notification;
//# sourceMappingURL=Notification.d.ts.map