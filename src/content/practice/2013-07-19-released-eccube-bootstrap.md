---
title: eccube-bootstrapというEC CUBE用のテーマを作りました。
description: eccube-bootstrapを作った動機や使い方について
categories:
  - practice
tags:
  - php
---

EC CUBEのデフォルトテーマがイケてないし、イケる予定もなさそうだったので、
GitとかGitHubとかTwitterBootstrapとかHTML5の勉強も兼ねてテーマを作りました。

[nagaki/eccube-bootstrap][1]

Smartyの部分は特に変更していません。作りはじめた時Gitの使い方がいまいち
わかっていなくてデフォルトテーマからの変更をコミットしていないので、
できれば最初からやり直したいけど手間がかかるので多分できません。

勉強のために作ったので、必要以上にTwitterBootstrapの様々なスタイルを適用しています。
TwitterBootstrapではレスポンシブデザインが使えるのでそれも取り入れました。

使用出来るバージョンは2.12系ですが、先日から続いていた脆弱性の修正アップデートの関係上、
最新の2.12.5で使用をしてください。

## インストール

EC CUBEのディレクトリ構成と同じです。
ダウンロードしたファイルを再帰的にコピーします。
Gitファイルもコピーする場合は`.*`もコピーしてください。

```bash
$ git clone https://github.com/nagaki/eccube-bootstrap.git
$ cp -R eccube-bootstrap/_ ~/path/to/eccube/
$ cp -R eccube-bootstrap/._ ~/path/to/eccube/ #Gitファイルコピー
```

Gitで管理する場合はDBに直接レコードを追加する方法が楽です。
MySQLコマンド等を使用してデータベーステーブル`dtb_templates`にレコードを追加します。

```sql
INSERT INTO dtb_templates VALUES ("bootstrap", 10, "bootstrap", now(), now());
```

管理画面のメニューにあるデザイン管理>PC>テンプレート設定ページで
bootstrapを選択してテンプレートを変更します。

レスポンシブデザインを利用する場合は、`data/class/SC_Display.php`
にあるスマートフォン判定のコードを削除することで使用できます。

```php
<?php

// data/class/SC_Display.php:141
function detectDevice() {
  $nu = new Net_UserAgent_Mobile();
  $su = new SC_SmartphoneUserAgent_Ex(); //削除
  if ($nu->isMobile()) {
    return DEVICE_TYPE_MOBILE;
  } elseif ($su->isSmartphone()) { //削除
    return DEVICE_TYPE_SMARTPHONE; //削除
  } else {
    return DEVICE_TYPE_PC;
  }
}
```

作ってから暫く経っているので、直したいところが結構あるので、
こまめに直したいと思っています。GitHubのIssuesとか使ったらいいのでしょうか。
初心者なのでわかりません。地道に勉強していきます。

余談ですがEC CUBEの公式サイトを覗くと[レスポンシブWebデザインテンプレート][2]
というテーマが148,000円で売られていました。すごいですね。

[1]: //github.com/nagaki/eccube-bootstrap
[2]: //www.ec-cube.net/products/detail.php?product_id=546
