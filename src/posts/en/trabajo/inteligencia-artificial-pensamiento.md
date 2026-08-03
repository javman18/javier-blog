---
title: "What I’m working on"
date: 2026-01-05
excerpt: "What I do, what I’m learning, and what gets complicated when working with AI agents and RAG systems."
topics: ["ia"]
---

Right now I’m working on building AI agents based on large language models, specifically systems that use RAG (retrieval-augmented generation).

Most of my time isn’t spent writing “nice” prompts, but tuning how the system retrieves information and how that context is passed to the model so it responds the way each project expects.

In AI, there’s almost never a final configuration. There’s always something new: a different model, a parameter that shifts behavior, or a limitation you hadn’t noticed before.

With RAG in particular, a big part of the work is deciding how documents are split before being stored in the knowledge base. Chunk size, overlap, and how much context you preserve make a huge difference in the responses.

There are also many decisions around retrieval itself: what kind of search to use, how many results to bring back, how to filter them, and in what order to pass them to the model. There’s no single correct approach — it depends heavily on the type of information and what the user is actually expecting.

Part of the job is testing, measuring, adjusting, and testing again. Sometimes a small change improves results a lot. Other times it makes things worse, without an obvious reason.

What’s interesting is that you rarely feel “done”. You reach an acceptable point and know that tomorrow, with a new model or a different approach, things will need to move again.

I don’t say this as a complaint. It’s simply how this kind of work functions right now.
