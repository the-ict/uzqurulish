import { Router } from 'express';
import { ZoningController } from '../controllers/zoning.controller';

const router = Router();
const zoningController = new ZoningController();

router.get('/info', zoningController.getZoningInfo);
router.get('/types', zoningController.getZoneTypes);
router.get('/map', zoningController.getZoningMapData);
router.post('/seed', zoningController.seedData);

export default router;