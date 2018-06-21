import { DBHandler } from "../common";
import { Client, Guild } from 'discord.js';
import { SQLQueries } from './../common/sql';
import { ReadyEventHandler } from "../events";
import { TsuGuild } from "../dataObjects";
import { queryCallback } from "mysql";

export class Tsukiko {
    private objDBConnection: DBHandler;
    private botClient: Client;
    
    public static GUILDS: TsuGuild[] = [];

    constructor(objDBConnection: DBHandler) {
        this.objDBConnection = objDBConnection;
        this.botClient = new Client();
        this.login();

        let readyHandlerObj = new ReadyEventHandler(this.botClient, this.objDBConnection);
    }        

    private login() {
        this.objDBConnection.sql(SQLQueries.getToken)
            .then((res: any) => {
                this.botClient.login(res[0].value)
                .then(() => {
                    console.log(`Successfully logged in`)
                });                
            })
            .catch((err) => {
                console.log(`Error occured on login:\n${err}`);
            });
    }
}