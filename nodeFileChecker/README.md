# 2つのフォルダ内で同一ファイル名をチェックし結果をテキストファイルに書き出す

## how to use

nodeからindex.js を呼び出す  
`node ./dist/index.js 比較したいフォルダパス 比較元のフォルダパス`   

## develop

開発時はts-nodeを利用  
`npx ts-node ./src/index.ts 比較したいフォルダパス 比較元のフォルダパス`  


## todo

拡張子抜きでは判別しているのに音声ファイルの比較がうまく行ってないことがあるので確認
