"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const project_service_1 = require("../services/project.service");
const deepseek_service_1 = __importDefault(require("../services/deepseek.service"));
class ProjectController {
    constructor() {
        this.createProject = async (req, res) => {
            try {
                const userId = req.user?.id;
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
                const projectData = req.body;
                const neededDocuments = await this.deepseekService.generateNeededDocuments(projectData);
                const project = await this.projectService.createProject(userId, { ...projectData, needed_documents: neededDocuments });
                res.status(201).json({
                    message: "Project created successfully",
                    project,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.getProjects = async (req, res) => {
            try {
                const userId = req.user.id;
                const projects = await this.projectService.getProjectsByUserId(userId);
                res.status(200).json({
                    projects,
                });
            }
            catch (error) {
                res.status(500).json({
                    message: error.message,
                });
            }
        };
        this.getProject = async (req, res) => {
            try {
                const { id } = req.params;
                const project = await this.projectService.getProjectById(Number(id));
                res.status(200).json({
                    project,
                });
            }
            catch (error) {
                res.status(404).json({
                    message: error.message,
                });
            }
        };
        this.updateProject = async (req, res) => {
            try {
                const { id } = req.params;
                const userId = req.user.id;
                const updateData = req.body;
                const project = await this.projectService.updateProject(Number(id), userId, updateData);
                res.status(200).json({
                    message: "Project updated successfully",
                    project,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.deleteProject = async (req, res) => {
            try {
                const { id } = req.params;
                const userId = req.user.id;
                await this.projectService.deleteProject(Number(id), userId);
                res.status(200).json({
                    message: "Project deleted successfully",
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.getProjectSteps = async (req, res) => {
            try {
                const { id } = req.params;
                const steps = await this.projectService.getProjectSteps(Number(id));
                res.status(200).json({
                    steps,
                });
            }
            catch (error) {
                res.status(500).json({
                    message: error.message,
                });
            }
        };
        this.updateProjectStep = async (req, res) => {
            try {
                const { stepId } = req.params;
                const { status } = req.body;
                const step = await this.projectService.updateProjectStep(Number(stepId), status);
                res.status(200).json({
                    message: "Step updated successfully",
                    step,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.getProjectComments = async (req, res) => {
            try {
                const { id } = req.params;
                const comments = await this.projectService.getProjectComments(Number(id));
                res.status(200).json({
                    comments,
                });
            }
            catch (error) {
                res.status(500).json({
                    message: error.message,
                });
            }
        };
        this.addProjectComment = async (req, res) => {
            try {
                const { id } = req.params;
                const userId = req.user.id;
                const { content } = req.body;
                const comment = await this.projectService.addProjectComment(Number(id), userId, content);
                res.status(201).json({
                    message: "Comment added successfully",
                    comment,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.projectService = new project_service_1.ProjectService();
        this.deepseekService = new deepseek_service_1.default();
    }
}
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map