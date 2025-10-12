"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = exports.sendWelcomeEmail = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";
const EMAIL_PORT = Number(process.env.EMAIL_PORT) || 587;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || EMAIL_USER;
const secure = EMAIL_PORT === 465;
const transporter = nodemailer_1.default.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});
transporter
    .verify()
    .then(() => console.log("Email transporter tayyor"))
    .catch((err) => console.error("Email transporter xatosi:", err));
const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: EMAIL_FROM,
        to,
        subject,
        html,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email yuborildi, messageId:", info.messageId);
    }
    catch (err) {
        console.error("Email yuborishda xato:", err);
        throw err;
    }
};
exports.sendEmail = sendEmail;
const sendWelcomeEmail = async (email, name) => {
    const subject = "UzQurilish AI ga xush kelibsiz!";
    const html = `
    <h1>Assalomu alaykum, ${name}!</h1>
    <p>UzQurilish AI platformasiga ro'yxatdan o'tganingiz uchun tashakkur.</p>
    <p>Platformadan to'liq foydalanish uchun profilingizni to'ldiring.</p>
  `;
    await (0, exports.sendEmail)(email, subject, html);
};
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendPasswordResetEmail = async (email) => {
    const user = await User_1.default.findOne({
        where: { email },
    });
    console.log("the user: ", user);
    if (!user) {
        console.log("user topilmadi");
        throw new Error("User not found");
    }
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    const resetToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });
    const subject = "Parolni tiklash";
    const html = `
    <p>Parolingizni tiklash uchun quyidagi havolani bosing:</p>
    <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">Parolni tiklash</a>
    <b>Havola 15 minut davomida amal qiladi.</b>
  `;
    await (0, exports.sendEmail)(email, subject, html);
    return true;
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
//# sourceMappingURL=email.util.js.map