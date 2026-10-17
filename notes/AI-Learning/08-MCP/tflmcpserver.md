# Transflower CoMentor + TFLAssessment + MCP

## From student performance data to AI-powered mentorship

As a Transflower Mentor, I would approach this integration with one fundamental principle:

An AI mentor should not merely answer a student's questions. It should understand the student's learning progress, identify skill gaps, and guide the student toward measurable improvement.

TFLAssessment already provides the assessment and performance data. CoMentor provides the intelligence and mentoring experience. MCP (Model Context Protocol) can provide a standardized way for the AI application to access approved assessment capabilities.

Think of the integration this way:

- TFLAssessment tells us what the student has achieved.
- CoMentor interprets that achievement in the context of the student's learning journey.
- MCP connects the AI application to authorized tools that retrieve the necessary information.
- The Mentor helps the student turn insights into action.

## 1. Proposed architecture

## Student / Human Mentor

“What are my strengths and which skills should I improve?”

## TFLCoMentor Chatbot

Natural-language conversation · Student identity · Conversation context

## AI Orchestration Layer

LLM · Intent detection · Tool selection · Response generation

MCP client invokes approved tools

## TFLAssessment MCP Server

Authentication · Authorization · Input validation · Audit logging

Student profile

Assessment history

Skill-wise scores

Recommendations

## Existing TFLAssessment APIs

Assessment results · Student records · Skill taxonomy · Evaluation reports

Existing services and database remain the source of truth.

The important design decision is that the MCP server should be an integration layer, not a replacement for TFLAssessment. It exposes a small, controlled set of existing API operations to the AI application.

## 2. What should the TFLAssessment MCP server expose?

Do not expose every API to the LLM. Start with a few meaningful, read-only tools that support student mentoring.

| MCP tool                   | Purpose                               | Example student question                    |
| -------------------------- | ------------------------------------- | ------------------------------------------- |
| `get_student_profile`      | Retrieve authorized student profile   | Who am I in the TAP program?                |
| `get_assessment_history`   | Retrieve completed assessments        | How have I performed over time?             |
| `get_assessment_result`    | Retrieve a particular result          | What was my score in the Python assessment? |
| `get_skill_performance`    | Retrieve skill-wise scores            | Am I strong in OOP but weak in collections? |
| `get_learning_gaps`        | Retrieve identified skill gaps        | What should I improve first?                |
| `get_recommended_practice` | Retrieve approved practice activities | What should I practise today?               |

These are proposed MCP tools; map them to the actual TFLAssessment API endpoints and data models available in your project.

For example, your existing API might provide endpoints similar to:

```
GET /api/students/me
GET /api/assessments/history
GET /api/assessments/{assessmentId}/results
GET /api/students/me/skill-performance
GET /api/students/me/learning-gaps
```

These paths are illustrative, not verified existing endpoints. Reuse your actual routes wherever possible.

## 3. Real-world conversation: CoMentor in action

Student

I have completed three Python assessments. Am I improving?

CoMentor AI

I will check your assessment history and compare your performance across the three attempts.

MCP tool call

`get_assessment_history`

The server validates your identity and retrieves authorized results from TFLAssessment.

Assessment data returned

Illustrative data only

Python assessment progress

Example scores across three attempts

0%25%50%75%100%Attempt 1Attempt 2Attempt 3

CoMentor's response

Your score has increased from 48% to 78% across these attempts. That is a positive trend. Let's now examine which concepts are still difficult for you.

Your next step is to practise OOP, exception handling and collections, based on your actual skill-wise results.

Notice the separation of responsibilities:

1. TFLAssessment supplies the evidence.
2. MCP makes that evidence available through approved tools.
3. The LLM interprets the results and explains them.
4. CoMentor recommends the next learning activity.

The LLM should not invent assessment scores or claim improvement without retrieving sufficient data.

## 4. How MCP works technically

MCP defines a standard protocol for AI applications to discover and invoke tools exposed by an MCP server.

```

                    TRANSFLOWER LEARNING
             AI-POWERED STUDENT MENTORING PLATFORM
+------------------------------------------------------------+
|                                                            |
|                  STUDENT / HUMAN MENTOR                    |
|       "How am I performing? What should I improve?"        |
|                           |                                |
|                           v                                |
|  +------------------------------------------------------+  |
|  |             TFLCoMentor Chatbot (React)              |  |
|  |       Chat UI | Performance Dashboard | Insights     |  |
|  +------------------------------------------------------+  |
|                           |                                |
|                           v                                |
|  +------------------------------------------------------+  |
|  |             ASP.NET Core CoMentor API                |  |
|  |   Authentication | Authorization | Session Handling  |  |
|  +------------------------------------------------------+  |
|                           |                                |
|                           v                                |
|  +------------------------------------------------------+  |
|  |              AI ORCHESTRATION LAYER                  |  |
|  |                                                      |  |
|  |  LLM | Prompt Management | Context | Tool Selection  |  |
|  |                                                      |  |
|  |                  MCP CLIENT                          |  |
|  +--------------------------+---------------------------+  |
|                             |                              |
|                   MCP Protocol (Tools)                     |
|                             |                              |
|                             v                              |
|  +------------------------------------------------------+  |
|  |            TFLAssessment MCP SERVER                  |  |
|  |                                                      |  |
|  |  +------------------+  +---------------------------+ |  |
|  |  | Tool Discovery   |  | Authentication & Access  |  |  |
|  |  +------------------+  +---------------------------+ |  |
|  |                                                      |  |
|  |  +------------------+  +---------------------------+ |  |
|  |  | Input Validation |  | Audit Logging             | |  |
|  |  +------------------+  +---------------------------+ |  |
|  |                                                      |  |
|  |  Exposed Tools:                                      |  |
|  |   * get_student_profile                              |  |
|  |   * get_assessment_history                           |  |
|  |   * get_assessment_result                            |  |
|  |   * get_skill_performance                            |  |
|  |   * get_learning_gaps                                |  |
|  |   * get_recommended_practice                         |  |
|  +--------------------------+--------------------------+   |
|                             |                              |
|                    REST API Calls                          |
|                             |                              |
|                             v                              |
|  +------------------------------------------------------+  |
|  |             TFLAssessment REST APIs                  |  |
|  |                                                      |  |
|  |  Student API | Assessment API | Evaluation API       |  |
|  |  Skill API    | Reporting API  | Results API         |  |
|  +--------------------------+---------------------------+  |
|                             |                              |
|                             v                              |
|  +------------------------------------------------------+  |
|  |                  DATA LAYER                          |  |
|  |                                                      |  |
|  |  Student Records | Assessment Results | Skill Scores |  |
|  |  Evaluation Data | Learning History  | Skill Taxonom |  |
|  +------------------------------------------------------+  |
|                                                            |
+------------------------------------------------------------+

                   RESPONSE FLOW (BACK TO STUDENT)

  Database --> REST API --> MCP Server --> MCP Client
      --> AI Orchestration --> CoMentor Chatbot --> Student

  RESULT:
  Evidence-based feedback + Skill Gap Analysis
              + Personalized Learning Guidance



Aa a  Student Am I improving in Python?Send question and available toolsRequest assessment history toolCall get_assessment_historyValidate identity and permissionsGET authorized assessment historyAssessment resultsStructured tool resultProvide results as contextExplain progress and learning gapsPersonalized mentoring responseStudent

One important distinction: the LLM may request a tool call, but the MCP client executes the protocol interaction. The MCP server validates and performs the operation through the existing API. The model itself does not receive unrestricted database access.

## 5. Example MCP tool contract

A tool definition for assessment history could conceptually look like this:

```
{
  "name": "get_assessment_history",
  "description": "Retrieve assessment history for the authenticated student.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "skill_id": {
        "type": "string",
        "description": "Optional skill identifier, such as python"
      },
      "limit": {
        "type": "integer",
        "description": "Maximum number of recent results"
      }
    },
    "required": []
  }
}
```

The MCP server would then:

1. Obtain the authenticated student's identity from trusted server-side context.
2. Validate the optional skill identifier and result limit.
3. Call the corresponding TFLAssessment API using a service identity or delegated authorization.
4. Return structured results with assessment identifiers, dates, scores and relevant skill details.
5. Record the operation in the audit log.

Security rule: Do not trust a `student_id` supplied by the LLM to determine whose records can be accessed. Derive the student's identity from the authenticated session or verified access token. Mentor and employer access should follow separate authorization policies.

## 6. Where does the MCP server fit in your CoMentor stack?

For the Transflower environment, I would keep the existing services and introduce MCP incrementally.

React student portal

Student chat UI, performance dashboard and learning recommendations.

ASP.NET Core CoMentor API

Authentication, session handling, conversation orchestration and access control.

AI orchestration + MCP client

Model integration, tool discovery, tool invocation and result processing.

TFLAssessment MCP server

A separate service exposing assessment-related tools over MCP.

TFLAssessment APIs and database

Existing business rules, assessment records, evaluations and reporting.

For implementation, I would consider a .NET MCP server if the assessment APIs and authorization logic are primarily in ASP.NET Core. A Python MCP server is also viable if your AI orchestration is already Python-based. Choose one based on the current deployment and team skills rather than introducing another language without a clear benefit.

## 7. Security and quality requirements

Student performance data is sensitive educational information. Before connecting the chatbot to live APIs, implement these safeguards.

- Authentication: Verify the student or mentor before accessing data.
- Authorization: Students see their own records; mentors see only students they are permitted to mentor.
- Least privilege: Begin with read-only tools. Add write operations only when there is a clear need and appropriate approval.
- Data minimization: Return only the fields needed to answer the student's question.
- Auditability: Record tool name, actor, timestamp, outcome and correlation ID without unnecessarily logging sensitive content.
- Reliable interpretation: Include assessment dates, scoring scales, completion status and sample sizes.
- Grounded recommendations: Distinguish measured performance from AI-generated advice.
- Failure handling: If an API is unavailable, tell the student that the data could not be retrieved rather than generating a fabricated report.

## 8. Recommended implementation roadmap

1. Phase 1 — API inventory

   Document the existing TFLAssessment endpoints, authentication requirements, response schemas and access policies.
2. Phase 2 — Read-only MCP server

   Implement `get_assessment_history`, `get_assessment_result` and `get_skill_performance`. Connect them to the existing APIs.
3. Phase 3 — CoMentor integration

   Connect the MCP client to the chatbot's LLM orchestration layer. Test tool discovery, invocation and structured results.
4. Phase 4 — Mentoring intelligence

   Combine assessment evidence with the skill taxonomy and learning objectives to explain gaps and suggest suitable practice.
5. Phase 5 — Evaluation and rollout

   Test student isolation, mentor permissions, incorrect tool selection, missing data, prompt injection and response accuracy before a limited pilot.

## My recommendation as a Transflower Mentor

Start with a single end-to-end learning scenario:

“Show me my last three assessment results, identify my weakest Python skills, and suggest what I should practise next.”

Make this workflow reliable before adding more tools. It gives students immediate value and establishes the architecture for later features such as mentor dashboards, progress summaries, placement readiness and personalized learning paths.

The goal is not to make CoMentor a chatbot that merely talks about learning. The goal is to build a mentor that can retrieve evidence, explain progress, and guide the next step.

One final question before we move into implementation: Is your current TFLAssessment backend built with ASP.NET Core Web API, FastAPI, or Node.js? That determines the most practical MCP server implementation and integration pattern.