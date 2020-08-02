import { app, BrowserWindow } from 'electron'

app.on("ready", () => {

    // メインウィンドウを生成
    let mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        },
        width: 1280,
        height: 720,
    })

    // ウィンドウが閉じたら後片付けする
    mainWindow.on('closed', () => {
        mainWindow = null
    })
    console.log("test");
    // index.hrml をウィンドウに表示
    mainWindow.loadURL('file://' + __dirname + '/index.html')

    mainWindow.setBackgroundColor("red");
});