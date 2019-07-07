# nodejs + typescript のテスト

参考URL:https://qiita.com/notakaos/items/3bbd2293e2ff286d9f49


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

Watchしてくれるパッケージ追加  
`yarn add ts-node-dev`  
Watchスタート
`npx ts-node-dev --respawn src/index.ts`
