interface RegisterFormData {
  email: string;
  password: string;
  name: string;
  company: string;
}

interface RegisterFormErrors {
  email?: string;
  password?: string;
  fullName?: string;
  phone?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

interface IAuthRegisterRequest {
  email: string;
  name: string;
  password: string;
  company: string;
}

interface IAuthLoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface ISetNewPasswordViaEmailRequest{
  token: string;
  password: string;
}


export type {
  RegisterFormData,
  RegisterFormErrors,
  LoginFormData,
  LoginFormErrors,
  IAuthRegisterRequest,
  IAuthLoginRequest,
  ISetNewPasswordViaEmailRequest
};
