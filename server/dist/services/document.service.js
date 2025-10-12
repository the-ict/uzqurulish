"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
const models_1 = __importDefault(require("../models"));
const file_service_1 = require("./file.service");
const project_service_1 = require("./project.service");
class DocumentService {
    constructor() {
        this.fileService = new file_service_1.FileService();
        this.ProjectService = new project_service_1.ProjectService();
    }
    async createDocument(name, projectId, content, type, userId) {
        const document = await models_1.default.Document.create({
            name,
            projectId,
            type,
            content,
            userId,
            status: "pending"
        });
        return document;
    }
    async getDocumentsByProjectId(projectId) {
        const documents = await models_1.default.Document.findAll({
            where: { projectId },
            order: [["createdAt", "DESC"]],
        });
        return documents.map((document) => document.toJSON());
    }
    async getDocumentById(id) {
        const document = await models_1.default.Document.findByPk(id);
        if (!document) {
            throw new Error("Document not found");
        }
        return document.toJSON();
    }
    async updateDocument(id, userId, updateData) {
        const document = await models_1.default.Document.findOne({ where: { id, userId } });
        if (!document) {
            throw new Error("Document not found");
        }
        await document.update(updateData);
        return document.toJSON();
    }
    async deleteDocument(id, userId) { }
    async changeNeededDocumentStatus({ projectId, neededDocumentId, status, }) {
        const project = await this.ProjectService.getProjectById(projectId);
        if (!project) {
            throw new Error("Project not found");
        }
        const updatedNeededDocuments = project.needed_documents.map((doc) => doc.id === neededDocumentId ? { ...doc, status } : doc);
        const updateProject = await this.ProjectService.updateProjectNeededDocuments(projectId, project.userId, updatedNeededDocuments);
        return updateProject;
    }
    async getAllDocuments(id) {
        const allUserProjects = await this.ProjectService.getProjectsByUserId(id);
        let documents = [];
        allUserProjects.forEach((project) => {
            project.needed_documents.forEach(doc => {
                documents.push(doc);
            });
        });
        console.log("all documents: ", documents);
        return documents;
    }
}
exports.DocumentService = DocumentService;
//# sourceMappingURL=document.service.js.map