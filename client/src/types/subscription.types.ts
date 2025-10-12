export interface ISubscription {
  id: number;
  userId: number;
  order_id: string;
  amount: number;
  receipt_id: string;
  card_token?: string;
  status: "pending" | "held" | "confirmed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateSubscriptionRequest {
  order_id: string;
  amount: number;
  user_id: number;
}

export interface ICreateSubscriptionResponse {
  success: boolean;
  message: string;
  receipt_id: string;
  subscription: ISubscription;
}

export interface IPaySubscriptionRequest {
  receipt_id: string;
  card_token: string;
}

export interface IPaySubscriptionResponse {
  success: boolean;
  message: string;
  receipt: any;
}

export interface IConfirmSubscriptionRequest {
  receipt_id: string;
}

export interface IConfirmSubscriptionResponse {
  success: boolean;
  message: string;
  receipt: any;
}

export interface ICancelSubscriptionRequest {
  receipt_id: string;
}

export interface ICancelSubscriptionResponse {
  success: boolean;
  message: string;
  receipt: any;
}

export interface IGetSubscriptionStatusResponse {
  success: boolean;
  receipt: any;
}

export interface ICreateCardRequest {
  cardNumber: string;
  expire: string;
  save?: boolean;
}

export interface ICreateCardResponse {
  success: boolean;
  message: string;
  data: {
    card: {
      number: string;
      expire: string;
      token: string;
      recurrent: boolean;
      verify: boolean;
    };
    phone: string;
  };
  payment: any;
}

export interface IVerifyCardRequest {
  token: string;
  code: string;
}

export interface IVerifyCardResponse {
  success: boolean;
  message: string;
  data: {
    card: {
      number: string;
      expire: string;
      token: string;
      recurrent: boolean;
      verify: boolean;
    };
  };
}