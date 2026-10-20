# What are Transformers in AI Engineering?

A Transformer is a neural network architecture designed to understand relationships between elements in a sequence, such as words in a sentence, tokens in a prompt, or parts of source code.

Transformers are the foundation of many modern Large Language Models (LLMs), including GPT-style models, and are also used in image processing, speech recognition, and multimodal AI.

The original Transformer architecture was introduced in the 2017 research paper Attention Is All You Need.

## 1. Understand with a simple example

Imagine a student asks an AI mentor:  “Ravi gave Rahul his book because he needed it.”

Who does “he” refer to? What does “it” refer to?

To interpret a sentence, the model needs to understand how different words relate to each other. A Transformer uses a mechanism called attention to learn these relationships from context.

How attention connects words
```
+------------------------------------------------------+
|           HOW SELF-ATTENTION CONNECTS WORDS          |
+------------------------------------------------------+

  INPUT SENTENCE
  --------------

   +-------+   +-------+   +-------+   +-------+   +-------+
   | Ravi  |   | gave  |   | Rahul |   |  his  |   | book  |
   +-------+   +-------+   +-------+   +-------+   +-------+
       |           |           |           |           |
       +-----------+-----------+-----------+-----------+
                               |
                               v
              +--------------------------------+
              |         SELF-ATTENTION         |
              |                                |
              | Learns which other words are   |
              | relevant to each word.         |
              +--------------------------------+
                               |
                               v
              +--------------------------------+
              |       ATTENTION WEIGHTS        |
              |                                |
              |        Ravi  gave  Rahul his   |
              | Ravi    .40   .20   .25  .10   |
              | gave    .15   .45   .20  .10   |
              | Rahul   .20   .25   .40  .10   |
              | his     .10   .15   .15  .50   |
              |                                |
              | Each row represents how a word |
              | distributes attention across   |
              | the words in the sentence.     |
              +--------------------------------+
                               |
                               v
              +--------------------------------+
              | CONTEXT-AWARE REPRESENTATIONS  |
              |                                |
              | Ravi  -> [0.12, 0.45, 0.31...] |
              | gave  -> [0.08, 0.52, 0.27...] |
              | Rahul -> [0.15, 0.48, 0.33...] |
              | his   -> [0.10, 0.40, 0.36...] |
              | book  -> [0.07, 0.46, 0.38...] |
              +--------------------------------+
                               |
                               v
              +--------------------------------+
              | Each token is represented using|
              | information from its relevant  |
              | context.                       |
              +--------------------------------+

  NOTE:
  -----
  Self-attention helps a model learn contextual relationships.
  It does not guarantee that the model will interpret every
  sentence correctly.

  The attention weights and vectors above are illustrative,
  not actual model calculations.
```

Think of attention as a classroom discussion. When a student asks a question, the mentor doesn't treat every word as equally important. The mentor focuses on the words and context that matter for the answer.

## 2. Transformer architecture

A Transformer processes input through several layers of mathematical operations and learned neural network parameters.

Input text

“Build a student assessment API”

Tokenization

Split text into tokens

Token embeddings + position information

Convert tokens into numerical vectors

Transformer blocks

Multi-Head Self-Attention

Feed-Forward Neural Network

Residual connections and normalization also help stabilize learning.

Output layer

Contextual representations or token predictions, depending on the model

The original Transformer uses encoder and decoder stacks. Many modern LLMs use a decoder-only Transformer, while models such as BERT use encoder-based architectures.&#x20;

## Transformer Architecture — ASCII Diagram

```
             TRANSFORMER ARCHITECTURE
             =======================

                  Input Text
       "Build a student assessment API"
                       |
                       v
              +------------------+
              |   Tokenization   |
              | Split into tokens|
              +------------------+
                       |
                       v
              +------------------+
              | Token Embeddings |
              |       +          |
              | Position Info    |
              +------------------+
                       |
                       v
        +--------------------------------+
        |       TRANSFORMER BLOCK        |
        |                                |
        |  +--------------------------+  |
        |  |   Multi-Head Attention   |  |
        |  |                          |  |
        |  | Query (Q)                |  |
        |  | Key   (K)                |  |
        |  | Value (V)                |  |
        |  +--------------------------+  |
        |               |                |
        |               v                |
        |  +--------------------------+  |
        |  | Add & Layer Normalization|  |
        |  +--------------------------+  |
        |               |                |
        |               v                |
        |  +--------------------------+  |
        |  | Feed-Forward Neural Net  |  |
        |  +--------------------------+  |
        |               |                |
        |               v                |
        |  +--------------------------+  |
        |  | Add & Layer Normalization|  |
        |  +--------------------------+  |
        +--------------------------------+
                       |
                       v
             /------------------\
            /  Repeat multiple   \
           |  Transformer Blocks  |
            \--------------------/
                       |
                       v
              +------------------+
              |   Output Layer   |
              +------------------+
                       |
                       v
              +------------------+
              | Next-Token        |
              | Prediction        |
              +------------------+
                       |
                       v
                 Generated Text
```

### How Self-Attention works

```
              Input Token Embeddings
                        |
            +-----------+-----------+
            |           |           |
            v           v           v
        +-------+   +-------+   +-------+
        | Query |   |  Key  |   | Value |
        |   Q   |   |   K   |   |   V   |
        +-------+   +-------+   +-------+
            |           |
            +-----+-----+
                  |
                  v
         +--------------------+
         | Attention Scores   |
         |       Q x K^T      |
         +--------------------+
                  |
                  v
         +--------------------+
         | Softmax / Weights  |
         +--------------------+
                  |
                  v
         +--------------------+
         | Weighted Values V  |
         +--------------------+
                  |
                  v
         Context-Aware Token Representations
```

### Mentor's explanation

- Tokenization: Converts text into tokens.
- Embeddings: Convert tokens into numerical vectors.
- Position information: Helps represent token order.
- Self-attention: Learns relationships between tokens.
- Multi-head attention: Learns different relationships in parallel.
- Feed-forward network: Further transforms each token's representation.
- Residual connections and layer normalization: Help information flow and training stability.
- Output layer: In a decoder-only LLM, produces scores used to predict the next token.

Important: The diagram shows a simplified decoder-only Transformer commonly used in GPT-style LLMs. The original Transformer architecture contains both an encoder and a decoder.

## 3. The key concept: Self-attention

Self-attention lets each token calculate how much information to draw from other tokens in its permitted context.

It uses three learned representations:

- Query (Q): What information am I looking for?
- Key (K): What information does each token offer?
- Value (V): What information can each token contribute?

The attention calculation is commonly expressed as:

\\[ \operatorname{Attention}(Q,K,V) =\operatorname{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V \\]

Here, \\(d_k\\) is the dimension of the key vectors. The softmax converts attention scores into weights, which are used to combine value vectors.

Mentor analogy: A Query is the question asked by a student, Keys are the labels on reference books, and Values are the useful information retrieved from those books.

Multi-head attention runs several attention operations in parallel, allowing the model to learn different types of relationships.

## 4. Different types of Transformer models

| Architecture    | How it works                                   | Examples and uses                                       |
| --------------- | ---------------------------------------------- | ------------------------------------------------------- |
| Encoder-only    | Reads context bidirectionally                  | BERT; classification and text understanding             |
| Decoder-only    | Predicts the next token using previous context | GPT-style models; text and code generation              |
| Encoder-decoder | Encodes input and generates output             | Original Transformer, T5; translation and summarization |

These are broad architectural patterns; individual models may include additional design choices.

## 5. How Transformers relate to AI Engineering

Transformer

The neural network architecture that processes tokens and learns contextual representations.

LLM

A trained language model that often uses Transformer blocks to understand and generate text.


AI Engineering

Integrates models with prompts, RAG, APIs, tools, security, evaluation, and deployment to solve real problems.

For example, when building a CoMentor chatbot:

1. A Transformer-based LLM interprets the mentor's question.
2. The application retrieves authorized student assessment data.
3. The LLM uses that context to formulate guidance.
4. Application logic validates permissions and the response before displaying it.

The Transformer itself does not automatically know the latest assessment results or have permission to access a database. Those capabilities come from the surrounding application.

## 6. What should you learn next?

A practical learning sequence for AI Engineering is:

1. Tokens, tokenization, embeddings and vector representations.
2. Attention, Query-Key-Value, and multi-head attention.
3. Transformer blocks, positional information, and feed-forward layers.
4. LLM training, pretraining, fine-tuning, and inference.
5. Using pretrained models with Python and Hugging Face Transformers.
6. Building applications with prompt engineering, RAG, MCP, and API integrations.

For the original research, read Attention Is All You Need by Vaswani and colleagues. [Read the original paper on arXiv](https://arxiv.org/abs/1706.03762?utm_source=chatgpt.com).

The key takeaway: A Transformer is the architecture, an LLM is a trained model, and an AI application is the engineered system built around that model. Understanding this distinction helps you move from simply using AI to building AI-powered software.