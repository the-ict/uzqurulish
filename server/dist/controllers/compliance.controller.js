"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceController = void 0;
const compliance_service_1 = require("../services/compliance.service");
class ComplianceController {
    constructor() {
        this.checkProject = async (req, res) => {
            try {
                const { projectId } = req.params;
                const projectParams = req.body;
                const result = await this.complianceService.checkProject(Number(projectId), projectParams);
                res.status(200).json({
                    message: "Compliance check completed",
                    result,
                });
            }
            catch (error) {
                console.log("the error: ", error);
                res.status(400).json({
                    message: error.message,
                    error
                });
            }
        };
        this.getComplianceByProjectId = async (req, res) => {
            try {
                const { projectId } = req.params;
                const complianceRecords = await this.complianceService.getComplianceByProjectId(Number(projectId));
                res.status(200).json({
                    complianceRecords,
                });
            }
            catch (error) {
                res.status(500).json({
                    message: error.message,
                });
            }
        };
        this.complianceService = new compliance_service_1.ComplianceService();
    }
}
exports.ComplianceController = ComplianceController;
//# sourceMappingURL=compliance.controller.js.map