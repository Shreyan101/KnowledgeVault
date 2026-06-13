import { embeddingProvider } from "../providers/index.js";

export const embeddingService = async (chunks) => {
    try {
        const vectors = await embeddingProvider.embedDocuments(chunks)
        return vectors;
    } catch (error) {
        console.error("Error generating embeddings:", error);
        throw error;
    }
}

// Note: create a function to embed a single document, not getting used anywhere

