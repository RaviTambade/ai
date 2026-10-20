# AI Engineering — Production Architecture

As a Transflower Mentor, remember this principle:

A model generates an answer. An AI Engineering system makes that answer secure, grounded, reliable, observable, and usable by real applications.

## 1. High-Level Production Architecture

```
                  USERS / CLIENT APPLICATIONS
             +-----------+  +---------+  +----------+
             | Web Client|  | Mobile  |  | Other API|
             +-----+-----+  +----+----+  +-----+----+
                   |             |             |
                   +-------------+-------------+
                                 |
                                 v
                    +------------------------+
                    |      API GATEWAY       |
                    | AuthN / AuthZ / Quotas |
                    | Rate Limits / Routing  |
                    +-----------+------------+
                                |
                                v
                    +------------------------+
                    |    AI APPLICATION      |
                    |  Business Orchestration|
                    | Prompt / Context Logic |
                    | Session / User Context |
                    +-----------+------------+
                                |
                                v
                    +------------------------+
                    |   AI GATEWAY / ROUTER  |
                    | Model Selection        |
                    | Token & Cost Limits    |
                    | Timeouts / Fallbacks   |
                    +-----------+------------+
                                |
                 +--------------+---------------+
                 |              |               |
                 v              v               v
          +-------------+ +-------------+ +-------------+
          | Hosted LLM  | | Local LLM   | | Other Model |
          | Provider    | | vLLM/Ollama | | Provider    |
          +------+------+ +------+------+ +------+------+
                 |               |                |
                 +---------------+----------------+
                                 |
                                 v
                    +------------------------+
                    | RESPONSE POST-PROCESS  |
                    | Schema / Safety Checks |
                    | Grounding / Citations  |
                    | Business Rule Validation|
                    +-----------+------------+
                                |
                                v
                    +------------------------+
                    |    API RESPONSE        |
                    +------------------------+


       KNOWLEDGE, TOOLS AND DATA CONNECTED TO AI ORCHESTRATION
       -------------------------------------------------------

       +------------------+       +---------------------+
       | Document Sources | ----> | Ingestion Pipeline  |
       | PDFs / Web / DB  |       | Parse / Chunk       |
       +------------------+       | Clean / Embed       |
                                  +----------+----------+
                                             |
                                             v
                                  +---------------------+
                                  | Vector Database     |
                                  | + Metadata Store    |
                                  +----------+----------+
                                             |
                                             v
                                  +---------------------+
                                  | Retrieval / RAG     |
                                  | ACL Filter / Rerank |
                                  +----------+----------+
                                             |
                                  Context ---+
                                             |
       +------------------+                  |
       | Business Systems |                  |
       | CRM / ERP / APIs |                  |
       +--------+---------+                  |
                |                            |
                v                            v
       +------------------+        +---------------------+
       | Tools / MCP      | <----> | AI Application      |
       | Server & Clients |        | Orchestration       |
       +------------------+        +---------------------+


       CROSS-CUTTING PRODUCTION CAPABILITIES
       -------------------------------------

       +--------------------------------------------------+
       | Observability: Logs / Metrics / Traces           |
       | Evaluation: Quality / Groundedness / Regressions |
       | Security: Secrets / PII / Tenant Isolation       |
       | Reliability: Retries / Queues / Circuit Breakers |
       | Operations: CI/CD / Containers / Autoscaling     |
       | Governance: Audit / Cost / Model & Prompt Version|
       +--------------------------------------------------+
```

## 2. Understand the request flow

1. API Gateway — Protect the entry point

Authenticate users, authorize access, validate requests, and enforce rate limits.

2. AI Orchestration — Coordinate the work

Manage prompts, conversation context, retrieval, tools, model calls, and business workflow.

3. RAG and Tools — Bring trusted information

Retrieve authorized documents and call business APIs when current system data is needed.

4. Model Layer — Generate or reason

Route to an appropriate hosted or self-hosted model, with timeouts, cost controls, and fallbacks.

5. Validation and Observability — Check the outcome

Validate output, measure quality and latency, record failures, and track token usage and cost.

## 3. How the technologies fit together

| Layer                     | Example technologies                             |
| ------------------------- | ------------------------------------------------ |
| Web / mobile client       | React, Angular, mobile apps                      |
| API layer                 | ASP.NET Core, FastAPI, API Gateway               |
| AI orchestration          | Python, .NET, Semantic Kernel, LangGraph         |
| LLM serving               | Hosted model APIs, vLLM, Ollama                  |
| RAG and retrieval         | Embedding models, vector database, reranking     |
| Data and tools            | SQL, document storage, REST APIs, MCP            |
| Background work           | Queues, workers, scheduled jobs                  |
| Deployment                | Docker, Kubernetes, CI/CD                        |
| Monitoring and evaluation | OpenTelemetry, logs, traces, evaluation datasets |

These are examples, not a requirement to use every technology in one system.

## 4. Production design principles

- RAG answers: “What relevant information do we have?”
- Tool calling answers: “What can the application retrieve or do right now?”
- MCP answers: “How can an AI application discover and communicate with compatible tools and resources?”
- API Gateway answers: “Who can access the application, and under what limits?”
- AI Gateway answers: “Which model should handle this request, and how do we manage model-specific routing, cost, and reliability?”

An MCP server does not replace your API gateway, authorization system, or business logic. Tool execution still needs permission checks.

## 5. Transflower Mentor takeaway

```
AI DEMO
  |
  v
Model + Prompt
  |
  v
AI APPLICATION
  |
  v
Production AI SYSTEM
  |
  +-- Secure API
  +-- Grounded Knowledge (RAG)
  +-- Authorized Tools (APIs / MCP)
  +-- Model Management
  +-- Evaluation & Guardrails
  +-- Observability & Cost Control
  +-- Deployment & Reliability
```

The real AI Engineering skill is not merely calling an LLM API. It is engineering the complete system around the model.