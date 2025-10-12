import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";
import {
  ICreateProjectInput,
  IUpdateProjectInput,
} from "../types/project.types";
import DeepSeekService from "../services/deepseek.service";

export class ProjectController {
  private projectService: ProjectService;
  private deepseekService: DeepSeekService;

  constructor() {
    this.projectService = new ProjectService();
    this.deepseekService = new DeepSeekService();
  }

  createProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      // Verify user exists
      const userExists = await this.projectService.checkUserExists(userId);
      if (!userExists) {
        res.status(401).json({ message: 'User not found' });
        return;
      }

      const projectData: ICreateProjectInput = req.body;

      const neededDocuments = await this.deepseekService.generateNeededDocuments(projectData);

      const project = await this.projectService.createProject(
        userId,
        {...projectData, needed_documents: neededDocuments}
      );

      res.status(201).json({
        message: "Project created successfully",
        project,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const projects = await this.projectService.getProjectsByUserId(userId);

      res.status(200).json({
        projects,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  getProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const project = await this.projectService.getProjectById(Number(id));

      res.status(200).json({
        project,
      });
    } catch (error: any) {
      res.status(404).json({
        message: error.message,
      });
    }
  };

  updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
      const updateData: IUpdateProjectInput = req.body;

      const project = await this.projectService.updateProject(
        Number(id),
        userId,
        updateData
      );

      res.status(200).json({
        message: "Project updated successfully",
        project,
      });
    } catch (error:any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;

      await this.projectService.deleteProject(Number(id), userId);

      res.status(200).json({
        message: "Project deleted successfully",
      });
    } catch (error:any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  getProjectSteps = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const steps = await this.projectService.getProjectSteps(
        Number(id)
      );

      res.status(200).json({
        steps,
      });
    } catch (error:any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  updateProjectStep = async (req: Request, res: Response): Promise<void> => {
    try {
      const { stepId } = req.params;
      const { status } = req.body;

      const step = await this.projectService.updateProjectStep(
        Number(stepId),
        status
      );

      res.status(200).json({
        message: "Step updated successfully",
        step,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  getProjectComments = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const comments = await this.projectService.getProjectComments(
        Number(id)
      );

      res.status(200).json({
        comments,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  addProjectComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
      const { content } = req.body;

      const comment = await this.projectService.addProjectComment(
        Number(id),
        userId,
        content
      );

      res.status(201).json({
        message: "Comment added successfully",
        comment,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };
}
