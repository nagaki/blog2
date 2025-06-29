import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import remarkLinkCard from "remark-link-card-plus";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "min-light",
      langs: [],
      wrap: true,
    },
    remarkPlugins: [remarkLinkCard],
  },
  integrations: [mdx(), sitemap()],
  site: "https://blog.nagaki.me",
  build: {
    format: "file",
  },
});
