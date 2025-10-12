import nodemailer, { Transporter } from "nodemailer";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { IPayload } from "../types";

const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";
const EMAIL_PORT = Number(process.env.EMAIL_PORT) || 587;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || EMAIL_USER;

const secure = EMAIL_PORT === 465;

const transporter: Transporter = nodemailer.createTransport({
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

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<void> => {
  const mailOptions: nodemailer.SendMailOptions = {
    from: EMAIL_FROM,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email yuborildi, messageId:", info.messageId);
  } catch (err) {
    console.error("Email yuborishda xato:", err);
    throw err;
  }
};

export const sendWelcomeEmail = async (
  email: string,
  name: string
): Promise<void> => {
  const subject = "UzQurilish AI ga xush kelibsiz!";
  const html = `
    <h1>Assalomu alaykum, ${name}!</h1>
    <p>UzQurilish AI platformasiga ro'yxatdan o'tganingiz uchun tashakkur.</p>
    <p>Platformadan to'liq foydalanish uchun profilingizni to'ldiring.</p>
  `;
  await sendEmail(email, subject, html);
};

export const sendPasswordResetEmail = async (email: string): Promise<boolean> => {
  const user = await User.findOne({
    where: { email },
  });

  console.log("the user: ", user);

  if (!user) {
    console.log("user topilmadi");
    throw new Error("User not found");
  }

  const payload: IPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const resetToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
  });

  const subject = "Parolni tiklash";
  const html = `
    <p>Parolingizni tiklash uchun quyidagi havolani bosing:</p>
    <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">Parolni tiklash</a>
    <b>Havola 15 minut davomida amal qiladi.</b>
  `;
  await sendEmail(email, subject, html);

  return true;
};
