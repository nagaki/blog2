import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { combinePosts } from "@utils/common";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

export async function GET(context) {
  const allDiaries = await getCollection("diary");
  const allPaints = await getCollection("paint");
  const allPractices = await getCollection("practice");
  const posts = combinePosts([...allDiaries, ...allPaints, ...allPractices]);
  return rss({
    title: "ALLAURMONO",
    description: "ひびのできごとなどをたまにかきます",
    site: context.site,
    items: posts.map(({ slug, body, collection, date, data }) => {
      return {
        title: data.title,
        pubDate: date,
        content:
          // TODO: 画像のURLを絶対パスにする
          collection === "paint"
            ? sanitizeHtml(
                data.images
                  .map(
                    (image) =>
                      `<img src="/img/uploads/${data.directory}/${image}" />`,
                  )
                  .join(""),
                {
                  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                    "img",
                  ]),
                },
              )
            : sanitizeHtml(parser.render(body), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                  "img",
                  "time",
                ]),
              }),
        link: `/${collection}/${slug}.html`,
      };
    }),
  });
}
