# vue test

## what

vueのテストを行う
vue cliはインストール済み

## やったこと

`vue create [プロジェクト名]`でプロジェクト作成
設定は以下の通り
~~~
Vue CLI v4.4.6
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, TS, PWA, Router, Vuex, Linter
? Use class-style component syntax? Yes
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a linter / formatter config: TSLint
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In package.json
? Save this as a preset for future projects? Yes
? Save preset as: test
? Pick the package manager to use when installing dependencies: Yarn
~~~

### yarnでプロジェクト起動
~~~bash
$ cd vue-ts-practice
$ yarn serve
~~~


### bootstrap追加

`yarn add bootstrap-vue bootstrap`

### electron-builderプラグインを追加

すべてYesでVer9を選択
`vue add electron-builder`

### エラー解決のためにバージョン指定でNodeJSのTypeを入れる

`Cannot extend an interface 'NodeJS.EventEmitter'.`のようにEventEmitterでエラーが出る
参考URLにあるように@types/nodeのバージョンを指定する
`yarn add @types/node@12.6.9`


### エラー解決のためにelectron-devtools-installerを追加

以下が入っていなくてエラーになっているので追加
`yarn add electron-devtools-installerr`

### pixi.js追加

`yarn add pixi.js @types/pixi.js`

## 参考URL
vue.js + typescript = vue.ts ことはじめ
https://qiita.com/nrslib/items/be90cc19fa3122266fd7

Vue/Nuxt開発効率を3倍にするVSCode拡張機能セット
https://qiita.com/kyohei_ai/items/aeddc6a179ea3a464ed5

[Vue+TypeScript] Vue.extend で Vue らしさを保ちつつ TypeScript で書くときの型宣言についてまとめた
https://qiita.com/is_ryo/items/6fc799ba4214db61d8ab

vue + electron で windowsデスクトップアプリを作成する
https://qiita.com/quzq/items/608fa811f7ff2c1ae7f3

「Cannot extend an interface 'NodeJS.EventEmitter'.…」の解決方法メモ(vue-cli4+TypeScript+Electron)
https://qiita.com/kagayat829/items/cf26b7a2702d69b463dc



## やりたいこと

- Pixi.js
- Vue.js
- Bootstrap-vue
- electron

1. フォルダ指定 もしくは ファイル指定で画像を読み込む
2. 画像を表示してソースとグループを選択
3. 画像を結合し、結果を表示
