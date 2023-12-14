import format from "date-fns/format"
import type { CollectionEntry } from "astro:content"

export const getDateFromSlug = (slug: string): Date => {
  return new Date(slug.split("-").slice(0, 3).join("-") ?? "")
}

export type Post = {
  collection: string
  date: Date
  slug: string
  data: {
    title: string
    description: string
  }
}
export const groupByYear = (
  posts: CollectionEntry<"diary" | "paint" | "practice">[]
) =>
  posts
    .map(({ slug, collection, data }) => ({ slug, collection, data }))
    .reduce((c: { [index: string]: Post[] }, post) => {
      const date = getDateFromSlug(post.slug)
      const k = format(date, "yyyy")
      if (!c[k]) c[k] = []
      c[k].push({ ...post, date })
      return c
    }, {})
