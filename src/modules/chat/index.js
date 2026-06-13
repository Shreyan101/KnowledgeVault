import { groqCompletion } from "../../providers/groq/groq.provider.js";

export const chat = async (messages) => {
    try {
        const response = await groqCompletion(messages);
        return response;
    } catch (error) {
        console.error(error);
    }
}