Title: Tree-based conversations with LLMs
Date: 2025-06-28 00:13
Category: General
Tags: 
Slug: tree-based-conversations-with-llms
Author: Forest Dussault
Summary: Addressing the context rot problem with UI

Anyone who has used LLMs extensively, especially for coding, can attest to the trouble of [context rot](https://simonwillison.net/2025/Jun/18/context-rot/). The gradual accumulation of 
tangents and junk responses creates an increasingly tainted ecosystem for the LLM to work with. At some point continuing the 
conversation further becomes untenable, and we're forced to start anew.

I figured one "easy" UI solution to this would be to introduce a tree-based conversation structure. If a user could easily create branches 
in their conversation with the LLM, and navigate between nodes quickly, they could curate their conversation to avoid the accumulation of 
garbage. 

I booted up Claude Code and went through a several-hour struggle session to get a prototype together. Here's what I (we? it?) came up with.

## DendriteLLM

`DendriteLLM` is a simple React application that allows for tree-based conversations with LLMs (actually just Claude for now).

The core idea is simple: instead of a linear chat, users interact with a tree-like structure where they can branch off at any point in their conversation history. The UI provides two main views - a chat interface and an interactive tree diagram showing the conversation's structure. The tree view is built with [React Flow](https://reactflow.dev/).

I've integrated it with Claude's API, though the architecture could easily support other models. The application preserves all state locally, so conversations remain private.

The application starts with a demo conversation to help users understand the branching concept. It immediately communicates the benefits of this approach.

I think the tree view is satisfying to use, and I'd like to see Anthropic et al. implement something similar. You can click on any node to navigate to that part of the conversation, drag nodes around to organize your thoughts, and create new branches. The visual representation makes it much easier to keep track of complex, multi-threaded discussions.

## An Aside

I spoke briefly about LLMs as pedagogical tools in my previous blog post. They're excellent for overcoming the activation energy 
required to learn a new topic. Similarly, this project demonstrates another huge benefit of LLMs - overcoming the activation energy to bring an idea to fruition. 
This type of somewhat complex prototype would have taken me an untenable amount of time a few years ago. I would have come up with an idea, thought to myself "That would be cool", and simply moved on. 
However, now that the barrier to entry is so low, I have very little excuse to not act on my ideas.