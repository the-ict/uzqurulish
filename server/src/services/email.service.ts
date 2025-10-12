import { sendEmail } from '../utils/email.util';

export class EmailService {
  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const subject = 'Parolni tiklash';
    const html = `
      <p>Parolingizni tiklash uchun quyidagi havolani bosing:</p>
      <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">Parolni tiklash</a>
      <p>Havola 1 soat davomida amal qiladi.</p>
    `;
    
    await sendEmail(email, subject, html);
  }
  
  async sendProjectStatusNotification(
    email: string,
    projectName: string,
    status: string
  ): Promise<void> {
    const subject = `Loyiha statusi o'zgardi: ${projectName}`;
  const html = `
  <p>Sizning "${projectName}" loyihaingiz statusi o'zgardi.</p>
  <p>Yangi status: <strong>${status}</strong></p>
  <p>Batafsil ma'lumot uchun platformaga kiring.</p>
`;

    
    await sendEmail(email, subject, html);
  }
  
  async sendDeadlineReminder(
    email: string,
    projectName: string,
    deadline: string
  ): Promise<void> {
    const subject = 'Deadline eslatmasi';
    const html = `
      <p>Sizning "${projectName}" loyihaingiz yaqinlashib qolgan deadline: ${deadline}</p>
      <p>Iltimos, loyihaingizni vaqtida tamomlang.</p>
    `;
    
    await sendEmail(email, subject, html);
  }
}