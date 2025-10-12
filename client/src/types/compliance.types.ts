export interface IComplianceCheck {
  ruleName: string;
  status: 'pending' | 'passed' | 'failed';
  score: number;
  details: string;
}

export interface IComplianceResult {
  projectId: number;
  overallScore: number;
  status: 'passed' | 'failed' | 'warning';
  results: IComplianceCheck[];
}

export interface IComplianceRecord {
  id: number;
  projectId: number;
  ruleName: string;
  status: 'pending' | 'passed' | 'failed';
  score: number;
  details?: string;
  createdAt: Date;
}

export interface IProjectParams {
  height: string;
  floors: string;
  area: string;
  type: string;
}