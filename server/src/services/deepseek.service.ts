import {
  IDocumentGenerator,
  IGenerateApplicationParametrs,
  IGenerateDocumentParametrs,
  IGenerateNeededDocumentsParametrs,
} from "../types";
import axiosClient from "../config/axios.config";
import {
  generateApplicationPrompt,
  generateChatBotModalPrompt,
  generateDocumentPrompt,
  generateNeededDocuments,
} from "../constants/propmts";
import { DocumentService } from "./document.service";
import { IChatBotModalParametrs } from "../types/support.types";
import { SupportService } from "./support.service";
import MessageService from "./message.service";
import ConversationService from "./conversation.service";



class DeepSeek {
  private documentService: DocumentService;
  private supportService: SupportService;
  private messageService: MessageService;
  private conversationService: ConversationService;

  constructor() {
    this.documentService = new DocumentService();
    this.supportService = new SupportService();
    this.messageService = new MessageService();
    this.conversationService = new ConversationService();
  }

  async generateNeededDocument(data: IGenerateDocumentParametrs) {
    const prompt = generateDocumentPrompt({
      name: data.name,
      additionalInfo: data.additionalInfo,
      type: data.type,
      field: data.field,
      userId: data.userId,
    });

    try {
      const response = await axiosClient.post("/chat/completions", {
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      throw new Error("Failed to generate document");
    }
  }

  async generateNeededDocuments(data: IGenerateNeededDocumentsParametrs) {
    const prompt = generateNeededDocuments(data);

    try {
      const response = await axiosClient.post("/chat/completions", {
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
      });

      const content = response.data.choices[0].message.content;

      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;

      const parsedDocuments = JSON.parse(jsonString);

      const documentsWithTimestamps = Array.isArray(parsedDocuments)
        ? parsedDocuments.map((doc) => ({
            ...doc,
            createdAt: new Date(),
            updatedAt: new Date(),
          }))
        : [];

      return documentsWithTimestamps;
    } catch (error) {
      throw new Error("Failed to generate needed documents");
    }
  }

  async generateApplication(data: IGenerateApplicationParametrs) {
    const prompt = generateApplicationPrompt(data);

    try {
      const response = await axiosClient.post("/chat/completions", {
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
      });

      const content = response.data.choices[0].message.content;

      if (content) {
        const document = await this.documentService.createDocument(
          data.name,
          data.projectId,
          content,
          "application",
          data.userId
        );

        if (document) return content;
        else {
          console.log("Failed to create document");
          throw new Error("Failed to create document");
        }
      }
    } catch (error) {
      console.log(error, "this is the error");
      throw new Error("Failed to generate application");
    }
  }

  public async generateDocument(data: IGenerateDocumentParametrs) {
    const prompt = generateDocumentPrompt(data);
    try {
      const response = await axiosClient.post("/chat/completions", {
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
      });

      const content = response.data.choices[0].message.content;

      if (content) {
        const document = await this.documentService.createDocument(
          data.name,
          data.field,
          content,
          "document",
          data.userId
        );

        if (document) return content;
        else {
          console.log("Failed to create document");
          throw new Error("Failed to create document");
        }
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async ChatBotModal(data: IChatBotModalParametrs) {
    console.log(data, "data")

    const prompt = generateChatBotModalPrompt({ question: data.question });

    try {
      await this.messageService.createMessage({
        chatId: data.chatId,
        text: data.question,
        userId: data.userId,
        type: "user"
      });

      const response = await axiosClient.post("/chat/completions", {
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
      });

      if (response.data.choices[0].message.content) {
        await this.messageService.createMessage({
          chatId:data.chatId,
          text: response.data.choices[0].message.content,
          userId: data.userId,  
          type: "support"
        });
      }

      return response.data.choices[0].message.content;
    } catch (error) {
      console.log(error,
         "error"
      )
      throw new Error("Failed to generate chatbot response");
    }
  }
}

export default DeepSeek;
