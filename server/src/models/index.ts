import { sequelize } from "../config/database";
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
import Payment from "./Payment";
import Subscription from "./Subscription";

// Define associations
User.hasMany(Project, { foreignKey: "userId", as: "projects" });
Project.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Document, { foreignKey: "userId", as: "documents" });
Document.belongsTo(User, { foreignKey: "userId", as: "user" });

Project.hasMany(Document, { foreignKey: "projectId", as: "documents" });
Document.belongsTo(Project, { foreignKey: "projectId", as: "project" });

Project.hasMany(Compliance, {
  foreignKey: "projectId",
  as: "complianceChecks",
});
Compliance.belongsTo(Project, { foreignKey: "projectId", as: "project" });

Project.hasMany(ProjectStep, { foreignKey: "projectId", as: "steps" });
ProjectStep.belongsTo(Project, { foreignKey: "projectId", as: "project" });

Project.hasMany(Comment, { foreignKey: "projectId", as: "comments" });
Comment.belongsTo(Project, { foreignKey: "projectId", as: "project" });

User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Notification, { foreignKey: "userId", as: "notifications" });
Notification.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(SupportTicket, { foreignKey: "userId", as: "supportTickets" });
SupportTicket.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Payment, { foreignKey: "userId", as: "payments" });
Payment.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Subscription, { foreignKey: "userId", as: "subscriptions" });
Subscription.belongsTo(User, { foreignKey: "userId", as: "user" });

const models = {
  User,
  Project,
  Document,
  Compliance,
  Zoning,
  Notification,
  ProjectStep,
  Comment,
  SupportTicket,
  FAQ,
  Messages,
  SupportConversation,
  Payment
};

const db = {
  sequelize,
  ...models,
};

export default db;
