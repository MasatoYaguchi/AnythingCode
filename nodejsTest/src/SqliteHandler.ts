import { resolve } from "dns";
import { rejects } from "assert";
import { sqlite3, Database } from "sqlite3";

export class SqliteHandelr {
    private static sqlite3: sqlite3 = require("sqlite3").verbose();
    private static db: Database = new SqliteHandelr.sqlite3.Database("testdata.db");
    private static readonly TABLE_NAME = "data";
    private static readonly ID = "id";
    private static readonly NAME = "name";


    static async init(): Promise<void> {
        return new Promise<void>((resolve, rejects) => {
            this.db.serialize(() => {
                this.db.run(`CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (${this.ID} INTEGER,${this.NAME} TEXT)`);
                this.db.close();
                console.log("init database");
                return resolve();
            });
        });
    }

    static async save(id: number, name: string): Promise<void> {
        console.log(id, name);
        return new Promise<void>((resolve, rejects) => {


            console.log(this.db);

            try {
                this.db.serialize(() => {
                    this.db.run(`
                    insert or replace into ${this.TABLE_NAME} 
                    (id, name) 
                    values ($id, $name)`,
                        id, name
                    )
                    console.log(this.db);

                    this.db.close();
                    return resolve();
                });
            } catch (err) {
                console.error(err);
                return rejects(err);
            }



        });

    }

    static selet(): void {
        if (!this.db) {
            console.error("not db");

            return;
        }

        this.db.serialize(() => {
            this.db.each(`SELECT * FROM ${this.TABLE_NAME}`, (error, row) => {
                if (error) {
                    console.error('Error!', error);
                    return;
                }

                // カラムを指定してデータを表示する
                console.log(row.id + ' … ' + row.name);
            });
        });

        this.db.close();
    }

}