import React, { useState } from "react";
import PaymeLogo from "@/assets/payme-log.png"

const PaymeCardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(value);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setExpiryDate(value.slice(0, 5));
  };

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="text-center">
        <img
          src={PaymeLogo}
          alt="Payme"
          className="mx-auto h-24 w-24 cursor-pointer"
          onClick={() => window.open("https://payme.uz", "_blank")}
          />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Pay with your card</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Card number
          </label>
          <input
            id="cardNumber"
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div>
          <label
            htmlFor="expiryDate"
            className="block text-sm font-medium text-gray-700"
          >
            Expiry date
          </label>
          <input
            id="expiryDate"
            type="text"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            placeholder="MM/YY"
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Continue
        </button>
      </form>

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
          All card details are securely processed and stored on Payme Business servers. Merchants do not have access to your card data.
        </p>
      </div>
    </div>
  );
};

export default PaymeCardForm;