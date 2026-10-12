# Transflower Mentor Analysis: AI Engineering Roadmap 2026

The most valuable idea in this roadmap is the progression from understanding LLMs → building AI applications → connecting tools and agents → deploying reliable production systems.


Mentor's principle: Don't learn AI engineering by collecting frameworks. Learn it by building systems, understanding their architecture, testing their behavior, and solving real business problems.

## 1. Understand the five learning pillars

[How Transformer LLMs Generate Text: One Token at a Time | by alex buzunov | CodeX | Medium](https://images.openai.com/static-rsc-4/lJj5gV5bdveaeulut26-trcZIAevb3fupjSD2cNqyvrf9FMx0iGscsMCbupaqE7Clyl5aO_Cp3olJQT1hreBBv_9JqCpCtLmm_2j53PQFkCy43iIId-v_BTX7sBVN0mAioRt4SY5fgfiNfqlsJlYX_YVvvfc-KDbmooS8ikogio?purpose=inline)

1\. LLMs from scratch

Understand tokens, embeddings, transformers, attention, inference, context windows, and model limitations.

Outcome: Explain what happens when a model receives a prompt and generates a response.

[Retrieval-Augmented Generation (RAG) in GCP | by Javier Fernandez | Medium](https://images.openai.com/static-rsc-4/8JhvM8XaqUmZBxDF13gyaSibWOkcC89y706U0TgzifDhQmcOnkA1aybVE2kLW9ulR-h0XlKgZLLuwd5AmV2wDS3KgpDZCfgOBUbTzBMNA-J6SnRTsAgbwF0RYbJ9WXw1FN-mkfxaUgzTRow3tcL2DRa7SYb96VYax2r57rmIJw8?purpose=inline)

2\. RAG, fine-tuning and evaluations

Learn document ingestion, chunking, embeddings, vector search, retrieval, grounded answers, evaluation datasets, and model adaptation.

Outcome: Build an AI assistant that uses trusted organizational knowledge.

[Model Context Protocol (MCP) Fundamentals | by Sadik Shaikh | Medium](https://images.openai.com/static-rsc-4/7akkLnf3A_YEx-HGiqCKgpbpIReqt4SwARMDKmpzKmh6T1qellxbW6S1GTJu4KhORdrR2oHY16phUjq0mj_bukWkexB8vtFhzqkG0W7PBTMRgW5mPBaKA7oc3Xu4anZ3-kU3-g4zYsqyGR31OXU_oxvdwMlag6C9KK2U0GbeWOQ?purpose=inline)

3\. MCP, tool calling and protocols

Connect models to APIs, databases, files and external services through well-defined interfaces.

Outcome: Build an assistant that can retrieve actual policy information rather than inventing it.

[Agentic AI Architecture: Defining the Autonomous Enterprise | Unstructured](https://images.openai.com/static-rsc-4/jvryOKKi1N3ArvGBiecqrq9ZSOkeY7DQ2FqnHUgY7DrxBwHETLclygd3pBfHR3Sv2b9PvskjMd-EVvtx5Ir1lmoogf80Bb-xigKgHKnJp79TK8-lXunnKzvczJr_3DYQ4TJQ-Pm-bnymfT5-klw-R0hu1fFIPY5zYOOzfbWSVXs?purpose=inline)

4\. AI agents and agent engineering

Learn planning, tool selection, state, memory, workflow orchestration, error handling, and human approval.

Outcome: Automate a bounded business workflow with controlled permissions.

[The Real Stack Behind AI Agents in Production — MCP, Kubernetes, and What Nobody Tells You - DEV Community](https://images.openai.com/static-rsc-4/4zatSEU65_gyg-j_QSPaA3UQYR2nVcb6TD325hUELgVhVG9115xTxzVKYv8gkb-ZZSR9S_UlQtftDXBGWwCxAttVvwpjVgycfT6BULsdGYsv3W2djL-NCu_mJkeGl2xSXoUBaPTQRwqgJ2Pqn2VvkxuMqrR28HKy1_oNdbZ1aFY?purpose=inline)

5\. Infrastructure and production

Learn model serving, deployment, gateways, caching, security, observability, latency, cost control, and scalability.

Outcome: Operate an AI application reliably, not just demonstrate it on a laptop.

## 2. The complete learning journey: foundations to production

The official AI Engineering from Scratch curriculum is broader than the five pillars in the post. Its 20 phases cover mathematics, machine learning, deep learning, vision, NLP, transformers, LLMs, agents, infrastructure, safety, and capstone projects.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub

+1

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

Phase groupings follow the official curriculum's published phase structure.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub

+1


## 3. The advanced topics that distinguish an AI engineer

The deep dives listed in your post are especially useful after students have built their first working AI application.

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

[Reduce iOS Development Time by 60% with Claude Code | by Osman Demiröz | Mar, 2026 | Medium](https://images.openai.com/static-rsc-4/__QlMX-Gt1xdjT6Kqdfv_TKf3b2_9YTp9NfKHAGvV-pHO8ZSPprqRjYLGKKIJOdGj_8i76-dGuZqNAmT4cvEHz8ANMUdXjr1zurAF0cQRcEmzi-rJ-PKkvKgCvM4hogRcz9IRsrNK9jDSZOJCv8m5-PtQukmuhOHOG0u09n0pqw?purpose=inline)

Project 1 — Terminal Coding Agent

Intermediate

Build a Python agent that reads a task, selects approved tools, inspects files, and proposes code changes. Require human approval before executing risky commands.

Learn: agent loops, tool calling, permissions, and failure handling.

[RAG Chatbot: What It Is, How It Works, and Why It Matters](https://images.openai.com/static-rsc-4/CCAa-9V8h0M-62LbmX4N-xe4ezCLGsqU6nAP5_vOJavePM3YgmokkU1_lmrZAJ7JHUOMQ4IIN2K2wv8dcs94iryhAq1nCeg_yZrOIHcbvfcwG3zhytnSrEokkgn07N8iqmKG5sCCouBwQP1OvWrKWEpEVMsdh6HqUnWfuRgB2tQ?purpose=inline)

Project 2 — Production RAG Chatbot

Intermediate

Build an assistant that answers questions about insurance policies using approved documents and returns relevant source citations.

Learn: ingestion, chunking, embeddings, retrieval, grounded generation, and evaluation.

[Are you building a multi-agent AI or a collaborative AI system | by Chetna Khanna | Data Science Collective | Mar, 2026 | Medium](https://images.openai.com/static-rsc-4/MfQdVyNMs7E1FhbbMaZAHhNrnBeSmDMLMCjU7EUNLVinyyEr-leoaTkmIALgxuQQeLh_s9GrDkgwTSQPdc-1IknbTa74M536mWhd0MgImoD7Hf9NnHyS7lPMr3EIQqV_BYNbQE72frlA4APnpCS_IeCrreZDwSuMYiI388G9b1g?purpose=inline)

Project 3 — Multi-Agent Software Team

Advanced

Coordinate planner, developer, and reviewer agents to complete a bounded software task, with tests and a human approval gate.

Learn: orchestration, shared state, evaluation, and coordination costs.

[Build an AI-powered Golang code review agent with CircleCI and GitHub webhooks - CircleCI](https://images.openai.com/static-rsc-4/SQjhp67FEjmVJgf8D-Aqhux_FIfkk_FDmqQ_kWnngeeNQlZBmuXcW2GT6n0av7NsEu9qYqjP4NI_qlWiU3UXUEHztfCHiHxodDtvmSeefXA5e6WZylAc2232K13toffbivTcKZZBFPnbUO11a9kiUJiLopt2Sc_MudUCDooleD8?purpose=inline)

Project 4 — GitHub Issue-to-PR Agent

Advanced

Turn a GitHub issue into a proposed patch, run tests, and prepare a pull request for human review.

Learn: repository APIs, sandboxing, test execution, and approval workflows.

[When AI Tools Turn Against You: Operationalizing MCP Server Security with the Splunk MCP TA | Splunk](https://images.openai.com/static-rsc-4/oaHbLWjGu8DaWKsX_lKOr-wnpfA4FJjiGxK6Xk2qHPIWqWXWoM0epxnZYegCUxd5eiXcdUGir43hvVXPiQXFCLcqCOndPJU0WYOKzQy8uPzvTjQIUbDmD6UXQcHLJfnUaV-ACu7yn1fFtDx9sYEwXCFKFYcYJQu8O3XfGaQOshw?purpose=inline)

Project 5 — MCP Server with Registry

Advanced

Expose selected business APIs as discoverable tools, with schemas, authentication, validation, and usage logs.

Learn: protocol design, tool discovery, integration testing, and security boundaries.

## 5. Map the roadmap to a real Transflower project

Use the TFLInsurance API as the running example. Students already understand the familiar application layers; AI becomes an extension of that engineering foundation rather than a replacement for it.

React / Web Client

Customer asks a question about an insurance policy

ASP.NET Core or FastAPI

Authentication · API validation · Rate limits

AI Orchestration Layer

Prompt and context management · RAG · Tool selection

RAG

Insurance documents and policy terms

Business tools

Authorized policy lookup APIs and SQL

LLM + Validation + Observability

Grounded response · Audit logs · Evaluation · Monitoring

For example, a customer asks, “What is the maturity period of my policy?”

- RAG can explain the relevant terms from policy documents.
- A business API can retrieve the customer's actual policy details.
- The LLM can present the result in understandable language.
- Authorization and business rules must decide which records the customer is allowed to access.

The model should not invent policy facts or independently authorize access to private customer records.

## 6. A practical 12-week learning plan

This is my suggested implementation plan, not the official course schedule.

## Learning tracker

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

## 7. Where to start

Official GitHub repository

Source code, lesson folders, and project curriculum.

[Explore the repository](https://github.com/rohitg00/ai-engineering-from-scratch)

Official learning website

Browse the 20-phase curriculum and choose a learning path.

[Explore the curriculum](https://aiengineeringfromscratch.com/)

The published website currently describes the curriculum as 528 lessons across 20 phases, with Python, TypeScript, Rust, and Julia examples. The repository is the best place to check the current lesson content because counts and materials can change.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://aiengineeringfromscratch.com\&sz=32)

Free AI Engineering Course

+1

Final mentor message: AI engineering is not just prompt engineering. It is software engineering combined with model understanding, data retrieval, evaluation, protocols, security, and production operations.

For Transflower students, the target should be simple: understand the concept, build a working component, test its failure cases, integrate it into a real application, and demonstrate the result. That is how a learning roadmap becomes employable engineering skill.