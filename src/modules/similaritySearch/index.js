import { vectorStore } from "../../vectorStore/index.js";
import { embeddingProvider } from "../../providers/index.js";

export const knowledgeVaultSearch = async ({ query, k = 3 }) => {
    try {
        const vectorStoreInstance = await vectorStore({ embeddingProvider });
        const results = await vectorStoreInstance.similaritySearch(query, k);
        return results;
    } catch (error) {
        console.error(error);
    }
}