"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compliance_controller_1 = require("../controllers/compliance.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const complianceController = new compliance_controller_1.ComplianceController();
// Routes
router.post('/check/:projectId', auth_middleware_1.authenticateToken, complianceController.checkProject);
router.get('/project/:projectId', auth_middleware_1.authenticateToken, complianceController.getComplianceByProjectId);
exports.default = router;
//# sourceMappingURL=compliance.routes.js.map