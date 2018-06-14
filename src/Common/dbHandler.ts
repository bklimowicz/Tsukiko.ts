import { Client, Query } from 'pg';
import { Common } from './common';

export class DBHandler {
    private static readonly address = "192.168.1.156";
    private static readonly dbName = "TsukikoDB";
    private static readonly port = 5432;
    private static readonly user = "Admin";
    private static readonly password = "!Samsung4632599!";
    private static client: Client;

    static connect(callback: any): void {
        callback(() => {
            this.client = new Client({
                user: this.user,
                host: this.address,
                database: this.dbName,
                password: this.password,
                port: this.port
            });
            this.client.connect(function () {
                console.log(`connected`);
            });

        })
    }

    static async query(sql: string): Promise<Query> {
        return await this.client.query(sql, (err, res) => {
            if (err) {
                console.log(err.message);
            }
        })
    }

    static dispose(): void {
        this.client.end();
    }
}