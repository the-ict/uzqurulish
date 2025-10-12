import Models from "../models";
import type { ICreateConversationParams } from "../types/conversation.types";
import type { ISupportConversation } from "../models/SupportConversation";
import { Op } from "sequelize";


class ConversationService {
  public async createConversation(
    data: ICreateConversationParams
  ): Promise<ISupportConversation> {
    // Input validation
    if (!data.members || !Array.isArray(data.members) || data.members.length === 0) {
      throw new Error("Members array is required and cannot be empty.");
    }

    try {
      const conversation = await Models.SupportConversation.create(data);
      return conversation.toJSON();
    } catch (error) {
      console.error("Error creating conversation:", error);
      throw new Error("Failed to create conversation. Please try again.");
    }
  }
  public async getConversationMessages({ chatId }: { chatId: number }): Promise<any[]> {
    if (!chatId || typeof chatId !== "number" || chatId <= 0) {
      throw new Error("Valid chatId is required.");
    }

    try {
      const conversation = await Models.SupportConversation.findByPk(chatId);
      if (!conversation) {
        throw new Error("Conversation not found.");
      }

      const messages = await Models.Messages.findAll({
        where: {
          chatId: chatId,
        },
        order: [["createdAt", "ASC"]],
      });

      return messages.map(msg => msg.toJSON());
    } catch (error) {
      console.error("Error retrieving conversation messages:", error);
      throw new Error("Failed to retrieve conversation messages. Please try again.");
    }
  }

  public async toogleConversation (userId: number): Promise<ISupportConversation> {
    try {
      // Find existing conversation for user
      const existingConversation = await Models.SupportConversation.findOne({
        where: {
          members: {
            [Op.contains]: [userId]
          }
        }
      });

      if (existingConversation) {
        return existingConversation.toJSON();
      } else {
        // Create new conversation
        const conversation = await this.createConversation({
          members: [userId, 0]
        });
        return conversation;
      }
    } catch (error) {
      console.error("Error toggling conversation:", error);
      throw new Error("Failed to toggle conversation. Please try again.");
    }
  }
}

export default ConversationService;
