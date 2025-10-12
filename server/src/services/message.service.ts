import Messages from "../models/Messages";
import type { ICreateMessageParams } from "../types/message.types";


class MessageService {
    public async createMessage(params: ICreateMessageParams): Promise<Messages> {
        if (!params || !params.chatId || !params.text || !params.userId) {
            throw new Error("Invalid parameters: chatId, text, and userId are required.");
        }

        try {
            const message = await Messages.create(params);
            return message;
        } catch (error) {
            console.error("Error creating message:", error);
            throw new Error("Failed to create message. Please try again later.");
        }
    }
}

export default MessageService;