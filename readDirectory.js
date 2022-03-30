"use strict";
const fs = require("fs");
const path = require("path");
/**
* 引き数のディレクトリを再起的に読み込みファイルリストを返す
*
* @param {string} dirPath
*/
module.exports = async (originDirPath) => {
    const fileList = [];

    /**
     * 再起的にディレクトリを参照し、ファイル一覧を取得する
     * @param dirPath
     */
    async function innerRead(dirPath) {
        const list = await fs.promises.readdir(dirPath, { withFileTypes: true }).catch((reason) => {
            console.error(reason);
        });

        for (const key in list) {
            const dirent = list[key];
            const filePath = path.join(dirPath, dirent.name);
            if (dirent.isDirectory()) {
                await innerRead(filePath);
            }

            if (dirent.isFile()) {
                fileList.push(filePath);
            }
        }
    }
    await innerRead(originDirPath);

    return new Promise((resolve) => {
        resolve(fileList);
    });
}
