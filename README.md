<!-- バッジ: 必要な環境・ライセンス -->
<p align="left">
  <img src="https://img.shields.io/badge/node-%3E=18.0.0-brightgreen" alt="Node.js">
  <img src="https://img.shields.io/badge/npm-%3E=9.0.0-blue" alt="npm">
  <img src="https://img.shields.io/badge/react-18.x-blueviolet" alt="React">
  <img src="https://img.shields.io/badge/vite-5.x-ff69b4" alt="Vite">
  <img src="https://img.shields.io/badge/license-CC0_1.0-lightgrey" alt="License: CC0">
</p>
# React File Protocol 対応テンプレート

React + Vite 製アプリを「file://」プロトコル（ローカルファイル直開き）でも動作させるための最小テンプレートです。

## 特徴
- Vite + React 標準構成
- `npm run build` で `dist/index.html` を自動でCDN方式・インラインCSS化
- React/ReactDOMはCDNから読み込み、`src/index.css` を自動で `<style>` として埋め込み
- 依存ファイル不要、`dist/index.html` 単体で動作
- file:// で開いても開発サーバーと同じレイアウトを再現

## 使い方
1. 依存パッケージのインストール
  ```sh
  npm install
  ```
2. ビルド
  ```sh
  npm run build
  ```
3. `dist/index.html` を直接開くだけで動作します

## 注意点
- CDNが利用できない環境ではReact本体の読み込みに失敗します（オフライン利用不可）
- 画像やフォント等のアセットは `public/` 配下に置くか、base64等でインライン化推奨
- `dist/index.html` 以外の出力物（JS/CSS）はfileプロトコルでは参照されません
- 開発時は `npm run dev` でViteサーバーを利用してください

## 参考
- [Vite公式ドキュメント](https://vitejs.dev/)
- [React公式ドキュメント（CDN利用）](https://react.dev/learn/start-a-new-react-project#add-react-to-an-existing-project)

---

このテンプレートは「ローカルでサーバーレスで実行したい」等の用途に最適です。
