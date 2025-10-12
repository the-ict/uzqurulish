export declare class EmailService {
    sendPasswordResetEmail(email: string, resetToken: string): Promise<void>;
    sendProjectStatusNotification(email: string, projectName: string, status: string): Promise<void>;
    sendDeadlineReminder(email: string, projectName: string, deadline: string): Promise<void>;
}
//# sourceMappingURL=email.service.d.ts.map