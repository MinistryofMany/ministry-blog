---
title: Badges, and the art of revealing less
date: 2026-07-01
description: Verifiable-credential badges let you prove a fact without proving who you are. Here is how disclosure minimization works in Minister today.
---

Most login systems treat identity as a single blob. You are you, and once an app knows that, it knows everything you handed over to sign up. Minister splits that blob apart. The unit it works in is a **badge**.

## What a badge is

A badge is a verifiable credential: a small, signed statement of one fact. *This email is verified on a given domain.* *This holder is over 21.* *This account is linked to a GitHub identity.* Each badge type has a fixed shape, a schema for its claim, so an app knows exactly what it is reading.

Under the hood a badge is a W3C JWT verifiable credential signed with an Ed25519 key held by the issuer. The credential names a subject, and that subject is a stable identifier for you *as a credential holder*, deliberately in a different namespace from the pairwise `sub` an app sees when you sign in. The badge and the login identity do not get cross-checked. They are not meant to.

## Disclosure is a choice, and it is minimized

When an app wants a badge, two things happen that most identity systems skip.

First, **you decide**. Disclosure is an explicit step, not a side effect of signing in.

Second, Minister reveals as little as the app's rule allows. An app does not have to demand one specific badge. It can express a requirement as a boolean policy:

```
anyOf:
  - email-domain
  - oauth-account
  - invite-code
```

That rule says "hold any one of these three." Minister takes it, looks at the badges you actually have, and finds a *minimal satisfying set*, the smallest, most-anonymous combination that clears the bar. If one badge is enough, one badge is all that leaves your control. The rest stay private.

An app can only structure the menu it was already allowed to see: a policy's badge types have to be a subset of the scopes the app requested, so a policy can narrow disclosure but never widen it.

## Why bother

The usual argument for privacy features is defensive, and it is a real one: data you never disclosed cannot leak, be subpoenaed, or be sold. But there is a simpler reason. Most access decisions do not actually need your identity. A room that wants "members in good standing" needs *proof of standing*, not your name. Selective disclosure lets the app ask the real question and get a real answer, without the identity riding along for free.

This is the machinery underneath Discreetly's room policies and the badge menu you see at the Minister consent screen. It is early, and it will change. But the shape is set: prove the fact, keep the person.
