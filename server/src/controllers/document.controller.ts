import { Request, Response } from "express";
import { DocumentService } from "../services/document.service";
import DeepSeekService from "../services/deepseek.service";
import { clear } from "console";

export class DocumentController {
  private documentService: DocumentService;
  private deepseekService: DeepSeekService;

  constructor() {
    this.documentService = new DocumentService();
    this.deepseekService = new DeepSeekService();
  }

  createDocument = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({
          message: "No file uploaded",
        });
        return;
      }

      const { name, projectId, userId, type, content } = req.body;

      const document = await this.documentService.createDocument(
        name,
        projectId,
        content,
        type,
        userId
      );

      res.status(201).json({
        message: "Document created successfully",
        document,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  getDocuments = async (req: Request, res: Response): Promise<void> => {
    try {
      const { projectId } = req.query;

      if (!projectId) {
        res.status(400).json({
          message: "Project ID is required",
        });
        return;
      }

      const documents = await this.documentService.getDocumentsByProjectId(
        Number(projectId)
      );

      res.status(200).json({
        documents,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  getDocument = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const document = await this.documentService.getDocumentById(Number(id));

      res.status(200).json({
        document,
      });
    } catch (error: any) {
      res.status(404).json({
        message: error.message,
      });
    }
  };

  updateDocument = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
      const updateData = req.body;

      const document = await this.documentService.updateDocument(
        Number(id),
        userId,
        updateData
      );

      res.status(200).json({
        message: "Document updated successfully",
        document,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  deleteDocument = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;

      await this.documentService.deleteDocument(Number(id), userId);

      res.status(200).json({
        message: "Document deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  generateDocument = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, field, type, additionalInfo } = req.body;
      const document = await this.deepseekService.generateNeededDocument({
        name,
        field,
        type,
        additionalInfo,
        userId: (req as any).user.id,
      });

      res.status(200).json({
        document,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  generateApplication = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await this.deepseekService.generateApplication(req.body);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  changeNeededDocumentStatus = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const response = await this.documentService.changeNeededDocumentStatus({
        projectId: req.body.projectId,
        neededDocumentId: req.body.neededDocumentId,
        status: req.body.status,
      });
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  getAllDocuments = async (req: Request, res: Response) => {
    console.log(req.user?.id, "user id");
    try {
      const allDocuments = await this.documentService.getAllDocuments(
        req.user?.id as number
      );

      res.status(200).json({
        message: "Hamma documentlar oldindi!",
        documents: allDocuments,
      });
    } catch (error) {
      throw new Error("Failed to get all documents!");
    }
  };
}
