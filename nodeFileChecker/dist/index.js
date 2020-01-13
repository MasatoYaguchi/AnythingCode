"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const readDirectory = (dirPath) => {
    return new Promise((resolve, rejects) => {
        fs.readdir(dirPath, { encoding: "utf8", withFileTypes: true }, (err, dirents) => {
            if (err)
                rejects(err);
            resolve(dirents);
        });
    });
};
const readAllFile = (dirPath) => new Promise(async (resolve) => {
    let result = [];
    let dirents = await readDirectory(dirPath);
    for (const dirent of dirents) {
        const fullPath = path.join(dirPath, dirent.name);
        if (dirent.isDirectory()) {
            const data = await readAllFile(fullPath);
            result = result.concat(data);
        }
        else if (dirent.name.includes(".DS_Store") === false) {
            result.push(fullPath);
        }
    }
    resolve(result);
});
const writeFile = (path, data) => {
    fs.writeFile(path, data, (err) => {
        if (err)
            throw err;
        console.log(`${path}に書き出し完了`);
    });
};
/**
 * 引数のフォルダパスのファイル名一覧を返す
 * @param filePath
 */
const test = async (filePath) => {
    if (filePath === undefined) {
        console.error("filePath undefined");
        return;
    }
    console.log(filePath + "のファイル呼び出し");
    const fileList = await readAllFile(filePath);
    let fileListString = "";
    fileList.forEach(value => fileListString += value + "\n");
    console.log(path.basename(fileList[0]));
    writeFile(`./log.txt`, fileListString);
};
/**
 * 第2引数のフォルダに第1引数のファイルが存在するかチェックしtextファイルに書き出す
 *
 * @param sourcePath
 * @param distPath
 */
const fileCheck = async (sourcePath, distPath) => {
    if (sourcePath === undefined || distPath === undefined) {
        console.error("filePath undefined");
        return;
    }
    const source = await readAllFile(sourcePath);
    const dist = await readAllFile(distPath);
    let check = [];
    check = source.filter(value => {
        const ext = path.extname(value);
        const basename = path.basename(value).trim().replace(ext, "");
        for (const iterator of dist) {
            if (iterator.trim().includes(basename)) {
                return false;
            }
        }
        return true;
        // dist.includes(path.basename(value))
    });
    console.log(source.length, dist.length, check.length);
    let log = "";
    check.forEach(value => log += value + "\n");
    writeFile(`./check.txt`, log);
};
console.log(process.argv.length);
return;
if (process.argv.length === 3) {
    test(process.argv[2]);
}
else if (process.argv.length === 4) {
    fileCheck(process.argv[2], process.argv[3]);
}
//# sourceMappingURL=index.js.map