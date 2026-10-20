# RAG — Retrieval-Augmented Generation

### From LLM Fundamentals to Enterprise AI Engineering 

RAG = Retrieval + Augmentation + Generation

Imagine a student asks the TFLCoMentor chatbot:

"Sir, explain my skill gaps and recommend the topics I should learn next."

A normal LLM may generate a reasonable answer based on its training. But it does not automatically know the student's latest assessment scores, Transflower's learning materials, or the current skill taxonomy.

How can we give the LLM access to the right information before it answers?

We retrieve relevant information, add it to the model's context, and ask the model to generate a grounded response. This is RAG.

## 1. RAG architecture

### Phase A — Document Ingestion

Source Documents

PDFs · Notes · Course materials · Knowledge articles

Extract Text → Chunk → Generate Embeddings

Vector Database

Embeddings + Text + Metadata

### Phase B — Question Answering

User Question

Embed Query → Retrieve Relevant Chunks

Retrieved Context + Original Question

LLM Generates Grounded Answer

There are two distinct workflows:

- Ingestion time: Prepare knowledge so it can be retrieved efficiently.
- Query time: Retrieve relevant knowledge and use it to answer a question.

## 2. Understand RAG through a classroom analogy

Imagine a student answering an examination question.

- LLM: The student who knows how to explain concepts.
- Knowledge documents: The textbooks available in the library.
- Embedding model: A system that represents the meaning of text numerically.
- Vector database: An indexed library that helps find semantically related passages.
- Retriever: The librarian who finds the relevant pages.
- Prompt context: The selected pages provided to the student.
- Generation: The student writes the final answer using those pages.

The quality of the answer depends not only on the student's ability, but also on whether the right pages were found.

That is the fundamental idea behind RAG.

## 3. The six steps of a RAG pipeline

[Wilhelm Büchner Hochschule - Fernstudium-Infos.de](https://images.openai.com/static-rsc-4/yOjiOaqj41NJ4dl5KJA4W45ZwDtfWXQgPUQ2TIYOgDqV1eZrcOYp-gLA-GDGDNpAMcr8dwc-AxxZdPVr5rqBWJZPHlfsu06-ANhSHFjj6B_2Z0AWE7y3bijDzyU5dFtHurJX6NcxKQQO-frqpWpd6BnFgyT-tqCVCEd5yodvqjw?purpose=inline)

Step 1 — Load documents

Read PDFs, Word documents, web pages, database records, or approved knowledge sources.

[25 chunking tricks for RAG that devs actually use | by \<devtips/> | Medium](https://images.openai.com/static-rsc-4/4gBHd2H0wLuk-GAdSI2hO_8e743U7BnlydKAnl3wDwbQG-oEwIE3-r26KIS2scXDPReZZM7ens5f2FVV9DnFAU4fvwmOhHoWyRA3hP2FGbdWp8Sh4wRnO5ZegZEYVd0vXVn9Q__OrexQMuLOuxFwZTGYlsaDNEwlEsaknSx3Ric?purpose=inline)

Step 2 — Chunk the text

Divide documents into manageable passages while preserving useful context and metadata.

[Understanding Embeddings: From IDs to Meaning | by M Vikas Reddy | Medium](https://images.openai.com/static-rsc-4/LQzuby2MALpWQjLAQdFeeSY4MtIjmspDhbAQe1fvRzFO8O80nA734680qegfq7W22jOrIPHvLHjkEgvChTooKs83Oi5koDqDvXwpd1VdRxjiFdMJKYBvAQ-oKOVfFbV6fV3RjWQ--pAcGnC1Nth8XlaJCw0FKXwRMuiWemsFxys?purpose=inline)

Step 3 — Generate embeddings

Convert passages into numerical vectors that represent semantic features.

[이미지와 텍스트 데이터를 저장하는 벡터DB란?](https://images.openai.com/static-rsc-4/wVjOrWpZDojM2XScDJchd7sKlqDW7Kn-dwg7g59j8qoJ0yY762XgojIMgwXF6KQmenQQyzarfZP6eNtDZtdnuIm6zLzlvCsagCXPNh9SYs3WYpsBB-fScGzi9R95FczOPVaBZT4UEEdyhDo5D_lpFnqkokksYGNjd5TNi6YNwv0?purpose=inline)

Step 4 — Store and retrieve

Store vectors and metadata. At query time, retrieve relevant passages using vector search, keyword search, or both.

[A Comparative Analysis of Leading LLMs (Mistral, Anthropic, OpenAI) | by Sartaj Singh | Medium](https://images.openai.com/static-rsc-4/hC3VnUMRJtA3Sl7abwY3rBJ08wKavOFCOvrbdtvorUgWP7Dt3AQdKkIFtyhqaRzG6KUA0EBrmdUiuo3-zNd8IseKBS0YZ8H7gtiohsFp3rB6elhIrLC-wrIIp00bLM46BRm8khEyc0A-9ratn1VeChU5i6fQWbQTEXH39SzbRzE?purpose=inline)

Step 5 — Augment the prompt

Combine the user question with retrieved passages and instructions for grounded answering.

[How to Use Perplexity AI for Research: The Student's Complete Guide | Vertech Academy](https://images.openai.com/static-rsc-4/blrxxu826Xyl7Z9PoRciuiON86EM63Ch_ZMGbtkx2Lh3mGn_cM9Lrc6OttMxE2g9lq-5OYjhEn9Yrviv0QGPUo5f9ThKpbVlWyRVyXFPnykoIu906q0sqkJHvgtw3rRimPgwAEa8VUiz1y1Q9ZTFqHM_IHERhOHDmFvXPZbqamQ?purpose=inline)

Step 6 — Generate and evaluate

Generate the response, provide citations where possible, and measure retrieval quality, correctness, and groundedness.

## 4. RAG versus fine-tuning

| RAG                                                      | Fine-tuning                                                           |
| -------------------------------------------------------- | --------------------------------------------------------------------- |
| Retrieves relevant information at query time             | Trains a model further on curated examples                            |
| Useful for changing knowledge and private documents      | Useful for adapting behaviour, format, or task patterns               |
| Knowledge can be updated by changing the indexed sources | New training or fine-tuning may be needed to change learned behaviour |
| Can provide source references                            | Does not inherently provide citations to source documents             |

These techniques can also be combined. RAG is not a guarantee against hallucinations; retrieval quality, prompt design, model behaviour, and evaluation all matter.

## 5. Technology stack for Transflower students

| Layer               | Suggested technology                                 |
| ------------------- | ---------------------------------------------------- |
| Programming         | Python                                               |
| Backend API         | FastAPI                                              |
| Document processing | PyMuPDF, appropriate document loaders                |
| Embeddings          | Hosted embedding API or a suitable open-source model |
| Vector search       | ChromaDB or FAISS                                    |
| Relational data     | PostgreSQL or MySQL                                  |
| RAG orchestration   | LangChain or LlamaIndex                              |
| Model               | Hosted LLM or local model through Ollama             |
| Evaluation          | Ragas or DeepEval                                    |
| Deployment          | Docker, cloud, CI/CD                                 |

Students following Java, .NET, or Node.js tracks can implement the same architecture using their preferred backend language and compatible AI libraries.

## 6. Practical lab: Build a Transflower Learning Assistant

Problem statement: Build a chatbot that answers student questions using approved Transflower course materials.

Example:

Student: "What is the difference between authentication and authorization?"

RAG system:

1. Searches the approved learning documents.
2. Retrieves relevant passages about both concepts.
3. Sends those passages and the question to the LLM.
4. Generates an explanation with supporting source references.
5. Indicates when the available documents do not contain sufficient information.

Success criteria:

- Answers are supported by relevant retrieved content.
- Citations point to the correct documents or passages.
- The application handles missing or irrelevant information honestly.
- Retrieval and answer quality are evaluated with a test dataset.
- Access controls prevent retrieval of unauthorized documents.

For student-specific assessment scores, RAG should not be treated as the authoritative source. Retrieve current records through authenticated business APIs, then use the LLM to explain the results.

## 7. RAG and MCP: What is the difference?

RAG — What relevant knowledge can we retrieve?

Finds useful information from documents, knowledge bases, and indexed content.

MCP — How can an AI application connect to tools and context?

Provides a standardized protocol for discovering and interacting with tools, resources, and prompts exposed by MCP servers.

Together — Knowledge plus action

A CoMentor assistant can use RAG to retrieve learning materials and MCP-connected tools to access authorized assessment APIs.

Ravi Sir's takeaway: Don't start by installing a RAG framework. First understand document processing, chunking, embeddings, retrieval, context construction, and evaluation. Then use a framework to implement the pipeline.

Learn the fundamentals. Build the pipeline. Evaluate the answers. Deploy responsibly.