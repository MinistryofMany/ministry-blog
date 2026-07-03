---
title: Introducing the Ministry of Many
date: 2026-07-03
description: A privacy-preserving identity provider and a handful of anonymous social apps that sign in with it. Here is what exists today and how the pieces fit.
---

The Ministry of Many is a small ecosystem built around one idea: you should be able to prove something about yourself without handing over who you are. It has two halves. An identity provider called **Minister**, and a set of anonymous social apps that sign in through it.

Everything here is alpha-stage. It runs, we use it, and the edges are still sharp. This post describes what is real today, not a roadmap.

## Minister: identity without the surveillance

Minister is an OpenID Connect (OIDC) identity provider. If you have signed in to a website "with Google," you already know the shape of it: an app hands you off to a provider, you approve, and the app gets back a token that says you are signed in.

Minister changes what that token contains, and what it leaks.

- **Pairwise identifiers.** Each relying party gets a different, stable `sub` for you. Two apps cannot compare notes and discover they are talking to the same person. Minister never discloses your email to the app.
- **Verifiable-credential badges.** Beyond "you are signed in," you can hold **badges**: signed, verifiable credentials asserting a fact, like *email verified on this domain*, *over 21*, or *holds an invite code*. Badges are W3C JWT verifiable credentials signed with Ed25519.
- **Selective disclosure.** When an app asks for a badge, you choose whether to show it. If an app's requirement is a boolean rule (this OR that, at least two of these), Minister works out the *smallest* set of badges that satisfies it and discloses only that. You reveal the minimum needed to get in, and nothing more.

The point is not anonymity for its own sake. It is that the facts an app needs to make a decision, and the identity behind those facts, are two separate things. Minister keeps them separate by default.

## The apps that sign in with it

Minister is only useful with somewhere to sign in. Today there are three relying-party apps, each anonymous in its own way, each authenticating through Minister over plain OIDC.

- **FreedInk** — anonymous collective blogging. Membership in a blog is a zero-knowledge set: you prove you belong without revealing which member you are, and a one-time nullifier stops replay. It signs in with Minister for identity only, and requests no badges.
- **Discreetly** — anonymous, federated group chat. Rooms can gate entry on a badge policy ("hold one of these credentials"), and Discreetly asks Minister to disclose only a minimal satisfying set. Messaging uses client-side rate-limiting proofs; the server verifies, it never sees your secrets.
- **Deforum** — an anonymous forum, the newest relying party, signing in through the same flow.

The zero-knowledge machinery in these apps runs on the client. The servers verify proofs; they do not hold the secrets that generate them.

## How they connect

The only coupling between an app and Minister is the OIDC protocol over HTTPS. Register the app once in Minister, point it at the issuer, and it works. An app that requests no badge scopes gets a clean, identity-only sign-in. An app that wants badges opts into exactly the scopes it needs, and the user still decides what to disclose.

That is the whole system today: one identity provider that minimizes what it reveals, and a few apps that lean on it so they never have to build accounts, passwords, or a profile database of their own.

More as it stabilizes.
