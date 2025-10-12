"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentController = void 0;
const document_service_1 = require("../services/document.service");
const deepseek_service_1 = __importDefault(require("../services/deepseek.service"));
class DocumentController {
    constructor() {
        this.createDocument = async (req, res) => {
            try {
                if (!req.file) {
                    res.status(400).json({
                        message: "No file uploaded",
                    });
                    return;
                }
                const { name, projectId, userId, type, content } = req.body;
                const document = await this.documentService.createDocument(name, projectId, content, type, userId);
                res.status(201).json({
                    message: "Document created successfully",
                    document,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.getDocuments = async (req, res) => {
            try {
                const { projectId } = req.query;
                if (!projectId) {
                    res.status(400).json({
                        message: "Project ID is required",
                    });
                    return;
                }
                const documents = await this.documentService.getDocumentsByProjectId(Number(projectId));
                res.status(200).json({
                    documents,
                });
            }
            catch (error) {
                res.status(500).json({
                    message: error.message,
                });
            }
        };
        this.getDocument = async (req, res) => {
            try {
                const { id } = req.params;
                const document = await this.documentService.getDocumentById(Number(id));
                res.status(200).json({
                    document,
                });
            }
            catch (error) {
                res.status(404).json({
                    message: error.message,
                });
            }
        };
        this.updateDocument = async (req, res) => {
            try {
                const { id } = req.params;
                const userId = req.user.id;
                const updateData = req.body;
                const document = await this.documentService.updateDocument(Number(id), userId, updateData);
                res.status(200).json({
                    message: "Document updated successfully",
                    document,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.deleteDocument = async (req, res) => {
            try {
                const { id } = req.params;
                const userId = req.user.id;
                await this.documentService.deleteDocument(Number(id), userId);
                res.status(200).json({
                    message: "Document deleted successfully",
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.generateDocument = async (req, res) => {
            try {
                const { name, field, type, additionalInfo } = req.body;
                const document = await this.deepseekService.generateNeededDocument({
                    name,
                    field,
                    type,
                    additionalInfo,
                    userId: req.user.id,
                });
                res.status(200).json({
                    document,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.generateApplication = async (req, res) => {
            try {
                const response = await this.deepseekService.generateApplication(req.body);
                res.status(200).json(response);
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.changeNeededDocumentStatus = async (req, res) => {
            try {
                const response = await this.documentService.changeNeededDocumentStatus({
                    projectId: req.body.projectId,
                    neededDocumentId: req.body.neededDocumentId,
                    status: req.body.status,
                });
                res.status(200).json(response);
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.getAllDocuments = async (req, res) => {
            console.log(req.user?.id, "user id");
            try {
                const allDocuments = await this.documentService.getAllDocuments(req.user?.id);
                res.status(200).json({
                    message: "Hamma documentlar oldindi!",
                    documents: allDocuments,
                });
            }
            catch (error) {
                throw new Error("Failed to get all documents!");
            }
        };
        this.documentService = new document_service_1.DocumentService();
        this.deepseekService = new deepseek_service_1.default();
    }
}
exports.DocumentController = DocumentController;
//# sourceMappingURL=document.controller.js.map