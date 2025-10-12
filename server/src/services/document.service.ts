import Document from "../models";
import { INeededDocument } from "../types";
import {
  IChangeNeededDocumentParams,
  IDocument,
} from "../types/document.types";
import { FileService } from "./file.service";
import { ProjectService } from "./project.service";

export class DocumentService {
  private fileService: FileService;
  private ProjectService: ProjectService;

  constructor() {
    this.fileService = new FileService();
    this.ProjectService = new ProjectService();
  }

  async createDocument(
    name: string,
    projectId: number,
    content: string,
    type: string,
    userId: number
  ): Promise<IDocument> {
    const document = await Document.Document.create({
      name,
      projectId,
      type,
      content,
      userId,
      status: "pending"
    });

    return document;
  }

  async getDocumentsByProjectId(projectId: number): Promise<IDocument[]> {
    const documents = await Document.Document.findAll({
      where: { projectId },
      order: [["createdAt", "DESC"]],
    });

    return documents.map((document) => document.toJSON());
  }

  async getDocumentById(id: number): Promise<IDocument> {
    const document = await Document.Document.findByPk(id);
    if (!document) {
      throw new Error("Document not found");
    }

    return document.toJSON();
  }

  async updateDocument(
    id: number,
    userId: number,
    updateData: Partial<IDocument>
  ): Promise<IDocument> {
    const document = await Document.Document.findOne({ where: { id, userId } });
    if (!document) {
      throw new Error("Document not found");
    }

    await document.update(updateData);

    return document.toJSON();
  }

  async deleteDocument(id: number, userId: number): Promise<void> {}

  public async changeNeededDocumentStatus({
    projectId,
    neededDocumentId,
    status,
  }: IChangeNeededDocumentParams) {
    const project = await this.ProjectService.getProjectById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const updatedNeededDocuments = project.needed_documents.map((doc) =>
      doc.id === neededDocumentId ? { ...doc, status } : doc
    );

    const updateProject =
      await this.ProjectService.updateProjectNeededDocuments(
        projectId,
        project.userId,
        updatedNeededDocuments as INeededDocument[]
      );
    return updateProject;
  }

  public async getAllDocuments(id: number) {
    const allUserProjects =   await this.ProjectService.getProjectsByUserId(id)

    let documents: INeededDocument[] = [];

    allUserProjects.forEach((project) => {
      project.needed_documents.forEach(doc => {
        documents.push(doc)
      })
    })

    console.log("all documents: ", documents)

    return documents
  }
}
