# TAKUMI apps 公式サイト

公開済みのiPhoneアプリの紹介と、使い方・サポートを掲載するGitHub Pagesサイトです。HTML / CSS / JavaScriptで構成され、ビルドやパッケージのインストールは不要です。

## 主なページ

- `/`：公開アプリ「黒ナンバー記録簿」の紹介とApp Storeへのリンク
- `/support/`：サポート一覧
- `/apps/kuronumberlog/support.html`：基本操作・FAQ・バックアップ・問い合わせ
- `/apps/kuronumberlog/privacy.html`：黒ナンバー記録簿のプライバシーポリシー
- `/contact/`：問い合わせメールの作成（サイトからの自動送信はありません）
- `/about/`：個人開発について
- `/support.html`、`/privacy.html`：既存の「レシまも」向け旧URL。本文を維持しています。

## 共通ファイル

- `assets/css/style.css`：共通デザイン・レスポンシブ・ライト/ダークテーマ
- `assets/js/main.js`：モバイルメニュー、テーマ切替、メール・ストアリンク
- `assets/js/config.js`：運営名・問い合わせ先・App Store URLの設定
- `assets/images/apps/kuronumberlog/`：正式なアプリアイコン、ストア制作に使った実画面のサンプル
- `assets/images/og-image.png`：共有用画像

見出し・ナビゲーション・フッターは静的HTMLです。サイト名を変更するときは各HTMLの表記も更新してください。ストアリンクには実URLが入っており、JavaScriptがなくても移動できます。テーマの保存先はブラウザのローカルストレージのみです。広告、解析、外部フォント、送信フォームは追加していません。

## 確認

```sh
python3 scripts/check-site.py
python3 -m http.server 8765 --bind 127.0.0.1
```

ブラウザで `http://127.0.0.1:8765/` を開きます。320px幅からPC幅まで、メニュー、テーマ切替、FAQ開閉、リンクを確認します。`.artifacts/` は確認用の一時ファイルで、Gitへ含めません。

## 更新時の注意

サポート本文は実際の実装とプライバシーポリシーに合わせます。iCloudは任意の手動バックアップで、自動同期ではありません。PDF・CSVは全記録の復元用バックアップとは異なります。料金の変更は公開ストアの設定と照合してください。古い重複資産 `css/`・`js/`・`style.css` は既存URL互換のため残しています。

公開URL：<https://2p94nzg5g9-pixel.github.io/>

`main`への反映で既存のGitHub Pagesから配信されます。App Store Connectの設定やアプリの公開操作は、このリポジトリの変更では行われません。
