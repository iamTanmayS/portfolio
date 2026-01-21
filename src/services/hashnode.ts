/**
 * Hashnode Service
 * 
 * Fetches blog posts from Hashnode's GraphQL API (v1).
 * Docs: https://api.hashnode.com/
 */

import type { Blog } from '../data/blogs';

const HASHNODE_API_URL = 'https://gql.hashnode.com';
// TODO: Replace with user's actual Hashnode username or publication host
const HASHNODE_USERNAME = 'engineering.hashnode.com'; // Placeholder: Hashnode's own engineering blog

interface HashnodePost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  brief: string;
  content: {
    html: string;
  };
  coverImage: {
    url: string;
  };
  publishedAt: string;
  readTimeInMinutes: number;
  tags?: {
    name: string;
    slug: string;
  }[];
}

interface HashnodeResponse {
  data: {
    publication: {
      posts: {
        edges: {
          node: HashnodePost;
        }[];
      };
    };
  };
}

interface HashnodeSingleResponse {
  data: {
    publication: {
      post: HashnodePost;
    };
  };
}

/**
 * Fetch all posts from Hashnode publication
 */
export async function fetchHashnodePosts(): Promise<Blog[]> {
  const query = `
    query {
      publication(host: "${HASHNODE_USERNAME}") {
        posts(first: 20) {
          edges {
            node {
              id
              slug
              title
              brief
              publishedAt
              readTimeInMinutes
              coverImage {
                url
              }
              tags {
                name
                slug
              }
              content {
                html
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(HASHNODE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const json = (await response.json()) as HashnodeResponse;
    const edges = json.data?.publication?.posts?.edges;

    if (!edges) {
      console.warn('No posts found or error accessing Hashnode API');
      return [];
    }

    return edges.map(({ node }) => mapHashnodePostToBlog(node));
  } catch (error) {
    console.error('Error fetching Hashnode posts:', error);
    return [];
  }
}

/**
 * Fetch a single post by slug
 */
export async function fetchHashnodePost(slug: string): Promise<Blog | null> {
  const query = `
    query {
      publication(host: "${HASHNODE_USERNAME}") {
        post(slug: "${slug}") {
          id
          slug
          title
          brief
          publishedAt
          readTimeInMinutes
          coverImage {
            url
          }
          tags {
            name
            slug
          }
          content {
            html
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(HASHNODE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const json = (await response.json()) as HashnodeSingleResponse;
    const post = json.data?.publication?.post;

    if (!post) return null;

    return mapHashnodePostToBlog(post);
  } catch (error) {
    console.error(`Error fetching Hashnode post ${slug}:`, error);
    return null;
  }
}

/**
 * Helper to map Hashnode GQL response to our internal Blog interface
 */
function mapHashnodePostToBlog(node: HashnodePost): Blog {
  return {
    id: node.id,
    slug: node.slug,
    title: node.title,
    subtitle: node.brief, // Use brief as subtitle/excerpt
    excerpt: node.brief,
    content: node.content.html,
    tags: node.tags?.map(t => t.name) || [],
    publishDate: node.publishedAt,
    readingTime: `${node.readTimeInMinutes} min read`,
    featured: node.tags?.some(t => t.name.toLowerCase() === 'featured') || false,
    coverImage: node.coverImage?.url || undefined,
  };
}
