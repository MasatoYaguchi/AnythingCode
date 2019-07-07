# Qt for PythonでGUIアプリ作成テスト

参考  
https://dev.classmethod.jp/server-side/python/qt-for-python-helloworld/

## やったこと

1. pipenvをインストール `brew install pipenv`  
2. 2019/01/06時点の最新バージョンをインストール`pipenv`
3. PipFileができてる…Why?  
4. `pipenv shell`でシェルを切り替え
5. この時点で`test.py`とか作って`python3 test.py`で実行できる!  
6. `pipenv install pyside2`でQt for Pythonをインストール
7. autoDocstringをインストールしdocsStringsをショートカットで作成できるように


# 基本Python環境設定

VS CodeでPythonするために必要なこと
http://www.atmarkit.co.jp/ait/articles/1805/22/news043.html

1. VS Code でCommandパレットからselectを入力、Pythonインタープリターを選択を選択し上記pipenvで指定したバージョンを選択
2. `python3 -m venv env01`で仮想環境を作る


# fileCopy

1. タグ編集ライブラリmutagenをインストール `pip install mutagen`
参考URL:https://note.nkmk.me/python-mutagen-mp3-id3/
