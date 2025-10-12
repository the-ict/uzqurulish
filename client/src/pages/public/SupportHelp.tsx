import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  HelpCircle,
  Mail,
  Phone,
  Send,
  Video,
  BookOpen,
  Users,
  Headphones,
} from "lucide-react";
import SupportFunc, {
  type ISupportTicket,
  type IFAQ,
} from "../../functions/support.func";
import { toast } from "react-toastify";
import { authFunctions } from "../../functions/auth.func";

const mockFAQs = [
  {
    id: 1,
    question: "Qurilish ruxsatnomasini qanday olish mumkin?",
    answer:
      "UzQurilish AI platformasiga ro'yxatdan o'ting, loyiha ma'lumotlarini kiriting va Permit Navigator bo'limida bosqichma-bosqich amalni bajaring.",
  },
  {
    id: 2,
    question: "Hujjatlar qanday tayyorlanadi?",
    answer:
      "Document Generator bo'limida loyiha ma'lumotlarini kiritgandan so'ng, AI avtomatik ravishda kerakli hujjatlarni tayyorlaydi.",
  },
  {
    id: 3,
    question: "Qoidaga moslikni qanday tekshiraman?",
    answer:
      "Compliance Checker bo'limida loyiha parametrlarini kiriting va tekshiruvni boshlang. AI sizga barcha mos kelmaydigan joylarni ko'rsatadi.",
  },
  {
    id: 4,
    question: "To'lov qanday amalga oshiriladi?",
    answer:
      "Payments & Subscription bo'limida kredit karta ma'lumotlarini kiriting va obuna paketini tanlang.",
  },
];

const mockTickets = [
  {
    id: 1,
    subject: "Hujjat yuklash muammosi",
    status: "open",
    date: "2023-10-10",
    category: "Texnik",
  },
  {
    id: 2,
    subject: "To'lov muvaffaqiyatsiz",
    status: "resolved",
    date: "2023-09-25",
    category: "Moliyaviy",
  },
  {
    id: 3,
    subject: "Obuna bekor qilish",
    status: "in-progress",
    date: "2023-10-05",
    category: "Hisob",
  },
];

const mockTutorials = [
  {
    id: 1,
    title: "Platformadan foydalanish bo'yicha qo'llanma",
    duration: "15:20",
    category: "Asosiy",
  },
  {
    id: 2,
    title: "Hujjatlar tayyorlash",
    duration: "8:45",
    category: "Hujjatlar",
  },
  {
    id: 3,
    title: "Qoidaga moslik tekshiruvi",
    duration: "12:30",
    category: "Tekshiruv",
  },
];

const supportFunc = new SupportFunc();

export default function SupportHelp() {
  const [activeTab, setActiveTab] = useState("chat");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [isAiResponsing, setIsAiResponsing] = useState<boolean>(false);
  const [contactInfos, setContactInfos] = useState<{
    name: string;
    subject: string;
    email: string;
    message: string;
  }>({
    name: "",
    subject: "",
    email: "",
    message: "",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [ticket, setTicket] = useState({
    subject: "",
    description: "",
    category: "texnik",
  });
  const [faqs, setFaqs] = useState<IFAQ[]>([]);
  const [userTickets, setUserTickets] = useState<ISupportTicket[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadFAQs();
    loadUserTickets();
    setIsAuthenticated(authFunctions.isAuthenticated());
    handleGetAllMessages();
    handleGetConversationId();
  }, []);

  useEffect(() => {
    if (conversationId) {
      handleGetAllMessages();
    }
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleGetConversationId = async () => {
    const conversationId = await supportFunc.toggleConversation();
    setConversationId(conversationId.id);
  };

  const loadFAQs = async () => {
    try {
      const data = await supportFunc.getFAQs();
      setFaqs(data);
    } catch (error) {
      console.error("Failed to load FAQs:", error);
      setFaqs(
        mockFAQs.map((faq) => ({
          ...faq,
          category: "umumiy",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
      );
    }
  };

  const loadUserTickets = async () => {
    try {
      const data = await supportFunc.getUserSupportTickets();
      setUserTickets(data);
    } catch (error) {
      console.error("Failed to load user tickets:", error);
      setUserTickets(
        mockTickets.map((ticket) => ({
          ...ticket,
          userId: 0,
          description: ticket.subject,
          priority: "medium" as const,
          category: ticket.category.toLowerCase() as
            | "texnik"
            | "moliyaviy"
            | "hisob"
            | "boshqa",
          status: ticket.status as
            | "open"
            | "in-progress"
            | "resolved"
            | "closed",
          createdAt: new Date(ticket.date),
          updatedAt: new Date(ticket.date),
        }))
      );
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error("Iltimos, xabar yuborish uchun xabar matnini kiriting");
      return;
    }

    const conversation = await supportFunc.toggleConversation();

    if (conversation) {
      const userMsg = {
        id: Date.now(),
        chatId: conversation.id,
        userId: 0,
        text: message,
        type: "user" as const,
        createdAt: new Date(),
      };
      setChatMessages((prev) => [...prev, userMsg]);

      setMessage("");
      setIsAiResponsing(true);

      try {
        const aiResponse = await supportFunc.ChatBotModal({
          chatId: conversation.id,
          text: message,
        });

        const aiMsg = {
          id: Date.now() + 1,
          chatId: conversation.id,
          userId: 0,
          text: aiResponse,
          type: "support" as const,
          createdAt: new Date(),
        };
        setChatMessages((prev) => [...prev, aiMsg]);
      } catch (error) {
        console.error("Error getting AI response:", error);
        toast.error("AI javobini olishda xatolik yuz berdi");
      } finally {
        setIsAiResponsing(false);
      }
    }
  };

  const handleGetAllMessages = async () => {
    const messages = await supportFunc.getConversationMessages(
      Number(conversationId)
    );
    setChatMessages(messages);
  };

  const handleSubmitTicket = async () => {
    if (!ticket.subject.trim() || !ticket.description.trim()) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    setLoading(true);
    try {
      await supportFunc.createSupportTicket({
        subject: ticket.subject,
        description: ticket.description,
        category: ticket.category as
          | "texnik"
          | "moliyaviy"
          | "hisob"
          | "boshqa",
      });

      toast.success("Support ticket muvaffaqiyatli yuborildi!");
      setTicket({ subject: "", description: "", category: "texnik" });
      loadUserTickets();
    } catch (error) {
      console.error("Failed to create support ticket:", error);
      toast.error("Support ticket yuborishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const hanldeChangeContactInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactInfos((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendContactInfo = async () => {
    if (!contactInfos.name.trim() || !contactInfos.subject.trim() || !contactInfos.email.trim() || !contactInfos.message.trim()) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    setLoading(true);
    try {
      const res = await supportFunc.sendContactInfo(contactInfos);

      if(res){
        toast.success("Xabar muvaffaqiyatli yuborildi!", {
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    } catch (error) {
      console.error("Failed to send contact info:", error);
      toast.error("Xabar yuborishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "open":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Yordam va qo'llab-quvvatlash
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          className="bg-white rounded-xl shadow p-5 hover:shadow-md transition cursor-pointer"
          onClick={() => setActiveTab("chat")}
        >
          <div className="p-3 bg-indigo-100 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
            <MessageCircle className="text-indigo-600" size={24} />
          </div>
          <h3 className="font-medium">AI Chatbot</h3>
          <p className="text-sm text-gray-500 mt-1">Tezkor yordam</p>
        </div>

        <div
          className="bg-white rounded-xl shadow p-5 hover:shadow-md transition cursor-pointer"
          onClick={() => setActiveTab("faq")}
        >
          <div className="p-3 bg-green-100 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
            <HelpCircle className="text-green-600" size={24} />
          </div>
          <h3 className="font-medium">FAQ</h3>
          <p className="text-sm text-gray-500 mt-1">
            Ko'p so'raladigan savollar
          </p>
        </div>

        <div
          className="bg-white rounded-xl shadow p-5 hover:shadow-md transition cursor-pointer"
          onClick={() => setActiveTab("ticket")}
        >
          <div className="p-3 bg-yellow-100 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
            <Mail className="text-yellow-600" size={24} />
          </div>
          <h3 className="font-medium">Support Ticket</h3>
          <p className="text-sm text-gray-500 mt-1">So'rov yuborish</p>
        </div>

      
      </div>

      <div className="bg-white rounded-xl shadow">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-3 font-medium text-sm cursor-pointer ${
              activeTab === "chat"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("chat")}
          >
            <MessageCircle className="inline mr-2" size={16} />
            AI Chatbot
          </button>

          <button
            className={`px-4 py-3 font-medium text-sm cursor-pointer ${
              activeTab === "faq"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("faq")}
          >
            <HelpCircle className="inline mr-2" size={16} />
            FAQ
          </button>

          <button
            className={`px-4 py-3 font-medium text-sm cursor-pointer ${
              activeTab === "ticket"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("ticket")}
          >
            <Mail className="inline mr-2" size={16} />
            Support Ticket
          </button>

          <button
            className={`px-4 py-3 font-medium text-sm cursor-pointer ${
              activeTab === "contact"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("contact")}
          >
            <Phone className="inline mr-2" size={16} />
            Aloqa
          </button>
        </div>

        <div className="p-6">
          {activeTab === "chat" && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm">
                  Assalomu alaykum! UzQurilish AI yordamchisiga xush kelibsiz.
                  Sizga qanday yordam bera olaman?
                </p>
                {!isAuthenticated && (
                  <p className="text-xs text-red-500 mt-2">
                    Iltimos, tizimga kiring
                  </p>
                )}
              </div>

              <div className="bg-white border rounded-lg h-96 overflow-y-auto p-4 space-y-3">
                {chatMessages?.length === 0 ? (
                  <div className="text-center text-gray-500 text-sm">
                    Suhbat boshlash uchun xabar yuboring
                  </div>
                ) : (
                  chatMessages?.map((msg, index) => (
                    <div
                      key={msg.id || index}
                      className={`flex ${
                        msg.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.type === "user"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-indigo-600 text-white"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.createdAt).toLocaleTimeString("uz-UZ")}
                        </p>
                      </div>
                    </div>
                  ))
                )}

                {isAiResponsing && (
                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-indigo-600 text-white">
                      <div className="loader"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Savolingizni yozing..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={!isAuthenticated}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!isAuthenticated}
                  className="px-4 py-2 bg-indigo-600 cursor-pointer text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">Tezkor savollar</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setMessage("Loyiha qanday yaratiladi?")}
                    className="px-3 py-1.5 cursor-pointer bg-gray-100 text-gray-800 rounded-lg text-sm hover:bg-gray-200"
                  >
                    Loyiha qanday yaratiladi?
                  </button>
                  <button
                    onClick={() => setMessage("Hujjatlar qanday yuklanadi?")}
                    className="px-3 py-1.5 cursor-pointer bg-gray-100 text-gray-800 rounded-lg text-sm hover:bg-gray-200"
                  >
                    Hujjatlar qanday yuklanadi?
                  </button>
                  <button
                    onClick={() =>
                      setMessage("To'lov qanday amalga oshiriladi?")
                    }
                    className="px-3 py-1.5 cursor-pointer bg-gray-100 text-gray-800 rounded-lg text-sm hover:bg-gray-200"
                  >
                    To'lov qanday amalga oshiriladi?
                  </button>
                  <button
                    onClick={() => setMessage("Obuna qanday bekor qilinadi?")}
                    className="px-3 py-1.5 cursor-pointer bg-gray-100 text-gray-800 rounded-lg text-sm hover:bg-gray-200"
                  >
                    Obuna qanday bekor qilinadi?
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "faq" && (
            <div className="space-y-4">
              <h2 className="font-bold text-lg">Ko'p so'raladigan savollar</h2>

              <div className="space-y-3">
                {(faqs.length > 0 ? faqs : mockFAQs).map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <h3 className="font-medium">{faq.question}</h3>
                    <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">Kategoriyalar bo'yicha</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="border border-gray-200 rounded-lg p-3 text-center hover:bg-gray-50 cursor-pointer">
                    <BookOpen
                      className="mx-auto text-indigo-600 mb-2"
                      size={20}
                    />
                    <span className="text-sm">Umumiy</span>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3 text-center hover:bg-gray-50 cursor-pointer">
                    <Users className="mx-auto text-green-600 mb-2" size={20} />
                    <span className="text-sm">Hisob</span>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3 text-center hover:bg-gray-50 cursor-pointer">
                    <Headphones
                      className="mx-auto text-yellow-600 mb-2"
                      size={20}
                    />
                    <span className="text-sm">Qo'llab-quvvatlash</span>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3 text-center hover:bg-gray-50 cursor-pointer">
                    <Mail className="mx-auto text-purple-600 mb-2" size={20} />
                    <span className="text-sm">Aloqa</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ticket" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="font-bold text-lg">Support ticket yaratish</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mavzu
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      value={ticket.subject}
                      onChange={(e) =>
                        setTicket({ ...ticket, subject: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategoriya
                    </label>
                    <select
                      className="w-full px-3 py-2 border appearance-none border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      value={ticket.category}
                      onChange={(e) =>
                        setTicket({ ...ticket, category: e.target.value })
                      }
                    >
                      <option value="texnik">Texnik</option>
                      <option value="moliyaviy">Moliyaviy</option>
                      <option value="hisob">Hisob</option>
                      <option value="boshqa">Boshqa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tavsif
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      rows={5}
                      value={ticket.description}
                      onChange={(e) =>
                        setTicket({ ...ticket, description: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <button
                    onClick={handleSubmitTicket}
                    disabled={loading}
                    className="w-full py-2 px-4 cursor-pointer bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Yuborilmoqda..." : "Yuborish"}
                  </button>
                </div>
              </div>

              <div>
                <h2 className="font-bold text-lg mb-4">Mening so'rovlarim</h2>

                <div className="space-y-3">
                  {(userTickets.length > 0
                    ? userTickets
                    : mockTickets.map((ticket) => ({
                        ...ticket,
                        userId: 0,
                        description: ticket.subject,
                        priority: "medium" as const,
                        category: ticket.category.toLowerCase() as
                          | "texnik"
                          | "moliyaviy"
                          | "hisob"
                          | "boshqa",
                        status: ticket.status as
                          | "open"
                          | "in-progress"
                          | "resolved"
                          | "closed",
                        createdAt: new Date(ticket.date),
                        updatedAt: new Date(ticket.date),
                      }))
                  ).map((ticket) => (
                    <div
                      key={ticket.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{ticket.subject}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(ticket.createdAt).toLocaleDateString(
                              "uz-UZ"
                            )}{" "}
                            • {ticket.category}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusClass(
                            ticket.status
                          )}`}
                        >
                          {ticket.status === "open"
                            ? "Ochiq"
                            : ticket.status === "resolved"
                            ? "Hal qilindi"
                            : "Jarayonda"}
                        </span>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button className="text-sm text-indigo-600 hover:text-indigo-800">
                          Batafsil
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tutorials */}
          
    

          {/* Contact */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <h2 className="font-bold text-lg">Biz bilan bog'laning</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Mail className="text-indigo-600 mr-2" size={20} />
                    <h3 className="font-medium">Email</h3>
                  </div>
                  <p className="text-sm text-gray-600">support@uzqurilish.ai</p>
                  <p className="text-xs text-gray-500 mt-1">
                    24-48 soat ichida javob beramiz
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Phone className="text-indigo-600 mr-2" size={20} />
                    <h3 className="font-medium">Telefon</h3>
                  </div>
                  <p className="text-sm text-gray-600">+998 90 123 45 67</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Dushanba-Juma: 9:00 - 18:00
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">Ish vaqti</h3>
                <p className="text-sm text-blue-700">
                  Dushanba - Juma: 9:00 - 18:00
                </p>
                <p className="text-sm text-blue-700">Shanba: 10:00 - 15:00</p>
                <p className="text-sm text-blue-700">
                  Yakshanba: dam olish kuni
                </p>
              </div>

              {/* Contact Form */}
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-medium mb-4">Xabar yuborish</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ism
                    </label>
                    <input
                      type="text"
                      name="name"
                      onChange={hanldeChangeContactInfo}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      name="email"
                      onChange={hanldeChangeContactInfo}
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mavzu
                    </label>
                    <input
                      name="subject"
                      onChange={hanldeChangeContactInfo}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Xabar
                    </label>
                    <textarea
                      name="message"
                      onChange={hanldeChangeContactInfo}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      rows={4}
                    ></textarea>
                  </div>

                  <button onClick={handleSendContactInfo} className={loading ? "w-full py-2 cursor-pointer px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition" : "w-full py-2 cursor-pointer px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"}>
                    {
                      loading ? "Yuborilmoqda..." : "Yuborish"
                    }
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
