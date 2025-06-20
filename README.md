# Gemini Chat AI App

A modern AI chatbot built using **React**, **Gemini API**, **Appwrite**, and **Redux Toolkit**. This project allows users to interact with an AI assistant, save their chat prompts, and manage authentication — all inside a sleek and responsive UI.

---

## ✨ Features

- 🔐 Authentication system (Signup/Login)
- 🧠 Chat with AI powered by Gemini API
- 💬 Dynamic prompt handling and response rendering
- 📄 Prompt history stored securely per user
- 📦 Global state management using Redux Toolkit
- 🎨 Modern and responsive UI design
- 🚫 Route protection for unauthenticated users

---

## 🚀 Tech Stack

- **Frontend:** React, JSX, CSS
- **Authentication & Database:** Appwrite
- **AI Backend:** Gemini (Google Generative AI)
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/shahzaibdev-bit/gemini-chat-ai-appwrite.git
cd gemini-chat-ai-appwrite
npm install
````
### 2. Create a .env file in the root directory

- **VITE_APPWRITE_ENDPOINT**=your_appwrite_endpoint
- **VITE_APPWRITE_PROJECT_ID**=your_project_id
- **VITE_APPWRITE_DATABASE_ID**=your_database_id
- **VITE_APPWRITE_COLLECTION_ID**=your_collection_id
- **VITE_GEMINI_API_KEY**=your_gemini_api_key

### 3. Run the application
```bash
npm run dev
```
