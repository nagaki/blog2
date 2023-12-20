import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { combinePosts } from "@utils/common"
import sanitizeHtml from "sanitize-html"
import MarkdownIt from "markdown-it"
const parser = new MarkdownIt()

export async function GET(context) {
  const allDiaries = await getCollection("diary")
  const allPaints = await getCollection("paint")
  const allPractices = await getCollection("practice")
  const posts = combinePosts([...allDiaries, ...allPaints, ...allPractices])
  return rss({
    title: "ALLAURMONO",
    description: "ひびのできごとなどをたまにかきます",
    site: context.site,
    items: posts.map(({ slug, body, collection, date, data }) => {
      return {
        title: data.title,
        pubDate: date,
        content: sanitizeHtml(parser.render(body)),
        link: `/${collection}/${slug}.html`,
      }
    }),
  })
}
