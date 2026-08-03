---
title: "When Addressables worked on Android… but not on iOS"
date: 2026-02-07
excerpt: "A real production bug: remote Addressables working on Android but failing on iOS due to a barely visible build setting."
topics: ["desarrollo"]
---

In one of the projects I worked on, we used **Unity Addressables** to download dynamic content from **Azure**. The workflow was straightforward: build the application, build Addressables per platform, and download the content at runtime.

For a while, everything worked without issues.

Until someone generated a new build.

## The problem

One of my teammates generated:

- an application build
- an Addressables build

When testing the app, something odd showed up:

- On **Android**, Addressables downloaded and worked correctly.
- On **iOS**, the app launched, but the remote content simply didn’t load.

The issue was shared with the team to see if anyone could identify the cause.

## What it wasn’t

Before touching any settings, we checked the usual suspects:

- Correct Azure paths
- Properly built bundles
- No obvious console errors
- No network issues

None of that explained the failure.

The strangest part was that **the exact same content worked on Android**, which almost always points to a platform or build configuration issue, not a logic error.

## Looking closely at the iOS build

iOS is usually more aggressive than Android when it comes to code optimization. While reviewing the **Player Settings**, I noticed a setting that often goes unnoticed:

**Code Stripping**

On iOS, it was set to **High**.

## The real issue

With *Code Stripping* set to **High**, Unity removes classes and methods it considers “unused”.

The problem was subtle:

- Some scripts were not directly referenced
- They were only used when an Addressable was downloaded and loaded
- At build time, Unity marked them as unnecessary
- On iOS, those scripts never made it into the final build

The result:

- Android kept working
- iOS failed silently when loading Addressables

## The fix

It was a simple change — and easy to miss:

Change **Code Stripping** from `High` to `Minimal` on iOS.

After that:

- The scripts stopped being stripped
- Addressables loaded correctly again
- The behavior matched across platforms

## What this bug taught me

- Not every bug lives in the code
- iOS and Android don’t optimize the same way
- Aggressive code stripping can clash with Addressables
- Sometimes the problem isn’t what breaks, but what never made it into the build

These kinds of issues rarely show up in tutorials, but they happen all the time in real projects. That’s why they’re worth documenting.
