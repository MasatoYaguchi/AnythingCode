const express = require("express");
// express アプリ作成
const app = express();
const date = +(+new Date());
// json送信
app.get("/v1/list", (req, res) => res.json(
    [
        {
            "testboolean": true,
            "testNum": 99,
            "date": new Date(),
            "create": date
        }
    ]
));
// server start!
app.listen(8000, () => console.log("Lisstenig on port"));

