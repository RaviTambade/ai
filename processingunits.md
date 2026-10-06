# AI infrastructure


## 🎯 Learning Objectives

By the end of this session, students should be able to:

1. **Explain why AI does not run on a single type of chip.**
2. **Describe the role of CPU, GPU, TPU, LPU, NPU and DPU in simple terms.**
3. **Differentiate between training and inference.**
4. **Explain the difference between prefill and decode at a high level.**
5. **Understand why memory bandwidth matters during AI inference.**
6. **Trace a simplified AI request from a user's device to a data-center model and back.**
7. **Explain why modern AI systems use heterogeneous computing.**
8. **Choose the right kind of processor for a workload based on its purpose rather than simply asking, “Which chip is fastest?”**

### 🎓 Mentor Challenge

By the end, students should be able to answer: **“If GPU is not the whole AI system, then what job does each chip perform?”**

## 🎓 The Question

The mentor walks into the classroom and writes one question on the board:

> **“Which chip runs AI?”**

**Mentor:**
“Come on, everyone. Simple question. Which chip runs AI?”

Immediately, one student raises his hand.

**Student:**
“GPU, Sir!”

The mentor smiles.

**Mentor:**
“Correct... but only half correct.”

The students look confused.

**Student:**
“Sir, isn't AI running on GPUs?”

**Mentor:**
“Many AI workloads do use GPUs. But when you ask an AI system a question inside a data center, do you think one GPU is sitting there doing everything?”

**Students:**
“No, Sir.”

**Mentor:**
“Exactly. An AI system is not one chip. It is an orchestra of processors.”

 

# 🧠 Meet the Six Players

The mentor draws six boxes on the board.

```text
       AI COMPUTING TEAM

   CPU     GPU     TPU
    |       |       |
   NPU     LPU     DPU
```

**Mentor:**
“Each one has a different job.”

| Chip    | Full form                | Think of it as                    | Main job in AI systems                                                            | Typical place                    |
| ------- | ------------------------ | --------------------------------- | --------------------------------------------------------------------------------- | -------------------------------- |
| **CPU** | Central Processing Unit  | 🧠 General-purpose manager        | Runs application logic, orchestration, operating system and control tasks         | Servers, PCs, phones             |
| **GPU** | Graphics Processing Unit | 🏋️ Parallel math workhorse       | Accelerates large-scale parallel computation, especially neural-network workloads | AI servers, PCs, cloud           |
| **TPU** | Tensor Processing Unit   | 🎯 AI/tensor specialist           | Specialized acceleration for tensor and machine-learning workloads                | Google data centers / Cloud TPU  |
| **LPU** | Language Processing Unit | ⚡ Inference specialist            | Specialized architecture for fast AI inference, especially language workloads     | Specialized AI inference systems |
| **NPU** | Neural Processing Unit   | 📱 On-device AI accelerator       | Efficiently runs neural-network workloads locally                                 | Phones, laptops, edge devices    |
| **DPU** | Data Processing Unit     | 🚦 Data-center traffic controller | Offloads networking, security, storage and infrastructure processing              | Data centers                     |

### The mentor adds one important warning:

> **“Don't think of these as six competing chips. Think of them as specialists that can work together.”**

 

# 1️⃣ CPU — The General-Purpose Brain

**Mentor:**
“Let's start with the CPU.

What does CPU stand for?”

**Students:**
“Central Processing Unit.”

**Mentor:**
“Good. Think of the CPU as the **manager**. It can run operating systems, applications, business logic, orchestration, APIs, databases and many other tasks.”

```text
              CPU
               |
      +--------+--------+
      |        |        |
   Logic    Control   Orchestration
```

The CPU doesn't necessarily perform the massive matrix calculations required by an LLM. Instead, it coordinates the application.

# 2️⃣ GPU — The Mathematical Workhorse

The mentor asks:

**Mentor:**
“Why is a GPU good for AI?”

A student answers:

**Student:**
“Because it has many cores.”

**Mentor:**
“Exactly.”

Imagine one student solving one multiplication. Now imagine thousands of students solving many mathematical operations simultaneously. That's the basic intuition behind parallel computation.

```text
CPU

[Worker]
   ↓
[Worker]
   ↓
[Worker]


GPU

[W][W][W][W][W][W][W][W]
[W][W][W][W][W][W][W][W]
[W][W][W][W][W][W][W][W]
```

Neural networks perform enormous amounts of mathematical operations. So GPUs became extremely important for AI.

### Mentor's shortcut:

> **CPU = general-purpose thinking and coordination**
> **GPU = massive parallel mathematical computation**

 
# 3️⃣ TPU — Google's AI Specialist

A student asks:

**Student:**
“Sir, then why did Google create TPU?”

**Mentor:**
“Because sometimes you don't want a general worker. You want a specialist.”

TPU means: **Tensor Processing Unit**

It is Google's custom accelerator designed for machine-learning workloads, particularly tensor/matrix operations. Think of it this way:

```text
CPU
 ↓
General purpose

GPU
 ↓
Parallel computation

TPU
 ↓
Specialized AI/tensor computation
```

**Mentor:**
“Remember the principle:

> General-purpose processors are flexible. Specialized accelerators can be extremely efficient for the workloads they target.”

 

# 4️⃣ LPU — Optimized for AI Inference

Now the mentor asks:

**Mentor:**
“Who has heard of an LPU?”

Most students remain silent.

One student says:

**Student:**
“Sir, CPU, GPU and TPU I've heard. LPU is new.”

**Mentor:**
“That's okay. In this discussion, LPU refers to Groq's Language Processing Unit architecture.” Its focus is **fast AI inference**, with architecture designed around predictable, high-speed execution and very high memory bandwidth. This gives us an important distinction.
 

# 🏋️ Training vs 🚀 Inference

**Student:**
“Sir, what is inference?”

**Mentor:**
“When you train a model, you're teaching it. When you use the trained model to answer a question, that's inference.”

```text
TRAINING

Data
 ↓
Model
 ↓
Learn parameters
 ↓
Trained Model


INFERENCE

User
 ↓
Prompt
 ↓
Trained Model
 ↓
Answer
```

The hardware requirements can be different.

 

# 5️⃣ NPU — AI Inside Your Device

Now the mentor holds up a phone.

**Mentor:**
“Your phone also has AI.”

**Student:**
“Sir, does it have a GPU?”

**Mentor:**
“Yes, but modern devices may also contain an NPU.”

NPU means:  **Neural Processing Unit** . It is designed to accelerate AI/ML workloads efficiently, particularly on-device workloads.

Examples include:

* Camera processing
* Speech recognition
* Image enhancement
* Local AI features
* Small or optimized neural-network models

The big advantage?

```text
              CLOUD
                |
             Internet
                |
              Phone
```

versus:

```text
             PHONE
               |
              NPU
               |
          Local AI Model
               |
          Your Data Stays
            On Device
```

**Mentor:**
“Not every AI task needs to go to the cloud.”

That is an important architecture decision.

 

# 6️⃣ DPU — The Data Center Traffic Controller

Now comes the interesting one.

**Mentor:**
“Who handles networking?”

**Student:**
“CPU?”

**Mentor:**
“Traditionally, CPUs handled much of that work. But modern data centers can use DPUs to offload infrastructure tasks.”

DPU means: **Data Processing Unit**

It can handle workloads such as:

* Networking
* Storage
* Security
* Encryption
* Infrastructure processing

Think of it as the **traffic and infrastructure specialist**.

```text
Internet
   |
   v
 +-------+
 |  DPU  |
 +-------+
    |
    +------ Network
    |
    +------ Security
    |
    +------ Storage
    |
    v
  CPU / GPU
```

The objective is simple: **Don't make the CPU spend all its time doing infrastructure work when specialized hardware can offload it.**

 

# 🌐 Now Let's Follow One AI Request

A student becomes excited.

**Student:**
“Sir, can we trace one request from my laptop all the way to the AI model?”

The mentor smiles.

**Mentor:**
“That's the right question.”

He draws:

```text
YOU
 |
 | "Explain insurance premium calculation"
 |
 v
Internet
 |
 v
DPU
 |
 v
CPU
 |
 v
GPU / TPU
 |
 v
AI Model
 |
 v
GPU / LPU
 |
 v
CPU
 |
 v
DPU
 |
 v
YOU
```

But now the mentor says: “This is a simplified conceptual picture. Real data-center architectures vary. Not every AI request follows exactly this sequence, and different providers use different accelerator and networking architectures.”

 

# 1. DPU / Networking Layer

The request first travels through the data-center networking infrastructure. Specialized infrastructure processors such as DPUs can help with:

* Network processing
* Security
* Encryption
* Packet handling
* Storage-related infrastructure tasks

The application doesn't need to make the CPU do all of this work.

 

# 2. CPU — The Application Orchestrator

Now the request reaches the application layer. The CPU may be involved in:

```text
User Request
     |
     v
Authentication
     |
     v
Rate Limiting
     |
     v
Agent / Application Logic
     |
     +---- Retrieve documents
     |
     +---- Call tools
     |
     +---- Access databases
     |
     +---- Prepare context
     |
     v
Model Request
```

**Student:**
“So the CPU is still very important?”

**Mentor:**
“Absolutely. AI doesn't mean CPU disappears. AI systems are heterogeneous systems.”
 

# 3. GPU / TPU — Processing the Prompt

Now we reach the accelerator. Suppose the user asks:

> “Explain my insurance policy.” 

The prompt and its context are processed by the model. A simplified inference flow is:

```text
Prompt
  |
  v
Tokenization
  |
  v
Model Processing
  |
  v
Generated Tokens
```

The first major phase is commonly called:

> **Prefill**

The model processes the input sequence. A key characteristic is that much of this computation can be performed in parallel across the input tokens.

 

# 4. Decode — Generating the Answer

Then comes the fascinating part. The model starts generating the response.

For example:

```text
"The"
   ↓
"premium"
   ↓
"is"
   ↓
"calculated"
   ↓
"based"
   ↓
"on..."
```

One token at a time.

This phase is called:

> **Decode**

And now another problem becomes very important:

# Memory Bandwidth

The model repeatedly needs access to model parameters and its growing context state. So inference performance isn't simply:

> “How many arithmetic operations can the chip perform?”

It is also:

> **“How quickly can the system move the required data?”**


# 🚀 Why LPU Becomes Interesting

This is where specialized inference architectures can matter.

**Student:**
“So GPU is not automatically the fastest for every AI request?”

**Mentor:**
“Correct.”

Performance depends on:

* Model architecture
* Batch size
* Prompt length
* Output length
* Memory bandwidth
* Latency requirements
* Hardware architecture
* Software stack
* Cost

That's why specialized inference hardware exists.

 

# 📱 Now Compare It With Your Phone

The mentor puts the data center and phone side by side.

```text
        DATA CENTER                    PHONE

       DPU / Network
             |
             v
           CPU                         CPU
             |                           |
             v                           v
        GPU / TPU                       NPU
             |                           |
             v                           v
       Large AI Model              Smaller AI Model
```

**Student:**
“Sir, why can't my phone run the same huge model?”

**Mentor:**
“It may run some smaller or optimized models, but data-center models can require enormous amounts of memory and compute.”

This is why modern AI systems often divide workloads between:

```text
DEVICE AI
    +
CLOUD AI
```

 

# 🏠 Local AI vs ☁️ Cloud AI

### Local AI

```text
Camera
   ↓
NPU
   ↓
Local Model
   ↓
Result
```

Advantages can include:

* Lower latency
* Better privacy
* Offline operation
* Reduced network dependency

### Cloud AI

```text
Device
  ↓
Internet
  ↓
Data Center
  ↓
CPU + GPU/TPU + Infrastructure
  ↓
Large Model
  ↓
Response
```

Advantages can include:

* Large models
* Large memory
* Massive compute
* Centralized updates
* Scalable infrastructure

 

# 🏭 And Where Does Training Happen?

A student asks the final question:

**Student:**
“Sir, where does all this AI learning happen?”

**Mentor:**
“Before you ever ask the model a question.”

```text
                 TRAINING
                    |
        +-----------+-----------+
        |                       |
       GPU                     TPU
        |                       |
        +-----------+-----------+
                    |
                    v
              TRAINED MODEL
                    |
                    v
                DEPLOYMENT
                    |
                    v
                 INFERENCE
```

Training can require enormous amounts of compute. Large clusters of accelerators work together for long periods. After training, the resulting model can be deployed for inference.
 

# 🧠 The Bigger Lesson

The student who originally answered:  “GPU!” . Now understands something different.

**Student:**
“Sir, AI doesn't run on a single chip.”

**Mentor:**
“Exactly.”

AI computing is a **team sport**.

```text
                AI SYSTEM
                    |
      +-------------+-------------+
      |             |             |
     CPU           GPU           TPU
      |             |             |
   Control       Compute       AI/Tensor
      |
      +-------------+
      |
     DPU
      |
 Infrastructure

     NPU
      |
 On-device AI

     LPU
      |
 Specialized inference
```

 

# 🌱 Recap — What Did We Learn?

The mentor closes the laptop.

**Mentor:**
“Okay. No notes.

I'm going to ask six questions.”

### Question 1

**Mentor:**
“Which chip is the general-purpose manager?”

**Students:**
“CPU!”

### Question 2

**Mentor:**
“Which chip is famous for massive parallel computation?”

**Students:**
“GPU!”

### Question 3

**Mentor:**
“Which Google accelerator specializes in tensor and machine-learning workloads?”

**Students:**
“TPU!”

### Question 4

**Mentor:**
“Which specialized architecture is associated with very fast language-model inference?”

**Students:**
“LPU!”

### Question 5

**Mentor:**
“Which chip brings AI acceleration onto phones, laptops and edge devices?”

**Students:**
“NPU!”

### Question 6

**Mentor:**
“Which processor can offload networking, security and storage work in a data center?”

**Students:**
“DPU!”

The mentor smiles.
 

## 🧩 The Six-Word Memory Trick

```text
CPU → Coordinate
GPU → Compute
TPU → Tensor
LPU → Language
NPU → Neural
DPU → Data
```

**Mentor:**
“If you remember only one line from today's class, remember this.”

> **CPU coordinates.**
> **GPU computes.**
> **TPU accelerates tensors.**
> **LPU targets language inference.**
> **NPU brings AI to the device.**
> **DPU handles data-center infrastructure.**

 

# 🎯 Final Student Challenge

The mentor writes one final question on the board:  **“You are designing an AI application. Which processor should handle each workload, and why?”**  Don't answer:  “GPU, because AI uses GPUs.”

Instead ask:

* Is this **general-purpose orchestration**?
* Is this **massively parallel computation**?
* Is this **tensor/ML acceleration**?
* Is this **low-latency inference**?
* Is this **on-device AI**?
* Is this **network/storage/security infrastructure**?

That is the beginning of **AI systems thinking**.

 

# 🌱 Transflower Mentor Takeaway

Don't memorize these chips merely for an interview. Understand **why specialized hardware exists**.

The evolution is:

```text
General Purpose
      ↓
Parallel Processing
      ↓
AI Acceleration
      ↓
Specialized AI Hardware
      ↓
Heterogeneous Computing
```

And remember:

> **AI is not a chip.**

> **AI is a system of software, models, memory, networking and specialized compute working together.**

The final question is not:

> **“Which chip runs AI?”**

The better engineering question is:

> **“Which workload should run on which processor, and why?”**

That is when you stop merely **using AI**...

and start understanding **AI infrastructure**.