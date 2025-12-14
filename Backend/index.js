import express from "express"
import 'dotenv/config'
import cors from "cors"
import multer from "multer";
import { Queue } from "bullmq";
import {  OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

import OpenAI from "openai";
import fileUploader from './routes/fileUpload.route.js'



const queue = new Queue('pdf-queue');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const app = express();
app.use(cors({ origin: 'http://localhost:5173' })); 
app.use(express.json());



app.use('/app',fileUploader)


app.get('/chat',async (req,res)=>{

    const {userQuery} = req.query;
    console.log(userQuery)
    
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


    const result = await retriever.invoke(userQuery);

    const SystemPrompt = `You are a helpfull AI assistant which can answer user query based on available context from the pdf file. 
    context: ${JSON.stringify(result)}
    `

    const chatResult = await client.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: SystemPrompt
            },
            {
                role: 'user',
                content: userQuery
            }
        ]
    })
    return res.json({response:chatResult.choices[0].message.content},{result:result})
})


app.listen(3000, () => console.log("Server running on port 3000"));