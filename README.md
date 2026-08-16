# FOP Pass 公式サイト

iOSアプリ「FOP Pass」の紹介サイト。HTML + Tailwind CSS + 素のJavaScriptで構成し、GitHub Pagesで配信している。

公開URL: https://ken0426.github.io/fop-pass-site/

## ページ

| パス | 内容 |
| --- | --- |
| `/` | トップ（ランディングページ） |
| `/privacy/` | プライバシーポリシー |
| `/terms/` | 利用規約 |
| `/contact/` | お問い合わせ |

## CSSのビルド

Tailwindは事前にビルドして `assets/css/style.css` をコミットしている。CDNは使わない。
クラス名を追加・変更したら、ビルドし直してからコミットすること。

```
npm install
npm run build     # 1回だけビルド
npm run watch     # 編集しながら監視
```

## 画像

`assets/img/shot-*.png` はアプリのスクリーンショットにiPhoneフレームを付けたもの。
スクリーンショットの中身は加工していない。

## お問い合わせの仕組み

サーバーを持たないため、フォームの入力内容から `mailto:` を組み立ててメールアプリを起動する。
送信先は `assets/js/main.js` ではなく、`contact/index.html` の `data-contact-form` 属性で指定している。
