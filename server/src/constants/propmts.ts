import {
  IDocumentGenerator,
  IGenerateApplicationParametrs,
  IGenerateDocumentParametrs,
  IGenerateNeededDocumentsParametrs,
} from "../types";

export const generateApplicationPrompt = (
  data: IGenerateApplicationParametrs
) => {
  const prompt = `
        Siz O'zbekiston Respublikasi hududida rasmiy murojaatnomalar matnini tayyorlovchi yordamchisiz. 
        Quyidagi berilgan malumotlarga asoslanib bizga ariza yoki hujjat malumotlarini yozib bering to'liq!

        -- Talablar:
         -Natijani izohsiz yozing
         -Javob to'liq text formatda bo'lsin va hamma malumotlarni aniq qilib kirit!.
         -Tegishli tashkilotlar uchun ariza mukammal darajada bo'lishi kerak
         -Kamida 2varoq matn bo'lsin
         -Matn to'liq, hujjat uchun tayyor bo'lishi shart
         -Matn tushunarli uslubda yozing
         -Men frontendda jspdf orqali pdfga o'tkazaman, text to pdf qilib shuning uchun chiroyliroq stil bilan textlarni yoz pdfda yaxshi ko'rinishi uchun
         -Malumotlarda berilgan sanani tushunarli uslubda yoz!
         -Imzo qismini olib tashlab yozing!

        -- Malumotlar:
          - Ariza yoki hujjat nomi: ${data.name}
          - Ariza yoki hujjat turi: ${data.type}
          - Joylashuvi: ${data.location}
          - Ariza yoki hujjat haqida qisqacha ma’lumot: ${data.description}
          - Ariza yoki hujjat maydoni: ${data.area}
          - Yaratish uchun prompt: ${data.promptToGenerate}
          - Required: ${data.required}
          - Full name: ${data.fullName}
          - Email: ${data.email}
          - Phone: ${data.phone}
          - Sana: ${new Date().toLocaleDateString()}
    `;

  return prompt;
};

export const generateNeededDocuments = (
  data: IGenerateNeededDocumentsParametrs
) => {
  const prompt = `
          Siz O‘zbekiston Respublikasi hududida rasmiy murojaatnomalar matnini tayyorlovchi yordamchisiz. 
          Quyidagi berilgan malumotlarga asoslanib bizga bu loyihani qurushni boshlash uchun qanday hujjatlar kerakligini yozib bering!.
          O'zbekiston qurulish qonunchiligini va normativ-huquqiy hujjatlar ruhiga mos yozilsin.
          O'rganib chiqilgan holatda katta aniqlik bilan

          -- Talablar:
            - Natijani izohsiz yozing 
            - Natijani projectga qo'sha olishim uchun JSON formatida yozing
            - export interface INeededDocument {
              name: string;
              type: string;
              about: string;
              how_to_get: string;
              required: boolean;
              status: 'pending' | 'in-progress' | 'completed';
              isNeedApplication: boolean;
              createdAt: Date;
              updatedAt: Date;
              promptToGenerate?: string;
              id: number;
            } Natija quyidagi malumotlarga mos bo'lishi shart!
            - how to get qismida u hujjatni qanday qayerdan nima qilib olish mumkinligi haqida malumot bering!
            - Hujjjatni qanday olishni yaxshilab tushintir bering
            -Quyidagi tepada qo'shilgan isNeedApplication qismi agar bu hujjat ariza bilan olib bo'ladigan bo'lsa unda true bo'lishi kerak;
            -Agar isNeedApplication true bo'lsa keyin ham o'zingga ariza yaratilinadi shuning uchun promptToGenerate qismida ariza matnini yozing
            -Agar isNeedApplication false bo'lsa unda promptToGenerate qismi bo'sh bo'lishi kerak

          Ma'lumotlar:
          - Loyiha nomi: ${data.name}
          - Qurilish turi: ${data.type}
          - Joylashuvi: ${data.location}
          - Loyiha haqida qisqacha ma’lumot: ${data.description}
          - Loyiha maydoni: ${data.area}
          - Deadline ${data.deadline}(optinal)
        `;

  return prompt;
};

export const generateDocumentPrompt = (data: IGenerateDocumentParametrs) => {
  const prompt = `
            Siz O‘zbekiston Respublikasi hududida rasmiy murojaatnomalar matnini tayyorlovchi yordamchisiz. 
            Quyida berilgan ma’lumotlarga asoslanib Toshkent shahar hokimligi yoki tegishli mahalliy davlat organiga 
            murojaat uchun qurilish ruxsatnomasi so‘rab yoziladigan ARIZA matnini yarating.
    
            Talablar:
            - Natija faqat tayyor hujjat matni bo‘lsin (izohsiz).
            - O‘zbekiston Respublikasi Qurilish kodeksi va normativ-huquqiy hujjatlar ruhiga mos yozilsin.
            - Rasmiy va tushunarli uslubda bo‘lsin.
            - Tuzilishi: murojaat qaysi tashkilotga yo‘llanayotgani, murojaat mavzusi, loyiha tafsilotlari, 
              ruxsatnoma berish haqida iltimos, hujjatlarni taqdim etishga tayyorligi, murojaat qiluvchining ma’lumotlari, 
              sana va imzo.
            - Matn to‘liq, hujjat uchun tayyor bo‘lishi shart.
            - “Albatta”, “Mana”, “Quyida” kabi so‘zlar ishlatilmasin.
            - Sen tergan textni documentga aylantirish uchun tushunarli uslubda yozing.
            
    
            Ma’lumotlar:
            - Loyiha nomi: ${data.name}
            - Qurilish turi: ${data.type}
            - Qo'shimcha malumotlar: ${data.additionalInfo}
        `;

  return prompt;
};


export const generateChatBotModalPrompt = (data: {
  question: string;
}) => {
  const prompt = `
    Siz O'zbekiston Respublikasi qurulish hujjatlarini qilish bo'yicha chat bot yordamchisiz! 
    Quyidagi savolga agar hujjat va qonunchilikga aloqador bo'lsa javob bering !.
    Agar unday bo'lmasa ham javob berishga harakat qiling va oxirida o'zingizni aynan qurulish uchun chat bot ekaningizni va shunday savollar so'rashini foydalanuvchidan iltimos qiling!
    Aytgancha hech qanday qo'shimcha narsalarsiz shunchaki javobni bering izoh shart emas!.
    
    --Malumotlar:
      -Savollar - ${data.question}
  `

  
  return prompt
}