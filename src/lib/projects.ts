import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

export type Project = CollectionEntry<'projects'>;

export interface ProjectView {
  id: string;
  href: string;
  title: string;
  data: Project['data'];
  desktop?: ImageMetadata;
  mobile?: ImageMetadata;
}

// Screenshots are found by filename, so adding one never needs a code change.
const shots = import.meta.glob<ImageMetadata>(
  '/src/content/projects/*/{desktop,mobile}.{webp,png,jpg,jpeg}',
  { eager: true, import: 'default' },
);

function findShot(id: string, kind: 'desktop' | 'mobile'): ImageMetadata | undefined {
  const prefix = `/src/content/projects/${id}/${kind}.`;
  const key = Object.keys(shots).find((k) => k.startsWith(prefix));
  return key ? shots[key] : undefined;
}

export function toView(entry: Project): ProjectView {
  const { data, id } = entry;
  return {
    id,
    href: `/work/${id}/`,
    title: data.name ?? data.anonymous,
    data,
    desktop: findShot(id, 'desktop'),
    mobile: findShot(id, 'mobile'),
  };
}

/** Featured projects in grid order: direct clients first, then agency work. */
export async function getFeatured(): Promise<ProjectView[]> {
  const all = await getCollection('projects', ({ data }) => data.featured);
  const rank = { direct: 0, agency: 1 } as const;
  return all
    .sort((a, b) => rank[a.data.via] - rank[b.data.via] || a.data.order - b.data.order)
    .map(toView);
}
