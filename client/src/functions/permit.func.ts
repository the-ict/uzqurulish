import { useState } from 'react';
import { toast } from 'react-toastify';
import type { ApplicationStatusData, ApplicationSubmission } from '../types/permit.types';

// Mock API functions - replace with actual API calls
export const submitApplication = async (data: ApplicationSubmission): Promise<{ success: boolean; applicationId?: string }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock success response
  return {
    success: true,
    applicationId: `APP-${Date.now()}`
  };
};

export const checkApplicationStatus = async (projectId: string): Promise<ApplicationStatusData> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock response
  return {
    status: 'in-review',
    submittedDate: new Date().toISOString().split('T')[0],
    estimatedCompletionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    reviewer: "Davlat qurilish qo'mitasi",
    notes: "Ariza ko'rib chiqmoqda. Qo'shimcha hujjatlar talab qilinmoqda."
  };
};

export const cancelApplication = async (projectId: string): Promise<{ success: boolean }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  return { success: true };
};

// Custom hooks
export const useApplicationSubmission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: ApplicationSubmission) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await submitApplication(data);
      if (result.success) {
        toast.success(`Ariza muvaffaqiyatli yuborildi! Ariza raqami: ${result.applicationId}`);
        return result;
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ariza yuborishda xatolik yuz berdi';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, error };
};

export const useApplicationStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = async (projectId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const status = await checkApplicationStatus(projectId);
      return status;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ariza holatini tekshirishda xatolik yuz berdi';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { checkStatus, isLoading, error };
};

export const useApplicationCancellation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancel = async (projectId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await cancelApplication(projectId);
      if (result.success) {
        toast.success('Ariza muvaffaqiyatli bekor qilindi');
        return result;
      } else {
        throw new Error('Cancellation failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Arizani bekor qilishda xatolik yuz berdi';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { cancel, isLoading, error };
};