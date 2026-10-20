# MCP (Model Context Protocol) 🌻

MCP is a standard way for AI applications to connect LLMs with external tools, data sources, and business systems.

Imagine you are building an AI assistant for Transflower's TFLAssessment platform.

A student asks:

"Sir, show me my latest assessment results and suggest what I should learn next."

An LLM can understand the question and generate a response. But how will it access the student's actual assessment results?

It needs a way to connect with the TFLAssessment APIs.

That is where MCP becomes useful.

## 1. What is MCP?

MCP stands for Model Context Protocol. It is an open protocol that standardizes how AI applications discover and use external capabilities.

Think of MCP as a common connector standard between AI applications and the systems they need to work with.

Without a standard, every AI application might need custom integration code for every tool.

With MCP, an application can connect to compatible MCP servers through a common protocol.

## 2. MCP Architecture

Student / User

"Show my assessment results"

AI Host Application

CoMentor chatbot or AI-enabled application

MCP Client

Communicates with an MCP server using the MCP protocol

MCP Server

Exposes approved tools, resources, and prompts

Business APIs and Data

TFLAssessment API · Student profile · Assessment records

The important distinction: the LLM reasons about the request, the MCP client communicates with the MCP server, and the server exposes capabilities that can access authorized systems.

MCP does not replace your backend APIs, database, or authentication system.

## 3. The three core MCP concepts

1\. Tools — Actions the AI can request

Examples:

- `get_my_assessment_results()`
- `get_skill_gaps()`
- `get_learning_recommendations()`

Tools allow the model to request an operation through the MCP client and server.

2\. Resources — Context the application can access

Examples:

- Approved course documentation
- Skill taxonomy
- Learning material
- Assessment guidelines

Resources provide information to an AI application in a standardized way.

3\. Prompts — Reusable interaction templates

Examples:

- Explain a student's skill gaps
- Prepare an assessment review
- Generate a learning plan

Prompts provide reusable templates that a compatible client can discover and use.

## 4. How an MCP tool call works

Suppose the student asks the chatbot for assessment results.

1. The student asks a question in the React chatbot.
2. The AI application sends the question and available tool definitions to the model.
3. The model decides that it needs assessment data and requests an appropriate tool call.
4. The MCP client sends the tool request to the MCP server.
5. The MCP server validates the request and calls the authorized TFLAssessment API.
6. The tool result is returned to the AI application, which provides the relevant result to the model.
7. The model generates a response grounded in the retrieved data.

For example, the final answer might say:

"Your latest assessment score is 78%. Your main improvement area is data structures. Practise arrays, linked lists, and problem-solving exercises next."

The score must come from the actual assessment API response, not from the LLM's imagination.

## 5. MCP versus a traditional REST API

| Feature                | REST API                                | MCP                                                    |
| ---------------------- | --------------------------------------- | ------------------------------------------------------ |
| Primary purpose        | Expose application operations and data  | Standardize AI application access to tools and context |
| Interface              | Resources and HTTP methods              | Tools, resources, prompts and protocol messages        |
| Discovery              | API documentation or specifications     | MCP capability discovery                               |
| Typical consumer       | Web apps, mobile apps, backend services | AI applications and MCP clients                        |
| Replaces the database? | No                                      | No                                                     |
| Can use existing APIs? | It is itself an API approach            | Yes, an MCP server can call REST APIs                  |

Mentor's analogy: REST APIs are like individual service counters in an office. MCP is a standardized way for an AI assistant to discover and interact with those counters.

MCP does not make the underlying service secure automatically. The server must still enforce authentication, authorization, validation, and appropriate access controls.

## 6. Build an MCP project at Transflower

A practical learning project would connect TFLCoMentor to TFLAssessment.

```
React Chatbot
     |
     v
CoMentor AI Backend
     |
     +---- LLM
     |
     +---- MCP Client
                |
                v
          TFLAssessment
           MCP Server
                |
                v
       Assessment REST APIs
                |
                v
           MySQL Database
```

Suggested tools for the first version:

- `get_my_assessment_results`
- `get_my_skill_gaps`
- `get_available_learning_resources`

Start with read-only operations. Derive the student's identity from a trusted authenticated session, rather than trusting a student ID supplied in the prompt. Add approval and audit controls before introducing tools that modify records or trigger consequential actions.

### Suggested implementation stack

- Frontend: React
- AI backend: Python with FastAPI, or ASP.NET Core
- MCP: An MCP-compatible SDK for the chosen language
- Business layer: Existing TFLAssessment REST APIs
- Database: MySQL
- Security: Authentication, authorization and audit logging
- Testing: Tool-call tests, API integration tests and AI response evaluation

## 7. When should you use MCP?

Use MCP when you want to expose business capabilities to compatible AI applications through a standardized interface, especially when several tools or data sources need to be integrated.

You may not need MCP for a simple chatbot that only calls one model and does not use external tools. A direct API integration can be simpler for that case.

Remember the distinction:

- LLM = understands and generates language.
- Tool calling = lets a model request an action.
- MCP = standardizes how AI applications discover and communicate with tools and context.
- REST API = exposes business functionality.
- Database = stores persistent data.

Transflower Mentor's takeaway: Don't teach MCP as just another framework. Teach it as an integration protocol that helps connect AI applications with real software systems. The engineering challenge remains designing the right tools, enforcing permissions, validating results, and building a reliable end-to-end solution.