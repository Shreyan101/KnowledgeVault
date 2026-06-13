import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const splitter = async (text = "") => {
    try {
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 600,
            chunkOverlap: 200,
        });
        const chunks = await splitter.splitText(text);
        return chunks;
    } catch (error) {
        console.error("Error splitting document:", error);
        throw error;
    }
}