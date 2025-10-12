// import { Router } from "express";
// import PaymentController from "../controllers/payment.controller";
// import PaymentMiddleware from "../middleware/payment.middleware";
// import { authenticateToken } from "../middleware/auth.middleware";
// import paymentController from "../controllers/payment.controller";

// const router = Router();
// const paymentMiddleware = new PaymentMiddleware()

// // Existing routes
// router.post("/create-card", authenticateToken, PaymentController.createCard.bind(paymentController));
// router.post("/get-verify-code", PaymentController.getVerifyCode.bind(paymentController));
// router.post("/verify", PaymentController.verify.bind(paymentController));
// router.post("/check-payment", PaymentController.checkPayment.bind(paymentController));
// router.post("/remove-card", PaymentController.removeCard.bind(paymentController));
// router.post("/receipt", PaymentController.receipt.bind(paymentController));
// router.post("/pay-receipt", PaymentController.payReceipt.bind(paymentController));
// router.post("/send-receipt", PaymentController.sendReceipt.bind(paymentController));
// router.post("/cancel-receipt", PaymentController.cancelReceipt.bind(paymentController));
// router.post("/receipt-check", PaymentController.receiptCheck.bind(paymentController));
// router.get("/receipts", PaymentController.getAll.bind(paymentController));
// router.post("/set-fiscal-data", PaymentController.setFiscalData.bind(paymentController));

// // Subscription routes
// router.post("/subscription/create", PaymentController.createSubscription.bind(paymentController));
// router.post("/subscription/pay", PaymentController.paySubscription.bind(paymentController));
// router.post("/subscription/confirm", PaymentController.confirmSubscription.bind(paymentController));
// router.post("/subscription/cancel", PaymentController.cancelSubscription.bind(paymentController));
// router.get("/subscription/status/:id", PaymentController.getSubscriptionStatus.bind(paymentController));
// router.get("/user/subscriptions", PaymentController.getUserSubscriptions.bind(paymentController));
// router.get("/user/payment-history", PaymentController.getPaymentHistory.bind(paymentController));
// router.get("/user/usage-stats", PaymentController.getUsageStats.bind(paymentController));

// export default router;