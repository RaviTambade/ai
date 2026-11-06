# TFLCoMentor – Next Engineering Milestone

## Building a Goal Execution Engine for Agentic AI

In our previous discussion, we explored four engineering layers:

1. Prompt Engineering
2. Context Engineering
3. Harness Engineering
4. Loop Engineering

Now let's move from concepts to implementation. 

Our next challenge: How do we build an execution engine that ensures an AI agent completes a business goal instead of merely generating a response?

Imagine a student tells TFLCoMentor:"Sir, I want to become an AI-enabled Full Stack Developer. Assess my current skills and prepare my learning roadmap." This is not a single LLM request. It is a business goal involving multiple operations, APIs, decisions and verification steps.

## 1. What is a Goal Execution Engine?

Mentor: Students, when you write a program, you define a starting point, execute instructions and produce an output. But imagine a program whose task is not just to calculate something. Its responsibility is to achieve an outcome.

For example:

- Retrieve student information.
- Analyze existing skills.
- Identify knowledge gaps.
- Recommend learning activities.
- Generate a roadmap.
- Save the roadmap.
- Verify successful persistence.

We need an execution engine to coordinate these operations. Think of it as a project manager working with a team. The project manager does not personally perform every task. The manager assigns work, checks progress, handles failures and confirms delivery.

That is the responsibility of our Goal Execution Engine.

## 2. Goal Execution Engine – Internal architecture

A useful design is to separate the execution engine from the LLM provider.

```
              User Goal
                  |
                  v
          Goal Execution API
                  |
                  v
          Goal Execution Engine
                  |
        +---------+---------+
        |         |         |
        v         v         v
      Goal      State     Policy
     Manager   Manager   Manager
        |         |         |
        +---------+---------+
                  |
                  v
          Task Orchestrator
                  |
          +-------+-------+
          |       |       |
          v       v       v
        LLM     MCP     Business
              Client     APIs
          |       |       |
          +-------+-------+
                  |
                  v
           Result Verifier
                  |
                  v
          Execution Recorder
                  |
                  v
            Final Status
```

The key architectural decision: The LLM proposes decisions; the execution engine controls execution. The execution engine should remain responsible for state transitions, limits, permissions and completion status.

## 3. Define the goal execution lifecycle

Before writing code, let's define the states.

| State      | Meaning                                      |
| ---------- | -------------------------------------------- |
| Created    | Goal registered                              |
| Planned    | Execution plan generated                     |
| Running    | Tasks being executed                         |
| Waiting    | Waiting for an external operation or human   |
| Verifying  | Checking expected outcomes                   |
| Completed  | Success criteria satisfied                   |
| Failed     | Non-recoverable failure                      |
| Incomplete | Execution stopped without achieving the goal |
| Cancelled  | Execution explicitly cancelled               |

Illustrative state machine:

```
 CREATED
    |
    v
 PLANNED
    |
    v
 RUNNING <----------+
    |               |
    v               |
 WAITING            |
    |               |
    v               |
 RUNNING            |
    |               |
    v               |
 VERIFYING          |
    |               |
    +---- SUCCESS --+----> COMPLETED
    |
    +---- RETRY ---------> RUNNING
    |
    +---- ERROR ---------> FAILED
    |
    +---- LIMIT ---------> INCOMPLETE
```

A production implementation must also define cancellation, timeout, human approval and recovery transitions.

## 4. Design the core domain objects

For TFLCoMentor, I would start with four domain objects.

| Object             | Responsibility                    |
| ------------------ | --------------------------------- |
| Goal               | Describes the business outcome    |
| Task               | Describes an individual operation |
| ExecutionState     | Tracks current progress           |
| VerificationResult | Provides evidence of completion   |

Example goal:

```
{
  "goalId": "GOAL-1001",
  "studentId": "STU-101",
  "goalType": "CreateLearningRoadmap",
  "status": "Created",
  "successCriteria": [
    "Student profile retrieved",
    "Assessment results retrieved",
    "Skill gaps identified",
    "Learning plan generated",
    "Learning plan persisted",
    "Persisted plan verified"
  ],
  "maxIterations": 5
}
```

Notice that the success criteria are explicit. The agent cannot decide that it has completed the task simply because it has generated a convincing response.

## 5. Implementing the engine in ASP.NET Core

Since our TFLCoMentor orchestration backend uses ASP.NET Core, let's design the execution contract in C#.

Step 1 – Goal definition

```
public class Goal
{
    public Guid Id { get; set; }

    public string StudentId { get; set; } = string.Empty;

    public string GoalType { get; set; } = string.Empty;

    public GoalStatus Status { get; set; }

    public int MaxIterations { get; set; } = 5;

    public int CurrentIteration { get; set; }

    public DateTime CreatedAt { get; set; }
}
```

Step 2 – Goal status

```
public enum GoalStatus
{
    Created,
    Planned,
    Running,
    Waiting,
    Verifying,
    Completed,
    Failed,
    Incomplete,
    Cancelled
}
```

Step 3 – Execution engine contract

```
public interface IGoalExecutionEngine
{
    Task<GoalExecutionResult> ExecuteAsync( Guid goalId, CancellationToken cancellationToken );
}
```

Step 4 – Execution result

```
public class GoalExecutionResult
{
    public Guid GoalId { get; set; }
    public GoalStatus Status { get; set; }
    public bool IsVerified { get; set; }
    public string Message { get; set; } = string.Empty;
}
```

Mentor's observation:

We are applying object-oriented design principles here.

- Encapsulation: execution details remain inside the engine.
- Abstraction: the interface hides implementation.
- Separation of concerns: goal management is separate from LLM integration.
- Dependency injection: different orchestration and verification implementations can be supplied.

This makes the execution engine testable and independent of a particular LLM framework.

## 6. Persistence design – MySQL

The execution engine must survive application restarts.

I would introduce three initial tables in `tflcomentor_db`.

```
+-----------------------+
|       ai_goals        |
+-----------------------+
| id                    |
| student_id            |
| goal_type             |
| status                |
| max_iterations        |
| current_iteration     |
| created_at            |
| updated_at            |
+-----------------------+
             |
             | 1
             |
             | N
+-----------------------+
|      ai_tasks         |
+-----------------------+
| id                    |
| goal_id               |
| task_name             |
| task_status           |
| sequence_number       |
| retry_count           |
| result_reference      |
+-----------------------+

+-----------------------+
|   ai_execution_logs   |
+-----------------------+
| id                    |
| goal_id               |
| task_id               |
| event_type            |
| input_summary         |
| output_summary        |
| execution_status      |
| created_at            |
+-----------------------+
```

For production, I would additionally introduce:

- `ai_goal_criteria` – individual success criteria and verification status.
- `ai_execution_checkpoints` – durable recovery points.
- `ai_tool_invocations` – tool-call arguments, outcomes and idempotency references.
- `ai_approvals` – human approval records.

Do not store secrets or unnecessary personal data in execution logs.

## 7. The most important engineering principle: Verification

Let's test our understanding.

Suppose the MCP client calls:

```
save_learning_plan(studentId, plan)
```

The API returns:

```
{
  "success": true,
  "planId": "LP-1005"
}
```

Can we immediately mark the goal completed?

Student:Sir, the API says success. Isn't that sufficient?

Mentor:Not always!

The response confirms that the API reported success. But we still need to establish that the required business outcome exists.

For example:

```
API Response Received
         |
         v
Plan ID Returned
         |
         v
Read Plan by ID
         |
         v
Compare Expected Data
         |
    +----+----+
    |         |
  Match     Mismatch
    |         |
    v         v
Verified   Investigate
    |
    v
Goal Completed
```

In real systems, verification must account for eventual consistency, transaction boundaries and partial failures. For an operation requiring human approval, the engine must remain in `Waiting` until the approval is actually received. Never allow the LLM to manufacture verification evidence.

## 8. Testing the Goal Execution Engine

Before integrating an LLM, test the engine using predictable mock services.

| Test scenario                  | Expected behavior              |
| ------------------------------ | ------------------------------ |
| All APIs succeed               | Goal completed                 |
| Assessment API fails           | Retry or fail safely           |
| Learning plan validation fails | Do not save                    |
| Save API times out             | Check persistence before retry |
| Duplicate execution request    | Prevent duplicate plan         |
| Verification fails             | Do not report completion       |
| Maximum iterations reached     | Mark incomplete                |
| Human approval pending         | Remain waiting                 |

This is an important lesson: Agentic AI needs conventional software testing just as much as conventional applications do.

## 9. Our implementation roadmap

I would build this in six incremental milestones.

1. Milestone 1 – Goal Management

   Create goal, update status and define success criteria.
2. Milestone 2 – Task Orchestration

   Execute individual tasks using APIs and MCP tools.
3. Milestone 3 – State Management

   Maintain execution state and durable checkpoints.
4. Milestone 4 – Loop Controller

   Implement retries, timeouts, iteration limits and no-progress detection.
5. Milestone 5 – Verification Engine

   Verify business outcomes independently of LLM responses.
6. Milestone 6 – Observability

   Add execution logs, metrics, audit trails and human escalation.

## 10. Mentor's assignment to TAP students

Build a small Goal Execution Engine without using an agent framework initially.

Use:

- ASP.NET Core Web API
- C#
- MySQL
- Dependency Injection
- Mock LLM service
- Mock MCP tools
- xUnit testing

Once the engine works, integrate an LLM. This exercise will teach students why architecture and fundamentals must come before frameworks.

## The next big idea

Next engineering session

# Agent State Management and Durable Execution

How does an AI agent remember where it stopped?

What happens when:

- The server crashes during execution?
- An API succeeds but the response is lost?
- The student resumes the conversation tomorrow?
- A human mentor needs to approve the next step?

We will explore state machines, checkpoints, event logs, idempotency and resumable workflows.

Ravi Sir's closing thought:

"A good developer writes code that performs a task. A good architect designs a system that handles failures. An AI engineer builds a system that knows whether the intended outcome has actually been achieved."

At Transflower, we should teach students not merely to build agents that can act, but to build agents that can prove what they have accomplished.

That is the difference between an AI demo and enterprise AI engineering.