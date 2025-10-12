import Messages from "../models/Messages";
import type { ICreateMessageParams } from "../types/message.types";
declare class MessageService {
    createMessage(params: ICreateMessageParams): Promise<Messages>;
}
export default MessageService;
//# sourceMappingURL=message.service.d.ts.map