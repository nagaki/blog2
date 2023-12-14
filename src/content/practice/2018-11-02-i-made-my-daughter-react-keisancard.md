---
title: Reactで計算カードのようなものを作る
description: React.jsで計算カードみたいなものを作った話。
categories:
  - practice
tags:
  - react
  - javascript
---

## きっかけ

小学校一年生になる娘がいるのですが、学校から課されている日々の宿題に、音読と計算カードがあります。毎日する必要があるのですが、計算カードを学校に置いて帰ってくることが多く、そんな時は私か妻が口頭で問題を出して答えてもらうようにしていました。

ある日の夕方、「また計算カード忘れた〜」という娘の声が耳に入ってきました。その時私はパソコンを開き、React のことを考えていたのですが、「もう家に置いておく計算カードを自作するしかないな」「いっそパソコンでできればやる気になってくれそうだな」「React だったら速攻で作れるんじゃない？」「作ってみるか！」と思ってしまいました。

## 用意するもの

以下のコマンドが叩けるようにしておきます。

- npm
- create-react-app

### create-react-app する

TypeScript を使いたいので、コマンド実行時にオプション指定します。

```shell
$ create-react-app keisancard --scripts-version=react-scripts-ts
```

### Material-UI にしておく

速攻でつくりたいので Material-UI にしておきます。

```shell
$ npm install @material-ui/core
```

## 仕様を考える

計算カードの要件はだいたい以下のようになると思います。

- 0 から 10 までの 2 つの整数の足し算、または、引き算です
- 小学生なので、答えが負の数になることはありません
- カードの裏に答えが書かれています（自分で正誤判定ができる）
- カード毎に異なる問題が書かれています
- カードをめくることができます（問題が変わる）

遷移は以下のようにします。

1. 足し算、または、引き算の式を画面に表示します
1. 数値キーボードで答えを入力できるようにします
1. enter キーを押すと答えあわせをします
1. 答えあわせの結果を画面に表示します
1. まちがいの場合は再度答えられるようにします（2.へ）
1. 正解した場合は新しい式を生成し、（1.へ）

## 工夫する

ランダムな整数の計算式をつくり、入力された答えと比較するだけのプログラムですが、少し工夫が必要でした。

### 足し算か引き算をランダムにする

```js
// minからmaxまでの範囲でランダムな整数をひとつ生成する
const genNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max + 1)) + min;

// 足す|引くをランダム生成する
const operator = genNumber(0, 1) === 1 ? "+" : "-";
```

### 負の数にならないようにする

```js
// ランダムな整数2個を格納する配列を作成し、降順に並び替える
const numbers = [
  genNumber(minNumber, maxNumber),
  genNumber(minNumber, maxNumber),
].sort((a, b) => b - a)

// 式の答え
const answer = {
  "+": numbers[0] + numbers[1],
  "-": numbers[0] - numbers[1], // 昇順の場合負の数になる
}[operator]
```

### プログラマティックにフォーカスする

```js
class extends React.Component<P, S> {
  private numberInput: React.RefObject<HTMLInputElement>;

  constructor(props: P) {
    super(props);
    this.numberInput = React.createRef();
  }

  public handleFoo = () => {
    // nullをハンドリング
    if (this.numberInput.current) {
      this.numberInput.current.focus();
    }
  };

  public render() {
    return (
      <TextField
        inputRef={this.numberInput}
        type="number"
      />
    );
  }
}
```

あとは愚直にコードしていきます。「え？まだできてないん？」などと言われながらも夕飯前にはプロトを作成し、使ってもらうことができました。物珍しかったこともあり、100 問くらい消化していたので、作った甲斐がありました。

[nagaki/keisancard][repo]

## Github Pages で公開する

翌日も学校から計算カードを持って帰らず、おもむろに iPhone（SIM の入っていない親のお下がり）を起動して「計算しよー」と言い出したので、「お父さんのパソコンじゃないとできないんよ」と言って、またやってもらいました。デジタルネイティブ恐るべし。

HTML と JS のみで動作するので、Github Pages でホスティングできるのでは、と思い調べてみると、React のリポジトリのまま（build でなく）アプリを公開できることがわかったので、公開してみました。

[https://nagaki.github.io/keisancard/][page]

### 公開する手順

`package.json`に以下の項目を追加します。

```js
{
  // リポジトリのGithub PageのURL
  "homepage": "http://nagaki.github.io/keisancard",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "devDependencies": {
    // npm install --save-dev gh-pages する
    "gh-pages": "^2.0.1"
  }
}
```

コマンドを実行します。

```shell
$ npm run deploy
```

簡単すぎて驚きます。2018 年最高。

## 今後の展望

本質的なところで言うと、算数ドリルにでてくる穴埋め計算「`2+( )=5`」みたいなやつを応用編で作ってみるのは面白いかなと思っています。あとは、計算カードで問題を出しているときに、時間制限（5 秒以内に答えてね的な）をすると楽しそうにやっていたので、それも面白いかなと思っています。

ただ、そうなるとキーボード入力に不慣れなぶん、代替入力手段を作ってあげたい気持ちになります。音声で入力できるようにするとか、テンキーみたいなものを実装するとか、考えていると意外に広がりがあって面白そうです。

せっかくの機会なので、色々遊んでみようと思っています。

[repo]: https://github.com/nagaki/keisancard
[page]: https://nagaki.github.io/keisancard/
