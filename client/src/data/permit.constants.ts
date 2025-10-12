import type { ApplicationData } from '../types/permit.types';

export const APPLICATION_DATA: ApplicationData = {
  formFields: [
    { name: 'projectType', label: 'Loyiha turi', type: 'select', required: true, options: [
      { value: 'residential', label: 'Aholi binosi' },
      { value: 'commercial', label: 'Tijorat binosi' },
      { value: 'industrial', label: 'Sanoat binosi' }
    ]},
    { name: 'applicantName', label: 'Arizachi ismi', type: 'text', required: true },
    { name: 'applicantPhone', label: 'Telefon raqami', type: 'tel', required: true },
    { name: 'applicantEmail', label: 'Email', type: 'email', required: true },
    { name: 'projectArea', label: 'Maydoni (m²)', type: 'number', required: true },
    { name: 'projectLocation', label: 'Joylashuv', type: 'text', required: true },
    { name: 'projectDescription', label: 'Loyiha tavsifi', type: 'textarea' },
    { name: 'specialRequirements', label: 'Maxsus talablar', type: 'textarea' },
  ],
  documentRequirements: [
    "Zamin mulki guvohnomi",
    "Arizachining shaxsiy hujjati (pasport nusxasi)",
    "Qurilish maydonining surati",
    "Qo'shma hujjatlar (agar mavjud bo'lsa)"
  ],
  processSteps: [
    "Ariza shaklini to'ldirish",
    "Arizani to'g'ri to'ldirish",
    "Arizani topshirish",
    "Arizani ko'rib chiqish",
    "Arizani tasdiqlash"
  ],
  timeline: {
    submission: "1-3 kun",
    review: "5-7 kun",
    approval: "2-3 kun",
    total: "8-13 kun"
  },
  fees: [
    { name: "Ariza ko'rib chiqish bepul", amount: 0 },
    { name: "Ariza ko'rib chiqish (tezlashtirilgan)", amount: 50000 },
    { name: "Ekologik ekspertiza", amount: 500000 },
    { name: "Gidrometeorologiya xulosasi", amount: 150000 },
    { name: "Boshqa xarajatlar", amount: 200000 }
  ]
};

export const STATUS_LABELS = {
  pending: "Kutilmoqda",
  'in-review': "Ko'rib chiqmoqda",
  approved: "Tasdiqlangan",
  rejected: "Rad etilgan"
};

export const STATUS_COLORS = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-600', icon: 'Clock' },
  'in-review': { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'FileText' },
  approved: { bg: 'bg-green-100', text: 'text-green-600', icon: 'CheckCircle' },
  rejected: { bg: 'bg-red-100', text: 'text-red-600', icon: 'AlertCircle' }
};