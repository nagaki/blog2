import { defineConfig } from "astro/config"

import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "min-light",
      langs: [],
      wrap: true,
    },
  },
  integrations: [mdx()],
  site: "https://nagaki.github.io",
  build: {
    format: "file",
  },
  redirects: {
    "/paint/square": "/paint/2007-05-19-square",
    "/paint/kao": "/paint/2007-08-07-kao",
    "/paint/pet": "/paint/2007-10-05-pet",
    "/paint/line": "/paint/2007-11-07-line",
    "/paint/tegaki": "/paint/2008-01-16-tegaki",
    "/paint/signboard": "/paint/2008-01-20-signboard",
    "/paint/pencil": "/paint/2008-03-03-pencil",
  },
})
