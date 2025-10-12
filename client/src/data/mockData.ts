// Mock data for Dashboard
interface IMockOverview {
  totalProjects: number;
  activeProjects: number;
  pendingProjects: number;
  rejectedProjects: number;
  upcomingDeadlines: {
    id: number;
    title: string;
    date: string;
  }[];
}

interface IMockProject {
  id: number;
  name: string;
  status: string;
  location: string;
}

export const mockOverview: IMockOverview = {
  totalProjects: 5,
  activeProjects: 3,
  pendingProjects: 1,
  rejectedProjects: 1,
  upcomingDeadlines: [
    { id: 1, title: "Permit submission deadline", date: "2025-10-05" },
    { id: 2, title: "Compliance review", date: "2025-10-10" },
  ],
};

export const mockProjects: IMockProject[] = [
  { id: 1, name: "Residential House", status: "approved", location: "Tashkent" },
  { id: 2, name: "Small Shop", status: "pending", location: "Fergana" },
  { id: 3, name: "Warehouse", status: "draft", location: "Samarkand" },
];

export const mockNavigatorSteps: string[] = [
  "Submit application form",
  "Attach project drawings",
  "Compliance review with zoning laws",
  "Pay government fee",
  "Final approval",
];

export const mockDocuments: {
  id: number;
  name: string;
  status: string;
}[] = [
  { id: 1, name: "Application Form.pdf", status: "generated" },
  { id: 2, name: "Project Description.docx", status: "pending" },
];

export const mockCompliance: {
  status: string;
  issues: string[];
  suggestions: string[];
} = {
  status: "issues_found",
  issues: [
    "The project height exceeds local regulations.",
    "Missing fire safety compliance documents.",
  ],
  suggestions: [
    "Reduce building height to 12m.",
    "Attach fire safety report.",
  ],
};

export const mockZoning: {
  location: string;
  allowed: string[];
  notAllowed: string[];
} = {
  location: "Chilonzor, Tashkent",
  allowed: ["Residential", "Commercial"],
  notAllowed: ["Industrial"],
};


const teamMembers = [
  { id: "1", name: "Abdulloh Karimov", role: "Loyiha menejeri" },
  { id: "2", name: "Dilnoza Rahimova", role: "Arxitektor" },
  { id: "3", name: "Saidov Akmal", role: "Muhandis" },
  { id: "4", name: "Karimova Kamola", role: "Quruvchi" },
];


const projects = [
  {
    id: 1,
    name: "Turar-joy binosi qurilishi",
    description: "Shaxsiy turar-joy binosi qurilishi loyihasi",
    documents: [
      {
        id: 1,
        name: "Joylashuv rejasini topshirish",
        source: "Tuman hokimligi",
        format: "PDF",
        description: "Qurilish maydonining joylashuv rejasini olish",
        instructions:
          "Tuman hokimligining arxitektura va qurilish bo'limiga murojaat qiling. Reja odatda 1-3 kun ichida beriladi.",
        status: "pending",
        requiresApplication: true,
      },
      {
        id: 2,
        name: "Texnik shartnoma imzolash",
        source: "Elektr tarmoqlari korxonasi",
        format: "Shartnoma nusxasi",
        description: "Elektr ta'minoti uchun texnik shartnoma",
        instructions:
          "Elektr tarmoqlari korxonasiga borib, shartnoma namunasini oling va to'ldiring. Shartnoma imzolash uchun 2 kun vaqt kerak bo'ladi.",
        status: "pending",
        requiresApplication: false,
      },
      {
        id: 3,
        name: "Ekologik ekspertizadan o'tish",
        source: "Ekologiya qo‘mitasi",
        format: "Rasmiy xulosa",
        description: "Loyiha ekologik talablariga mosligi haqida xulosa",
        instructions:
          "Ekologiya qo'mitasiga ariza bilan murojaat qiling. Ekspertiza odatda 5-7 kun ichida tayyorlanadi. Xarajat - 500,000 so'm.",
        status: "pending",
        requiresApplication: true,
      },
      {
        id: 4,
        name: "Gidrometeorologiya xulosasini olish",
        source: "Gidrometeorologiya xizmati",
        format: "Rasmiy xulosa",
        description: "Mintaqaning ob-havo sharoitlari haqida ma'lumot",
        instructions:
          "Gidrometeorologiya markaziga ariza topshiring. Xulosa 1-2 kun ichida beriladi. Xarajat - 150,000 so'm.",
        status: "pending",
        requiresApplication: true,
      },
      {
        id: 5,
        name: "Qurilish ruxsatnomasi olish",
        source: "Davlat qurilish qo'mitasi",
        format: "Rasmiy ruxsatnoma",
        description: "Yakuniy qurilish ruxsatnomasi",
        instructions:
          "Barcha hujjatlar tayyor bo'lgach, Davlat qurilish qo'mitasiga ariza topshiring. Ruxsatnoma 10-15 kun ichida beriladi.",
        status: "pending",
        requiresApplication: true,
      },
    ],
  },
  {
    id: 2,
    name: "Savdo markazi qurilishi",
    description: "Tijorat maqsadida foydalaniladigan bino",
    documents: [
      {
        id: 1,
        name: "Arxitektura reja",
        source: "Shahar arxitektura bo‘limi",
        format: "PDF / DWG",
        description: "Bino arxitektura rejalari",
        instructions:
          "Shahar arxitektura bo'limiga loyiha rejasini taqdim eting. Reja tasdiqlanishi uchun 3-5 kun kerak bo'ladi.",
        status: "pending",
        requiresApplication: true,
      },
      {
        id: 2,
        name: "Yong‘ing xavfsizligi xulosasi",
        source: "FVV bo‘limi",
        format: "Akt yoki xulosa",
        description: "Yong'in xavfsizligi bo'yicha xulosa",
        instructions:
          "Yong'in xavfsizligi bo'limiga murojaat qiling. Tekshiruv 2-3 kun ichida o'tkaziladi. Xulosa bepul beriladi.",
        status: "pending",
        requiresApplication: false,
      },
      {
        id: 3,
        name: "Transport boshqarmasi roziligi",
        source: "Transport vazirligi",
        format: "Rasmiy xat",
        description: "Transport infratuziliga ta'siri bo'yicha rozilish",
        instructions:
          "Transport vazirligining yo'l harakati xavfsizligi bo'limiga ariza topshiring. Rozilish 7-10 kun ichida beriladi.",
        status: "pending",
        requiresApplication: true,
      },
      {
        id: 4,
        name: "Sanitariya-epidemiologiya xulosasi",
        source: "Sanitariya-epidemiologiya stansiyasi",
        format: "Rasmiy xulosa",
        description: "Sanitariya normalariga muvofiqlik xulosasi",
        instructions:
          "Sanitariya-epidemiologiya stansiyasiga hujjatlarni topshiring. Tekshiruv 5-7 kun ichida o'tkaziladi. Xarajat - 300,000 so'm.",
        status: "pending",
        requiresApplication: true,
      },
      {
        id: 5,
        name: "Savdo faoliyati uchun ruxsatnoma",
        source: "Iqtisodiyot vazirligi",
        format: "Rasmiy ruxsatnoma",
        description: "Savdo faoliyatini amalga oshirish uchun ruxsatnoma",
        instructions:
          "Iqtisodiyot vazirligiga savdo ruxsatnomasi uchun ariza topshiring. Ruxsatnoma 7-14 kun ichida beriladi.",
        status: "pending",
        requiresApplication: true,
      },
    ],
  },
  {
    id: 3,
    name: "Ishlab chiqarish sexi",
    description: "Sanoat mahsulotlari ishlab chiqarish uchun bino",
    documents: [
      {
        id: 1,
        name: "Sanoat zonasida joylashish ruxsatnomasi",
        source: "Hududiy hokimlik",
        format: "Rasmiy xat",
        description: "Sanoat zonasida joylashish uchun ruxsatnoma",
        instructions:
          "Hududiy hokimlikning sanoat va energetika bo'limiga ariza topshiring. Ruxsatnoma 10-15 kun ichida beriladi.",
        status: "pending",
        requiresApplication: true,
      },
      {
        id: 2,
        name: "Ekologik ekspertizasi",
        source: "Atrof-muhitni muhofaza qilish davlat qo'mitasi",
        format: "Rasmiy xulosa",
        description: "Atrof-muhitga ta'sirini baholash",
        instructions:
          "Atrof-muhitni muhofaza qilish davlat qo'mitasiga ekologik ekspertiza uchun ariza topshiring. Ekspertiza 10-14 kun ichida tayyorlanadi. Xarajat - 1,200,000 so'm.",
        status: "pending",
        requiresApplication: true,
      },
      {
        id: 3,
        name: "Gidravlik shartnomasi",
        source: "Suv xo'jalari korxonasi",
        format: "Shartnoma",
        description: "Suv resurslaridan foydalanish shartnomasi",
        instructions:
          "Suv xo'jalari korxonasi bilan gidravlik shartnomasini tuzing. Shartnoma imzolash 3-5 kun ichida amalga oshiriladi.",
        status: "pending",
        requiresApplication: false,
      },
      {
        id: 4,
        name: "Yong'in xavfsizligi xulosasi",
        source: "FVV bo'limi",
        format: "Akt yoki xulosa",
        description: "Yong'in xavfsizligi bo'yicha xulosa",
        instructions:
          "Yong'in xavfsizligi bo'limiga murojaat qiling. Tekshiruv 2-3 kun ichida o'tkaziladi. Xulosa bepul beriladi.",
        status: "pending",
        requiresApplication: false,
      },
      {
        id: 5,
        name: "Ishlab chiqarish ruxsatnomasi",
        source: "Sanoat vazirligi",
        format: "Rasmiy ruxsatnoma",
        description:
          "Ishlab chiqarish faoliyatini olib borish uchun ruxsatnoma",
        instructions:
          "Sanoat vazirligiga ishlab chiqarish ruxsatnomasi uchun ariza topshiring. Ruxsatnoma 14-21 kun ichida beriladi.",
        status: "pending",
        requiresApplication: true,
      },
    ],
  },
];