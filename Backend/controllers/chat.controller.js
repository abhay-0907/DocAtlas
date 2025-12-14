import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export const chatController = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ message: "Query is required" });
        }

        const embeddings = new OpenAIEmbeddings({
            model: "text-embedding-3-small",
            apiKey: process.env.OPENAI_API_KEY
        });

        const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
            url: process.env.QDRANT_URL,
            collectionName: "RAG Application",
        });

        const retriever = vectorStore.asRetriever({
            k: 2,
        });

        const result = await retriever.invoke(query);

        const SystemPrompt = `You are a helpfull AI assistant which can answer user query based on available context from the pdf file. 
        context: ${JSON.stringify(result)}
        Always format your responses using Markdown — use headings (##), bullet points, bold text, and emojis where helpful.
        `

        const chatResult = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: SystemPrompt
                },
                {
                    role: 'user',
                    content: query
                }
            ]
        })
        return res.json({ "Result ->": chatResult.choices[0].message.content })

    } catch (error) {
        console.error("Error in chat controller:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
