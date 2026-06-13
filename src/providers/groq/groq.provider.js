import groq from "./groq.client.js";
import { KNOWLEDGE_VAULT_SEARCH_TOOL_DATA } from "../../utils/constant.js";

export const groqCompletion = async (messages) => {
    try {
        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: messages,
            temperature: 1,
            // tools: [
            //     KNOWLEDGE_VAULT_SEARCH_TOOL_DATA
            // ],
            tool_choice: "auto"
        });
        return response;

    } catch (error) {
        console.error(error);
    }
}
