import { DocumentController } from "../controllers/document.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import { Router } from "express";
import Joi from "joi";
import multer from "multer";

const router = Router();
const documentController = new DocumentController();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Validation schemas
const createDocumentSchema = Joi.object({
  name: Joi.string().min(1).required(),
  type: Joi.string().min(1).required(),
  field: Joi.number().required(),
  additionalInfo: Joi.string().min(1).required(),
  userId: Joi.number().optional(),
});

const updateDocumentSchema = Joi.object({
  name: Joi.string().min(1).optional(),
  type: Joi.string().min(1).optional(),
});

const updateNeededDocStatus = Joi.object({
  projectId: Joi.number().required(),
  neededDocumentId: Joi.number().required(),
  status: Joi.string().required(),
})

// Routes
router.post(
  "/create",
  authenticateToken,
  validate(createDocumentSchema),
  documentController.createDocument
);

router.get("/get/docs", authenticateToken, documentController.getDocuments);

router.get("/:id", authenticateToken, documentController.getDocument);
router.put(
  "/:id",
  authenticateToken,
  validate(updateDocumentSchema),
  documentController.updateDocument
);
router.delete("/:id", authenticateToken, documentController.deleteDocument);

router.post(
  "/document-generate",
  authenticateToken,
  validate(createDocumentSchema),
  documentController.generateDocument
);

router.post(
  "/document-generate-by-prompt",
  authenticateToken,
  documentController.generateApplication
);

router.put("/update-doc/update-needed-doc-status", authenticateToken, validate(updateNeededDocStatus), documentController.changeNeededDocumentStatus)

router.get("/documents/all", authenticateToken, documentController.getAllDocuments)

export default router;
