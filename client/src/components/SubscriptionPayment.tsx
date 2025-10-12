import React, { useState } from "react";
import type {
  ICreateCardRequest,
  IVerifyCardRequest,
  ICreateSubscriptionRequest,
  IPaySubscriptionRequest,
} from "../types/subscription.types";
import PaymeLogo from "@/assets/payme-log.png"
import { axiosClient } from "@/configs/api";


const SubscriptionPayment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"form" | "code" | "processing" | "success">("form");
  const [cardToken, setCardToken] = useState("");
  const [receiptId, setReceiptId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const request: ICreateCardRequest = {
        cardNumber: cardNumber.replace(/\s/g, ""),
        expire: expiryDate.replace("/", ""),
        save: false,
      };

      const response = await axiosClient.post("/payment/create-card", request);
      if (response.data.success) {
        setCardToken(response.data.data.card.token);
        setStep("code");
        setMessage("SMS kod yuborildi. Kodni kiriting.");
      } else {
        setMessage(response.data.message);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const request: IVerifyCardRequest = {
        token: cardToken,
        code,
      };

      const response = await axiosClient.post("/payment/verify", request);
      if (response.data.success) {
        setCardToken(response.data.data.card.token);
        await handleSubscription();
      } else {
        setMessage(response.data.message);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscription = async () => {
    setStep("processing");
    setLoading(true);
    setMessage("");

    try {
      // Assume user_id is 1 for demo
      const createRequest: ICreateSubscriptionRequest = {
        order_id: `order_${Date.now()}`,
        amount: 100000, // 1000 UZS
        user_id: 1,
      };

      const createResponse = await axiosClient.post("/payment/subscription/create", createRequest);
      if (createResponse.data.success) {
        setReceiptId(createResponse.data.receipt_id);

        const payRequest: IPaySubscriptionRequest = {
          receipt_id: createResponse.data.receipt_id,
          card_token: cardToken,
        };

        const payResponse = await axiosClient.post("/payment/subscription/pay", payRequest);
        if (payResponse.data.success) {
          setStep("success");
          setMessage("Subscription holatda: Mablag‘ hold qilindi");
        } else {
          setMessage(payResponse.data.message);
          setStep("form");
        }
      } else {
        setMessage(createResponse.data.message);
        setStep("form");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Xatolik yuz berdi");
      setStep("form");
    } finally {
      setLoading(false);
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(value);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setExpiryDate(value.slice(0, 5));
  };

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 space-y-6">
      <div className="text-center">
        <img
          src={PaymeLogo}
          alt="Payme"
          className="mx-auto h-24 w-auto"
        />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Pay with your card</h2>
      </div>

      {step === "form" && (
        <form onSubmit={handleCardSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card number
            </label>
            <input
              id="cardNumber"
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
              Expiry date
            </label>
            <input
              id="expiryDate"
              type="text"
              value={expiryDate}
              onChange={handleExpiryChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="MM/YY"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Subscribe"}
          </button>
        </form>
      )}

      {step === "code" && (
        <form onSubmit={handleCodeSubmit} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              SMS Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter SMS code"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify & Subscribe"}
          </button>
        </form>
      )}

      {step === "processing" && (
        <div className="text-center">
          <p className="text-sm text-gray-600">Processing subscription...</p>
        </div>
      )}

      {step === "success" && (
        <div className="text-center">
          <p className="text-sm text-green-600">{message}</p>
        </div>
      )}

      <div className="text-center space-y-2">
        <a
          href="https://payme.uz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          Learn more on Payme →
        </a>
        <p className="text-xs text-gray-500">
          Barcha foydalanuvchi maʼlumotlari sotuvchiga oʻtkazilmaydi va Payme Business serverida saqlanadi.
        </p>
      </div>

      {message && step !== "success" && (
        <p className="text-sm text-red-600 text-center">{message}</p>
      )}
    </div>
  );
};

export default SubscriptionPayment;