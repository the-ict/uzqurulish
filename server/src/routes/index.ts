import { Router } from 'express';
import authRoutes from './auth.routes';
import projectRoutes from './project.routes';
import documentRoutes from './document.routes';
import userRoutes from './user.routes';
import complianceRoutes from './compliance.routes';
import zoningRoutes from './zoning.routes';
import supportRoutes from "./support.routes";
// import paymentRoutes from "./payment.routes";

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

router.use('/api/auth', authRoutes);
router.use('/api/projects', projectRoutes);
router.use('/api/documents', documentRoutes);
router.use('/api/users', userRoutes);
router.use('/api/compliance', complianceRoutes);
router.use('/api/zoning', zoningRoutes);
router.use("/api/support", supportRoutes);
// router.use('/api/payment', paymentRoutes);

export default router;