<script lang="ts">
	import { site } from '$lib/config';

	let { data } = $props();

	const dateFmt = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	function formatDate(iso: string): string {
		return dateFmt.format(new Date(iso));
	}
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<section class="intro">
	<h1>{site.title}</h1>
	<p class="lede">{site.description}</p>
</section>

<ul class="posts">
	{#each data.posts as post (post.slug)}
		<li>
			<a class="post-link" href="/{post.slug}/">
				<time datetime={post.date}>{formatDate(post.date)}</time>
				<h2>{post.title}</h2>
				<p>{post.description}</p>
			</a>
		</li>
	{:else}
		<li class="empty">No posts yet.</li>
	{/each}
</ul>

<style>
	.intro {
		margin-bottom: 2.5rem;
	}

	.lede {
		color: var(--ink-soft);
		font-size: 1.15rem;
		margin-top: 0.5rem;
	}

	.posts {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.posts li {
		border-top: 1px solid var(--rule);
	}

	.post-link {
		display: block;
		padding: 1.75rem 0;
		color: inherit;
	}

	.post-link:hover {
		text-decoration: none;
	}

	.post-link:hover h2 {
		color: var(--accent);
	}

	time {
		display: block;
		font-family: var(--font-sans);
		font-size: 0.8rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--ink-faint);
	}

	.post-link h2 {
		margin: 0.35rem 0 0.4rem;
		font-size: 1.4rem;
	}

	.post-link p {
		margin: 0;
		color: var(--ink-soft);
	}

	.empty {
		padding: 2rem 0;
		color: var(--ink-faint);
	}
</style>
