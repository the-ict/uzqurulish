"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const project_routes_1 = __importDefault(require("./project.routes"));
const document_routes_1 = __importDefault(require("./document.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const compliance_routes_1 = __importDefault(require("./compliance.routes"));
const zoning_routes_1 = __importDefault(require("./zoning.routes"));
const support_routes_1 = __importDefault(require("./support.routes"));
const router = (0, express_1.Router)();
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});
router.use('/api/auth', auth_routes_1.default);
router.use('/api/projects', project_routes_1.default);
router.use('/api/documents', document_routes_1.default);
router.use('/api/users', user_routes_1.default);
router.use('/api/compliance', compliance_routes_1.default);
router.use('/api/zoning', zoning_routes_1.default);
router.use("/api/support", support_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map