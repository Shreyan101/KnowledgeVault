import { indexDocument } from "./ingestion/index.js";
import { executionEngine } from "./utils/helper.js";

const documentPath = "./javascript_interview_questions.pdf";


// This function is used to ingest a PDF file to Pinecone, will be called only once
const ingestPdfToPinecone = async (documentPath) => {
    try {
        const document = await indexDocument(documentPath);
        console.log(document);
    } catch (error) {
        console.error("Error in ingestPdfToPinecone:", error);
        throw error;
    }
}


const app = async () => {
    try {
        await executionEngine()
    } catch (error) {
        console.error("Error in app:", error);
        throw error;
    }
}

app();