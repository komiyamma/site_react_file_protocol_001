# ReactプログラムをHTTPサーバー不要にする仕組み

このプロジェクトは、標準的なReact/Viteのビルドプロセスに一手間加えることで、生成されたWebアプリケーションをHTTPサーバーなしで（つまり、ローカルの`index.html`ファイルを直接ブラウザで開くだけで）動作可能にしています。

その中心的な役割を担っているのが、`postbuild-cdn-html.cjs`というスクリプトです。

## 処理の流れ

1.  **通常のビルド実行 (`vite build`)**:
    `npm run build`コマンドが実行されると、まずViteによる通常のビルドプロセスが走ります。これにより、ReactのコードがJavaScriptファイル（例: `dist/assets/index.js`）に、CSSがCSSファイル（例: `dist/assets/index.css`）に変換・最適化され、それらを読み込むための`dist/index.html`が生成されます。この時点では、`index.html`はサーバー経由でのアクセスを前提とした相対パスでJS/CSSファイルを指しています。

2.  **ビルド後スクリプトの実行 (`postbuild:cdnhtml`)**:
    `vite build`の完了後、`package.json`の定義に基づき、`node postbuild-cdn-html.cjs`スクリプトが実行されます。

3.  **自己完結型`index.html`の生成**:
    `postbuild-cdn-html.cjs`スクリプトは、以下の処理を行い、**新しい`index.html`を生成**して、Viteが作成した`dist/index.html`を上書きします。

    *   **ReactライブラリのCDN読み込み**:
        `react`と`react-dom`のライブラリを、ローカルのバンドルファイルからではなく、unpkgなどの公開CDNから直接読み込む`<script>`タグをHTMLに埋め込みます。
        ```html
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        ```
        これにより、React本体のコードを別ファイルとして持つ必要がなくなります。

    *   **CSSのインライン化**:
        プロジェクトのCSS（`src/index.css`など）を読み込み、HTMLファイル内の`<style>`タグに直接埋め込みます。これにより、外部CSSファイルへのリンクが不要になります。

    *   **アプリケーションロジックのインライン化**:
        Reactコンポーネント（このプロジェクトでは`App`コンポーネント）のロジックを、JSXから変換されたプレーンなJavaScript (`React.createElement`を使用した形式)として、HTMLファイル内の`<script>`タグに直接書き込みます。

## 結論

この仕組みにより、最終的に`dist`ディレクトリに生成される`index.html`は、**単一のファイルで自己完結**しています。

外部のJSファイルやCSSファイルへの依存（`src="..."`や`href="..."`による相対パスでの参照）が一切なく、必要なライブラリはインターネット経由のCDNから、アプリケーション自身のコードとスタイルはHTML内に直接埋め込まれているため、HTTPサーバーによるパス解決が不要となります。

その結果、`dist/index.html`ファイルをブラウザで直接開く (`file://`プロトコルでアクセスする) だけで、Reactアプリケーションが正しく動作するのです。
