import User from "./User";
import Project from "./Project";
import Document from "./Document";
import Compliance from "./Complience";
import Zoning from "./Zoning";
import Notification from "./Notification";
import ProjectStep from "./ProjectStep";
import Comment from "./Comment";
import SupportTicket from "./SupportTicket";
import FAQ from "./FAQ";
import Messages from "./Messages";
import SupportConversation from "./SupportConversation";
declare const db: {
    User: typeof User;
    Project: typeof Project;
    Document: typeof Document;
    Compliance: typeof Compliance;
    Zoning: typeof Zoning;
    Notification: typeof Notification;
    ProjectStep: typeof ProjectStep;
    Comment: typeof Comment;
    SupportTicket: typeof SupportTicket;
    FAQ: typeof FAQ;
    Messages: typeof Messages;
    SupportConversation: typeof SupportConversation;
    sequelize: import("sequelize").Sequelize;
};
export default db;
//# sourceMappingURL=index.d.ts.map