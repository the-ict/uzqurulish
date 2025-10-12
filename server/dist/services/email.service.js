"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const email_util_1 = require("../utils/email.util");
class EmailService {
    async sendPasswordResetEmail(email, resetToken) {
        const subject = 'Parolni tiklash';
        const html = `
      <p>Parolingizni tiklash uchun quyidagi havolani bosing:</p>
      <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">Parolni tiklash</a>
      <p>Havola 1 soat davomida amal qiladi.</p>
    `;
        await (0, email_util_1.sendEmail)(email, subject, html);
    }
    async sendProjectStatusNotification(email, projectName, status) {
        const subject = `Loyiha statusi o'zgardi: ${projectName}`;
        const html = `
  <p>Sizning "${projectName}" loyihaingiz statusi o'zgardi.</p>
  <p>Yangi status: <strong>${status}</strong></p>
  <p>Batafsil ma'lumot uchun platformaga kiring.</p>
`;
        await (0, email_util_1.sendEmail)(email, subject, html);
    }
    async sendDeadlineReminder(email, projectName, deadline) {
        const subject = 'Deadline eslatmasi';
        const html = `
      <p>Sizning "${projectName}" loyihaingiz yaqinlashib qolgan deadline: ${deadline}</p>
      <p>Iltimos, loyihaingizni vaqtida tamomlang.</p>
    `;
        await (0, email_util_1.sendEmail)(email, subject, html);
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map