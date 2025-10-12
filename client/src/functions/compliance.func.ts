import { axiosClient } from "../configs/api";
import type { IComplianceResult, IComplianceRecord, IProjectParams } from "../types/compliance.types";

class ComplianceFunctions {
    public async checkProject(projectId: number, projectParams: IProjectParams): Promise<IComplianceResult> {
        try {
            const response = await axiosClient.post(`/compliance/check/${projectId}`, projectParams);
            console.log(response.data, "what is resopnse looks like")
            return response.data.result;
        } catch (error) {
            throw error;
        }
    }

    public async getComplianceByProjectId(projectId: number): Promise<IComplianceRecord[]> {
        try {
            const response = await axiosClient.get(`/compliance/project/${projectId}`);
            return response.data.complianceRecords;
        } catch (error) {
            throw error;
        }
    }
}

export default ComplianceFunctions;