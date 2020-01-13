
import * as fs from "fs";
import * as path from "path";

/**
 * 引数のパスを読み込みDirentで返す
 * @param dirPath 読み込むフォルダパス
 */
const readDirectory = (dirPath: string): Promise<fs.Dirent[]> => {
    return new Promise<fs.Dirent[]>((resolve, rejects) => {
        fs.readdir(dirPath, { encoding: "utf8", withFileTypes: true }, (err: NodeJS.ErrnoException | null, dirents: fs.Dirent[]) => {
            if (err) rejects(err);
            resolve(dirents);
        });
    });
};


/**
 * 引数のフォルダのファイルリストを返す
 * フォルダのみでファイルがない場合はリストに入らない
 * @param dirPath 読み込むフォルダパス
 */
const readAllFile = (dirPath: string): Promise<string[]> => new Promise<string[]>(async (resolve) => {
    let result: string[] = [];
    let dirents = await readDirectory(dirPath);
    for (const dirent of dirents) {
        const fullPath = path.join(dirPath, dirent.name);
        if (dirent.isDirectory()) {
            const data = await readAllFile(fullPath);
            result = result.concat(data);
        } else if (dirent.name.includes(".DS_Store") === false) {
            result.push(fullPath);
        }
    }

    resolve(result);
});

/**
 * テキストファイル書き出し
 * @param path 書き出し先のパス
 * @param data 書き出したいデータ
 */
const writeFile = (path: string, data: string): void => {
    fs.writeFile(path, data, (err: NodeJS.ErrnoException | null) => {
        if (err) throw err;
        console.log(`${path}に書き出し完了`);
    });
}


/**
 * 引数のフォルダパスのファイル名一覧を返す
 * @param filePath 
 */
const folderFileList = async (filePath: string) => {
    if (filePath === undefined) {
        console.error("filePath undefined");
        return;
    }
    console.log(filePath + "のファイル呼び出し");
    const fileList = await readAllFile(filePath);
    let fileListString = "";
    fileList.forEach(value => fileListString += value + "\n");
    writeFile(`./log.txt`, fileListString);

}

/**
 * 第2引数のフォルダに第1引数のファイルが存在するかチェックしtextファイルに書き出す
 * 
 * @param sourcePath 
 * @param distPath 
 */
const fileCheck = async (sourcePath: string, distPath: string) => {
    if (sourcePath === undefined || distPath === undefined) {
        console.error("filePath undefined");
        return;
    }

    const source = await readAllFile(sourcePath);
    const dist = await readAllFile(distPath);
    let check: string[] = [];
    check = source.filter(value => {
        const ext = path.extname(value);
        const basename = path.basename(value).trim().replace(ext, "");
        for (const iterator of dist) {
            if (iterator.trim().includes(basename)) {
                return false;
            }
        }
        return true;
    });
    console.log(source.length, dist.length, check.length);
    let log: string = "";
    check.forEach(value => log += value + "\n");
    writeFile(`./check.txt`, log);


}

if (process.argv.length === 3) {
    folderFileList(process.argv[2]);
} else if (process.argv.length === 4) {
    fileCheck(process.argv[2], process.argv[3]);
}