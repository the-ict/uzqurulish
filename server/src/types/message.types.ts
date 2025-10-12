interface ICreateMessageParams {
    chatId: number;
    text: string;
    userId:  number;
    type: "user" | "support"
}


export type {
    ICreateMessageParams
}