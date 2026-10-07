 # Where Does DevOps Fit in the AI World?

### 🎯 Learning Objectives

By the end of this session, students should be able to:

1. Understand the major layers of an AI application stack.
2. Identify where DevOps, Platform Engineering and SRE fit into AI engineering.
3. Understand the role of model serving, orchestration, inference optimization and observability.
4. Connect traditional DevOps practices with AI workloads.
5. Understand why system design becomes critical when AI applications move to production.
6. Explain the journey:

```text
Deploy → Scale → Optimize → Monitor → Operate
```

7. Understand that **building an AI application is not only about selecting an LLM.**


# 🧑‍🏫 Mentor Starts With a Question

**Mentor:** "Suppose you have built a beautiful AI application."

**Student:** "Great! We have connected our application to OpenAI API. It works!"

**Mentor:** "Excellent. Now I have one question."

**Student:** "What?"

**Mentor:** "Tomorrow 10,000 users start using it. What happens?"

Silence. 😄

**Student 1:** "The API will handle it?"

**Mentor:**  "Maybe."

**Student 2:**  "We can increase the server."

**Mentor:**  "Good. How?"

**Student 2:**  "Scale the application."

**Mentor:**  "How will you monitor it?"

Silence again.

**Mentor:**

- "How will you know whether the model is slow?"
- "How will you route traffic?"
- "Where will you cache?"
- "How will you serve your own model?"
- "How will you deploy 20 replicas?"
- "How will you recover when one instance crashes?"

Now the students understand the problem.


# 💡 AI Application ≠ AI Model

This is one of the most important ideas. A production AI application is not simply:

```text
User
  |
  v
LLM
  |
  v
Answer
```

That is a **demo**. A production system looks more like:

```text
                       AI APPLICATION

Users
  |
  v
+----------------------+
| Frontend / Client    |
+----------------------+
          |
          v
+----------------------+
| API Gateway          |
| Authentication       |
| Rate Limiting        |
+----------------------+
          |
          v
+----------------------+
| Application Layer    |
| Agents / Workflows   |
| Business Logic       |
+----------------------+
          |
          +------------------+
          |                  |
          v                  v
     +---------+       +-------------+
     |   RAG   |       | Tools/APIs  |
     +---------+       +-------------+
          |                  |
          +--------+---------+
                   |
                   v
             +-----------+
             | AI Model  |
             +-----------+
                   |
                   v
             Model Serving
                   |
                   v
          Infrastructure Layer
```

And underneath everything:

```text
Compute
Networking
Containers
Orchestration
Storage
Caching
Observability
Security
Scaling
```

# 🏗️ Think in Layers

**Mentor:** "Students, don't look at AI as one technology." Think about it as a **stack**.

```text
+--------------------------------------------------+
|                 USER / EXPERIENCE                |
|          Web / Mobile / Chat / APIs              |
+--------------------------------------------------+
|              AI APPLICATION LAYER                |
|   Agents | Workflows | Business Logic | Tools    |
+--------------------------------------------------+
|                 KNOWLEDGE LAYER                  |
|       RAG | Vector DB | Search | Documents       |
+--------------------------------------------------+
|                 MODEL LAYER                      |
|       LLM | Foundation Model | Embeddings        |
+--------------------------------------------------+
|              MODEL SERVING LAYER                 |
|       vLLM | SGLang | TensorRT-LLM               |
+--------------------------------------------------+
|            INFERENCE OPTIMIZATION                |
|       Batching | Caching | KV Cache | Scaling    |
+--------------------------------------------------+
|              ORCHESTRATION LAYER                 |
|          Kubernetes | Ray | Slurm                |
+--------------------------------------------------+
|              INFRASTRUCTURE LAYER                |
|   Compute | Network | Storage | Containers      |
+--------------------------------------------------+
|             OBSERVABILITY / SECURITY             |
|       Metrics | Logs | Traces | Alerts           |
+--------------------------------------------------+
```

This is where the **DevOps engineer becomes extremely important.**

# 👨‍💻 Student Question

**Student:** "Sir, I am a DevOps engineer. I don't know how to train an LLM. Where do I fit?"

**Mentor:**  "You don't necessarily need to train the LLM. Your job may be to make the AI system **available, scalable, observable and reliable**." That's a very different responsibility.

 

# 1️⃣ Model Serving

### What does Model Serving mean?

Suppose you have a model.

```text
Llama
Mistral
Qwen
Gemma
etc.
```

The model sitting on a disk is not useful to users. Someone needs to load that model into compute infrastructure and expose it through an interface.

```text
                 MODEL

              model files
                  |
                  v
        +-------------------+
        |   Model Server    |
        +-------------------+
                  |
                  v
             HTTP / API
                  |
                  v
               Users
```

This is **model serving**.

Examples include:

* vLLM
* SGLang
* TensorRT-LLM

They provide software infrastructure for efficiently serving models for inference.

### Mentor analogy

Imagine a restaurant. The **model** is the recipe. The **model server** is the kitchen. The customer doesn't enter the kitchen and manipulate the recipe. The customer sends:

```text
"Give me a pizza."
```

The serving system handles the request and produces the result.

 

# 2️⃣ Orchestration

Now imagine:

```text
100 users
1000 users
10,000 users
```

One server may not be enough. You need multiple workloads.

```text
              Load Balancer
                    |
          +---------+---------+
          |         |         |
          v         v         v
       Server 1  Server 2  Server 3
          |         |         |
       Model     Model     Model
       Server    Server    Server
```

Who manages these workloads? This is where **orchestration** comes in.

Examples:

* Kubernetes
* Ray
* Slurm

The orchestrator helps manage:

```text
Deploy
Scale
Schedule
Recover
Distribute
Manage resources
```

### Kubernetes example

```text
                    Kubernetes
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
      AI Pod          AI Pod          AI Pod
          |              |              |
       Model          Model          Model
```

If one pod crashes:

```text
AI Pod ❌
```

The orchestration platform can create another instance. That is infrastructure engineering.

 

# 3️⃣ Inference Optimization

Now comes an interesting question.

**Student:** "Sir, if the model is working, why do we need optimization?"

**Mentor:**  "Because working is not enough."

Suppose:

```text
Request → 10 seconds
```

Users may complain. After optimization:

```text
Request → 2 seconds
```

Now the system feels much better.

 

## What can we optimize?

### 🔹 Scaling

Run more instances when demand increases.

```text
Low traffic

      Model
        |
       10 users


High traffic

        Load Balancer
       /      |      \
      /       |       \
 Model      Model     Model
```

 

### 🔹 Caching

If the same information is repeatedly requested, don't unnecessarily recompute everything.

```text
User
 |
 v
Cache
 |
 +---- HIT ----> Return result
 |
 +---- MISS ---> Model
```

Caching can reduce:

* latency
* compute usage
* cost

 

### 🔹 KV Cache

During LLM inference, the model repeatedly processes contextual information. Modern serving systems use techniques such as **KV caching** to avoid recomputing certain attention-related information unnecessarily. Conceptually:

```text
Previous context
      |
      v
+-------------+
| KV Cache    |
+-------------+
      |
      v
New token generation
```

This becomes particularly important when serving large language models efficiently.

 

# 4️⃣ Observability

Now the mentor asks: "Your AI application is slow. Why?"

**Student:**  "Maybe the model is slow."

**Mentor:** "Maybe." But perhaps the real problem is:

```text
Frontend
   |
   v
API Gateway       100 ms
   |
   v
RAG Retrieval     800 ms
   |
   v
Vector Database   500 ms
   |
   v
Model Inference   3000 ms
   |
   v
Response          100 ms
```

Without observability, you are guessing. With observability, you can see where time is being spent.

 

# 🔍 The Three Pillars

A useful mental model is:

```text
          OBSERVABILITY

       +---------------+
       |    Metrics    |
       +---------------+

       +---------------+
       |     Logs      |
       +---------------+

       +---------------+
       |    Traces     |
       +---------------+
```

### Metrics

Numbers.

```text
CPU usage
GPU utilization
Memory
Latency
Requests/sec
Error rate
Token throughput
```

### Logs

Events.

```text
Request received
Model loaded
Authentication failed
Database timeout
Model error
```

### Traces

Follow one request through the system.

```text
User Request
     |
     v
API
     |
     v
RAG
     |
     v
Vector DB
     |
     v
LLM
     |
     v
Response
```

# 🧠 The DevOps Engineer's New AI Landscape

**Student:**  "Sir, all these things look familiar."

**Mentor:**  "Exactly!"

If you already know DevOps, you already have a strong foundation. Traditional application:

```text
Code
 |
 v
Build
 |
 v
Test
 |
 v
Deploy
 |
 v
Scale
 |
 v
Monitor
 |
 v
Operate
```

AI application:

```text
AI Application
 |
 v
Containerize
 |
 v
Deploy
 |
 v
Scale
 |
 v
Optimize Inference
 |
 v
Monitor
 |
 v
Operate
```

The fundamental engineering principles haven't disappeared. The workload has changed.

 

# 🔥 DevOps → AI Infrastructure

| Traditional DevOps     | AI Infrastructure                         |
| ---------------------- | ----------------------------------------- |
| Application deployment | AI application/model deployment           |
| Containers             | Model/application containers              |
| Kubernetes             | AI workload orchestration                 |
| Load balancing         | AI request routing                        |
| Autoscaling            | Inference workload scaling                |
| Redis/cache            | Prompt/result/cache optimization          |
| Monitoring             | AI + infrastructure observability         |
| Logs                   | Application + model-serving logs          |
| Tracing                | End-to-end AI request tracing             |
| CI/CD                  | AI application/model deployment pipelines |
| Infrastructure         | GPU/CPU/accelerator infrastructure        |

The DevOps mindset remains valuable.

 

# 🏗️ System Design Becomes More Important

Now the mentor writes on the board: 
> **AI Engineering = AI Knowledge + Software Engineering + System Design + Infrastructure**

Why? Because once the AI application becomes popular, engineering questions appear.

### Question 1

> "Where should the data live?"

Database.

### Question 2

> "How do we scale the database?"

Database architecture.

### Question 3

> "How do we distribute requests?"

Load balancing.

### Question 4

> "How do we deploy 100 containers?"

Container orchestration.

### Question 5

> "How do we serve a large model?"

Model serving.

### Question 6

> "How do we reduce latency?"

Inference optimization.

### Question 7

> "How do we find why the system is slow?"

Observability.

### Question 8

> "How do we handle 100,000 requests?"

Distributed system design.

 

# 🌐 Production AI Architecture

Let's put everything together.

```text
                         USERS
                           |
                           v
                  +----------------+
                  | Load Balancer  |
                  +----------------+
                           |
                           v
                  +----------------+
                  | API Gateway    |
                  +----------------+
                           |
                           v
                  +----------------+
                  | AI Application |
                  | / Agent Layer  |
                  +----------------+
                     /          \
                    /            \
                   v              v
             +----------+    +-----------+
             | RAG      |    | Tools/API |
             +----------+    +-----------+
                   |
                   v
             +-----------+
             | Vector DB |
             +-----------+
                   |
                   v
             +----------------+
             | Model Serving  |
             | vLLM/SGLang/   |
             | TensorRT-LLM   |
             +----------------+
                   |
                   v
             +----------------+
             | GPU / AI       |
             | Accelerators   |
             +----------------+

      -----------------------------------------
             Infrastructure Layer

       Containers | Kubernetes | Networking
       Storage | Security | Scaling | Cache

      -----------------------------------------

                Observability

        Metrics | Logs | Traces | Alerts
```

This is much closer to a **production AI system** than simply calling an LLM API.

 

# 🎯 A Very Important Distinction

**Student:**  "Sir, so should every company build and host its own model?"

**Mentor:**  "No."

There are two broad approaches.

### Option 1 — Consume a managed model

```text
Your Application
      |
      v
OpenAI / Azure OpenAI / Other Provider
      |
      v
Foundation Model
```

You don't manage the model infrastructure yourself. Your infrastructure responsibility is primarily around your application.


### Option 2 — Host your own model

```text
Your Application
      |
      v
Model Serving
      |
      v
GPU Infrastructure
      |
      v
Your Model
```

Now you have additional responsibilities:

```text
GPU
Memory
Model loading
Model serving
Scaling
Batching
Caching
Networking
Monitoring
Cost optimization
```

This is where AI infrastructure becomes a specialized engineering discipline.
 
# 🚀 The DevOps Mindset Still Works

The mentor writes five words:

```text
        DEPLOY
           ↓
         SCALE
           ↓
        OPTIMIZE
           ↓
        MONITOR
           ↓
        OPERATE
```

**Mentor:**  "Students, remember this. AI has introduced new technologies. But it has not eliminated engineering fundamentals. A production AI system still needs:

```text
Reliability
Scalability
Security
Performance
Observability
Automation
Cost Management
```

 
# 🧩 Where Does a DevOps Engineer Fit?

The answer is:

```text
                    AI ENGINEERING

        +-------------------------------+
        |       AI Application          |
        | Agents | RAG | Tools | LLM    |
        +-------------------------------+
                       |
                       v
        +-------------------------------+
        |       AI Infrastructure       |
        |                               |
        | Model Serving                 |
        | Orchestration                 |
        | Inference Optimization        |
        | Networking                    |
        | Containers                    |
        | Scaling                       |
        | Caching                       |
        | Observability                 |
        +-------------------------------+
                       |
                       v
                 DEVOPS / SRE
```

Your existing skills are not becoming irrelevant. They are becoming **more valuable in a new environment**.

 

# 🧑‍🏫 Mentor's Final Question

**Mentor:** "What is the difference between an AI demo and a production AI application?"

**Student:**  "A demo proves that the model can work."

**Mentor:**  "And?"

**Student:**  "A production system must make that capability available to real users reliably, securely, observably and at scale."

**Mentor:**  "Exactly!"


# 🌱 Recap

Today we learned that an AI application is a **stack**, not just a model.

### Model Serving

Runs and exposes models for production inference.

```text
vLLM | SGLang | TensorRT-LLM
```

### Orchestration

Deploys, schedules, coordinates and scales workloads.

```text
Kubernetes | Ray | Slurm
```

### Inference Optimization

Makes inference more efficient.

```text
Scaling
Caching
Batching
KV Cache
```

### Observability

Helps us understand what is happening inside the system.

```text
Metrics
Logs
Traces
Alerts
```

### System Design

Connects everything together.

```text
Database
Networking
Compute
Containers
Scaling
Caching
Security
Reliability
```

# 🧠 Transflower Memory Formula

Remember:

```text
AI Engineering = AI Models + Software Engineering + System Design + Infrastructure + DevOps
```

And for a DevOps engineer:

```text
Deploy
   ↓
Scale
   ↓
Optimize
   ↓
Monitor
   ↓
Operate
```

# 💬 Final Transflower Takeaway

> **AI doesn't eliminate DevOps. AI expands the DevOps playground.**

A model may produce the intelligence. But infrastructure makes that intelligence:

**Available → Scalable → Fast → Observable → Reliable**

So don't ask only:  **"Which LLM should I use?"** Start asking:  **"How will this AI system behave when 10 users become 10,000 users?"**  That is where **AI Engineering meets DevOps and System Design.**

And that is where a DevOps engineer can become an **AI Infrastructure Engineer / AI Platform Engineer**.
