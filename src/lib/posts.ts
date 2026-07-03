export type PostMeta = {
	title: string;
	date: string;
	description: string;
	slug: string;
};

type MdModule = {
	metadata: Omit<PostMeta, 'slug'> & { slug?: string };
};

/**
 * Load frontmatter for every post in src/posts, newest first.
 * The filename (minus .md) is the canonical slug unless frontmatter overrides it.
 */
export function getPosts(): PostMeta[] {
	const modules = import.meta.glob<MdModule>('/src/posts/*.md', { eager: true });

	const posts = Object.entries(modules).map(([path, mod]) => {
		const fileSlug = path.split('/').pop()!.replace(/\.md$/, '');
		const { slug, ...meta } = mod.metadata;
		return { ...meta, slug: slug ?? fileSlug } satisfies PostMeta;
	});

	posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
	return posts;
}
