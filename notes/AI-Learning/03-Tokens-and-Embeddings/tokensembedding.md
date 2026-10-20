# AI Engineering Classroom: Tokens, Tokenization, Embeddings and Vector Representations

#### Learn the fundamentals before touching frameworks.

Imagine we are sitting in a Transflower classroom. A student asks:

Student: “Sir, when I type a question into ChatGPT, how does the computer understand my English sentence?”

Mentor: “Excellent question! A computer does not directly understand English the way you and I do. A language model processes numerical representations of tokens. Let's understand how text travels from words to numbers, and how those numbers help an AI model process language.”

We will learn four concepts in sequence:

1\. Tokens

The units a language model processes.

2\. Tokenization

The process of splitting text into tokens and mapping them to token IDs.

3\. Embeddings

Learned numerical vectors that represent tokens or other data.

4\. Vector representations

Numerical coordinates used to represent information and relationships.

## 1. First, understand the complete journey

Suppose you enter this prompt:

`"Ravi is learning AI Engineering"`

A simplified AI processing pipeline looks like this:

```
          HUMAN LANGUAGE
                 |
                 v
    "Ravi is learning AI Engineering"
                 |
                 v
          +---------------+
          |  TOKENIZATION |
          +---------------+
                 |
                 v
       [Token 1] [Token 2] ...
                 |
                 v
          +---------------+
          |   TOKEN IDs   |
          +---------------+
                 |
                 v
          +---------------+
          |   EMBEDDING   |
          |     LAYER     |
          +---------------+
                 |
                 v
       NUMERICAL VECTORS
                 |
                 v
          +---------------+
          |  TRANSFORMER  |
          | Attention etc.|
          +---------------+
                 |
                 v
       NEXT-TOKEN PREDICTION
                 |
                 v
          GENERATED TEXT
```

This is the foundation of many LLMs. The exact token boundaries, embedding dimensions, and model internals depend on the model.

Now let's explore each stage as software engineers.

## 2. Concept One: What are Tokens?

A token is a unit of text that a language model processes.

A token may represent:

- A complete word: `learning`
- Part of a word: `learn` + `ing`
- Punctuation: `.`, `,`, `?`
- A number or code fragment
- A special control token used by the model

Do not assume one word equals one token. Token boundaries depend on the tokenizer.

### Classroom example

Consider this sentence:

```
I love programming.
```

For teaching purposes, imagine a tokenizer splits it like this:

```
Original text
     |
     v
+---+ +------+ +-------------+ +---+
| I | | love | | programming | | . |
+---+ +------+ +-------------+ +---+
  T1     T2          T3          T4
```

This is an illustrative split, not a guaranteed split from a particular model.

Student: “Sir, why not simply use words?”

Mentor: “Because language is complicated! Consider new words, spelling variations, programming identifiers, Marathi-English combinations, and uncommon technical terms. Subword tokenization helps models handle many words without requiring a separate vocabulary entry for every possible word.”

For example, a code identifier such as:

```
CalculateTotalAmount
```

might be represented as one or several tokens, depending on the tokenizer.

### Why should an AI engineer care about tokens?

Tokens affect:

1. The amount of context a model can process.
2. Input and output token usage, which can affect cost.
3. The length of prompts and retrieved documents.
4. Processing speed and generation limits.
5. How code, multilingual text, and special characters are represented.

A useful rule: Always check token counts with the tokenizer for the model you actually use.

## 3. Concept Two: What is Tokenization?

Tokenization is the process that converts a text string into tokens and maps those tokens to numerical IDs.

Think of it like a compiler's lexical analysis stage: a compiler breaks source code into meaningful lexical units, while a language-model tokenizer divides text according to its own vocabulary and encoding rules. The two processes are related in spirit, but they are not identical.

### ASCII diagram

```
INPUT STRING
"Learn AI with Python"
          |
          v
+---------------------------+
|       TOKENIZER           |
|                           |
|  1. Split text into units |
|  2. Map units to IDs      |
+---------------------------+
          |
          v
+---------------------------+
| TOKENS (illustrative)     |
|                           |
| ["Learn", " AI", " with", |
|  " Python"]               |
+---------------------------+
          |
          v
+---------------------------+
| TOKEN IDs (illustrative)  |
|                           |
| [1842, 392, 611, 9271]    |
+---------------------------+
          |
          v
    EMBEDDING LOOKUP
```

The token IDs above are made-up examples for explanation. Actual IDs depend on the tokenizer.

### The important distinction

| Text     | Token                                       | Token ID                           |
| -------- | ------------------------------------------- | ---------------------------------- |
| `Learn`  | A token representing this text              | An integer assigned by a tokenizer |
| `Python` | A token, or possibly multiple tokens        | One or more integer IDs            |
| `?`      | A punctuation token, depending on tokenizer | Its corresponding ID               |

A token ID is not a semantic meaning. For example, ID `9271` does not inherently mean Python to every AI model. It is an index in a particular tokenizer's vocabulary.

### Try tokenization yourself

You can inspect actual tokenization using a pretrained tokenizer from the Hugging Face ecosystem.

```
pip install transformers
```

Python example:

```
from transformers import AutoTokenizermodel_name = "bert-base-uncased"tokenizer = AutoTokenizer.from_pretrained(model_name)text = "Ravi is learning AI Engineering"tokens = tokenizer.tokenize(text)token_ids = tokenizer.encode(text)print("Tokens:", tokens)print("Token IDs:", token_ids)print("Token count:", len(token_ids))
```

Note that `encode()` may include special tokens such as classification and separator markers. This example uses BERT's tokenizer to demonstrate the process; GPT-style models may tokenize the same text differently.

## 4. Concept Three: What are Embeddings?

Now we reach an important transition: from discrete IDs to continuous numerical vectors.

A token ID is just an integer. An embedding is a learned vector of numbers associated with a token in a model's embedding table.

Imagine the model has a vocabulary of 30,000 token IDs and an embedding dimension of 768. Its embedding table could have the shape:

\\[ 30{,}000 \times 768 \\]

That means each vocabulary entry has a vector with 768 numerical values. This is only an illustrative model configuration, not a requirement for all LLMs.

### ASCII diagram: embedding lookup

```
              TOKEN IDs
          +------+------+
          |  101 | 2023 |
          +------+------+
             |      |
             v      v
       +-------------------+
       |  EMBEDDING TABLE  |
       |                   |
       | ID 101 -> Vector  |
       | ID 2023 -> Vector |
       +-------------------+
             |      |
             v      v
       +-----------+-----------+
       |           |           |
       v           v           v
   +---------+ +---------+ +---------+
   |  0.21   | | -0.15   | |  0.87   |
   |  0.43   | |  0.62   | | -0.32   |
   | -0.18   | |  0.09   | |  0.41   |
   |   ...   | |   ...   | |   ...   |
   +---------+ +---------+ +---------+
        Numerical vector representations
```

The displayed values are illustrative.

### A mentor analogy

Think of a library.

- Token: The name on a book.
- Token ID: The book's catalogue number.
- Embedding: A numerical representation associated with that catalogue entry.

The catalogue number identifies the entry, but it doesn't tell you what the book is about. The embedding contains learned numerical features that can help the model process the token.

During model training, embedding parameters are adjusted to help the model perform its learning objective.

### Are embeddings the same as meaning?

Not exactly. Embeddings do not contain a simple, human-readable definition of a word. They are numerical representations learned from data, and their usefulness comes from patterns in those numbers and the computations performed by the model.

Also, the initial token embedding is generally different from the contextual representation produced after Transformer layers process the sentence.

For example, the word bank can mean a financial institution or the side of a river. The token embedding alone may not resolve that ambiguity. Contextual processing can produce different representations depending on the surrounding words.

## 5. Concept Four: What are Vector Representations?

A vector is an ordered collection of numbers.

In mathematics:

\\[ \mathbf{v} = [v_1,v_2,v_3,\ldots,v_n] \\]

For example:

```
"Python"  -> [0.8, 0.2, 0.9]
"Java"    -> [0.7, 0.3, 0.8]
"Banana"  -> [0.1, 0.9, 0.2]
```

These are made-up vectors for teaching purposes. They are not actual embeddings from a trained model.

A vector can represent a token, a sentence, a document, an image, or another object. In AI, the model learns or computes numerical features that are useful for its task.

### Why use vectors?

Computers can perform mathematical operations on vectors. These operations help AI systems learn patterns, compare representations, and process relationships.

For example, embedding systems often use cosine similarity to compare two vectors:

\\[ \operatorname{cosine}(A,B)= \frac{A\cdot B}{\\|A\\|\\|B\\|} \\]

For nonzero vectors, cosine similarity measures the alignment of their directions. In a well-designed semantic embedding space, related texts often have more similar vectors than unrelated texts.

### ASCII diagram: vector space

```
             VECTOR SPACE (2D ILLUSTRATION)

       Y
       ^
       |
       |       Python       Java
       |         *            *
       |            * C#
       |
       |
       |                          Banana
       |                            *
       |
       +------------------------------------> X

       Related programming languages may be
       near each other in a learned space.

       Actual embeddings usually have many
       more than two dimensions.
```

This drawing illustrates the idea only; real embedding positions must be measured from an actual model.

## 6. An important distinction: token embeddings vs. RAG embeddings

As an AI engineer, you will encounter both.

### A. Token embeddings inside an LLM

Purpose: represent input tokens for processing by the Transformer.

```
Token IDs
   |
   v
Embedding Table
   |
   v
Token Vectors
   |
   v
Transformer Layers
```

### B. Text embeddings for RAG

Purpose: represent chunks of text so a retrieval system can find relevant information.

```
Assessment Documents
         |
         v
    Text Chunks
         |
         v
  Embedding Model
         |
         v
   Chunk Vectors
         |
         v
    Vector Database
         ^
         |
   Query Embedding
```

In a Retrieval-Augmented Generation (RAG) system, the application embeds a user's question and compares it with stored document embeddings to retrieve potentially relevant chunks.

For a TFLCoMentor example:

- Document: “The student needs improvement in data structures.”
- Query: “Which technical skills should this student improve?”
- Retrieval: Find relevant assessment records or guidance documents.
- Generation: Give an answer grounded in retrieved, authorized information.

One crucial point: embeddings help retrieve information; they do not replace access control or guarantee factual correctness. Student performance should come from authorized records, and the application must enforce permissions.

## 7. Put everything together

Here is the complete mental model you should remember.

```
+------------------------------------------------+
|                 HUMAN TEXT                     |
|       "I am learning AI Engineering"           |
+------------------------------------------------+
                       |
                       v
+------------------------------------------------+
| TOKENIZATION                                   |
| Text -> Tokens                                 |
+------------------------------------------------+
                       |
                       v
+------------------------------------------------+
| TOKEN IDs                                      |
| Tokens -> Integer identifiers                  |
+------------------------------------------------+
                       |
                       v
+------------------------------------------------+
| TOKEN EMBEDDINGS                               |
| IDs -> Learned numerical vectors               |
+------------------------------------------------+
                       |
                       v
+------------------------------------------------+
| TRANSFORMER                                    |
| Attention + Feed-Forward Layers                |
| Builds contextual representations              |
+------------------------------------------------+
                       |
                       v
+------------------------------------------------+
| OUTPUT                                         |
| Predict next token or perform a model task     |
+------------------------------------------------+
```

## 8. Check your understanding

1\. What is a token ID?

A word's universal meaning

An integer identifying a token in a tokenizer vocabulary

A vector of 768 values

2\. What does an embedding represent?

A learned numerical vector

A database password

A guaranteed English definition

3\. What is the purpose of text embeddings in RAG?

To authenticate users

To retrieve potentially relevant text by comparing representations

To guarantee that every answer is correct

Check answers

## 9. Your learning path as an AI engineer

Study these concepts in this order:

1. Tokens and tokenization — understand how text becomes discrete units and IDs.
2. Vectors, matrices, and basic linear algebra — understand how numbers are represented and transformed.
3. Embeddings — understand how learned vectors represent tokens and semantic information.
4. Attention and Transformers — understand how token representations are contextualized.
5. Text embeddings and vector databases — build semantic search and RAG applications.
6. LLM APIs and evaluation — integrate these capabilities into real applications.

Mentor's final lesson: Don't memorize these terms independently. Understand the data transformation:

Text → Tokens → Token IDs → Vectors → Contextual representations → Model output.

Once you understand this flow, topics such as Transformer architecture, RAG, vector databases, semantic search, and prompt engineering become much easier to learn.