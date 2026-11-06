# From Prompt Engineering to Loop Engineering: Lessons from Building TFLCoMentor

### Building Reliable Agentic AI Systems

**Central thought**:

"The most expensive bug in Agentic AI is not an incorrect answer. It is an AI agent that confidently says DONE when the actual work is not done."

This is an important lesson for every developer working on enterprise AI applications. At Transflower Learning, while implementing TFLCoMentor, we are learning that building an AI-powered application is fundamentally different from simply integrating an LLM with a chatbot. We are not just building a chatbot that answers student questions. We are building an intelligent mentoring ecosystem that understands student context, accesses business capabilities, evaluates progress, recommends learning activities and verifies outcomes.

Let's understand this from a mentor's perspective.

## 1. A conversation with students

Mentor (Ravi Sir): Students, imagine I give you an assignment. Build an AI mentor that evaluates a student's Python knowledge, identifies skill gaps, creates a personalized learning plan and tracks the student's improvement. Now tell me, when can your AI mentor say that the assignment is completed?

Student: Sir, when the LLM generates a learning plan and displays it to the student.

Mentor: Interesting! But what if the learning plan was never saved?

Student: Then the student will lose the plan.

Mentor: What if the assessment API returned an error?

Student: Then the skill-gap analysis might be incorrect.

Mentor: What if the AI generated a learning plan but never updated the student's progress dashboard?

Student: Then the system is incomplete.

Mentor: Exactly!

Generating an answer is not the same as completing a business operation. In enterprise AI, we must distinguish between:

- AI generated a response.
- AI executed an action.
- The business system accepted the action.
- The intended outcome was achieved.
- The system verified the outcome.

That distinction is where engineering begins.

## 2. Four engineering layers of Agentic AI

Think of these four layers as the evolution of building intelligent software.

Layer 1

Prompt Engineering

What should the AI do?

Role, instructions, examples, constraints and output format.

Unit of work: One model invocation.

Layer 2

Context Engineering

What should the AI know?

Student profile, assessment history, course material, rubrics, mentor guidance and previous interactions.

Unit of work: One context window.

Layer 3

Harness Engineering

How should the AI perform the task?

Tools, APIs, MCP servers, permissions, validation, orchestration and verification.

Unit of work: One execution run.

Layer 4

Loop Engineering

How do we ensure the goal is actually achieved?

Success criteria, iteration, retry policies, progress detection, budget limits and completion verification.

Unit of work: One business goal.

Let's connect these layers with our TFLCoMentor implementation.

## 3. Layer 1 – Prompt Engineering

Mentor: Suppose a student asks: "Sir, I have completed Python basics. What should I learn next?"

A simple chatbot might respond with a generic list:

- OOP
- Exception Handling
- File Handling
- Database Connectivity
- Flask or FastAPI

But is that mentoring? Not necessarily. A good mentor first understands the student's learning objective. Our system needs instructions such as:

```
You are TFLCoMentor.

Your responsibility is to guide students
towards employability.

Understand the student's current skills.

Identify knowledge gaps using assessment
evidence.

Recommend learning activities based on
the student's actual progress.

Do not invent assessment scores.

Do not claim that an activity is completed
without verification.

Provide actionable guidance.
```

Mentor's observation: A prompt defines the behavior of the model. It does not guarantee the correctness of the business operation.

## 4. Layer 2 – Context Engineering

Mentor: Now imagine two students ask the same question.

Student A has completed Python fundamentals.

Student B has completed Python, OOP, SQL and REST API development.

Should both receive the same recommendation?

Students: No, Sir!

Mentor: Exactly. The intelligence of a mentoring application depends on the quality of the context it provides.

For TFLCoMentor, relevant context includes:

| Context            | Information                                 |
| ------------------ | ------------------------------------------- |
| Student Profile    | Education, goals, current learning track    |
| Skill Taxonomy     | Python, C#, SQL, React, APIs                |
| Assessment History | Scores, attempts, feedback                  |
| Learning Resources | Notes, videos, assignments                  |
| Mentor Guidance    | Observations and recommendations            |
| Progress History   | Completed and pending activities            |
| Placement Profile  | Projects, skills and employability evidence |

Illustrative context flow:

```
             Student Question
                    |
                    v
          Context Engineering
                    |
       +------------+------------+
       |            |            |
       v            v            v
   Student       Assessment    Knowledge
   Profile        History       Base
       |            |            |
       +------------+------------+
                    |
                    v
             Context Builder
                    |
                    v
             Relevant Context
                    |
                    v
                   LLM
                    |
                    v
           Personalized Guidance
```

This is where RAG becomes valuable. But remember:

RAG retrieves knowledge. It does not automatically establish whether a business action has succeeded. For example, retrieving an assessment score is not the same as authorizing an update to the student's official assessment record.

## 5. Layer 3 – Harness Engineering

This is where our actual TFLCoMentor implementation becomes interesting. We have been approaching the system as an enterprise application with a modular architecture rather than treating it as a standalone chatbot. Our technology ecosystem includes:

- React frontend
- ASP.NET Core backend and orchestration
- Java-based Skill Taxonomy and Evaluation Content modules
- Node.js Evaluation services
- MySQL persistence
- JWT authentication and RBAC
- MCP-based access to business capabilities

The harness controls how the model interacts with these components.

### Illustrative TFLCoMentor architecture

```
       Student / Mentor / SME / Admin
                    |
                    v
          React Web Application
             Chat Interface
                    |
                    v
          ASP.NET Core Backend
           API Gateway / Auth
          JWT | RBAC | Validation
                    |
                    v
          AI Orchestration Layer
          Prompt + Context + RAG
          Tool Selection + Workflow
                    |
             +------+------+
             |             |
             v             v
           LLM         MCP Client
             |             |
             |             v
             |         MCP Servers
             |             |
             |      +------+------+
             |      |      |      |
             |      v      v      v
             |   Student Assessment
             |   Skill   Learning
             |   APIs    APIs
             |             |
             +------+------+
                    |
                    v
            Validation Layer
                    |
                    v
             MySQL Database
                    |
                    v
          Verified Business Result
                    |
                    v
             React Dashboard
```

Notice something important. The LLM does not directly become the owner of business data. It requests actions through controlled tools. The application enforces authorization, validates inputs and handles persistence.

Mentor: Students, suppose the LLM decides that a student should be marked as having completed a Python assessment. Can the LLM directly update the database?

Student: No, Sir. It must call an authorized business API.

Mentor: Correct. And what if the API rejects the request?

Student: The agent must understand that the action failed.

Mentor: Excellent! Now we are thinking like enterprise engineers.

## 6. Layer 4 – Loop Engineering: The Missing Engineering Discipline

This is the most important part of the discussion. Let's consider a practical TFLCoMentor scenario. Business goal: Generate and save a personalized learning plan for a student. A naive agent might perform the following:

```
Student asks for a learning plan
           |
           v
LLM generates learning plan
           |
           v
Agent responds:
"Your learning plan is ready."
```

But what has actually happened? Only text generation! A production-oriented agent must execute a controlled loop.

### TFLCoMentor learning-plan execution loop

```
          START
            |
            v
    Understand Student Goal
            |
            v
    Retrieve Student Profile
            |
            v
    Retrieve Assessment Results
            |
            v
    Identify Skill Gaps
            |
            v
    Generate Learning Plan
            |
            v
    Validate Learning Plan
            |
            v
    Save Plan through API
            |
            v
    Verify Saved Plan
            |
       +----+----+
       |         |
     Success   Failure
       |         |
       v         v
  Mark Goal   Diagnose Error
  Completed       |
       |       Retry if
       |       permitted
       |          |
       |       +--+--+
       |       |     |
       |      Yes    No
       |       |     |
       |       v     v
       |    Retry  Escalate
       |       |
       +-------+
            |
            v
      Report Actual
         Status
```

The important difference is that the system has an explicit definition of completion.

### What should the loop engineer control?

| Control               | Purpose                      | TFLCoMentor example              |
| --------------------- | ---------------------------- | -------------------------------- |
| Goal definition       | Establish expected outcome   | Learning plan must be created    |
| Success criteria      | Define completion evidence   | Plan ID returned and persisted   |
| Maximum iterations    | Prevent infinite execution   | Maximum 5 attempts               |
| No-progress detection | Detect repeated failures     | Same API error repeatedly        |
| Timeout               | Prevent indefinite waiting   | API request deadline             |
| Budget control        | Control model/tool usage     | Token and API-call limits        |
| Retry policy          | Handle transient errors      | Retry temporary network failures |
| Idempotency           | Prevent duplicate operations | Avoid duplicate learning plans   |
| Completion verifier   | Check actual result          | Read plan back from database     |
| Audit trail           | Maintain accountability      | Record tool calls and outcomes   |

Mentor's golden rule: An agent must never confuse an intention, an attempted action and a verified outcome.

## 7. Practical implementation: Goal-oriented agent

Let's imagine implementing a simplified orchestration service in Python. The same engineering principles can be applied to our ASP.NET Core orchestration layer.

```
def execute_learning_plan(student_id):    max_iterations = 5    for attempt in range(max_iterations):        student = get_student_profile(student_id)        assessments = get_assessment_results(            student_id        )        gaps = identify_skill_gaps(            student,            assessments        )        plan = generate_learning_plan(            student,            gaps        )        if not validate_learning_plan(plan):            continue        result = save_learning_plan(            student_id,            plan        )        if not result.success:            if result.retryable:                continue            return {                "status": "failed",                "reason": result.error            }        saved_plan = get_learning_plan(            result.plan_id        )        if saved_plan and saved_plan.matches(plan):            return {                "status": "completed",                "plan_id": result.plan_id            }    return {        "status": "incomplete",        "reason": "Completion could not be verified"    }
```

Illustrative pseudocode: production implementation also needs exception handling, deadlines, authorization, durable state, retry backoff and idempotency. Notice that the agent reports `completed` only after verification. If it cannot verify completion, it must report `incomplete` or `failed`, not pretend success.

## 8. The four layers: How to diagnose failures

This is a useful diagnostic framework for Transflower students working on AI engineering projects.

| Observed problem                    | Engineering layer   | What to investigate            |
| ----------------------------------- | ------------------- | ------------------------------ |
| Wrong tone or output format         | Prompt              | Instructions and examples      |
| Confident but incorrect information | Context             | Retrieval and source quality   |
| Correct plan, failed API call       | Harness             | Tool contracts and permissions |
| Repeated execution without progress | Loop                | Iteration and termination      |
| Claims success without saving data  | Loop + verification | Completion evidence            |
| Duplicate records after retry       | Harness + loop      | Idempotency                    |

The uncomfortable truth is that not every AI failure is a model failure. Sometimes the model is doing exactly what we instructed it to do. The actual problem is that we failed to engineer the surrounding system.

## 9. What this means for Transflower Learning

I see an important opportunity here. Transflower Learning should not position itself merely as an organization teaching students how to use ChatGPT, LangChain or other AI tools. We should amplify our identity as an institution that teaches students how to engineer intelligent, reliable and responsible software systems. Our TFLCoMentor implementation provides a practical learning laboratory for this philosophy.

## The Transflower AI Engineering Learning Journey

Foundation – Software Engineering

OOP, Data Structures, SQL, APIs, Design Principles, Authentication and System Design.

Level 1 – Prompt Engineering

System instructions, structured outputs, prompt templates and evaluation.

Level 2 – Context Engineering

Embeddings, vector databases, RAG, retrieval, chunking and context management.

Level 3 – Harness Engineering

MCP, tools, APIs, orchestration, authorization, validation and observability.

Level 4 – Loop Engineering

State management, goal verification, retries, checkpoints, budgets and termination.

Production Readiness

Security, evaluations, testing, monitoring, auditability and human oversight.

### A practical student assignment

Ask every TAP student to implement one bounded agentic workflow in TFLCoMentor. Problem statement: Build a Student Skill-Gap Analysis Agent.

Expected behavior:

1. Authenticate the student.
2. Retrieve the student's skill profile.
3. Fetch assessment results.
4. Identify skill gaps.
5. Generate a personalized improvement plan.
6. Validate recommendations against the learning resources.
7. Save the plan through an authorized API.
8. Verify that the plan exists.
9. Report the actual execution status.

Assessment criteria:

| Evaluation area                 | Weight |
| ------------------------------- | ------ |
| Prompt design                   | 10%    |
| Context retrieval               | 15%    |
| Tool/API integration            | 20%    |
| Workflow orchestration          | 15%    |
| Loop and termination controls   | 20%    |
| Verification and error handling | 15%    |
| Observability and documentation | 5%     |
| Total                           | 100%   |

This assignment tests engineering maturity, not just prompt-writing ability.

## 10. My message as a mentor

Students, remember how we learned software development. First, we learned variables, conditions and loops. Then functions, classes, objects and data structures. Then databases, APIs, design patterns and architecture. Then frameworks.

We never started our journey by memorizing frameworks. We learned the fundamentals that made frameworks understandable. AI engineering should follow the same philosophy. Do not jump directly into building agents using frameworks.

Understand:

- What is a goal?
- What is a state?
- What is context?
- What is an action?
- What is an execution boundary?
- What is a successful outcome?
- How do we verify completion?
- When should an agent stop?
- When should a human take control?

These questions separate an AI tool user from an AI engineer. And our TFLCoMentor project gives us an opportunity to experience these questions in a real enterprise application.

## Final thought – Transflower Learning philosophy

# AI suggests. Engineering verifies. Mentors guide.

A **prompt** makes AI understand the task.

**Context** makes AI understand the situation.

A **harness** makes AI perform controlled actions.

A **loop** makes AI pursue the goal until the outcome is verified or the system safely stops.

A better model may generate a better answer. A better engineered system delivers a more reliable outcome.

## Transflower Learning

Don't just learn AI. Learn to engineer AI-powered solutions.

 