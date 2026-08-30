# iPhoneアプリ 開発者公式サイト

個人開発したiPhoneアプリを紹介し、App Store ConnectのマーケティングURL・サポートURL・プライバシーポリシーURLとして利用するための静的サイトです。

HTML、CSS、JavaScriptだけで構成されているため、ビルドやnpmは不要です。GitHub Pagesへそのまま公開できます。

## サイト構成

```text
/
├── index.html                         # トップ／アプリ一覧
├── apps/
│   └── reshimamo/
│       ├── index.html                 # レシまも紹介
│       ├── support.html               # レシまもサポート
│       └── privacy.html               # レシまもプライバシーポリシー
├── support/
│   └── index.html                     # 全アプリのサポート一覧
├── about/
│   └── index.html                     # 開発者紹介
├── contact/
│   └── index.html                     # 総合問い合わせ
├── assets/
│   ├── css/style.css                  # 全ページ共通デザイン
│   ├── js/config.js                   # 共通の設定値
│   ├── js/main.js                     # メニュー・テーマ等
│   └── images/                        # アイコン・画像
├── 404.html
├── robots.txt
├── sitemap.xml
└── .nojekyll                          # GitHub Pages用
```

## ローカルで確認する方法

一番簡単な方法は、`index.html` をブラウザで開くことです。

ページ遷移も含めて公開時に近い状態で確認する場合は、ターミナルでこのフォルダへ移動し、次を実行します。

```bash
python3 -m http.server 8000
```

その後、ブラウザで `http://localhost:8000/` を開きます。停止するときはターミナルで `Control + C` を押します。

## 現在の設定

### 1. 開発者名・サイト名・問い合わせメール（設定済み）

`assets/js/config.js` には次の内容を設定済みです。

```js
siteName: "TAKUMI apps",
developerName: "TAKUMI apps",
contactEmail: "madaoganbaru@gmail.com",
```

画面上の共通表示、検索エンジン向け情報、メールリンクにも反映済みです。今後変更するときは、`assets/js/config.js` と各HTML内の同じ文字を一括置換します。

### 2. 公開URL（設定済み）

GitHub Pagesの公開URLを次のとおり設定済みです。

```text
https://2p94nzg5g9-pixel.github.io/
```

将来、独自ドメインへ変更するときは、全HTML、`robots.txt`、`sitemap.xml` 内のこのURLを新しいドメインへ一括置換してください。

### 3. App Store URL

`assets/js/config.js` の次の空欄に、App Storeで公開後のURLを設定します。

```js
appStoreUrls: {
  reshimamo: "https://apps.apple.com/jp/app/..."
}
```

未設定の間、App Storeボタンは押しても移動しません。

### 4. アプリアイコン

現在の `assets/images/apps/reshimamo/icon.png` は仮アイコンです。正式なアイコンへ差し替えてください（編集用の元データとして `icon.svg` も同梱しています）。

正式な `icon.png` を同じファイル名で上書きすれば、HTMLの変更は不要です。表示品質のため、1024×1024pxの正方形画像を推奨します。

### 5. スクリーンショット

正式な画像を次のように配置できます。

```text
assets/images/apps/reshimamo/
├── screenshot-1.webp
├── screenshot-2.webp
└── screenshot-3.webp
```

`apps/reshimamo/index.html` の `.screenshot-placeholder` を、次のような画像タグに置き換えます。

```html
<img
  src="../../assets/images/apps/reshimamo/screenshot-1.webp"
  width="390"
  height="844"
  loading="lazy"
  alt="レシまもの〇〇画面"
>
```

画像を追加するまでは、画像を参照しないプレースホルダーが表示されるため、リンク切れやレイアウト崩れは起きません。

### 6. レシまもの正確な機能（設定済み）

提供された実装情報に基づき、撮影、画像・PDF取り込み、端末内OCR、期限管理、検索・分類、書類保存、Pro機能を掲載済みです。機能を追加・変更したときは `apps/reshimamo/index.html` とサポートページを更新してください。

### 7. プライバシーポリシー（設定済み）

提供された実装情報に基づき、次の内容を `apps/reshimamo/privacy.html` へ反映済みです。

- 取得・処理する情報
- 情報の利用目的
- 外部サービスとSDK
- 広告・分析・クラッシュレポートの有無
- データの保存場所、同期、保存期間、削除方法
- 第三者提供
- セキュリティ対策
- 対象年齢
- 制定日・最終更新日

アプリの実装、利用SDK、通信内容を変更した場合は、プライバシーポリシーとApp Store Connectの「Appのプライバシー」の回答を同時に更新してください。制定日・最終更新日は2026年8月29日に設定しています。必要に応じて法律の専門家へ確認してください。

### 8. ソーシャルプレビュー画像

`assets/images/og-image.png` は仮のOG画像です（編集用の元データは `og-image.svg`）。公開ブランドが決まったらPNGまたはJPEG（推奨サイズ 1200×630px）へ差し替え、必要なら各HTMLの `og:image` と `twitter:image` を更新してください。

## 新しいアプリを追加する方法

1. `apps/reshimamo` フォルダを複製します。
2. 複製したフォルダ名を、英小文字とハイフンを使ったアプリ名に変更します（例：`carlog`）。
3. 3つのHTML内で、アプリ名、説明、SEO情報、URLを変更します。
4. `assets/images/apps/` に新しいアプリ用フォルダを作り、アイコンを追加します。
5. App Store用スクリーンショットを追加します。
6. `assets/js/config.js` の `appStoreUrls` に新しいアプリのURLを追加します。
7. 新しいアプリの `support.html` を、実際の機能と問い合わせ内容に合わせて更新します。
8. 新しいアプリの `privacy.html` を、実装仕様に合わせて更新します。
9. トップページ `index.html` のApps一覧へ、既存の `.app-feature-card` を参考にカードを追加します。
10. `support/index.html` のサポート一覧へ、既存の `.support-app-card` を参考に項目を追加します。
11. `sitemap.xml` に3ページ分のURLを追加します。
12. 全ページのリンクとスマートフォン表示を確認します。

新しいアプリは `apps/アプリ名/` の中で完結するため、既存アプリのページを書き直す必要はありません。共通の見た目や動作を変更する場合だけ、`assets/css/style.css` と `assets/js/main.js` を編集します。

## GitHub Pages公開方法

### 1. GitHubにリポジトリを作る

1. [GitHub](https://github.com/) へログインします。
2. 右上の `+` から `New repository` を選びます。
3. Repository nameを入力します。
4. 公開サイトにする場合は `Public` を選びます。
5. `Create repository` を押します。

### 2. ファイルをpushする

VS Codeのソース管理機能、GitHub Desktop、またはターミナルを使い、このフォルダの全ファイルを作成したリポジトリの `main` ブランチへpushします。

### 3. Pagesを有効にする

1. GitHubで対象リポジトリを開きます。
2. `Settings` を開きます。
3. 左側メニューの `Pages` を選びます。
4. `Build and deployment` のSourceで `Deploy from a branch` を選びます。
5. Branchを `main`、フォルダを `/ (root)` にします。
6. `Save` を押します。
7. 数分後、同じ画面に公開URLが表示されます。

リポジトリ名を含むURLで公開する場合も、サイト内部は相対パスで記述しているため、通常のページ遷移はそのまま動作します。

## 独自ドメイン設定

1. 使用するドメインを取得します。
2. GitHubリポジトリの `Settings` → `Pages` を開きます。
3. `Custom domain` にドメインを入力して保存します。
4. ドメイン管理会社のDNS画面で、GitHub Pagesが案内するCNAMEまたはA/AAAAレコードを設定します。
5. DNS反映後、`Enforce HTTPS` を有効にします。
6. リポジトリ直下に作成された `CNAME` ファイルを削除しないでください。手動で作る場合は、ファイル内にドメイン名を1行だけ記載します。
7. このサイト内の `https://2p94nzg5g9-pixel.github.io` を独自ドメインへ一括置換します。

DNS設定値は変更される可能性があるため、設定時にGitHub Pagesの公式ドキュメントとドメイン管理会社の案内を確認してください。ドメインが未決定のため、このプロジェクトにはCNAMEファイルをまだ追加していません。

## App Store Connectに登録するURL

独自ドメインが `https://your-domain.jp` の場合は次のURLを登録します。

- サポートURL：`https://your-domain.jp/apps/reshimamo/support.html`
- マーケティングURL：`https://your-domain.jp/apps/reshimamo/`
- プライバシーポリシーURL：`https://your-domain.jp/apps/reshimamo/privacy.html`

登録前に、ログインなしで各URLへアクセスできること、問い合わせ先が実際に受信できること、内容がアプリの最新仕様と一致することを確認してください。

## ダークモードとアクセシビリティ

- OSのライト／ダーク設定を自動で反映します。
- ヘッダーのテーマボタンで手動切り替えできます。選択はブラウザへ保存されます。
- モバイルメニューはキーボードでも操作できます。
- 「本文へ移動」リンク、フォーカス表示、適切な見出し、`aria`属性を設定しています。
- `prefers-reduced-motion` を尊重し、動きを減らす設定に対応しています。

## Analyticsを追加する場合

初期状態ではAnalytics、広告、外部トラッカーを読み込んでいません。将来追加する場合は、利用するサービスが送信するデータを確認し、プライバシーポリシーとApp Store Connectの申告を先に更新してください。Cookieや端末識別子を利用する場合は、同意取得の必要性も確認してください。

## 公開前チェックリスト

- [x] 開発者名を `TAKUMI apps` に設定した
- [x] 問い合わせ先を `madaoganbaru@gmail.com` に設定した
- [x] 公開URLを `https://2p94nzg5g9-pixel.github.io/` に設定した
- [ ] App Store URLを設定した
- [ ] 正式なアプリアイコンへ差し替えた
- [ ] スクリーンショットを追加した
- [x] レシまもの機能説明を実装に合わせた
- [x] プライバシーポリシーを実装内容に合わせた
- [x] 制定日・最終更新日を設定した
- [x] すべてのページとリンクを確認した
- [x] iPhone幅で横スクロールが出ないことを確認した
- [ ] 問い合わせメールを実際に送受信できることを確認した
- [ ] App Store Connectの3つのURLを登録した
