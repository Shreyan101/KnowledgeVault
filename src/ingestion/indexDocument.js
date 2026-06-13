import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { splitter } from "./splitter.js";
import { getChunksWithMetadata } from "../helpers/indexDocumentHelpers.js";
import { pineConeDB } from "../vectorStore/index.js";
import { embeddingProvider } from "../providers/index.js";

export const indexDocument = async (document) => {
    try {
        const loader = new PDFLoader(document, {
            splitPages: false,
        });
        const doc = await loader.load();
        const text = doc?.length > 0 ? doc[0]?.pageContent : "";
        const chunks = await splitter(text);
        const chunksWithMetadata = getChunksWithMetadata(chunks);
        console.log("Chunks with metadata:", chunksWithMetadata);
        const results = await pineConeDB({ embeddingProvider, docs: chunksWithMetadata });
        console.log("Documents indexed successfully!", results);
        return results;
    } catch (error) {
        console.error("Error indexing document:", error);
        throw error;
    }
}