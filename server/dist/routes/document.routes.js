"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const document_controller_1 = require("../controllers/document.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const documentController = new document_controller_1.DocumentController();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
// Validation schemas
const createDocumentSchema = joi_1.default.object({
    name: joi_1.default.string().min(1).required(),
    type: joi_1.default.string().min(1).required(),
    field: joi_1.default.number().required(),
    additionalInfo: joi_1.default.string().min(1).required(),
    userId: joi_1.default.number().optional(),
});
const updateDocumentSchema = joi_1.default.object({
    name: joi_1.default.string().min(1).optional(),
    type: joi_1.default.string().min(1).optional(),
});
const updateNeededDocStatus = joi_1.default.object({
    projectId: joi_1.default.number().required(),
    neededDocumentId: joi_1.default.number().required(),
    status: joi_1.default.string().required(),
});
// Routes
router.post("/create", auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(createDocumentSchema), documentController.createDocument);
router.get("/get/docs", auth_middleware_1.authenticateToken, documentController.getDocuments);
router.get("/:id", auth_middleware_1.authenticateToken, documentController.getDocument);
router.put("/:id", auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(updateDocumentSchema), documentController.updateDocument);
router.delete("/:id", auth_middleware_1.authenticateToken, documentController.deleteDocument);
router.post("/document-generate", auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(createDocumentSchema), documentController.generateDocument);
router.post("/document-generate-by-prompt", auth_middleware_1.authenticateToken, documentController.generateApplication);
router.put("/update-doc/update-needed-doc-status", auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(updateNeededDocStatus), documentController.changeNeededDocumentStatus);
router.get("/documents/all", auth_middleware_1.authenticateToken, documentController.getAllDocuments);
exports.default = router;
//# sourceMappingURL=document.routes.js.map