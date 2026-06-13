import { PineconeStore } from "@langchain/pinecone";
import { pineConeProvider } from "../providers/index.js";


export const vectorStore = async ({ embeddingProvider }) => {
    try {
        const pineconeIndex = pineConeProvider.index(process.env.PINECONE_INDEX_NAME);
        const vectorStore = await PineconeStore.fromExistingIndex(embeddingProvider,
            {
                pineconeIndex,
                maxConcurrency: 5,
            });
        return vectorStore;
    }
    catch (error) {
        console.error("Error in vectorStore:", error);
        throw error;
    }
}


export const pineConeDB = async ({ embeddingProvider, docs }) => {
    try {
        const vectorStore = await vectorStore({ embeddingProvider });
        const results = await vectorStore.addDocuments(docs)
        return results;
    } catch (error) {
        console.error("Error in pineConeDB:", error);
        throw error;
    }
}

