---
title: ブログをJekyllからAstroに移行しました
comments: false
categories:
  - diary
tags:
  - jekyll
  - astro
---

このブログはしばらくの間、Jekyll+GitHub Pagesで運用していました。

Jekyllはしばらく放置していてもなんとなく動くので特に困ってはいなかったのですが、最近は全くRubyを書いておらず、TypeScriptしか書いていないため、Astroに移行しました。

（インストール時のコンソール出力が格好良い）

![Astroのインストール時のコンソール出力](/img/uploads/2023/install-astro.png)

とりあえず移行したいだけだったので出力結果のスタイルや構成ができるだけ変わらないことを目指して作業を進めましたが、結果ほぼ変更することなく式年遷宮できました。

これは、ブログの記事ファイルがMarkdownフォーマットであることと、Frontmatter、そして日付+slugのファイル名にしていたことが大きいと思います。

Astroは[JSXのようでJSXでない式][jsx-link-statement]を使って書くことができるので、JekyllのLiquidテンプレートから移行する際も、自然に記述していくことができました。（classNameと書かなくていいところも移行しやすかった点のひとつです）

あと、Sassを使っていたのですが、[CSS Nestingが使えるようになってきた](https://caniuse.com/css-nesting)こともありいい機会なのでVanilla CSSに移行しました。大したスタイルでもないので、そこまで変更せずに移行することができました。

![Can I use ? CSS Nesting](/img/uploads/2023/can-i-use-css-nesting.png)

サーバは引き続きGithub Pagesを使用していますが、リリース時はgh-pagesブランチへのプッシュでなく、Github Actionsのワークフローでビルドしてリリースをするように変わりました。（これが無料でできていることにただただ驚きます）

5年ぶりにブログを書いたので、これからは少しずつ書いていきたいと思います。

[jsx-link-statement]: https://docs.astro.build/ja/core-concepts/astro-syntax/#jsx%E3%83%A9%E3%82%A4%E3%82%AF%E3%81%AA%E5%BC%8F
