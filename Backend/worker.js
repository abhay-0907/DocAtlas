import { Worker } from "bullmq";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { Document } from "@langchain/core/documents";
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import 'dotenv/config'
const worker = new Worker(
    "pdf-queue",
    async (job) => {

        const { fileName, filePath, destination } = JSON.parse(job.data);  

        //? path:filePath,
        //? read the file from the path,
        //? chunk the pdf,
        //? call the openAI embedding model for every chunk,
        //? store the chunks in qdrant DB.

        console.log("Processing job with data:", job.data);
        const loader = new PDFLoader(filePath); 
        const docs = await loader.load();
        // console.log(docs);
        const embeddings = new OpenAIEmbeddings({
            model: "text-embedding-3-small",
            apiKey: process.env.OPENAI_API_KEY
        });
        const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
            url: process.env.QDRANT_URL,
            collectionName: "RAG Application",
        });

        await vectorStore.addDocuments(docs);
        console.log("All docs are added to qdrant DB");
    },
    {
        concurrency:10,
        connection: {
            host: "localhost",
            port: 6379
        }
    }
)
