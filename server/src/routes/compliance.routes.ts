import { Router } from 'express';
import { ComplianceController } from '../controllers/compliance.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
const complianceController = new ComplianceController();

// Routes
router.post('/check/:projectId', authenticateToken, complianceController.checkProject);
router.get('/project/:projectId', authenticateToken, complianceController.getComplianceByProjectId);

export default router;