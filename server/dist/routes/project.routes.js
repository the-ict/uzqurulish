"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = require("../controllers/project.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const joi_1 = __importDefault(require("joi"));
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const projectController = new project_controller_1.ProjectController();
// File upload configuration
const upload = (0, multer_1.default)({
    dest: 'uploads/',
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
            cb(null, true);
        }
        else {
            cb(new Error('Only images and PDF files are allowed'));
        }
    },
});
// Validation schemas
const createProjectSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).required(),
    description: joi_1.default.string().optional(),
    type: joi_1.default.string().valid('residential', 'commercial', 'industrial').required(),
    area: joi_1.default.number().positive().required(),
    location: joi_1.default.string().min(2).required(),
    deadline: joi_1.default.date().optional(),
});
const updateProjectSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).optional(),
    description: joi_1.default.string().optional(),
    type: joi_1.default.string().valid('residential', 'commercial', 'industrial').optional(),
    area: joi_1.default.number().positive().optional(),
    location: joi_1.default.string().min(2).optional(),
    status: joi_1.default.string().valid('pending', 'in-progress', 'approved', 'rejected').optional(),
    progress: joi_1.default.number().min(0).max(100).optional(),
    deadline: joi_1.default.date().optional(),
});
const updateStepSchema = joi_1.default.object({
    status: joi_1.default.string().valid('pending', 'in-progress', 'completed').required(),
});
const addCommentSchema = joi_1.default.object({
    content: joi_1.default.string().min(1).required(),
});
// Routes
router.post('/', auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(createProjectSchema), projectController.createProject);
router.get('/', auth_middleware_1.authenticateToken, projectController.getProjects);
router.get('/:id', auth_middleware_1.authenticateToken, projectController.getProject);
router.put('/:id', auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(updateProjectSchema), projectController.updateProject);
router.delete('/:id', auth_middleware_1.authenticateToken, projectController.deleteProject);
router.get('/:id/steps', auth_middleware_1.authenticateToken, projectController.getProjectSteps);
router.put('/steps/:stepId', auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(updateStepSchema), projectController.updateProjectStep);
router.get('/:id/comments', auth_middleware_1.authenticateToken, projectController.getProjectComments);
router.post('/:id/comments', auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(addCommentSchema), projectController.addProjectComment);
exports.default = router;
//# sourceMappingURL=project.routes.js.map