---
title: Astro v5にアップグレードする他
description: このブログのAstroバージョンをv4からv5にアップグレードしたり他のライブラリの使用方法を見直した話
comments: false
categories:
  - diary
tags:
  - astro
---

最近業務委託先でAI活用が進んでいて色々と触る機会が増えたものの、
業務で利用できるツールにはある程度制限があるため、使用したいツールによっては個人開発のコードを材料にする必要があります。

プライベートなプロジェクトもあるにはあるのですが、ブログは公開サイトでありながら気軽に変更できて最適なAIお試しの場所だと思い、活用してみようと思いました。

ですが、しばらく放置していたのでまずはライブラリを最新にしたいと思います（手作業）

## 作業内容

アップグレードガイドを参考に作業を進めます。

https://docs.astro.build/en/guides/upgrade-to/v5/

```bash
bunx @astrojs/upgrade

  ◼  @astrojs/rss is up to date on v4.0.12
  ◼  @astrojs/sitemap is up to date on v3.4.1
  ●  @astrojs/check will be updated from v0.3.4 to v0.9.4
  ●  @astrojs/markdoc will be updated from v0.8.3 to v0.15.0
  ▲  astro will be updated  from v4.16.18 to v5.10.1 
  ▲  @astrojs/mdx will be updated  from v2.3.1 to v4.3.0 
```

devサーバーのコンソールでメッセージが表示されていたので修正します。

```
Auto-generating collections for folders in "src/content/" that are not defined as collections.
This is deprecated, so you should define these collections yourself in "src/content.config.ts".
The following collections have been auto-generated: diary, paint, practice
```

Astroでは`src/content`以下のコンテンツファイルからいい感じに型が生成されていたと思うのですが、ちゃんと設定ファイルで定義してねって感じになった模様です。なので`src/content.config.ts`ファイルを作成してファイルと型の定義をします。

```ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const baseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  comments: z.boolean().default(false).optional(),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});

const diary = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./src/content/diary",
  }),
  schema: baseSchema,
});

const paint = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./src/content/paint",
  }),
  schema: baseSchema.extend({
    directory: z.string(),
    images: z.array(z.string()).default([]),
  }),
});

const practice = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./src/content/practice",
  }),
  schema: baseSchema,
});

export const collections = { diary, paint, practice };

```

コード上も型エラーが表示されているので修正します。大きい変更としてはコレクションのキー？がslugからidに変更されていました。（Dynamic Routesのパラメーター名に影響はないようでした）

## その他の変更

Astro以外にいくつかの変更をしました。

### bunのロックファイルをbun.lockbからbun.lockにする

bunのロックファイルはbun.lockbというバイナリ形式のものだったのですが、去年末ぐらいにbun.lockというテキストベースのものが使えるようになりました。なのでそれに移行しました。

https://bun.sh/blog/bun-lock-text-lockfile

知らないうちに`bun audit`が使えるようになっているのも嬉しいですね。

### formatterをPrettierからBiomeにする

ブログなのであまり利点はないのですが、他プロジェクトでもBiomeを使っていて良かったので移行しました。linterとしての機能もあるので、CSSをSassから移行した際の名残でいくつか問題のあるSyntaxが放置されており修正することができたので良かったです。

## おわりに

アップグレードが無事に終わりました。これでAIお試しの場は整いました。早速Astro Auditで画像表示周りのアクセシビリティ問題が発見されていることに気づいたので、今度試してみようと思いました。
