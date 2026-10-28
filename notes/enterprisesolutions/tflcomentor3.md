# Transflower Mentor Guide: Connecting AI Terminology to the TFLCoMentor Project

We teach students AI terminology as a collection of frameworks. Teach them through the software they are building at Transflower.

When students implement TFLCoMentor, they are not merely building a chatbot. They are learning how to build a responsible AI-enabled software application that understands student context, uses real business APIs, follows institutional rules, evaluates its answers, and improves through feedback.

I would explain this using the Transflower classroom approach: Story → Architecture → Real implementation → Testing → Reflection.

## 1. Start with a real problem students understand

Imagine a Transflower student asks TFLCoMentor:

> "I scored 42% in my Python assessment. Why am I struggling, and what should I learn next to become employable?"

What should TFLCoMentor do?

It must retrieve the student's actual assessment results, understand the Python skill taxonomy, compare performance against mentor-approved rubrics, identify learning gaps, and suggest a personalized action plan.

It must not invent marks, expose another student's profile, or promise a job.

That one student question introduces almost every concept in your AI terminology list.

## The TFLCoMentor AI journey
 
```
        TRANSFLOWER TFLCoMentor
        =======================

  +------------------------------------------+
  |  1. STUDENT ASKS A QUESTION              |
  |                                          |
  |  "Why did I score 42% in Python?"        |
  +------------------------------------------+
                     |
                     v
  +------------------------------------------+
  | 2. AI APPLICATION PROCESSES THE REQUEST  |
  |                                          |
  |  +-------------+   +------------------+  |
  |  | MODEL       |   | CONTEXT          |  |
  |  | LLM         |   | RAG, Skill Data  |  |
  |  +-------------+   +------------------+  |
  |                                          |
  |  +-------------+   +------------------+  |
  |  | TOOLS       |   | WORKFLOW         |  |
  |  | TFLAssessment|  | Next Steps       |  |
  |  | APIs        |   | Orchestration    |  |
  |  +-------------+   +------------------+  |
  |                                          |
  |  HARNESS: Coordinates the entire process |
  +------------------------------------------+
                     |
                     v
  +------------------------------------------+
  |  3. RELIABILITY CHECKS                   |
  |                                          |
  |  +------------------+                    |
  |  | AUTHORIZATION    |                    |
  |  | Is access allowed?|                   |
  |  +------------------+                    |
  |             |                            |
  |             v                            |
  |  +------------------+                    |
  |  | GUARDRAILS       |                    |
  |  | Follow policies  |                    |
  |  +------------------+                    |
  |             |                            |
  |             v                            |
  |  +------------------+                    |
  |  | EVALUATIONS      |                    |
  |  | Is the answer    |                    |
  |  | correct & useful?|                    |
  |  +------------------+                    |
  +------------------------------------------+
                     |
                     v
  +------------------------------------------+
  |  4. PERSONALIZED LEARNING GUIDANCE       |
  |                                          |
  |  Actual Assessment Results               |
  |             |                            |
  |             v                            |
  |  Identify Weak Python Skills             |
  |             |                            |
  |             v                            |
  |  Recommend Learning Resources            |
  |             |                            |
  |             v                            |
  |  Create an Action Plan                   |
  |             |                            |
  |             v                            |
  |  Student Practices + Mentor Reviews      |
  +------------------------------------------+
                     |
                     v
  +------------------------------------------+
  |  OBSERVABILITY                           |
  |  Logs | Traces | Errors | Latency | Cost |
  +------------------------------------------+
```

Transflower Mentor takeaway:

- Build it: Model + Context + Tools + Workflow + Harness
- Make it reliable: Authorization + Guardrails + Evaluations
- Deliver value: Personalized learning guidance
- Improve it: Observability + Mentor feedback

The LLM generates explanations; TFLAssessment supplies actual scores, backend controls enforce access, and mentors guide student growth.


Evidence-based recommendations, with mentor oversight

Behind the scenes: logs, traces, evaluation results, errors, latency and cost.

This is the important shift: the LLM generates language; the application supplies the evidence, controls the actions, and enforces the rules.

## 2. Map the eight AI concepts to actual TFLCoMentor modules

The best way to teach these concepts is to connect every term to a real responsibility in your existing software architecture.

| AI concept          | TFLCoMentor implementation                                                 | Student should understand                         |
| ------------------- | -------------------------------------------------------------------------- | ------------------------------------------------- |
| 1. Model            | OpenAI, Claude, or a locally hosted LLM                                    | Generates explanations and recommendations        |
| 2. Context          | RAG over mentor-approved learning resources, rubrics and skill definitions | Gives the model relevant knowledge                |
| 3. Tools            | TFLAssessment APIs and authorized business services                        | Retrieves real data and performs approved actions |
| 4. Workflow / Agent | AI orchestration layer                                                     | Determines which steps to execute                 |
| 5. Harness          | ASP.NET Core backend and AI orchestration code                             | Manages the entire AI execution lifecycle         |
| 6. Guardrails       | Authentication, RBAC, validation and policy enforcement                    | Prevents unsafe or unauthorized behavior          |
| 7. Evals            | Automated AI tests and mentor-reviewed evaluation datasets                 | Measures correctness and reliability              |
| 8. Observability    | Tracing, logs, metrics, feedback and cost tracking                         | Explains what happened when something fails       |

One distinction worth emphasizing: the harness is not necessarily one framework or a separate microservice. It is the surrounding application code that coordinates the components. Similarly, authorization must be enforced by trusted backend services, not merely requested in a prompt.

## 3. BUILD IT — Model + Context + Tools + Workflow + Harness

### 1. Model = The brain

In TFLCoMentor

The model receives a question and relevant information, then generates a natural-language explanation.

Example: "Your Python assessment indicates that you need more practice with functions, exception handling and file operations."

The model can explain these concepts, but it should not invent the student's marks or claim to know their weaknesses without evidence.

Mentor asks: "Can the LLM independently know a student's latest assessment score?"

Student answers: "No, sir. We must retrieve it from TFLAssessment or another authorized source."

That answer demonstrates the difference between model knowledge and application data.

### 2. Context = The information

In TFLCoMentor

Context can include:

- Python learning material
- Skill taxonomy and competency definitions
- Assessment rubrics
- Mentor-approved exercises
- The student's authorized assessment results

RAG retrieves relevant learning documents. A business API retrieves the current student's actual score. These are different responsibilities.

Teach students to distinguish two types of context:

- Knowledge context: What does Python exception handling mean? RAG can help.
- Transactional context: What score did this student receive yesterday? Query the authorized assessment API or database service.

RAG is not a substitute for a reliable transactional data source.

### 3. Tools = The actions

In TFLCoMentor

The AI orchestration layer can call approved tools such as:

- `GetMyAssessmentResults`
- `GetSkillProfile`
- `GetLearningResources`
- `CreateLearningPlan`

These are illustrative tool names; your team would implement them against the actual TFLAssessment and learning-plan APIs.

The tool performs a real operation. The LLM may decide which tool is relevant, but the backend validates the caller's identity, permissions and arguments before executing it.

For example, a student must not retrieve another student's assessment by changing a student ID in a tool argument.

### 4. Workflow versus Agent = What happens next?

This is an excellent opportunity to teach design before coding.

### Option A: Predictable workflow

Receive student question
Authenticate and retrieve assessment
Retrieve matching skills and resources
Generate and validate a learning plan
Best when steps are known in advance and execution needs to be predictable.

```
       TFLCoMentor - PREDICTABLE AI WORKFLOW
       =====================================

  +------------------------------------------+
  |  STEP 1: RECEIVE STUDENT QUESTION        |
  |                                          |
  |  "Why did I score 42% in Python?"        |
  +------------------------------------------+
                     |
                     v
  +------------------------------------------+
  |  STEP 2: AUTHENTICATE STUDENT            |
  |                                          |
  |  Validate identity and permissions       |
  |  Retrieve assessment through API         |
  |  Verify student access                   |
  +------------------------------------------+
                     |
                     v
  +------------------------------------------+
  |  STEP 3: RETRIEVE SKILLS & RESOURCES     |
  |                                          |
  |  Assessment Results                      |
  |            |                             |
  |            v                             |
  |  Identify Weak Skills                    |
  |            |                             |
  |            v                             |
  |  Retrieve Learning Resources using RAG   |
  +------------------------------------------+
                     |
                     v
  +------------------------------------------+
  |  STEP 4: GENERATE LEARNING PLAN          |
  |                                          |
  |  LLM + Verified Assessment Context       |
  |            |                             |
  |            v                             |
  |  Recommend Topics, Labs and Exercises    |
  +------------------------------------------+
                     |
                     v
  +------------------------------------------+
  |  STEP 5: VALIDATE LEARNING PLAN          |
  |                                          |
  |  Check evidence and business rules       |
  |  Validate output format                  |
  |  Reject unsupported recommendations      |
  +------------------------------------------+
                     |
                     v
  +------------------------------------------+
  |  STEP 6: PRESENT GUIDANCE                |
  |                                          |
  |  Personalized Learning Action Plan       |
  |  Student Practice + Mentor Feedback      |
  +------------------------------------------+
```

Mentor's explanation

A predictable workflow follows predefined steps. Given the same valid inputs and equivalent system conditions, it follows the same process, even though the LLM's wording or recommendations may vary.

Why use this approach in TFLCoMentor?

- Each step has a clearly defined responsibility.
- API calls and permissions can be tested independently.
- Failures can be handled at known points.
- Learning recommendations can be validated before delivery.
- Developers can trace and debug the entire process.

Key principle: When the process is known in advance, start with a workflow. Introduce an AI agent only when the system genuinely needs to decide dynamically what to do next.


### Option B: Bounded agent

Understand the student's question
Select an approved tool or resource
Inspect result and decide the next permitted step
Return a grounded response within limits
Best when the next step depends on intermediate results. Limit tool permissions, iterations and execution time.

```
       TFLCoMentor - BOUNDED AI AGENT
       ==============================

  +------------------------------------------+
  |  STEP 1: UNDERSTAND STUDENT QUESTION      |
  |                                          |
  |  "Why did I score 42% in Python?"        |
  +------------------------------------------+
                     |
                     v
  +------------------------------------------+
  |  STEP 2: SELECT AN APPROVED TOOL          |
  |                                          |
  |  Available Tools:                         |
  |  - GetAssessmentResults()                 |
  |  - GetSkillProfile()                      |
  |  - SearchLearningResources()              |
  +------------------------------------------+
                     |
                     v
  +------------------------------------------+
  |  STEP 3: EXECUTE TOOL                     |
  |                                          |
  |  Call authorized TFLAssessment API        |
  |  Retrieve actual assessment evidence      |
  +------------------------------------------+
                     |
                     v
  +------------------------------------------+
  |  STEP 4: INSPECT THE RESULT               |
  |                                          |
  |  Are weak skills identified?              |
  |                                          |
  |  +-------------------------------+       |
  |  | YES                           |       |
  |  | Retrieve relevant resources   |       |
  |  +-------------------------------+       |
  |                 |                        |
  |                 v                        |
  |  +-------------------------------+       |
  |  | NO                            |       |
  |  | Ask for clarification or      |       |
  |  | explain missing information   |       |
  |  +-------------------------------+       |
  +------------------------------------------+
                     |
                     v
  +------------------------------------------+
  |  STEP 5: DECIDE THE NEXT PERMITTED STEP   |
  |                                          |
  |  Use results to choose the next action    |
  |  Enforce tool permissions and limits      |
  |  Stop when sufficient evidence is found   |
  +------------------------------------------+
                     |
                     v
  +------------------------------------------+
  |  STEP 6: RETURN A GROUNDED RESPONSE       |
  |                                          |
  |  Explain verified learning gaps           |
  |  Recommend relevant Python exercises      |
  |  Provide a personalized action plan        |
  +------------------------------------------+
                     |
                     v
  +------------------------------------------+
  |  SAFETY & EXECUTION LIMITS                |
  |                                          |
  |  - Approved tools only                    |
  |  - Role-based authorization               |
  |  - Maximum iterations                     |
  |  - Execution timeout                      |
  |  - Validated responses                    |
  |  - Safe termination on failure            |
  +------------------------------------------+
```

## Transflower Mentor explanation

Predictable workflow vs. bounded agent

| Predictable workflow                       | Bounded agent                              |
| ------------------------------------------ | ------------------------------------------ |
| Steps are predefined                       | Next step depends on results               |
| Follows a known sequence                   | Chooses among approved actions             |
| Easier to reason about                     | More flexible, but more complex            |
| Best for standard learning-plan generation | Best for questions requiring investigation |

Example: The agent retrieves a student's assessment and discovers that the available results do not explain the low score. It may then inspect the authorized skill profile or retrieve the assessment rubric before responding.

The agent is not free to do anything it wants. It can choose only from permitted tools and must stop when it reaches its limits.

Mentor's golden rule:

> Give the AI freedom to decide the next step, but never unlimited freedom to take action.

In TFLCoMentor, the LLM proposes the next action, the orchestration layer controls execution, backend APIs enforce authorization, and validation ensures the final guidance is supported by evidence.

Mentor's rule: Start with a deterministic workflow. Introduce agentic decision-making only when the problem genuinely needs it.

A framework such as LangGraph can help manage stateful workflows and agents. However, your ASP.NET Core application can also orchestrate these steps directly. A framework is an implementation choice, not a mandatory part of AI architecture.

### 5. Harness = The application around the model

Students often believe that an AI application is simply a prompt sent to an LLM API. Show them the missing engineering work.

The harness coordinates:

- Conversation state and request lifecycle
- Prompt construction and context selection
- Tool selection and execution
- Timeouts, retries and error handling
- Output validation and structured responses
- Logging, tracing and cost controls

In TFLCoMentor, this responsibility can sit primarily in the AI orchestration module, integrated with the existing ASP.NET Core backend.

Think of the LLM as an engine. The harness is the vehicle's control system, transmission, brakes and instrumentation. An engine alone is not a complete vehicle.

## 4. MAKE IT RELIABLE — Guardrails + Evals

### 6. Guardrails = Set the boundaries

Consider these three questions from students.

| Student question                               | Expected system behavior                                                        |
| ---------------------------------------------- | ------------------------------------------------------------------------------- |
| "Explain Python decorators."                   | Answer using relevant learning resources.                                       |
| "Show me another student's assessment scores." | Deny access; do not expose private data.                                        |
| "Change my assessment score to 90%."           | Do not alter the score; direct the request to an authorized correction process. |

Teach students that guardrails operate at multiple layers:

1. Identity and access: Is the user authenticated and authorized?
2. Input validation: Are tool arguments valid and permitted?
3. Business rules: Is this operation allowed for this user and role?
4. AI output validation: Is the response grounded, appropriately formatted and free of disallowed disclosures?
5. Human oversight: Does a consequential action require mentor approval?

Prompt instructions alone cannot enforce these boundaries. Backend authorization and business rules must remain authoritative.

### 7. Evals = Test whether the AI actually works

Connect this to the automated testing labs you teach with pytest and Playwright: AI features also need repeatable tests, but ordinary assertions alone are not enough.

A TFLCoMentor evaluation suite might look like this:

| Test                                             | Expected result                                                |
| ------------------------------------------------ | -------------------------------------------------------------- |
| Ask for the student's actual score               | Correct API result is used                                     |
| Ask about an unsupported Python topic            | Answer is qualified or the limitation is explained             |
| Request another student's profile                | Access is denied                                               |
| Ask for a learning plan based on weak skills     | Recommendations align with assessment evidence                 |
| Assessment API returns an error                  | System reports the failure safely without inventing a score    |
| Repeat the same question with equivalent context | Response remains within accepted quality and policy thresholds |

Measure several dimensions separately:

- Correctness: Is the response factually correct?
- Grounding: Does the answer follow the retrieved evidence?
- Tool accuracy: Did the system choose and use the correct API?
- Safety: Did it respect access and business policies?
- Quality: Is the explanation useful, clear and actionable?

Tools such as DeepEval or Promptfoo can support automated evaluation. Mentor review remains valuable for educational quality and employability-oriented recommendations.

## 5. UNDERSTAND IT — Observability

### 8. Observability = Find out what happened

Imagine a student reports:

> "Sir, TFLCoMentor gave me the wrong learning recommendation yesterday."

Without observability, developers may only see the final response. With appropriate tracing, they can investigate the sequence of events.

## Example: AI request trace

Step 1 — Request received

Authenticated student asks about Python assessment performance.

Step 2 — Assessment API called

API returns a valid assessment record.

Step 3 — Context retrieved

Python skill definitions and learning resources are selected.

Step 4 — Response validation fails

The generated recommendation refers to a skill not supported by the assessment evidence.

Step 5 — Developer investigates

Inspect trace IDs, tool results, retrieval quality, validation outcome, latency and model usage. Correct the defect and add a regression evaluation.

Langfuse is one possible platform for LLM tracing and evaluation. OpenTelemetry and your existing application logging infrastructure can complement it.

Important: traces should not indiscriminately store student records, passwords, access tokens or entire private conversations. Apply access controls, redaction and retention policies.

## 6. Put the concepts into the existing TFLCoMentor architecture

Here is how I would connect the terminology to your existing application design.

React Web Client

Student / Mentor / SME / Admin / Employer

ASP.NET Core Backend

Authentication · RBAC · Input validation · Rate limits

### AI Orchestration / Harness

Model

LLM provider

Context

RAG · Skill taxonomy · Approved rubrics

Tools

Authorized APIs · Learning-plan operations

Workflow / Agent

State · Decisions · Execution limits

Guardrails + Response Validation

Policy checks · Evidence checks · Safe error handling

Grounded response to the student

Evals

Offline test datasets, regression checks and mentor review

Observability

Traces, metrics, errors, latency and cost

The diagram shows logical responsibilities, not a requirement to create eight separate services. Your existing modular monolith can host these capabilities without introducing unnecessary microservices.

## 7. A practical Transflower student implementation roadmap


## 01

Lab 1 — Build a simple LLM feature

Implement an API endpoint that accepts a Python question and returns an explanation.

Deliverable: working endpoint, configuration management and basic error handling.

## 02

Lab 2 — Add context with RAG

Index approved Python notes, retrieve relevant passages and use them to ground responses.

Deliverable: retrieved evidence, source references and a fallback for missing information.

## 03

Lab 3 — Connect a real TFLAssessment API

Retrieve the authenticated student's assessment results and pass only the relevant, authorized data into the AI request.

Deliverable: API integration, access control and tests for unauthorized requests.

## 04

Lab 4 — Implement a controlled workflow

Retrieve scores, identify weak skills using defined rules, fetch learning resources and generate an action plan.

Deliverable: explicit workflow states, error handling and structured output.

## 05

Lab 5 — Add guardrails and AI evaluations

Test factual grounding, tool selection, role-based access and response quality. Add regression tests for every discovered defect.

Deliverable: repeatable evaluation suite and documented pass/fail criteria.

## 06

Lab 6 — Instrument and operate the application

Add trace IDs, latency measurements, token/cost metrics, redacted logs and failure dashboards.

Deliverable: a diagnosable AI feature that can be maintained in production.

## 8. Mentor–student classroom dialogue

Use this discussion to check whether students understand the engineering principles rather than just remember the terminology.

1. A student asks for their latest assessment score. Which component should provide the authoritative value?

The LLM's pretrained knowledge

The authorized TFLAssessment API

A random document retrieved by RAG

2. Why do we need RAG for Python learning resources?

To replace authentication

To retrieve relevant approved knowledge for the response

To guarantee that every LLM answer is correct

3. What is the safest starting point for a predictable learning-plan feature?

An unrestricted autonomous agent

A deterministic workflow with validated tools

A larger LLM without testing

4. What should the team do after discovering an unsupported AI recommendation in production?

Ignore it if the API returned HTTP 200

Only change the system prompt and hope

Investigate traces, correct the cause and add a regression evaluation

Reset questions

## The final message to Transflower students

> Students, building an AI application is not about calling an LLM API and displaying its response.
>
> First, understand the problem. Then provide the model with relevant context. Connect it to real business tools. Design a controlled workflow. Enforce security and business rules. Evaluate its behavior. Finally, monitor it in production.
>
> In TFLCoMentor, the AI does not replace our assessment system, our skill taxonomy, or our mentors. It brings those capabilities together to help students learn more effectively.
>
> AI suggests. Evidence supports. Software enforces. Tests verify. Observability explains. Mentors guide.
>
> That is the difference between merely using AI and engineering a reliable AI-enabled software solution.
