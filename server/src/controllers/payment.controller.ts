import { Request, Response } from "express";
import Payment from "../models/Payment";
import Subscription from "../models/Subscription";
import axios from "axios";
import config from "../config";
class PaymentController {
  public PAYME_API_URL = config.paymeApiUrl;
  public AUTH = Buffer.from(`${config.paymeMerchantId}:${config.paymeSecretKey}`).toString("base64");

  async createCard(req: Request, res: Response) {
    try {
      const { cardNumber, expire, save = true } = req.body;

      if (!cardNumber || !expire) {
        return res.status(400).json({
          success: false,
          message: "Karta raqami va muddati kerak",
        });
      }

      const body = {
        id: Date.now(),
        method: "cards.create",
        params: {
          card: {
            number: cardNumber,
            expire: expire.replace("/", ""),
          },
          account: {
            user_id: req.user?.id as number,
          },
          save,
        },
      };


      const { data } = await axios.post(process.env.PAYME_API_URL as string, body, {
        headers: {
          "Content-Type": "application/json",
          "X-Auth":this.AUTH,
        },
      });

      const payment = await Payment.create({
        userId: req.user?.id as number,
        subs_type: "basic",
        status: "pending",
      });

      return res.json({
        success: true,
        message: "Karta yaratildi, SMS kodi yuborildi",
        data,
        payment,
      });
    } catch (error: any) {
      console.error(
        "Payme createCard error:",
        error.response?.data || error.message
      );
      return res.status(500).json({
        success: false,
        message: "Payme serveriga so‘rov yuborishda xatolik",
        error: error.response?.data || error.message,
      });
    }
  }

  async getVerifyCode(req: Request, res: Response) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ success: false, message: "Token kerak" });
      }

      const { data } = await axios.post(
        this.PAYME_API_URL,
        {
          id: Date.now(),
          method: "cards.get_verify_code",
          params: { token },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth": this.AUTH,
          },
        }
      );

      return res.json({
        success: true,
        message: "SMS kodi qayta yuborildi",
        data: data.result,
      });
    } catch (error: any) {
      console.error(
        "Payme getVerifyCode error:",
        error.response?.data || error.message
      );
      return res.status(500).json({
        success: false,
        message: "Payme serverida xatolik",
        error: error.response?.data || error.message,
      });
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const { token, code } = req.body;

      if (!token || !code) {
        return res
          .status(400)
          .json({ success: false, message: "Token va kod kerak" });
      }

      const { data } = await axios.post(
        this.PAYME_API_URL,
        {
          id: Date.now(),
          method: "cards.verify",
          params: { token, code },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth": this.AUTH,
          },
        }
      );

      return res.json({
        success: true,
        message: "Karta muvaffaqiyatli tasdiqlandi",
        data: data.result,
      });
    } catch (error: any) {
      console.error(
        "Payme verify error:",
        error.response?.data || error.message
      );
      return res.status(500).json({
        success: false,
        message: "Karta tasdiqlashda xatolik",
        error: error.response?.data || error.message,
      });
    }
  }

  async checkPayment(req: Request, res: Response) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ success: false, message: "Token kerak" });
      }

      const { data } = await axios.post(
        this.PAYME_API_URL,
        {
          id: Date.now(),
          method: "cards.check",
          params: { token },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth": this.AUTH,
          },
        }
      );

      return res.json({
        success: true,
        message: "Karta tekshirildi",
        data: data.result,
      });
    } catch (error: any) {
      console.error(
        "Payme check error:",
        error.response?.data || error.message
      );
      return res.status(500).json({
        success: false,
        message: "Karta tekshirishda xatolik",
        error: error.response?.data || error.message,
      });
    }
  }

  async removeCard(req: Request, res: Response) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ success: false, message: "Token kerak" });
      }

      const { data } = await axios.post(
        this.PAYME_API_URL,
        {
          id: Date.now(),
          method: "cards.remove",
          params: { token },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth": this.AUTH,
          },
        }
      );

      return res.json({
        success: true,
        message: "Karta o‘chirildi",
        data: data.result,
      });
    } catch (error: any) {
      console.error(
        "Payme removeCard error:",
        error.response?.data || error.message
      );
      return res.status(500).json({
        success: false,
        message: "Karta o‘chirishda xatolik",
        error: error.response?.data || error.message,
      });
    }
  }

  async receipt(req: Request, res: Response) {
    try {
      const { amount, order_id, description } = req.body;

      if (!amount || !order_id) {
        return res.status(400).json({
          success: false,
          message: "amount va order_id majburiy",
        });
      }

      const body = {
        id: Date.now(),
        method: "receipts.create",
        params: {
          amount,
          account: { order_id },
          description: description || "To‘lov",
          detail: {
            receipt_type: 0,
            shipping: {
              title: "Yetkazib berish — Toshkent",
              price: 500000,
            },
            items: [
              {
                discount: 10000,
                title: "Pomidorlar",
                price: 505000,
                count: 2,
                code: "00702001001000001",
                units: 241092,
                vat_percent: 15,
                package_code: "123456",
              },
            ],
          },
        },
      };

      const { data } = await axios.post(this.PAYME_API_URL, body, {
        headers: {
          "Content-Type": "application/json",
          "X-Auth": this.AUTH,
        },
      });

      return res.json({
        success: true,
        message: "Tushum yaratildi",
        data: data.result,
      });
    } catch (error: any) {
      console.error(
        "Payme receipt error:",
        error.response?.data || error.message
      );
      return res.status(500).json({
        success: false,
        message: "Tushum yaratishda xatolik",
        error: error.response?.data || error.message,
      });
    }
  }

  async payReceipt(req: Request, res: Response) {
    try {
      const { receipt_id, token, payer } = req.body;

      if (!receipt_id || !token) {
        return res.status(400).json({
          success: false,
          message: "receipt_id va token talab qilinadi!",
        });
      }

      const body = {
        id: Date.now(),
        method: "receipts.pay",
        params: {
          id: receipt_id,
          token,
          payer: payer || {}, // ixtiyoriy, bo‘sh bo‘lishi ham mumkin
        },
      };

      const response = await axios.post(
        this.PAYME_API_URL,
        body,
        {
          headers: {
            "X-Auth": this.AUTH,
            "Content-Type": "application/json",
          },
        }
      );

      return res.status(200).json({
        success: true,
        result: response.data.result.receipt,
      });
    } catch (error: any) {
      console.error(
        "Payme payReceipt error:",
        error.response?.data || error.message
      );
      return res.status(500).json({
        success: false,
        message: "To‘lovni amalga oshirishda xatolik",
        error: error.response?.data || error.message,
      });
    }
  }

  async sendReceipt(req: Request, res: Response) {
    try {
      const { receipt_id, phone } = req.body;

      if (!receipt_id || !phone) {
        return res.status(400).json({
          success: false,
          message: "receipt_id va phone talab qilinadi!",
        });
      }

      const body = {
        id: Date.now(),
        method: "receipts.send",
        params: {
          id: receipt_id,
          phone,
        },
      };

      const response = await axios.post(
        this.PAYME_API_URL,
        body,
        {
          headers: {
            "X-Auth": this.AUTH,
            "Content-Type": "application/json",
          },
        }
      );

      return res.status(200).json({
        success: true,
        result: response.data.result,
      });
    } catch (error: any) {
      console.error(
        "Payme sendReceipt error:",
        error.response?.data || error.message
      );
      return res.status(500).json({
        success: false,
        message: "Kvitansiyani yuborishda xatolik",
        error: error.response?.data || error.message,
      });
    }
  }

  async cancelReceipt(req: Request, res: Response) {
    try {
      const { receipt_id } = req.body;

      if (!receipt_id) {
        return res.status(400).json({
          success: false,
          message: "receipt_id talab qilinadi!",
        });
      }

      const body = {
        id: Date.now(),
        method: "receipts.cancel",
        params: {
          id: receipt_id,
        },
      };

      const response = await axios.post(
        this.PAYME_API_URL,
        body,
        {
          headers: {
            "X-Auth": this.AUTH,
            "Content-Type": "application/json",
          },
        }
      );

      return res.status(200).json({
        success: true,
        receipt: response.data.result.receipt,
      });
    } catch (error: any) {
      console.error(
        "Payme cancelReceipt error:",
        error.response?.data || error.message
      );
      return res.status(500).json({
        success: false,
        message: "Kvitansiyani bekor qilishda xatolik",
        error: error.response?.data || error.message,
      });
    }
  }

  async receiptCheck(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const response = await axios.post(
        this.PAYME_API_URL,
        {
          id: Date.now(),
          method: "receipts.check",
          params: { id },
        },
        {
          headers: {
            "X-Auth": this.AUTH,
            "Content-Type": "application/json",
          },
        }
      );

      return res.json(response.data);
    } catch (error: any) {
      console.error(
        "❌ Error checking receipt:",
        error.response?.data || error.message
      );
      return res.status(500).json({
        success: false,
        message: "Kvitansiya holatini tekshirishda xatolik yuz berdi.",
        error: error.response?.data || error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
        const { count = 10, from, to, offset = 0 } = req.body;
    
        const response = await axios.post(
          this.PAYME_API_URL,
          {
            id: Date.now(),
            method: "receipts.get_all",
            params: {
              count,
              from,
              to,
              offset,
            },
          },
          {
            headers: {
              "X-Auth": this.AUTH,
              "Content-Type": "application/json",
            },
          }
        );
    
        return res.json(response.data);
      } catch (error: any) {
        console.error("❌ Error getting all receipts:", error.response?.data || error.message);
        return res.status(500).json({
          success: false,
          message: "Kvitansiyalar ro‘yxatini olishda xatolik yuz berdi.",
          error: error.response?.data || error.message,
        });
      }
  }

  async setFiscalData(req: Request, res: Response) {
    try {
        const { id, fiscal_data } = req.body;

        if (!id || !fiscal_data?.receipt_id || !fiscal_data?.qr_code_url) {
          return res.status(400).json({
            success: false,
            message:
              "'id', 'fiscal_data.receipt_id' va 'fiscal_data.qr_code_url' majburiy maydonlardir.",
          });
        }

        const response = await axios.post(
          this.PAYME_API_URL,
          {
            id: Date.now(),
            method: "receipts.set_fiscal_data",
            params: {
              id,
              fiscal_data,
            },
          },
          {
            headers: {
              "X-Auth": this.AUTH,
              "Content-Type": "application/json",
            },
          }
        );

        return res.json(response.data);
      } catch (error: any) {
        console.error("❌ Error setting fiscal data:", error.response?.data || error.message);
        return res.status(500).json({
          success: false,
          message: "Fiskal ma'lumotlarni yuborishda xatolik yuz berdi.",
          error: error.response?.data || error.message,
        });
      }
  }

  // Subscription methods
  /*
  async createSubscription(req: Request, res: Response) {
    try {
      const { order_id, amount, user_id } = req.body;

      if (!order_id || !amount || !user_id) {
        return res.status(400).json({
          success: false,
          message: "order_id, amount va user_id majburiy",
        });
      }

      const body = {
        id: Date.now(),
        method: "receipts.create",
        params: {
          amount,
          account: { order_id },
          hold: true,
        },
      };

      const { data } = await axios.post(this.PAYME_API_URL, body, {
        headers: {
          "Content-Type": "application/json",
          "X-Auth": this.AUTH,
        },
      });

      const subscription = await Subscription.create({
        userId: user_id,
        order_id,
        amount,
        receipt_id: data.result.receipt._id,
        status: "pending",
      });

      return res.json({
        success: true,
        message: "Subscription yaratildi",
        receipt_id: data.result.receipt._id,
        subscription,
      });
    } catch (error: any) {
      console.error("Payme createSubscription error:", error.response?.data || error.message);
      return res.status(500).json({
        success: false,
        message: "Subscription yaratishda xatolik",
        error: error.response?.data || error.message,
      });
    }
  }
  */

  /*
  async paySubscription(req: Request, res: Response) {
    try {
      const { receipt_id, card_token } = req.body;

      if (!receipt_id || !card_token) {
        return res.status(400).json({
          success: false,
          message: "receipt_id va card_token majburiy",
        });
      }

      const body = {
        id: Date.now(),
        method: "receipts.pay",
        params: {
          id: receipt_id,
          token: card_token,
          hold: true,
        },
      };

      const { data } = await axios.post(this.PAYME_API_URL, body, {
        headers: {
          "Content-Type": "application/json",
          "X-Auth": this.AUTH,
        },
      });

      if (data.result.receipt.state === 5) {
        await Subscription.update(
          { status: "held", card_token },
          { where: { receipt_id } }
        );
        return res.json({
          success: true,
          message: "Mablag‘ hold qilindi",
          receipt: data.result.receipt,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "To‘lov muvaffaqiyatsiz",
          receipt: data.result.receipt,
        });
      }
    } catch (error: any) {
      console.error("Payme paySubscription error:", error.response?.data || error.message);
      return res.status(500).json({
        success: false,
        message: "Subscription to‘lovida xatolik",
        error: error.response?.data || error.message,
      });
    }
  }
  */

  /*
  async confirmSubscription(req: Request, res: Response) {
    try {
      const { receipt_id } = req.body;

      if (!receipt_id) {
        return res.status(400).json({
          success: false,
          message: "receipt_id majburiy",
        });
      }

      const body = {
        id: Date.now(),
        method: "receipts.confirm_hold",
        params: {
          id: receipt_id,
        },
      };

      const { data } = await axios.post(this.PAYME_API_URL, body, {
        headers: {
          "Content-Type": "application/json",
          "X-Auth": this.AUTH,
        },
      });

      await Subscription.update(
        { status: "confirmed" },
        { where: { receipt_id } }
      );

      return res.json({
        success: true,
        message: "Subscription tasdiqlandi",
        receipt: data.result.receipt,
      });
    } catch (error: any) {
      console.error("Payme confirmSubscription error:", error.response?.data || error.message);
      return res.status(500).json({
        success: false,
        message: "Subscription tasdiqlashda xatolik",
        error: error.response?.data || error.message,
      });
    }
  }
  */

  /*
  async cancelSubscription(req: Request, res: Response) {
    try {
      const { receipt_id } = req.body;

      if (!receipt_id) {
        return res.status(400).json({
          success: false,
          message: "receipt_id majburiy",
        });
      }

      const body = {
        id: Date.now(),
        method: "receipts.cancel",
        params: {
          id: receipt_id,
        },
      };

      const { data } = await axios.post(this.PAYME_API_URL, body, {
        headers: {
          "Content-Type": "application/json",
          "X-Auth": this.AUTH,
        },
      });

      await Subscription.update(
        { status: "cancelled" },
        { where: { receipt_id } }
      );

      return res.json({
        success: true,
        message: "Subscription bekor qilindi",
        receipt: data.result.receipt,
      });
    } catch (error: any) {
      console.error("Payme cancelSubscription error:", error.response?.data || error.message);
      return res.status(500).json({
        success: false,
        message: "Subscription bekor qilishda xatolik",
        error: error.response?.data || error.message,
      });
    }
  }
  */

  /*
  async getSubscriptionStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "id majburiy",
        });
      }

      const body = {
        id: Date.now(),
        method: "receipts.get",
        params: {
          id,
        },
      };

      const { data } = await axios.post(this.PAYME_API_URL, body, {
        headers: {
          "Content-Type": "application/json",
          "X-Auth": this.AUTH,
        },
      });

      return res.json({
        success: true,
        receipt: data.result.receipt,
      });
    } catch (error: any) {
      console.error("Payme getSubscriptionStatus error:", error.response?.data || error.message);
      return res.status(500).json({
        success: false,
        message: "Subscription holatini olishda xatolik",
        error: error.response?.data || error.message,
      });
    }
  }
  */

  /*
  async getUserSubscriptions(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Foydalanuvchi autentifikatsiya qilinmagan",
        });
      }

      const subscriptions = await Subscription.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
      });

      return res.json({
        success: true,
        subscriptions,
      });
    } catch (error: any) {
      console.error("Get user subscriptions error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Subscriptionlarni olishda xatolik",
        error: error.message,
      });
    }
  }
  */

  async getPaymentHistory(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Foydalanuvchi autentifikatsiya qilinmagan",
        });
      }

      const payments = await Payment.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
      });

      return res.json({
        success: true,
        payments,
      });
    } catch (error: any) {
      console.error("Get payment history error:", error.message);
      return res.status(500).json({
        success: false,
        message: "To'lov tarixini olishda xatolik",
        error: error.message,
      });
    }
  }

  async getUsageStats(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Foydalanuvchi autentifikatsiya qilinmagan",
        });
      }

      // Mock usage data for now - in real app, calculate from actual usage
      const usageData = [
        { month: 'Yan', usage: 2, projects: 3 },
        { month: 'Fev', usage: 3, projects: 5 },
        { month: 'Mar', usage: 5, projects: 8 },
        { month: 'Apr', usage: 4, projects: 6 },
        { month: 'May', usage: 6, projects: 9 },
        { month: 'Iyun', usage: 8, projects: 12 },
      ];

      const totalSpent = 87;
      const totalProjects = 12;
      const subscriptionMonths = 3;

      return res.json({
        success: true,
        usageData,
        stats: {
          totalSpent,
          totalProjects,
          subscriptionMonths,
        },
      });
    } catch (error: any) {
      console.error("Get usage stats error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Foydalanish statistikasini olishda xatolik",
        error: error.message,
      });
    }
  }
}

export default new PaymentController();
