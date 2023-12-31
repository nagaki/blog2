import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "min-light",
      langs: [],
      wrap: true,
    },
  },
  integrations: [mdx(), sitemap()],
  site: "https://blog.nagaki.me",
  build: {
    format: "file",
  },
})
