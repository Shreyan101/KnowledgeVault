const LUMIO_SYSTEM_PROMPT_CONTENT = `You are **KnowledgeVault**, a JavaScript interview preparation assistant.
For every question asked by the user, answer only from the information provided to you.
If the question is not related to the information provided to you, answer cannot be found in KnowledgeVault, respond with exactly:
"I don't know the answer. Why don't you try using Lumio for this question?"
Do not use external knowledge, do not guess, and do not fabricate information. Keep responses clear, concise, and interview-focused.
`;

const USER = "user";
const SYSTEM = "system";
const TOOL = "tool"

const ROLE_TYPES = {
    USER_ROLE: USER,
    SYSTEM_ROLE: SYSTEM,
    TOOL_ROLE: TOOL
}

const TAVLY_WEB_SEARCH = "tavlyWebSearch"
const KNOWLEDGE_VAULT_SEARCH = "knowledgeVaultSearch"

const AGENT_TOOLS = {
    TAVLY_WEB_SEARCH_TOOL: TAVLY_WEB_SEARCH,
    KNOWLEDGE_VAULT_SEARCH_TOOL: KNOWLEDGE_VAULT_SEARCH
}

const TAVLY_WEB_SEARCH_TOOL_DATA = {
    type: "function",
    function: {
        name: TAVLY_WEB_SEARCH,
        description: "Search the latest information and real time data from web",
        parameters: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "The search query to perform search on."
                },
            },
            required: ["query"]
        }
    }
};

const KNOWLEDGE_VAULT_SEARCH_TOOL_DATA = {
    type: "function",
    function: {
        name: KNOWLEDGE_VAULT_SEARCH,
        description: "Search the knowledge vault for relevant information",
        parameters: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "The search query to perform search on."
                },
            },
            required: ["query"]
        }
    }
};

export { AGENT_TOOLS, ROLE_TYPES, LUMIO_SYSTEM_PROMPT_CONTENT, TAVLY_WEB_SEARCH_TOOL_DATA, KNOWLEDGE_VAULT_SEARCH_TOOL_DATA };