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

export const stripeDateFromSlug = (slug: string) => {
  const slugWithoutDate = slug.split("-").slice(3).join("-")
  return slugWithoutDate.startsWith("-")
    ? slugWithoutDate.slice(1)
    : slugWithoutDate
}

export const groupByYear = (
  posts: CollectionEntry<"diary" | "paint" | "practice">[]
) =>
  posts
    .map(({ slug, collection, data }) => ({ slug, collection, data }))
    .reduce((c: { [index: string]: Post[] }, post) => {
      const date = getDateFromSlug(post.slug)
      const k = date.getFullYear().toString()
      if (!c[k]) c[k] = []
      c[k].push({ ...post, date })
      return c
    }, {})

export const combinePosts = (
  posts: CollectionEntry<"diary" | "paint" | "practice">[]
) =>
  posts
    .map(({ slug, collection, body, data }) => {
      return {
        date: getDateFromSlug(slug),
        slug: stripeDateFromSlug(slug),
        collection,
        body,
        data,
      }
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime())
