import Project from "../models";
import {
  IProject,
  ICreateProjectInput,
  IUpdateProjectInput,
  IProjectStep,
  IComment,
  INeededDocument,
} from "../types/project.types";
import db from "../models";
const { User } = db;

export class ProjectService {
  async checkUserExists(userId: number): Promise<boolean> {
    const user = await db.User.findByPk(userId);
    return !!user;
  }

  async createProject(
    userId: number,
    projectData: ICreateProjectInput
  ): Promise<IProject> {
    const project = await Project.Project.create({
      ...projectData,
      userId,
      status: "pending",
      progress: 0,
    });

    // Create default project steps
    await Project.ProjectStep.bulkCreate([
      {
        projectId: project.id,
        stepName: "Ariza topshirish",
        stepOrder: 1,
        status: "pending",
      },
      {
        projectId: project.id,
        stepName: "Hujjatlar tayyorlash",
        stepOrder: 2,
        status: "pending",
      },
      {
        projectId: project.id,
        stepName: "Qoidalar tekshiruvi",
        stepOrder: 3,
        status: "pending",
      },
      {
        projectId: project.id,
        stepName: "To'lov amalga oshirish",
        stepOrder: 4,
        status: "pending",
      },
      {
        projectId: project.id,
        stepName: "Ruxsatnoma olish",
        stepOrder: 5,
        status: "pending",
      },
    ]);

    return project.toJSON();
  }

  async getProjectsByUserId(userId: number): Promise<IProject[]> {
    const projects = await Project.Project.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    return projects.map((project) => project.toJSON());
  }

  async getProjectById(id: number): Promise<IProject> {
    const project = await Project.Project.findByPk(id);
    if (!project) {
      throw new Error("Project not found");
    }

    return project.toJSON();
  }

  async updateProject(
    id: number,
    userId: number,
    updateData: IUpdateProjectInput
  ): Promise<IProject> {
    const project = await Project.Project.findOne({ where: { id, userId } });
    if (!project) {
      throw new Error("Project not found");
    }

    await project.update(updateData);

    return project.toJSON();
  }

  async deleteProject(id: number, userId: number): Promise<void> {
    const project = await Project.Project.findOne({ where: { id, userId } });
    if (!project) {
      throw new Error("Project not found");
    }

    await project.destroy();
  }

  async getProjectSteps(projectId: number): Promise<IProjectStep[]> {
    const steps = await Project.ProjectStep.findAll({
      where: { projectId },
      order: [["stepOrder", "ASC"]],
    });

    return steps.map((step) => step.toJSON() as IProjectStep);
  }

  async updateProjectStep(
    stepId: number,
    status: "pending" | "in-progress" | "completed"
  ): Promise<IProjectStep> {
    const step = await Project.ProjectStep.findByPk(stepId);
    if (!step) {
      throw new Error("Step not found");
    }

    const updateData: any = { status };
    if (status === "completed") {
      updateData.completedAt = new Date();
    }

    await step.update(updateData);

    return step.toJSON() as IProjectStep;
  }

  async getProjectComments(projectId: number): Promise<IComment[]> {
    const comments = await Project.Comment.findAll({
      where: { projectId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "avatarUrl"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return comments.map((comment) => comment.toJSON() as IComment);
  }

  async addProjectComment(
    projectId: number,
    userId: number,
    content: string
  ): Promise<IComment> {
    const comment = await Project.Comment.create({
      projectId,
      userId,
      content,
    });

    return comment.toJSON() as IComment;
  }
  async updateProjectNeededDocuments(
    id: number,
    userId: number,
    neededDocuments: INeededDocument[]
  ): Promise<IProject> {
    const project = await Project.Project.findOne({ where: { id, userId } });
    if (!project) {
      throw new Error("Project not found");
    }

    await project.update({ needed_documents: neededDocuments });

    return project.toJSON();
  }
}