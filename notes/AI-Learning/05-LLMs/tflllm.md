# How does AI answer questions from your own documents?

That's RAG (Retrieval-Augmented Generation).

Imagine Transflower has 500 PDF documents containing course notes, programming assignments, assessment guidelines, project documentation, and learning resources.

A student asks: **"What are the prerequisites for learning ASP.NET Core Web API?"**

Instead of asking an LLM to answer from its general knowledge, we first retrieve relevant information from Transflower's own knowledge base and then ask the LLM to generate an answer using that information.

This is the fundamental idea behind RAG.

## 1. Understand the RAG execution pipeline

```
                 RAG (RETRIEVAL-AUGMENTED GENERATION)
                 ====================================

                     KNOWLEDGE SOURCES
              +-------------------------------+
              | PDF | Word | Text | Notes     |
              | Course Materials | Documents  |
              +---------------+---------------+
                              |
                              v
                    DOCUMENT PROCESSING
              +-------------------------------+
              | 1. Extract Text                |
              | 2. Clean Text                  |
              | 3. Split into Chunks           |
              +---------------+---------------+
                              |
                              v
                     EMBEDDING MODEL
              +-------------------------------+
              | Convert Text Chunks into      |
              | Numerical Vectors             |
              |                               |
              | "Learn C# and OOP"            |
              |          |                    |
              |          v                    |
              | [0.21, 0.45, 0.78, ...]       |
              +---------------+---------------+
                              |
                              v
                 VECTOR DATABASE / SEARCH INDEX
              +-------------------------------+
              | Store:                        |
              | - Embeddings                  |
              | - Original Text Chunks        |
              | - Document Metadata           |
              +---------------+---------------+
                              |
                              |
       +----------------------+---------------------+
       |                                            |
       |              USER QUERY                    |
       |                                            |
       v                                            |
+-------------------------------+                   |
|       STUDENT QUESTION        |                   |
|                               |                   |
| "What are ASP.NET Core        |                   |
|  prerequisites?"              |                   |
+---------------+---------------+                   |
                |                                   |
                v                                   |
       QUERY EMBEDDING                              |
+-------------------------------+                   |
| Convert Question into         |                   |
| Numerical Vector              |                   |
+---------------+---------------+                   |
                |                                   |
                v                                   |
       SIMILARITY SEARCH                            |
+-------------------------------+                   |
| Compare Query Vector with     |                   |
| Stored Document Vectors      |<------------------+
|                               |
| Retrieve Top-K Relevant       |
| Document Chunks               |
+---------------+---------------+
                |
                v
        RETRIEVED CONTEXT
+-------------------------------+
| Chunk 1: C# Fundamentals      |
| Chunk 2: OOP Concepts         |
| Chunk 3: HTTP and REST APIs   |
| Chunk 4: Database Basics      |
+---------------+---------------+
                |
                v
           LLM + CONTEXT
+-------------------------------+
| INPUT TO LLM:                 |
|                               |
| 1. Student Question           |
| 2. Retrieved Document Chunks  |
| 3. System Instructions        |
|                               |
| Generate Grounded Answer      |
+---------------+---------------+
                |
                v
           FINAL ANSWER
+-------------------------------+
| Before learning ASP.NET Core, |
| understand:                   |
|                               |
| - C# Programming              |
| - OOP Concepts                |
| - HTTP Protocol               |
| - REST APIs                   |
| - SQL and Databases           |
|                               |
| Sources:                      |
| ASP.NET Core Notes.pdf        |
| Section 1, 2 and 3            |
+-------------------------------+
```

## 2. Understand each step

| Step | Engineering concept | Responsibility              |
| ---- | ------------------- | --------------------------- |
| 1    | Document Loader     | Read documents              |
| 2    | Text Splitter       | Create chunks               |
| 3    | Embedding Model     | Convert text into vectors   |
| 4    | Vector Store        | Store vectors and metadata  |
| 5    | Retriever           | Find relevant chunks        |
| 6    | LLM                 | Generate contextual answers |
| 7    | Source Attribution  | Show supporting references  |

## 3. A practical example

Suppose we have this document:

Document: **ASP.NET Core Notes.pdf**

"ASP.NET Core developers should understand C#, object-oriented programming, HTTP fundamentals, REST APIs, dependency injection, and database connectivity."

The document is split into chunks and converted into embeddings.

A student asks:"What should I learn before starting ASP.NET Core?"

The retriever might return:

Retrieved Context

**Relevant Chunk 1**

C# programming and object-oriented programming fundamentals.

**Relevant Chunk 2**

HTTP protocol, REST APIs, and dependency injection.

**Relevant Chunk 3**

Database connectivity and SQL fundamentals.

The LLM receives these chunks along with the question.

**Generated answer:**

Before learning ASP.NET Core, focus on C#, OOP, HTTP, REST APIs, dependency injection, and database connectivity.

Sources: ASP.NET Core Notes.pdf — retrieved sections 1, 2 and 3.

## 4. Important distinction: Traditional search vs RAG

| Traditional search        | RAG                               |
| ------------------------- | --------------------------------- |
| Finds documents           | Finds relevant context            |
| Returns links or files    | Generates an answer               |
| Keyword-based or semantic | Retrieval + LLM generation        |
| User reads the document   | AI explains the retrieved content |

## 5. Hands-on technology stack

A student can build a simple RAG application using:

| Layer               | Technology                            |
| ------------------- | ------------------------------------- |
| Programming         | Python                                |
| Backend             | FastAPI                               |
| Document processing | PyPDF                                 |
| Embeddings          | Sentence Transformers / embedding API |
| Vector database     | FAISS / Chroma                        |
| LLM                 | OpenAI / Gemini / local LLM           |
| UI                  | React                                 |
| Testing             | Pytest                                |

## 6. Connect this to Transflower CoMentor

Think about the possibilities:

- Student asks questions about a programming concept.
- CoMentor retrieves mentor-approved learning resources.
- Student asks about assessment feedback.
- CoMentor retrieves authorized assessment information through business APIs.
- Student asks for a learning roadmap.
- CoMentor combines skill taxonomy, assessment results, and approved learning resources.

One important architectural principle: RAG retrieves knowledge; business APIs retrieve authoritative transactional information. For example, private student marks should come from authorized TFLAssessment APIs, not from an LLM's assumptions.

The most important lesson for students:

RAG is not simply connecting an LLM to a vector database. It is an engineering pipeline involving document processing, information retrieval, semantic search, context engineering, prompt design, evaluation, security, and observability.

First learn how to retrieve the right information. Then learn how to generate the right answer.

Tap your potential.