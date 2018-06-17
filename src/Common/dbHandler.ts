import { Client, Query, QueryResult } from 'pg';
import { DBConfig } from './../cfg/index';

export class DBHandler {    
    client: Client = new Client({
        user: DBConfig.user,
        host: DBConfig.host,
        database: DBConfig.dbName,
        password: DBConfig.password,
        port: DBConfig.port
    });    

    constructor() {
        this.connect();        
    }

    private async connect() {
        await this.client.connect((err) => {
            if (err) {
                console.log(`Error occured on connection:\n${err}`);
                return;
            }
            console.log(`Successfully connected to ${DBConfig.dbName}`);
        });
    }

    public async sql(sql: string): Promise<QueryResult> {
        return await this.client.query(sql);        
    }
}