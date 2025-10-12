import { Link } from "react-router-dom";
import React, { useState } from "react";
import type { RegisterFormData } from "../../types/auth.types";
import type { AxiosError } from "axios";
import { authFunctions } from "../../functions/auth.func";

const RegisterPage = () => {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    company: ""
  });
  const [errors, setErrors] = useState<AxiosError | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
    } else {
      setIsLoading(true)
      setErrors(await authFunctions.register(formData));
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-800">
            <span className="text-white text-2xl">🏗️</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Ro'yxatdan o'tish
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hisob yarating va qurilish ruxsatnomalarini oson boshqaring
          </p>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center cursor-pointer${
                step === 1 ? "bg-blue-800 text-white" : "bg-teal-600 text-white"
              }`}
            >
              {step === 1 ? "1" : "✓"}
            </div>
            <div
              className={`h-1 w-16 ${
                step === 1 ? "bg-gray-300" : "bg-teal-600"
              }`}
            ></div>
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                step === 2
                  ? "bg-blue-800 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              2
            </div>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  To'liq ism
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 sm:text-sm">👤</span>
                  </div>
                  <input
                    id="fullName"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`pl-10 block w-full pr-3 py-3 border border-gray-300
           rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="Ismingiz"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 sm:text-sm">📧</span>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 block w-full pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="name@example.com"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Parol
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 sm:text-sm">🔒</span>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-10 block w-full pr-3 py-3 border  border-gray-300
                    rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="••••••••"
                  />
                </div>

                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">O'rtacha</p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Parolni tasdiqlang
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 sm:text-sm">🔒</span>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setConfirmPassword(e.target.value)
                    }
                    className={`pl-10 block w-full pr-3 py-3 border  border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kompaniya nomi
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 sm:text-sm">🔒</span>
                  </div>
                  <input
                    id="confirmPassword"
                    name="company"
                    type="password"
                    value={formData.company}
                    onChange={handleChange}
                    className={`pl-10 block w-full pr-3 py-3 border  border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="agreeToTerms"
                    className="font-medium text-gray-700"
                  >
                    Men{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      foydalanish shartlari
                    </a>{" "}
                    va{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      maxfiylik siyosati
                    </a>
                    ni o'qib chiqdim va roziman
                  </label>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full cursor-pointer flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {step === 1 ? "Keyingi qadam" : "Ro'yxatdan o'tilmoqda..."}
                </>
              ) : step === 1 ? (
                "Keyingi qadam"
              ) : (
                "Ro'yxatdan o'tish"
              )}
            </button>

            <div className="text-center mt-5">
              <p className="text-sm text-gray-600">
                Allaqchon hisobingiz bormi?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Kirish
                </Link>
              </p>
            </div>
          </div>

          {step === 2 && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Hisobingiz bormi?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Tizimga kirish
                </Link>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
