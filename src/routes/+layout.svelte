<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { site } from '$lib/config';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="alternate" type="application/rss+xml" title={site.title} href="/rss.xml" />
</svelte:head>

<header class="site-header wrap">
	<a href="/" class="brand">{site.title}</a>
	<nav>
		<a href="/">Posts</a>
		<a href="/rss.xml">RSS</a>
	</nav>
</header>

<main class="wrap">
	{@render children()}
</main>

<footer class="site-footer wrap">
	<hr />
	<p>Alpha-stage, open source, built by the Ministry of Many.</p>
</footer>

<style>
	.site-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding-top: 1.75rem;
		padding-bottom: 1.75rem;
		border-bottom: 1px solid var(--rule);
		margin-bottom: 2.5rem;
	}

	.brand {
		font-weight: 700;
		font-size: 1.05rem;
		letter-spacing: 0.01em;
		color: var(--ink);
	}

	nav {
		display: flex;
		gap: 1.25rem;
		font-size: 0.9rem;
	}

	nav a {
		color: var(--ink-soft);
	}

	.site-footer p {
		font-size: 0.85rem;
		color: var(--ink-faint);
		padding-bottom: 3rem;
	}
</style>
