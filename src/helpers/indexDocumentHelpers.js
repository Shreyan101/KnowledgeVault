import { Document } from "@langchain/core/documents";

export const getChunksWithMetadata = (chunks) => {
    return chunks.map(
        (chunk, index) =>
            new Document({
                id: `chunk-${index + 1}`,
                pageContent: chunk,
                metadata: {
                    page: index + 1,
                },
            })
    );
};