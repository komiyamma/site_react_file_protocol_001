// postbuild-cdn-html.js
// Viteビルド後にfileプロトコル対応のCDN方式index.htmlをdistに出力するスクリプト
const fs = require('fs');
const path = require('path');

const html = `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Counter App (CDN, file://対応)</title>
    <!-- React & ReactDOM CDN -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <style>
      .App {
        padding: 2rem;
      }
      .card {
        padding: 2em;
      }
      button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        color: white;
        cursor: pointer;
        transition: border-color 0.25s;
      }
      button:hover {
        border-color: #646cff;
      }
      button:focus,
      button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/javascript">
      const { useState } = React;
      function App() {
        const [count, setCount] = useState(0);
        return React.createElement(
          'div',
          { className: 'App' },
          React.createElement(
            'div',
            { className: 'card' },
            React.createElement(
              'button',
              { onClick: () => setCount(count + 1) },
              'count is ' + count
            )
          )
        );
      }
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(React.createElement(App));
    </script>
  </body>
</html>
`;

const distPath = path.join(__dirname, 'dist', 'index.html');
fs.writeFileSync(distPath, html, 'utf8');
console.log('CDN方式 index.html を dist に出力しました。');
