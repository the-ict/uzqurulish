"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const models_1 = __importDefault(require("../models"));
const models_2 = __importDefault(require("../models"));
const { User } = models_2.default;
class ProjectService {
    async checkUserExists(userId) {
        const user = await models_2.default.User.findByPk(userId);
        return !!user;
    }
    async createProject(userId, projectData) {
        const project = await models_1.default.Project.create({
            ...projectData,
            userId,
            status: "pending",
            progress: 0,
        });
        // Create default project steps
        await models_1.default.ProjectStep.bulkCreate([
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
    async getProjectsByUserId(userId) {
        const projects = await models_1.default.Project.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]],
        });
        return projects.map((project) => project.toJSON());
    }
    async getProjectById(id) {
        const project = await models_1.default.Project.findByPk(id);
        if (!project) {
            throw new Error("Project not found");
        }
        return project.toJSON();
    }
    async updateProject(id, userId, updateData) {
        const project = await models_1.default.Project.findOne({ where: { id, userId } });
        if (!project) {
            throw new Error("Project not found");
        }
        await project.update(updateData);
        return project.toJSON();
    }
    async deleteProject(id, userId) {
        const project = await models_1.default.Project.findOne({ where: { id, userId } });
        if (!project) {
            throw new Error("Project not found");
        }
        await project.destroy();
    }
    async getProjectSteps(projectId) {
        const steps = await models_1.default.ProjectStep.findAll({
            where: { projectId },
            order: [["stepOrder", "ASC"]],
        });
        return steps.map((step) => step.toJSON());
    }
    async updateProjectStep(stepId, status) {
        const step = await models_1.default.ProjectStep.findByPk(stepId);
        if (!step) {
            throw new Error("Step not found");
        }
        const updateData = { status };
        if (status === "completed") {
            updateData.completedAt = new Date();
        }
        await step.update(updateData);
        return step.toJSON();
    }
    async getProjectComments(projectId) {
        const comments = await models_1.default.Comment.findAll({
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
        return comments.map((comment) => comment.toJSON());
    }
    async addProjectComment(projectId, userId, content) {
        const comment = await models_1.default.Comment.create({
            projectId,
            userId,
            content,
        });
        return comment.toJSON();
    }
    async updateProjectNeededDocuments(id, userId, neededDocuments) {
        const project = await models_1.default.Project.findOne({ where: { id, userId } });
        if (!project) {
            throw new Error("Project not found");
        }
        await project.update({ needed_documents: neededDocuments });
        return project.toJSON();
    }
}
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map