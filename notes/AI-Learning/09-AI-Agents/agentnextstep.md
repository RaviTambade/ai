# Transflower Mentor Classroom: Understanding AI Agents

From Local LLM → RAG → MCP → AI Agents

Imagine we are building TFLCoMentor, an AI-powered learning assistant for engineering students.

We have already learned three important concepts:

- Local LLM: The language model that understands questions and generates responses.
- RAG: The mechanism that retrieves relevant knowledge before the model answers.
- MCP: A standardized way for AI applications to discover and interact with tools and external resources.

Now comes the next question:

What happens when AI must do more than answer a question? What if it must understand a goal, choose tools, perform actions, check results, and decide what to do next?

That is where the concept of an AI Agent becomes important.

## 1. Begin with a real-life story

Imagine a student approaches a Transflower mentor.

Student: Sir, I want to become a .NET developer. Can you help me prepare for placements?

A traditional chatbot might explain C#, ASP.NET Core, SQL, and interview preparation.

But a mentor does more.

The mentor might:

1. Review the student's current skills.
2. Check previous assessment results.
3. Identify missing competencies.
4. Recommend a personalized learning plan.
5. Assign practice exercises.
6. Review progress and adjust the plan.

The mentor is not simply answering a question. The mentor is working toward a goal.

An AI Agent attempts to perform a similar workflow using a language model, tools, context, and a controlled execution loop.

## 2. What is an AI Agent?

An AI Agent is a software system that uses a model to reason about a goal, choose appropriate actions, use available tools, observe the results, and continue until the task is completed or it needs assistance.

An agent typically combines:

- A model (LLM)
- Instructions and a goal
- Context and, where appropriate, memory
- Tools and APIs
- An execution loop
- Stop conditions, validation, and safety controls

The important distinction is that an agent can choose its next action based on what happened in the previous step.

## 3. Understand the evolution: LLM → RAG → MCP → Agent

### Stage 1 — Local LLM

Question → Local LLM → Response

The model generates a response using its learned knowledge and the context provided to it.

### Stage 2 — RAG

Question → Retrieve Knowledge → LLM → Answer

The application retrieves relevant information from a knowledge base to ground the answer.

### Stage 3 — MCP and Tools

AI Application → MCP Client → MCP Server → Tools

The application can access external capabilities through a standardized tool interface.

### Stage 4 — AI Agent

Goal → Reason → Choose Tool → Observe Result           ↑                         |           +------ Decide Next <-----+

The agent decides which action to take next based on the task, context, and tool results.

These are complementary capabilities, not four mandatory stages of one architecture. An agent can use RAG and MCP, but it can also work without either.

## 4. The anatomy of an AI Agent

Let's look inside an agent.

```
                 +---------------------+
                 |        User         |
                 | "Prepare me for a   |
                 |  .NET placement"    |
                 +----------+----------+
                            |
                            v
                 +---------------------+
                 |    Agent Runtime    |
                 |                     |
                 | Goal + Instructions |
                 | Context + State     |
                 +----------+----------+
                            |
                            v
                 +---------------------+
                 |         LLM         |
                 | Decide Next Action  |
                 +----------+----------+
                            |
                            v
                 +---------------------+
                 |   Action Selection  |
                 +----------+----------+
                            |
                +-----------+-----------+
                |           |           |
                v           v           v
           +---------+ +---------+ +---------+
           | RAG     | | MCP     | | Other   |
           | Search  | | Tools   | | APIs    |
           +----+----+ +----+----+ +----+----+
                |           |           |
                +-----------+-----------+
                            |
                            v
                 +---------------------+
                 | Observe Tool Results|
                 | Validate the Results|
                 +----------+----------+
                            |
                            v
                 +---------------------+
                 | Continue or Finish? |
                 +----------+----------+
                            |
                  Continue  |  Finish
                     |      |
                     +--↺   v
                         Final Response
```

Mentor's observation: The LLM helps decide what to do. The runtime manages execution. Tools perform operations. The application enforces permissions and validates outcomes.

A model alone is not a complete agent.

## 5. Walk through a real TFLCoMentor example

The student asks:

“Analyze my assessment performance and create a two-week plan to improve my .NET backend skills.”

#### Step 1 — Understand the goal

Identify the need: analyze performance and produce a personalized plan.

#### Step 2 — Gather evidence

Retrieve authorized assessment results through TFLAssessment APIs and learning materials through RAG.

#### Step 3 — Analyze and plan

The model compares the available evidence with the required .NET competencies and proposes learning priorities.

#### Step 4 — Use tools

The agent may retrieve relevant exercises or request a draft study plan from a planning tool. MCP can provide the interface to those tools.

#### Step 5 — Validate and respond

Verify that the recommendations match the retrieved evidence, then present the two-week plan. Any action that changes official student records should require appropriate authorization and approval.

Notice that the agent does not invent assessment scores. It obtains them from the authorized business system and uses the LLM to help interpret the evidence.

## 6. AI Agent versus traditional chatbot

| Capability                      | Traditional chatbot   | Tool-using AI agent           |
| ------------------------------- | --------------------- | ----------------------------- |
| Answer questions                | Yes                   | Yes                           |
| Retrieve knowledge with RAG     | Optional              | Optional                      |
| Choose tools dynamically        | Usually limited       | Can do so                     |
| Execute multi-step tasks        | Usually limited       | Can do so                     |
| Adapt to tool results           | Limited or predefined | Can select subsequent actions |
| Need permissions and validation | Yes                   | Yes, especially for actions   |

Not every application that calls an API is an agent. A fixed workflow that always calls A, then B, then C is often better described as a deterministic workflow. An agent introduces model-guided action selection, within defined boundaries.

## 7. Build a simple agent in Python

Before adding frameworks, understand the underlying idea.

Here is simplified pseudocode for a tool-using agent:

```
def run_agent(goal, tools, model, max_steps=5):
    history = [{"role": "user", "content": goal}]

    for _ in range(max_steps):
        decision = model.decide(
            history=history,
            available_tools=tools
        )

        if decision.type == "final_answer":
            return decision.answer

        if decision.type == "tool_call":
            tool = tools.get(decision.name)

            if tool is None:
                history.append({
                    "role": "tool",
                    "content": "Unknown tool"
                })
                continue

            result = tool.execute(decision.arguments)

            history.append({
                "role": "tool",
                "content": str(result)
            })

    return "Stopped: step limit reached."
```

This illustrates the loop, not production-ready code. A real implementation must also validate tool arguments, enforce access controls, handle failures, limit resource use, and use the model provider's actual tool-calling interface.

The essential idea is:

Decide → Act → Observe → Decide again.

## 8. Where MCP fits into the architecture

MCP is not the agent itself. It provides a standardized protocol for exposing tools and resources to an AI application.

```
+---------------------------------------+
|          AI Agent Application         |
|                                       |
|  +---------------+  +--------------+  |
|  | Local / Cloud |  | Agent Runtime|  |
|  | LLM           |  | State & Loop |  |
|  +---------------+  +------+-------+  |
|                             |         |
|                       MCP Client      |
+-----------------------------+---------+
                              |
                         MCP Protocol
                              |
               +--------------+-----------+
               |                          |
               v                          v
       +---------------+          +---------------+
       | MCP Server    |          | MCP Server    |
       | Learning Tools|          | Assessment    |
       +-------+-------+          +-------+-------+
               |                          |
               v                          v
          RAG / Search             Authorized APIs
```

The agent decides which available tool is appropriate. The MCP client communicates with MCP servers, which expose capabilities such as tools and resources. Those servers may call databases, search systems, or business APIs.

MCP does not automatically provide authorization, correctness, or safe agent behavior; those still need to be designed.

## 9. Mentor's takeaway

Remember these four ideas:

- LLM: Helps interpret information and decide what to do.
- RAG: Supplies relevant external knowledge.
- MCP: Standardizes access to tools and resources.
- AI Agent: Uses a model-guided execution loop to work toward a goal.

The journey from chatbot to agent is not simply about adding more intelligence. It is about giving a model controlled ways to interact with real systems, observe outcomes, and make subsequent decisions.

The Transflower principle:

An AI chatbot answers a question. An AI agent works toward a goal. A well-engineered AI agent does so with evidence, boundaries, and measurable outcomes.