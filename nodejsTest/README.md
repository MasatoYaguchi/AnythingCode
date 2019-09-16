# nodejs + typescript のテスト

参考URL:https://qiita.com/notakaos/items/3bbd2293e2ff286d9f49  
https://qiita.com/kubocchi/items/0e9bf6ee9eab98905d77


typescript install  
`yarn add typescript`  
typescript 型定義  
`yanr add @types/node`  

tsconfig.json作成  
`tsc --init`
ts-nodeパッケージ追加 tsファイルのビルド→node実行を自動化  
`yarn add ts-node`  

ビルドテスト  
`npx ts-node src/index.ts`  

Watchしてくれるパッケージ追加 保存せずとも入力するたびにビルドするのでうざいかも  
`yarn add ts-node-dev`  
Watchスタート  
`npx ts-node-dev --respawn src/index.ts`

expressの追加   
`yarn add express`  



@todo  

まずはTypeScirpt化  
https://ics.media/entry/4682/

`yarn add @types/node`
`yarn add @types/express`  

自動再起動ツール nodemon
`yarn add nodemon`



次はSQLITEを入れてみてデプロイまでやってみる  
https://expressjs.com/ja/guide/database-integration.html#sqlite
https://qiita.com/tashxii/items/7c86f39fced68ea9903d

# 2019/09/17

Sqlite3を入れてDBの作成はできるがInsertが失敗する  
DataBaseがOpenできずにエラーになる  