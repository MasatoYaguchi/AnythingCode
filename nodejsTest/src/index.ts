import { Express, Request, Response } from "express";

const express = require("express");
// express アプリ作成
const app: Express = express();
const date = +(+new Date());

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
// server start!
app.listen(8000, () => console.log("Lisstenig on port"));