<script lang="ts">
	import type { Component } from 'svelte';
	import { site } from '$lib/config';

	let { data } = $props();

	// mdsvex compiles every post to a Svelte component; pick the one for this slug.
	const modules = import.meta.glob<{ default: Component }>('/src/posts/*.md', { eager: true });
	const Post = $derived(modules[`/src/posts/${data.meta.slug}.md`].default);

	const dateFmt = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<svelte:head>
	<title>{data.meta.title} · {site.title}</title>
	<meta name="description" content={data.meta.description} />
</svelte:head>

<article>
	<header class="post-head">
		<time datetime={data.meta.date}>{dateFmt.format(new Date(data.meta.date))}</time>
		<h1>{data.meta.title}</h1>
	</header>

	<div class="prose">
		<Post />
	</div>

	<p class="back"><a href="/">← All posts</a></p>
</article>

<style>
	.post-head {
		margin-bottom: 2rem;
	}

	.post-head time {
		font-family: var(--font-sans);
		font-size: 0.8rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--ink-faint);
	}

	.post-head h1 {
		margin-top: 0.35rem;
		font-size: 2.1rem;
	}

	.prose :global(h2) {
		margin-top: 2.25rem;
		font-size: 1.4rem;
	}

	.prose :global(h3) {
		margin-top: 1.75rem;
		font-size: 1.15rem;
	}

	.prose :global(p),
	.prose :global(ul),
	.prose :global(ol) {
		margin: 1.1rem 0;
	}

	.prose :global(li) {
		margin: 0.35rem 0;
	}

	.prose :global(img) {
		max-width: 100%;
		height: auto;
		border-radius: 8px;
	}

	.back {
		margin-top: 3rem;
		font-family: var(--font-sans);
		font-size: 0.9rem;
	}
</style>
