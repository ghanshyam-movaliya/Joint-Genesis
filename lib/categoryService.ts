import { getCategories as getBlogsCategories } from "./blogService";

/**
 * Fetch dynamic list of categories from the blog articles list.
 */
export async function getCategories(): Promise<string[]> {
  return await getBlogsCategories();
}
