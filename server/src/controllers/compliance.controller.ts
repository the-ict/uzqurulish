import { Request, Response } from "express";
import { ComplianceService } from "../services/compliance.service";

export class ComplianceController {
  private complianceService: ComplianceService;

  constructor() {
    this.complianceService = new ComplianceService();
  }

  checkProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const { projectId } = req.params;
      const projectParams = req.body;

      const result = await this.complianceService.checkProject(
        Number(projectId),
        projectParams
      );

      res.status(200).json({
        message: "Compliance check completed",
        result,
      });
    } catch (error: any) {
      console.log("the error: ", error)
      
      res.status(400).json({
        message: error.message,
        error
      });
    }
  };

  getComplianceByProjectId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { projectId } = req.params;
      const complianceRecords =
        await this.complianceService.getComplianceByProjectId(
          Number(projectId)
        );

      res.status(200).json({
        complianceRecords,
      });
    } catch (error:any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
}
