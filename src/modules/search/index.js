import { tavlyCompletion } from '../../providers/tavily/tavily.provider.js';

export const tavlyWebSearch = async ({ query }) => {
    try {
        const response = await tavlyCompletion({ query });
        return response;
    } catch (error) {
        console.log("Error: ", error)
    }
}