# DocAtlas
# 📄 Retrieval-Augmented Generation (RAG) Application  
A full-stack AI system that enables intelligent querying over uploaded documents using **semantic search**, **vector embeddings**, and **LLM-powered responses**.

This project demonstrates a production-grade RAG architecture with end-to-end functionality: document ingestion, background processing, vector indexing, retrieval, and contextual answer generation.

---

## 🚀 Tech Stack

### **Frontend**
- React  
- Axios  
- Tailwind (optional)

### **Backend**
- Node.js  
- Express  
- BullMQ (Redis) for background jobs  
- OpenAI API for LLM responses  
- Sentence Transformers for embedding generation  

### **Databases**
- **MongoDB** → stores metadata, file info, chat history  
- **Qdrant** → vector database for similarity search  

### **Models**
- **nomic-embed-text-v1.5-large** (Sentence Transformers)

---

## 📦 Features

### ✅ **1. Document Upload**
- Upload PDFs, text files, and documents from frontend  
- Stores metadata in MongoDB  
- Pushes files to BullMQ queue for processing  

### ✅ **2. Background File Processing**
- Worker service extracts text  
- Generates embeddings using Sentence Transformers  
- Chunks document into segments  
- Inserts vectors + metadata into Qdrant  

### ✅ **3. Semantic Search & Context Retrieval**
- Uses HNSW indexing in Qdrant  
- Retrieves top-K relevant chunks for each user query  

### ✅ **4. LLM-Generated Answers**
- Sends query + retrieved context to OpenAI  
- Produces grounded, context-aware answers  
- Reduces hallucination compared to plain LLM usage  

### ✅ **5. Full Chat Interface (Frontend)**
- Clean UI for chatting  
- File upload interface  
- Displays AI answer + supporting document chunks  

### ✅ **6. Modular Architecture**
Easily replaceable components:
- Embedding model  
- LLM provider  
- Vector database  
- File processing logic  

---

## 🧠 System Architecture

User → React UI → Express API → Query
↓
Qdrant Vector Search ← Embeddings
↓
Retrieved Document Chunks
↓
OpenAI GPT (LLM) ← Prompt + Context → Final Answer

## Project Structure
## ├── backend
## │ ├── src
## │ │ ├── routes
## │ │ ├── controllers
## │ │ ├── services
## │ │ │ ├── ragService.js
## │ │ │ ├── embeddingService.js
## │ │ │ ├── qdrantService.js
## │ │ ├── workers
## │ │ │ └── fileProcessor.js
## │ │ └── utils
## │ └── app.js
---
##├── frontend
## │ ├── src
## │ │ ├── components
## │ │ ├── assest
## │ │ ├── pages
## │ └── App.js
## │
## └── README.md
