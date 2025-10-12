"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const User_1 = __importDefault(require("./User"));
const Project_1 = __importDefault(require("./Project"));
const Document_1 = __importDefault(require("./Document"));
const Complience_1 = __importDefault(require("./Complience"));
const Zoning_1 = __importDefault(require("./Zoning"));
const Notification_1 = __importDefault(require("./Notification"));
const ProjectStep_1 = __importDefault(require("./ProjectStep"));
const Comment_1 = __importDefault(require("./Comment"));
const SupportTicket_1 = __importDefault(require("./SupportTicket"));
const FAQ_1 = __importDefault(require("./FAQ"));
const Messages_1 = __importDefault(require("./Messages"));
const SupportConversation_1 = __importDefault(require("./SupportConversation"));
// Define associations
User_1.default.hasMany(Project_1.default, { foreignKey: "userId", as: "projects" });
Project_1.default.belongsTo(User_1.default, { foreignKey: "userId", as: "user" });
User_1.default.hasMany(Document_1.default, { foreignKey: "userId", as: "documents" });
Document_1.default.belongsTo(User_1.default, { foreignKey: "userId", as: "user" });
Project_1.default.hasMany(Document_1.default, { foreignKey: "projectId", as: "documents" });
Document_1.default.belongsTo(Project_1.default, { foreignKey: "projectId", as: "project" });
Project_1.default.hasMany(Complience_1.default, {
    foreignKey: "projectId",
    as: "complianceChecks",
});
Complience_1.default.belongsTo(Project_1.default, { foreignKey: "projectId", as: "project" });
Project_1.default.hasMany(ProjectStep_1.default, { foreignKey: "projectId", as: "steps" });
ProjectStep_1.default.belongsTo(Project_1.default, { foreignKey: "projectId", as: "project" });
Project_1.default.hasMany(Comment_1.default, { foreignKey: "projectId", as: "comments" });
Comment_1.default.belongsTo(Project_1.default, { foreignKey: "projectId", as: "project" });
User_1.default.hasMany(Comment_1.default, { foreignKey: "userId", as: "comments" });
Comment_1.default.belongsTo(User_1.default, { foreignKey: "userId", as: "user" });
User_1.default.hasMany(Notification_1.default, { foreignKey: "userId", as: "notifications" });
Notification_1.default.belongsTo(User_1.default, { foreignKey: "userId", as: "user" });
User_1.default.hasMany(SupportTicket_1.default, { foreignKey: "userId", as: "supportTickets" });
SupportTicket_1.default.belongsTo(User_1.default, { foreignKey: "userId", as: "user" });
const models = {
    User: User_1.default,
    Project: Project_1.default,
    Document: Document_1.default,
    Compliance: Complience_1.default,
    Zoning: Zoning_1.default,
    Notification: Notification_1.default,
    ProjectStep: ProjectStep_1.default,
    Comment: Comment_1.default,
    SupportTicket: SupportTicket_1.default,
    FAQ: FAQ_1.default,
    Messages: Messages_1.default,
    SupportConversation: SupportConversation_1.default
};
const db = {
    sequelize: database_1.sequelize,
    ...models,
};
exports.default = db;
//# sourceMappingURL=index.js.map