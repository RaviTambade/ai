# Local LLM — Running AI Models on Your Own Machine

AI Engineering Fundamentals

A Local LLM is a Large Language Model that runs on your own computer or server instead of sending inference requests to a hosted model service.

Imagine Transflower Learning wants to build an AI assistant for students. The assistant should answer questions about programming, explain code, search course materials, and help mentors analyse learning progress.

Should every question be sent to an external AI provider?

Not necessarily! We can run a suitable LLM locally and build our AI application around it.

## 1. Local LLM architecture

React / Web Application

Student asks a question

Backend API — FastAPI / ASP.NET Core / Node.js

Validation · Authentication · Prompt construction

Local LLM Runtime — Ollama

Loads and runs the selected model

LLM Model

Llama · Gemma · Qwen · other supported models

Optional components: RAG, vector database, MCP tools, and business APIs.

The key idea is that the model inference happens on your machine or your own server. Your application can still use external services if you choose to integrate them.

## 2. Local LLM vs cloud LLM

| Feature               | Local LLM                               | Cloud LLM                                            |
| --------------------- | --------------------------------------- | ---------------------------------------------------- |
| Where inference runs  | Your computer or server                 | Provider's infrastructure                            |
| Internet              | Often unnecessary after setup           | Usually required                                     |
| Data privacy          | Can keep inference data local           | Depends on provider, configuration and data policies |
| Initial hardware cost | May require RAM, GPU or storage         | Usually no dedicated inference hardware              |
| Scaling               | You manage compute and concurrency      | Provider manages much of the infrastructure          |
| Model choice          | Depends on hardware and runtime support | Depends on provider's available models               |
| Maintenance           | You manage model updates and runtime    | Provider manages the hosted model infrastructure     |

Mentor's point: Local does not automatically mean secure, free, or production-ready. You still need access controls, patching, monitoring, and appropriate hardware.

## 3. Run your first Local LLM using Ollama

[library](https://images.openai.com/static-rsc-4/iC1pWAxAtGlF4Ppu29pYJyVUYAbL82h0-gEOW2HQi0zMl9OmzSvHrPi1eTJDH-AVbmsne3GGNBazLlCcbxkWQRLQOFsa4cFgyFS1jyYu5fe69eCBdVZE0k1UFHCLXSwVpZTS1U9emNxTbqerTeI9EEnS2WHR7fvgsEfo6fwCP3o?purpose=inline)

Ollama

Ollama makes it straightforward to download, run, and interact with supported language models locally. It also provides an API for application integration.

Website: [ollama.com](https://ollama.com/?utm_source=chatgpt.com)

### Step 1 — Install Ollama

On Windows, download and install Ollama from its official website.

On Debian or Ubuntu Linux, the official installation command is:

```
curl -fsSL https://ollama.com/install.sh | sh
```

Use the official installation instructions for your operating system, and review installation scripts according to your environment's security policy.

### Step 2 — Download and run a model

For example, you can try a supported Qwen model:

```
ollama run qwen2.5:3b
```

This downloads the model if it is not already available, then starts an interactive session. Model availability and hardware requirements may vary.

Try asking:

```
Explain object-oriented programming with a Java example.
```

To exit the interactive session, enter `/bye`.

### Step 3 — Check downloaded models

```
ollama list
```

To see currently running models:

```
ollama ps
```

### Step 4 — Call the local API

Ollama typically exposes its local API at `http://localhost:11434`.

Test it with:

```
curl http://localhost:11434/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen2.5:3b",
    "messages": [
      {
        "role": "user",
        "content": "Explain REST APIs with a practical example."
      }
    ],
    "stream": false
  }'
```

The response contains the generated message in JSON format.

## 4. How does a Local LLM fit into RAG and MCP?

These technologies solve different problems.

Local LLM

Runs the language model on your own infrastructure.

RAG

Retrieves relevant course notes, documentation, and other approved information to ground responses.

MCP

Connects a compatible AI application to tools and resources, such as authorized TFLAssessment APIs.

A Transflower CoMentor assistant could combine all three:

- A local LLM explains concepts and student performance.
- RAG retrieves approved learning materials.
- MCP exposes authorized tools for accessing assessment data.
- The backend enforces student-specific permissions.

For current student scores, retrieve authoritative records from the assessment API rather than relying on model memory.

## 5. What hardware do students need?

Hardware requirements depend on model size, quantization, context length, and concurrent requests.

| Model size       | Rough starting point for experimentation                        |
| ---------------- | --------------------------------------------------------------- |
| 1B–3B parameters | 8 GB RAM may be workable for some quantized models              |
| 7B–8B parameters | 16 GB RAM is a more comfortable starting point                  |
| 14B parameters   | 32 GB RAM may be preferable                                     |
| 30B+ parameters  | Often benefits from substantially more memory or a suitable GPU |

These are planning estimates, not guarantees. A model can require additional memory for its context cache, runtime, and application. CPU-only execution may work but can be slower than GPU-accelerated inference.

## 6. Transflower student lab

Lab: Build a Local AI Programming Mentor

Requirements:

1. Install Ollama and run a supported model.
2. Create a backend API using Python/FastAPI, Java/Spring Boot, .NET, or Node.js.
3. Connect the backend to Ollama's local API.
4. Build a simple React chatbot.
5. Add RAG over approved programming notes.
6. Measure response latency and answer quality.
7. Containerize the application where appropriate.
8. Document hardware requirements and limitations.

Learning outcome: Students understand the complete journey from model inference to an AI-enabled application instead of merely using a chatbot.

Ravi Sir's takeaway: A local LLM is not the entire AI application. It is one component in the architecture.

Learn the model. Understand the runtime. Build the API. Connect the knowledge. Apply security. Evaluate the results.

Learn → Experiment → Integrate → Evaluate → Deploy.