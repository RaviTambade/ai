# How to Build a Production-Ready AI Agent in 7 Stages

Learning from TFLCoMentor Implementation

Theme: From AI Agent Prototype to Enterprise-Grade AI Product

Students, today we are going to discuss something very important. Everybody is excited about building AI agents. With an LLM, a prompt and a few tools, we can quickly build an agent that answers questions, retrieves information, calls APIs and performs tasks. We can demonstrate it in a classroom. We can show it to a client. We can even publish a video demonstrating its capabilities. 

But I have one question.

- Can you trust that agent with the real business operations of an organization?
- Can it handle 10,000 students?
- Can it protect student information?
- Can it recover when an API fails?
- Can it distinguish between a student's request and an unauthorized operation?
- Can it prove that an operation was successfully completed?

That is the difference between building an AI demo and engineering a production-ready AI product. At Transflower Learning, our TFLCoMentor implementation gives us a practical opportunity to understand these engineering challenges. Let's explore the seven stages.

# 1. DISCOVER – Problem Definition and Success Criteria

Stage 1 – Understand the business

Mentor: Imagine Transflower wants to build an AI-powered student mentoring assistant. What problem are we solving?

Student: Sir, students need guidance about programming, assessments, skill development and placement preparation.

Mentor: Correct. But can we simply say that we are building an AI chatbot for students? No!

We must identify the actual business problem.

### TFLCoMentor use case

A student wants to understand their current employability readiness. The system should:

1. Retrieve the student's learning profile.
2. Understand completed courses.
3. Retrieve assessment results.
4. Identify technical skill gaps.
5. Recommend improvement activities.
6. Generate a personalized learning roadmap.
7. Track progress with mentor involvement.

### Define measurable KPIs

| KPI                      | What we measure                               |
| ------------------------ | --------------------------------------------- |
| Assessment accuracy      | Correct interpretation of assessment evidence |
| Recommendation relevance | Whether recommendations match identified gaps |
| Grounded response rate   | Responses supported by authorized sources     |
| Task completion rate     | Successfully verified business operations     |
| Unauthorized action rate | Actions rejected by security controls         |
| Response latency         | Time taken to deliver guidance                |
| Cost per task            | LLM and infrastructure expenditure            |

We should also define risks.

- Student data privacy.
- Unauthorized assessment access.
- Incorrect skill-gap recommendations.
- Biased placement recommendations.
- Hallucinated course information.
- Accidental modification of student records.

Mentor's lesson: Never begin an AI project by asking which LLM to use. Begin by asking which business problem needs to be solved.

# 2. DESIGN – Agent Architecture

Stage 2 – Think like a system architect

Now that we understand the business problem, let's design the solution. Students, suppose we have the following request:

"Evaluate my current Python skills and recommend what I should learn next."

Should the LLM directly access our MySQL database?

Students: No, Sir!

Mentor: Correct. We need an architecture that separates intelligence from business responsibilities.

### Illustrative TFLCoMentor enterprise architecture

```
          STUDENT / MENTOR / SME / ADMIN
                       |
                       v
              React Web Application
                 Chat Interface
                       |
                       v
             ASP.NET Core Backend
                API Gateway
             JWT | RBAC | Validation
                       |
                       v
             AI Orchestration Layer
              Prompt Management
              Context Management
              Workflow Management
                       |
          +------------+------------+
          |            |            |
          v            v            v
         LLM          RAG        MCP Client
          |            |            |
          |            v            v
          |       Knowledge      MCP Servers
          |       Repository         |
          |                     Business APIs
          |                          |
          +------------+-------------+
                       |
                       v
                Verification Layer
                       |
                       v
                Business Services
                       |
                       v
                  MySQL DB
                       |
                       v
                Audit / Logging
```

This is an illustrative logical architecture, not a claim that every component is already implemented in TFLCoMentor.

### Choosing an agent pattern

Two useful patterns are:

A. ReAct – Reason and Act

The agent observes context, decides which action is needed, calls a tool and evaluates the result.

```
Question
   |
   v
Reason
   |
   v
Select Tool
   |
   v
Execute Action
   |
   v
Observe Result
   |
   v
Reason Again
```

Useful for bounded, interactive tasks.

B. Plan-Execute

The agent first creates a plan and then executes the planned operations.

```
       Student Goal
            |
            v
       Planning Agent
            |
            v
      Execution Plan
            |
     +------+------+------+
     |      |      |      |
     v      v      v      v
   Task1  Task2  Task3  Task4
     |      |      |      |
     +------+------+------+
            |
            v
        Verification
            |
            v
       Final Outcome
```

Useful for multi-step workflows such as skill-gap analysis and roadmap generation. My recommendation for TFLCoMentor is to begin with deterministic workflows for important business operations and introduce bounded agentic decision-making where flexibility genuinely adds value.

Remember: Not every workflow needs an autonomous agent.

# 3. CONNECT – Tools, APIs and Memory

Stage 3 – Give the agent controlled capabilities

Mentor: An intelligent employee without access to organizational systems cannot perform organizational work. Similarly, an AI agent needs tools to interact with business applications. In TFLCoMentor, our business capabilities are distributed across different modules.

| Module                  | Responsibility                                 |
| ----------------------- | ---------------------------------------------- |
| Skill Taxonomy          | Manage technical skills and competencies       |
| Evaluation Content      | Manage assessment questions and content        |
| Assessment Orchestrator | Coordinate assessment workflows                |
| Evaluation              | Evaluate student responses                     |
| Insight Core            | Analyze assessment and performance information |
| Growth Engine           | Recommend learning and improvement activities  |
| Membership              | Manage user identity and access                |

Our implementation context includes Java, .NET, Node.js, React and MySQL. The AI orchestration layer must interact with these capabilities through controlled interfaces.

### How MCP fits into the architecture

```
              LLM
               |
               v
          MCP Client
               |
        +------+------+
        |             |
        v             v
   MCP Server 1   MCP Server 2
        |             |
        v             v
   Student APIs   Assessment APIs
        |             |
        +------+------+
               |
               v
         Business Data
```

For example, an MCP server might expose tools such as:

```
get_student_profile(student_id)

get_assessment_results(student_id)

get_student_skills(student_id)

get_learning_resources(skill_id)

create_learning_plan(student_id, plan)

get_learning_plan(plan_id)
```

These are illustrative tool contracts.

### What about memory?

We must distinguish three things:

| Type                 | Example                                          |
| -------------------- | ------------------------------------------------ |
| Conversation context | Current discussion with the student              |
| Persistent memory    | Previously saved learning preferences and goals  |
| Business records     | Official assessment results and student profiles |

An LLM conversation history is not an authoritative student database.

Security principle: Least privilege

A student should access their own authorized information.

A mentor should access information permitted by their assigned responsibilities.

An administrator may have broader permissions according to organizational policy.

Never assume that because the LLM requests an operation, the operation is authorized.

# 4. PROMPT – Agent Instructions and Tool Contracts

Stage 4 – Define intelligent behavior

Now let's discuss prompt engineering.

Mentor: Students, imagine you hire a new mentor. Would you simply tell that mentor, "Guide students"? Or would you explain the responsibilities, rules, expected behavior and reporting process?

Student: Sir, we should provide clear instructions.

Mentor: Exactly!

An AI agent also needs a well-defined role and operating contract.

### Example: TFLCoMentor system prompt

```
ROLE:
You are TFLCoMentor, an AI-enabled
student mentoring assistant.

OBJECTIVE:
Help students improve their technical
skills and employability.

RESPONSIBILITIES:

1. Understand the student's learning goal.
2. Retrieve authorized student context.
3. Analyze assessment evidence.
4. Identify skill gaps.
5. Recommend relevant learning resources.
6. Generate actionable learning plans.

CONSTRAINTS:

1. Never invent assessment scores.
2. Never expose another student's data.
3. Never modify official assessment records
   without an authorized workflow.
4. Use approved business tools.
5. Verify important operations.
6. Escalate uncertain or sensitive decisions
   to a human mentor.

OUTPUT:
Provide structured, actionable guidance.
Clearly distinguish facts from recommendations.
```

### Structured tool contracts

An agent should not call tools with arbitrary arguments.

For example:

```
{
  "tool": "get_assessment_results",
  "arguments": {
    "student_id": "STU-101"
  }
}
```

The tool schema must define:

- Required parameters.
- Data types.
- Validation rules.
- Authorization requirements.
- Expected response structure.
- Error conditions.

We should also use structured outputs wherever possible.

For example:

```
{
  "student_id": "STU-101",
  "identified_gaps": [
    "Python OOP",
    "REST API Testing"
  ],
  "recommendations": [
    "Complete OOP exercises",
    "Build a FastAPI project"
  ],
  "requires_mentor_review": true
}
```

Mentor's lesson:  A prompt is an instruction contract, not a security boundary. Authorization and validation must be enforced by application code.

# 5. GROUND – RAG and Knowledge Engineering

Stage 5 – Connect AI with trusted knowledge

This is where our knowledge engineering becomes important. Imagine a student asks: "Sir, what is the minimum score required for placement eligibility in our program?" Should the LLM generate a number based on its general knowledge? Absolutely not! It must retrieve the approved organizational policy.

### What knowledge should TFLCoMentor use?

| Knowledge source      | Example                            |
| --------------------- | ---------------------------------- |
| Course documentation  | Python, Java, .NET, React          |
| Learning material     | Notes, assignments, tutorials      |
| Skill taxonomy        | Technical competency definitions   |
| Assessment rubrics    | Evaluation criteria                |
| Mentor guidance       | Learning recommendations           |
| Program policies      | Placement eligibility rules        |
| Project documentation | Project expectations and standards |

### RAG architecture

```
        Knowledge Documents
                |
                v
          Data Ingestion
                |
                v
          Text Extraction
                |
                v
             Chunking
                |
                v
            Embeddings
                |
                v
         Vector Database
                |
                |
Student Question
       |
       v
Query Embedding
       |
       v
Hybrid Retrieval
       |
       v
Relevant Documents
       |
       v
Permission Filtering
       |
       v
Context Builder
       |
       v
      LLM
       |
       v
Grounded Response
```

### Technologies students should explore

| Responsibility   | Technologies                              |
| ---------------- | ----------------------------------------- |
| Embeddings       | OpenAI embeddings, local embedding models |
| Vector storage   | FAISS, Chroma, Pinecone                   |
| Orchestration    | LangChain, LangGraph                      |
| Hybrid retrieval | Keyword + vector search                   |
| Evaluation       | Ragas, DeepEval                           |
| Observability    | Langfuse, LangSmith                       |

### Important production considerations

RAG is not simply about storing documents in a vector database. We must consider:

1. Document versioning.
2. Chunk size and overlap.
3. Retrieval relevance.
4. Metadata filtering.
5. Source permissions.
6. Stale information.
7. Citation and provenance.
8. Prompt injection through retrieved documents.

For example, a student must not retrieve confidential mentor notes merely because the vector search finds them relevant.

Mentor's lesson:

The quality of AI guidance depends on the quality, relevance and authorization of the information supplied to the model.

# 6. TEST – Evaluation, Reliability and Guardrails

Stage 6 – Test the agent like a software product

Students, when we develop a traditional application, do we release it without testing?

Students: No, Sir!

Mentor: Then why should we release an AI application without testing? This is one of the biggest mistakes in AI development. Traditional software testing checks whether predefined inputs produce expected outputs.

AI systems introduce additional challenges:

- Non-deterministic responses.
- Hallucinations.
- Tool-selection errors.
- Context contamination.
- Prompt injection.
- Inconsistent recommendations.

We need a broader evaluation strategy.

### TFLCoMentor testing matrix

| Testing category    | What to validate                            |
| ------------------- | ------------------------------------------- |
| Functional testing  | Correct business workflow                   |
| Prompt testing      | Correct instructions and response structure |
| RAG testing         | Relevant and authorized retrieval           |
| Tool testing        | Correct API selection and arguments         |
| Security testing    | RBAC, injection and data isolation          |
| Reliability testing | Retries, timeouts and recovery              |
| Performance testing | Concurrent requests and latency             |
| Cost testing        | Token usage and execution cost              |
| Human evaluation    | Quality of mentoring recommendations        |

### Example: AI agent evaluation

Suppose we ask the agent: "Prepare my Python improvement plan."

We can evaluate it using the following criteria.

| Evaluation metric       | Expected behavior                    |
| ----------------------- | ------------------------------------ |
| Context accuracy        | Uses actual student records          |
| Skill-gap accuracy      | Identifies evidence-supported gaps   |
| Recommendation quality  | Suggests relevant activities         |
| Tool correctness        | Calls appropriate APIs               |
| Authorization           | Does not access unauthorized records |
| Completion verification | Confirms saved plan                  |
| Transparency            | Reports failures honestly            |

### Failure injection testing

This is particularly important for Agentic AI.

```
             AI Agent
                |
                v
          MCP Tool Call
                |
        +-------+-------+
        |       |       |
        v       v       v
      Success Timeout  Error
        |       |       |
        v       v       v
     Verify   Retry   Handle
     Result   Safely  Failure
        |       |       |
        +-------+-------+
                |
                v
          Final Status
```

Test the following situations:

- Database unavailable.
- MCP server disconnected.
- Invalid tool arguments.
- LLM timeout.
- Duplicate API request.
- Unauthorized student access.
- Incorrect retrieved information.
- Agent stuck in an execution loop.

### A critical concept: Evaluation-driven development

Maintain a collection of test cases.

Whenever we change:

- LLM model.
- System prompt.
- Embedding model.
- Retrieval strategy.
- Tool schema.
- Agent workflow.

Run the evaluation suite again. A model update should not silently degrade our mentoring quality.

Mentor's lesson: A successful demonstration is not evidence of production reliability. Repeatable evaluation provides evidence.

# 7. DEPLOY – LLMOps and Observability

Stage 7 – Operate the AI system responsibly

We have designed, implemented and tested our agent. Now comes deployment.

Mentor: Students, suppose TFLCoMentor works perfectly on our development machines. What happens when 500 students access it simultaneously?

Student: We need infrastructure capable of handling concurrent requests.

Mentor: Correct. But scaling is only one part of production readiness.

We also need monitoring, logging, versioning, security and recovery.

### Production deployment architecture

```
             Users
               |
               v
          React Client
               |
               v
        ASP.NET Core APIs
               |
               v
       AI Orchestration
               |
       +-------+-------+
       |       |       |
       v       v       v
      LLM     RAG     MCP
       |       |       |
       +-------+-------+
               |
               v
       Business Services
               |
               v
          MySQL DB
               |
               v
       Audit and Metrics
               |
               v
       Observability Stack
               |
       +-------+--------+
       |       |        |
       v       v        v
     Logs   Traces   Metrics
```

### What should we monitor?

| Monitoring area    | Example                            |
| ------------------ | ---------------------------------- |
| Application health | API availability                   |
| Model performance  | Latency and token consumption      |
| Agent performance  | Goal completion rate               |
| Tool performance   | MCP/API failures                   |
| RAG performance    | Retrieval relevance                |
| Security           | Unauthorized access attempts       |
| Business outcomes  | Student progress and plan adoption |
| Infrastructure     | CPU, memory and database health    |

### Tools worth exploring

- OpenTelemetry – distributed tracing and instrumentation.
- Langfuse – LLM observability and tracing.
- LangSmith – LLM workflow tracing and evaluation.
- Prometheus – metrics collection.
- Grafana – monitoring dashboards.
- Docker – application packaging.
- Kubernetes – container orchestration where scale requires it.
- CI/CD pipelines – repeatable deployment.

### Versioning and rollback

Imagine we update our system prompt and suddenly the quality of student recommendations decreases. Can we roll back? Yes, if we have versioned:

- Application code.
- System prompts.
- Model configurations.
- Tool schemas.
- Retrieval configurations.
- Evaluation datasets.

Production AI needs the same release discipline as conventional enterprise software.

# 8. Putting all seven stages together

Let's look at the complete product engineering lifecycle.


```
       1. DISCOVER
      Business Problem
             |
             v
        2. DESIGN
      Agent Architecture
             |
             v
        3. CONNECT
      Tools + APIs + Memory
             |
             v
         4. PROMPT
      Instructions + Schemas
             |
             v
         5. GROUND
       RAG + Knowledge
             |
             v
          6. TEST
     Evaluation + Guardrails
             |
             v
         7. DEPLOY
      LLMOps + Monitoring
             |
             v
      PRODUCTION AI AGENT
             |
             v
       Continuous Feedback
             |
             +----------> Improve
```

These seven stages are not strictly one-time sequential activities. Production engineering is iterative. Testing may reveal architectural weaknesses, and production monitoring may send us back to redesign retrieval or revise business requirements.

# 9. Connect the seven stages with our TFLCoMentor implementation

Here is how I would organize the engineering responsibilities across our existing modular architecture.

| TFLCoMentor area           | Production engineering responsibility  |
| -------------------------- | -------------------------------------- |
| React                      | Secure user experience and interaction |
| ASP.NET Core orchestration | Workflow and goal execution            |
| Java Skill Taxonomy        | Consistent competency definitions      |
| Java Evaluation Content    | Controlled assessment content          |
| Node Evaluation            | Reliable evaluation operations         |
| Insight Core               | Evidence-based analysis                |
| Growth Engine              | Personalized learning recommendations  |
| Membership                 | Identity and access management         |
| MySQL                      | Durable business data                  |
| MCP integration            | Controlled tool connectivity           |
| RAG knowledge base         | Grounded learning guidance             |
| Observability              | Traceability and operational health    |

This is an important architectural distinction: The AI layer should orchestrate business capabilities, not replace the business capabilities themselves. Assessment evaluation should remain a controlled business operation. Student identity should remain under membership and authorization services. The AI should consume their results and coordinate appropriate workflows.

# 10. Mentor's production-readiness checklist

Before releasing an AI agent, ask these questions.

Production readiness assessment

0/13 completed

- Business problem and measurable KPIs are defined ?
- Architecture and agent boundaries are documented ?
- APIs and MCP tools enforce authorization ?
- Memory and context have clear ownership ?
- Prompts and tool schemas are version-controlled ?
- RAG uses trusted, permission-filtered sources ?
- Evaluation datasets and regression tests exist ?
- Prompt injection and security tests are performed ?
- Retries, timeouts and idempotency are implemented ?
- Completion is independently verified ?
- Human approval and escalation are supported ?
- Logs, traces, metrics and alerts are available ?
- CI/CD and rollback procedures are tested ?

Reset assessment

This is an engineering checklist, not a formal security certification.

# 11. Final message – What should Transflower teach?

I believe these seven stages provide a valuable framework for our TAP and AI-enabled Full Stack Developer programs. We should teach students to progress through the following journey:

| Engineering maturity     | What students learn                          |
| ------------------------ | -------------------------------------------- |
| Software Developer       | Build applications and APIs                  |
| AI Application Developer | Integrate LLMs                               |
| AI Engineer              | Build RAG and tool-enabled applications      |
| Agent Engineer           | Build goal-oriented workflows                |
| Enterprise AI Engineer   | Build secure, observable and reliable agents |

Students should not merely demonstrate that an LLM can call an API. They should demonstrate that they understand the business requirement, architecture, security, execution lifecycle and verification.

# The Transflower philosophy

A demo proves possibility. Engineering proves reliability. Production proves trust. An AI agent needs more than intelligence.

It needs:

- Good architecture.
- Trusted knowledge.
- Controlled capabilities.
- Security boundaries.
- Reliable execution.
- Measurable evaluation.
- Continuous observability.

Don't just use AI. Learn how to engineer AI-powered solutions. Build fundamentals. Understand architecture. Engineer responsibly. Deliver measurable outcomes. 

One thought I want every TAP student to remember:

A good AI engineer does not ask only, "Can I build an agent?" 

A good AI engineer asks: "Can I explain what the agent does, control what it can do, measure how well it performs, and prove that it has done what it claims?"

That is how we move from an AI prototype to a production-ready enterprise AI product.