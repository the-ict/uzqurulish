import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import Joi from 'joi';
import multer from 'multer';

const router = Router();
const projectController = new ProjectController();

// File upload configuration
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed'));
    }
  },
});

// Validation schemas
const createProjectSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().optional(),
  type: Joi.string().valid('residential', 'commercial', 'industrial').required(),
  area: Joi.number().positive().required(),
  location: Joi.string().min(2).required(),
  deadline: Joi.date().optional(),
});

const updateProjectSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  description: Joi.string().optional(),
  type: Joi.string().valid('residential', 'commercial', 'industrial').optional(),
  area: Joi.number().positive().optional(),
  location: Joi.string().min(2).optional(),
  status: Joi.string().valid('pending', 'in-progress', 'approved', 'rejected').optional(),
  progress: Joi.number().min(0).max(100).optional(),
  deadline: Joi.date().optional(),
});

const updateStepSchema = Joi.object({
  status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
});

const addCommentSchema = Joi.object({
  content: Joi.string().min(1).required(),
});

// Routes
router.post('/', authenticateToken, validate(createProjectSchema), projectController.createProject);
router.get('/', authenticateToken, projectController.getProjects);
router.get('/:id', authenticateToken, projectController.getProject);
router.put('/:id', authenticateToken, validate(updateProjectSchema), projectController.updateProject);
router.delete('/:id', authenticateToken, projectController.deleteProject);
router.get('/:id/steps', authenticateToken, projectController.getProjectSteps);
router.put('/steps/:stepId', authenticateToken, validate(updateStepSchema), projectController.updateProjectStep);
router.get('/:id/comments', authenticateToken, projectController.getProjectComments);
router.post('/:id/comments', authenticateToken, validate(addCommentSchema), projectController.addProjectComment);

export default router;