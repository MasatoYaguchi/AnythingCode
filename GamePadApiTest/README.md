# How to

このリポジトリのwebpack.config.jsとpackage.jsonを適当なフォルダに入れて  
`yarn`コマンド実行で環境構築できるはず


# To do

http://cloudcafe.tech/?p=653
ここらを参考にビルド後の圧縮設定を行う


# TypeScriptの設定

参考URL  
https://ics.media/entry/16329/

yarnとnodejs及びVS Codeがインストール済みの想定

## パッケージ追加

VS codeで対象フォルダを開く
ターミナルから対象パッケージを柄v
`yarn add webpack webpack-cli typescript ts-loader`  
  
## package.json

下記のWebPackビルド用の設定追加
```json
  "scripts": {
    "build": "webpack",
    "watch": "webpack -w"
  }
,
```

## tsconfig.jsonの設定

`tsc --init`で雛形作成  
sourceMapをtrueに、moduleをes2015に変更


## webpack.config.jsの作成

https://qiita.com/t-yng/items/ab2eb58c0dc2f84a8938  
上記URLを参考に`webpack init`はうまく行かなかったのでべた書き  
参考URLの例をコピペ  


## 実行テスト

distフォルダを作成し、index.htmlを作成  
空のindex.htmlに`html:5`と入力して変換すればVS CodeのEmmetが動作して  
HTML5の雛形が作成される。HEADタグ内で`script:src`と入力すればScriptタグの  
雛形ができるのでmain.jsを指定

`yarn build`でコンパイルされるか確認


# webpack-dev-serverの導入

参考URL  
https://qiita.com/riversun/items/d27f6d3ab7aaa119deab

## パッケージ追加

TypeScrpt設定ずみのこのフォルダ内に追加
`yarn add webpack-dev-server`

## package.jsonの変更

package.jsonのscriptに追記  
~~~json
  "scripts": {
    "start": "webpack-dev-server",
    "build": "webpack --config webpack.config.js"
  },
~~~

## webpack.config.jsに追記


outputを指定しないとうまく行かなかったので指定  
~~~javascript
    output: {
        //  出力ファイルのディレクトリ名
        path: `${__dirname}/dist`,
        // 出力ファイル名
        filename: "index.js"
      },
~~~

更にDevServerの設定を追加

~~~javascript
    //sourcemapを有効に
    devtool: "inline-source-map",
    //webpack-dev-server用設定
    devServer: {
        open: true,//ブラウザを自動で開く
        openPage: "./index.html",//自動で指定したページを開く
        contentBase: path.join(__dirname, "dist"),// HTML等コンテンツのルートディレクトリ
        watchContentBase: true,//コンテンツの変更監視をする
        port: 8080, // ポート番号
    }
~~~

このままではResolveErrorが出るのでextensionsにjsを追加する  
参考URL https://github.com/webpack/webpack-dev-server/issues/720
~~~javascript
    resolve: {
        // import 文で .ts ファイルを解決するため
        extensions: [".ts",".js"]
    },
~~~

## 動作確認

`yarn start`を実行し、設定のとおりにブラウザで対象ページが開いていることを確認  
main.ts及びsub.tsの内容を変更すると即座に反映されることを確認  

## 注意

webpack-dev-serverで書き出されるjsはメモリ上に書き出されるので  
アップロード等する場合は`yarn build`でwebpackのbuildを行うこと



## その他
 emmetを使って`link:css`からCSS読み込みを追加  
 css/styel.cssフォルダを追加

 webpack.config.jsのoutputにpublicPathを追加しjsフォルダ内に書き出される用修正
~~~javascript
    output: {
        //  出力ファイルのディレクトリ名
        path: `${__dirname}/dist/js`,
        //ブラウザからバンドルにアクセスする際のパス
        publicPath: "/js/", 

    },
~~~~

/Applications/Firefox Developer Edition.app/Contents/MacOS/firefox -start-debugger-server


/Applications/Firefox.app/Contents/MacOS/firefox -start-debugger-server