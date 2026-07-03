import { error } from '@sveltejs/kit';
import { getPosts } from '$lib/posts';

// Tell the prerenderer every post URL to crawl.
export function entries() {
	return getPosts().map((post) => ({ slug: post.slug }));
}

export function load({ params }) {
	const meta = getPosts().find((post) => post.slug === params.slug);
	if (!meta) throw error(404, `No post named "${params.slug}"`);
	return { meta };
}
