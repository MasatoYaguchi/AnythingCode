import { Express, Request, Response } from "express";
import { SqliteHandelr } from "./SqliteHandler";


export class Main {

    private static readonly express = require("express");

    constructor() {
        Main.init();
        
    }
    
    static async init(): Promise<void> {
        // await SqliteHandelr.init();
        await SqliteHandelr.save(1, "testman");
        // setTimeout(SqliteHandelr.selet, 1000);
        console.log("init");
        Main.beginApi();
    }

    static beginApi(): void {

        // express アプリ作成
        const app: Express = Main.express();
        const date = +(+new Date());

        /*         const options = {
                    setHeaders: function (res: Response, path: any, stat: Function) {
                        res.set('x-timestamp', "" + Date.now());
                        res.set('Access-Control-Allow-Origin', "*");
                    }
                } */
        // @see https://expressjs.com/ja/api.html#express.static
        // app.use(express.static("public", options), () => console.log("test"));


        // json送信
        app.get("/v1/list", (req: Request, res: Response) => res.json(
            [
                {
                    "testboolean": true,
                    "testNum": 99,
                    "date": new Date(),
                    "req": req.hostname,
                    "create": date
                }
            ]
        ));

        const port = 8080;
        app.listen(port, () => console.log(`Lisstenig on port:${port}`));

    }

    /**
     * HTTPServerの作成
     */
    static beginHttpServer(): void {

    }



}