# Transflower Mentor Analysis: AI Engineering Roadmap 2026

The most valuable idea in this roadmap is the progression from understanding LLMs → building AI applications → connecting tools and agents → deploying reliable production systems.


Mentor's principle: Don't learn AI engineering by collecting frameworks. Learn it by building systems, understanding their architecture, testing their behavior, and solving real business problems.

## 1. Understand the five learning pillars

1\. LLMs from scratch

Understand tokens, embeddings, transformers, attention, inference, context windows, and model limitations.

Outcome: Explain what happens when a model receives a prompt and generates a response.


2\. RAG, fine-tuning and evaluations

Learn document ingestion, chunking, embeddings, vector search, retrieval, grounded answers, evaluation datasets, and model adaptation.

Outcome: Build an AI assistant that uses trusted organizational knowledge.


3\. MCP, tool calling and protocols

Connect models to APIs, databases, files and external services through well-defined interfaces.

Outcome: Build an assistant that can retrieve actual policy information rather than inventing it.



4\. AI agents and agent engineering

Learn planning, tool selection, state, memory, workflow orchestration, error handling, and human approval.

Outcome: Automate a bounded business workflow with controlled permissions.

5\. Infrastructure and production

Learn model serving, deployment, gateways, caching, security, observability, latency, cost control, and scalability.

Outcome: Operate an AI application reliably, not just demonstrate it on a laptop.


## 2. The complete learning journey: foundations to production

The official AI Engineering from Scratch curriculum is broader than the five pillars in the post. Its 20 phases cover mathematics, machine learning, deep learning, vision, NLP, transformers, LLMs, agents, infrastructure, safety, and capstone projects.&#x20;



Stage 1 — Understand the intelligence

Phases 0–7 · Foundations

- Development tooling and mathematical foundations
- Machine learning and neural networks
- Computer vision, NLP, and speech
- Transformer architecture

Build: a small neural network, tokenizer, and attention mechanism.

Stage 2 — Understand and engineer LLMs

Phases 8–12 · Generative AI

- Generative AI and LLM internals
- Prompting, model inference, and LLM application engineering
- Multimodal systems

Build: a basic language model and an application using an existing LLM.

Stage 3 — Connect models to the real world

Phases 13–16 · Protocols and agents

- Tool calling and MCP
- Agent loops, planning, and execution
- Autonomous systems and multi-agent architectures

Build: an agent that invokes approved APIs and produces verifiable results.

Stage 4 — Ship reliable AI systems

Phases 17–19 · Production and capstones

- Infrastructure and production operations
- Ethics, alignment, and safety
- Integrated capstone projects

Build: a deployed AI service with tests, evaluation, access control, and monitoring.


## 3. The advanced topics that distinguish an AI engineer

The deep dives listed  are especially useful after students have built their first working AI application.

| Topic                 | What students should learn                                                                    |
| --------------------- | --------------------------------------------------------------------------------------------- |
| Context engineering   | Select and organize the right instructions, conversation history, and retrieved information   |
| Advanced RAG          | Hybrid search, reranking, metadata filters, retrieval evaluation, and citations               |
| Fine-tuning with LoRA | Adapt a model efficiently for a defined task and evaluate whether adaptation helps            |
| Build an MCP server   | Expose tools and resources through a standardized protocol with appropriate access controls   |
| AI gateways           | Centralize model routing, authentication, rate limits, usage tracking, and policy enforcement |

One important distinction to teach: RAG, fine-tuning, and context engineering solve different problems.

- RAG supplies relevant external knowledge.
- Fine-tuning changes model behavior through training.
- Context engineering decides what information and instructions the model receives at runtime.

## 4. Five projects I would assign to Transflower students

These projects turn the roadmap into demonstrable engineering skills.


Project 1 — Terminal Coding Agent

Intermediate

Build a Python agent that reads a task, selects approved tools, inspects files, and proposes code changes. Require human approval before executing risky commands.

Learn: agent loops, tool calling, permissions, and failure handling.



Project 2 — Production RAG Chatbot

Intermediate

Build an assistant that answers questions about Application Development using approved documents and returns relevant source citations.

Learn: ingestion, chunking, embeddings, retrieval, grounded generation, and evaluation.


Project 3 — Multi-Agent Software Team

Advanced

Coordinate planner, developer, and reviewer agents to complete a bounded software task, with tests and a human approval gate.

Learn: orchestration, shared state, evaluation, and coordination costs.


Project 4 — GitHub Issue-to-PR Agent

Advanced

Turn a GitHub issue into a proposed patch, run tests, and prepare a pull request for human review.

Learn: repository APIs, sandboxing, test execution, and approval workflows.


Project 5 — MCP Server with Registry

Advanced

Expose selected business APIs as discoverable tools, with schemas, authentication, validation, and usage logs.

Learn: protocol design, tool discovery, integration testing, and security boundaries.

## 5. Map the roadmap to a real Transflower project

### TFLCoMentor — AI-Powered Learning & Mentorship Architecture

Transflower Mentor principle: AI should help students understand, practice, and improve. But assessment results, student records, and placement decisions must come from authorized systems and verified evidence — not model-generated assumptions.

#### 1. TFLCoMentor AI application architecture

React Web Client — TFLCoMentor Portal

Student · Mentor · SME · Admin · Employer

Ask questions about skills, assessments, learning paths, and feedback

ASP.NET Core API Gateway / Backend

Authentication · Role-based authorization · Input validation · Rate limiting

AI Orchestration Layer

Prompt management · Context engineering · RAG · Tool selection · Response validation

Knowledge / RAG

Course notes, skill taxonomy, rubrics, learning resources, mentor-approved guidance

Business Tools / APIs

Assessment results, skill profiles, feedback, learning plans, placement eligibility

LLM + Validation + Observability

Grounded explanations · Evaluation · Audit logs · Monitoring · Feedback

Logical architecture; the AI components can be modules within the existing modular monolith rather than separate microservices.


#### 2. Map the architecture to TFLCoMentor modules

| Architecture component  | TFLCoMentor responsibility                                                    |
| ----------------------- | ----------------------------------------------------------------------------- |
| React web client        | Student, Mentor, SME, Admin, and Employer portals                             |
| ASP.NET Core backend    | API endpoints, authentication, authorization, and orchestration entry points  |
| Skill Taxonomy          | Skill definitions, competencies, proficiency levels, and relationships        |
| Evaluation Content      | Questions, rubrics, assessment criteria, and learning material                |
| Assessment Orchestrator | Assessment lifecycle, scheduling, and coordination                            |
| Evaluation              | Assessment execution, scoring rules, and validated results                    |
| Insight Core            | Skill-gap analysis, trends, and evidence-based insights                       |
| Growth Engine           | Personalized practice plans, recommendations, and progress tracking           |
| AI orchestration        | Coordinates RAG retrieval, approved tools, LLM calls, and response validation |
| Observability           | AI traces, evaluation metrics, latency, token cost, and audit events          |

The AI layer complements the existing product modules. It should not replace their business responsibilities.


#### 3. Example: A student asks a question

Student asks:

> “I scored 65% in my Python assessment. What should I learn next to become job-ready?”

Step 1 — Understand the question

The AI orchestration layer identifies that the student wants personalized learning guidance.

Step 2 — Verify identity and permissions

The backend establishes the student's identity and checks which assessment records they are allowed to access.

Step 3 — Retrieve actual evidence

An authorized Evaluation API retrieves the student's recorded score and skill-level results. RAG retrieves the relevant rubric and learning resources.

Step 4 — Generate a grounded recommendation

The LLM explains the evidence and suggests suitable practice activities based on verified skill gaps.

Step 5 — Validate and respond

The system checks that recommendations follow the learning rules, references suitable material, and distinguishes recorded facts from suggestions.

Example response:

> Your recorded Python assessment score is 65%. Based on the skill-level results, your next learning activities should focus on the areas where you lost marks. Start with targeted exercises, implement a small project, and take a follow-up assessment to measure improvement.

The actual skill gaps must come from the recorded assessment data; the AI must not infer them from the overall score alone.


#### 4. RAG versus business APIs in TFLCoMentor

| Question                                             | Correct source                                              |
| ---------------------------------------------------- | ----------------------------------------------------------- |
| “Explain Python inheritance.”                        | RAG over approved learning resources                        |
| “What skills does the Python backend track include?” | Skill Taxonomy API and relevant RAG content                 |
| “What was my last assessment score?”                 | Authorized Evaluation API                                   |
| “Which skills need improvement?”                     | Evaluation results and Insight Core                         |
| “Suggest my next learning activities.”               | Growth Engine rules and learning resources, supported by AI |
| “Am I eligible for placement?”                       | Authoritative placement rules and validated records         |

Remember: RAG answers what do our approved learning resources say? Business APIs answer what is actually recorded in TFLCoMentor?


#### 5. Non-negotiable AI engineering rules

- Authorization first: Never rely on the LLM to decide whether a student can access another student's records.
- Verified facts: Scores, attendance, skill profiles, and placement status must come from trusted backend services.
- Grounded answers: Use approved learning resources and clearly identify when evidence is missing.
- Human mentorship: AI can recommend learning activities, but consequential assessment or placement decisions should follow validated rules and appropriate human review.
- Measurable quality: Evaluate recommendation relevance, factual accuracy, access-control behavior, latency, and cost.
- Auditable behavior: Record appropriate request, tool-call, and decision metadata without unnecessarily logging passwords, tokens, or sensitive student information.

The result is a TFLCoMentor platform in which AI provides explanations and guidance, domain modules provide evidence, and mentors guide growth.



#### 6. A practical 12-week learning plan

This is my suggested implementation plan, not the official course schedule.

##### Learning tracker

0 of 6 milestones

Weeks 1–2: Python, APIs, JSON, Git, and AI fundamentals

Deliverable: Working API integrated with an LLM

Weeks 3–4: Tokens, embeddings, prompting, and model behavior

Deliverable: Prompt experiments and a small model-internals lab

Weeks 5–6: RAG, vector search, and evaluation

Deliverable: Insurance document assistant with source citations

Weeks 7–8: Tool calling, MCP, and secure integrations

Deliverable: Assistant that calls approved insurance APIs

Weeks 9–10: Agent workflows, state, and guardrails

Deliverable: Bounded insurance support workflow with human approval

Weeks 11–12: Deployment, observability, security, and capstone

Deliverable: Deployed application with tests, evaluation, and monitoring



Final mentor message: AI engineering is not just prompt engineering. It is software engineering combined with model understanding, data retrieval, evaluation, protocols, security, and production operations.

For Transflower students, the target should be simple: understand the concept, build a working component, test its failure cases, integrate it into a real application, and demonstrate the result. That is how a learning roadmap becomes employable engineering skill.

