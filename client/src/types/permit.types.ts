export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select';
  required?: boolean;
  options?: { value: string; label: string }[];
}

export interface ApplicationData {
  formFields: FormField[];
  documentRequirements: string[];
  processSteps: string[];
  timeline: {
    submission: string;
    review: string;
    approval: string;
    total: string;
  };
  fees: { name: string; amount: number }[];
}

export interface ApplicationStatusData {
  status: 'pending' | 'in-review' | 'approved' | 'rejected';
  submittedDate: string;
  estimatedCompletionDate: string;
  reviewer?: string;
  notes?: string;
}

export interface Step {
  id: number;
  status: 'pending' | 'completed';
  date: string;
}

export interface ApplicationFormData {
  projectType: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  projectArea: string;
  projectLocation: string;
  projectDescription: string;
  specialRequirements: string;
}

export interface ApplicationSubmission {
  projectId: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  projectType: string;
  projectArea: string;
  projectLocation: string;
  submissionDate: string;
}