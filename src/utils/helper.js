import readline from "node:readline/promises";
import { LUMIO_SYSTEM_PROMPTS } from "../prompts/systemPrompts.js";
import { AGENT_TOOLS, ROLE_TYPES } from "./constant.js";
import { tavlyWebSearch } from "../modules/search/index.js";
import { chat } from "../modules/chat/index.js";
import { knowledgeVaultSearch } from "../modules/similaritySearch/index.js";

export const getReadLine = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return rl;
}

export const closeReadLine = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    console.log("See ya!!, If you need any help, just ask Lumio 🫡")
    rl.close();
}


const getToolCallsValue = (response) => response?.choices?.[0]?.message?.tool_calls;

const getToolCallsResult = (response) => {
    const toolCalls = getToolCallsValue(response);
    return toolCalls;
}

const renderResponse = (response) => {
    const plainResponse = response?.choices?.[0]?.message?.content;
    console.log("KnowledgeVault: ", plainResponse)
}

const getShouldCloseWorkflow = (userQuestion) => userQuestion.toLowerCase().includes("see ya")


const enqueueMessage = (params, messageArray) => {
    messageArray.push(params);
    return messageArray
}

const getBaseMessage = () => [{ ...LUMIO_SYSTEM_PROMPTS }];

const getToolFunctionName = (tool) => tool?.function?.name

const getToolFunctionArguments = (tool) => tool?.function?.arguments;

const getFormattedPlainText = (resArray) => resArray?.map((res) => res.content).join("\n\n")

const callTavlyWebSearch = async ({ toolFunctionName, toolFunctionArgs, messageArray }) => {
    try {
        const toolResult = await tavlyWebSearch(JSON.parse(toolFunctionArgs));
        const toolResultReqId = toolResult?.requestId;
        const toolResultArray = toolResult?.results;
        const formattedPlainText = getFormattedPlainText(toolResultArray)

        enqueueMessage({
            tool_call_id: toolResultReqId,
            role: ROLE_TYPES.TOOL_ROLE,
            name: toolFunctionName,
            content: formattedPlainText
        }, messageArray)
    }
    catch (error) {
        console.error(error);
    }
}


const callKnowledgeVaultSearch = async ({ query, k = 3 }) => {
    try {
        const knowledgeVaultSearchResult = await knowledgeVaultSearch({ query, k: 3 });
        const relevantInformation = getRelevantInformation(knowledgeVaultSearchResult);
        return relevantInformation;
    }
    catch (error) {
        console.error(error);
    }
}


const getAgentToolFunc = (toolFunctionName) => ({
    [AGENT_TOOLS.TAVLY_WEB_SEARCH_TOOL]: callTavlyWebSearch,
    [AGENT_TOOLS.KNOWLEDGE_VAULT_SEARCH_TOOL]: callKnowledgeVaultSearch,
}[toolFunctionName]);

const executeAgentByName = async ({ toolFunctionName, toolFunctionArgs, messageArray }) => {
    const agentToolFunc = getAgentToolFunc(toolFunctionName);
    await agentToolFunc({
        toolFunctionName,
        toolFunctionArgs,
        messageArray,
    });
}

const invokeAgent = async (toolCalls, messageArray) => {
    for (const tool of toolCalls) {
        const toolFunctionName = getToolFunctionName(tool);
        const toolFunctionArgs = getToolFunctionArguments(tool);
        await executeAgentByName({ toolFunctionName, toolFunctionArgs, messageArray })
    }
}

const executeChain = async (messageArray) => {
    while (true) {
        const response = await chat(messageArray);
        const isToolCall = getToolCallsResult(response)
        if (!isToolCall) {
            renderResponse(response);
            break;
        }
        const toolCalls = getToolCallsValue(response)
        await invokeAgent(toolCalls, messageArray)
    }
}


const getRelevantInformation = (userQuestion) => userQuestion?.map((chunk) => chunk?.pageContent).join("\n\n");

export const executionEngine = async () => {
    try {
        const read = getReadLine();
        const baseMessage = getBaseMessage();
        while (true) {
            const userQuestion = await read.question("shreyan: ");
            const shouldCloseWorkflow = getShouldCloseWorkflow(userQuestion)
            if (shouldCloseWorkflow) {
                break;
            }
            const messageArray = enqueueMessage({
                role: ROLE_TYPES.USER_ROLE,
                content: userQuestion
            }, baseMessage)
            const knowledgeVaultSearchResult = await callKnowledgeVaultSearch({ query: userQuestion, k: 3 });
            const finalMessageArray = enqueueMessage({
                role: ROLE_TYPES.USER_ROLE,
                content: knowledgeVaultSearchResult
            }, messageArray)
            await executeChain(finalMessageArray)
        }
        closeReadLine();
    } catch (error) {
        console.error(error);
    }
}