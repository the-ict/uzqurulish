"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zoning_controller_1 = require("../controllers/zoning.controller");
const router = (0, express_1.Router)();
const zoningController = new zoning_controller_1.ZoningController();
router.get('/info', zoningController.getZoningInfo);
router.get('/types', zoningController.getZoneTypes);
router.get('/map', zoningController.getZoningMapData);
router.post('/seed', zoningController.seedData);
exports.default = router;
//# sourceMappingURL=zoning.routes.js.map