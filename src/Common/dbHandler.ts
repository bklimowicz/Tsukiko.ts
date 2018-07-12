import * as mysql from 'mysql';
import { DBConfig } from './../cfg/index';

export class DBHandler {
    private config: mysql.ConnectionConfig = {
        host: DBConfig.host,
        user: DBConfig.user,
        password: DBConfig.password,
        database: DBConfig.dbName,
    };

    private connection = mysql.createConnection(this.config);

    constructor() {
        this.connect();
    }

    private async connect() {
        this.connection.connect((err) => {
            if (err) {
                console.log(`Error connecting to ${this.config.database}: ${err}`);
                return;
            }
            console.log(`Connected to ${this.config.database}`);
        });
    }

    public sql(sql: string, args: string[] | undefined = undefined): Promise<mysql.Query> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, res) => {
                if (err) {
                    console.log(`DB QUERY ERROR`);
                    console.log(`Query: ${sql.toString()}`);
                    console.log(`Error: ${err.message}.`);
                    return reject(err);
                }
                console.log(`Query: ${sql}`);
                console.log(`Result: ${JSON.stringify(res)}`);
                resolve(res);
            });
        });
    }
}
