---
title: "How I evaluate AI agents: personality, RAG, and semantic similarity"
date: 2026-01-21
excerpt: "A practical look at how I test whether an agent behaves as it should, and whether RAG actually improves responses."
topics: ["ia"]
---

The part that interests me most about working with AI agents is not “making them answer”, but making sure they answer *the way they should*. That they stay in character, don’t invent things, and keep a consistent style even when the user changes topics or asks ambiguous questions.

That’s why, beyond building the RAG itself, I also design evaluation pipelines: repeatable tests to measure whether the system actually improves or just “feels better”.

## 1) Personality: does the agent behave as the prompt says?

When I say “personality”, I don’t mean being funny or charismatic. I mean clear rules: tone, boundaries, safety level, patience level, how much it asks before assuming, and how well it stays within its intended goal.

To evaluate this, I use prompt batteries (scenarios) that stress the agent: ambiguous questions, sudden topic changes, contradictions, provocations, etc. What matters is that these tests remain consistent, so different versions can be compared fairly.

That’s where you start finding strange behaviors: a tiny tweak can make the agent “more obedient” but also more rigid, or cause it to lose naturalness.

## 2) RAG: does it actually help, or does it just add noise?

With RAG, the risk isn’t only hallucination — it’s also distraction. Sometimes the model grabs the wrong chunk and fixates on an irrelevant detail. Or the system retrieves the right text, but in the wrong order.

Instead of assuming “more documents = better”, I treat it as a hypothesis: change one variable, run the test set, and compare results.

## 3) Semantic similarity: comparing RAG vs non-RAG

One metric I find especially useful is measuring semantic similarity between responses. For example: the same question, two configurations (RAG vs non-RAG), and then comparing how close each answer is to the expected outcome.

It’s not a silver bullet, but it helps reveal patterns: when RAG truly anchors the response, and when it only makes the model *sound* more confident without being more correct.

## 4) What I’m ultimately aiming for

In the end, what I want is simple: an agent that keeps its behavior under pressure, and a RAG that adds precision, not just extra text.

The interesting part is that this work never feels finished. You’re constantly choosing between trade-offs: accuracy vs latency, consistency vs flexibility, and “answer quickly” vs “ask the right question”.

And when you finally think you’ve got it right, you switch models… and start all over again.
