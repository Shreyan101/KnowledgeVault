import tvly from "./tavily.client.js";

export const tavlyCompletion = async ({ query }) => {
    try {
        const response = await tvly.search(query);
        return response
    } catch (error) {
        console.log(error)
    }
}