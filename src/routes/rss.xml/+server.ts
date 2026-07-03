import { getPosts } from '$lib/posts';
import { site } from '$lib/config';

export const prerender = true;

function escape(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export function GET() {
	const posts = getPosts();

	const items = posts
		.map(
			(post) => `		<item>
			<title>${escape(post.title)}</title>
			<link>${site.url}/${post.slug}/</link>
			<guid isPermaLink="true">${site.url}/${post.slug}/</guid>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
			<description>${escape(post.description)}</description>
		</item>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escape(site.title)}</title>
		<link>${site.url}</link>
		<atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
		<description>${escape(site.description)}</description>
		<language>en-us</language>
${items}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
