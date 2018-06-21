import { Client, Guild } from "discord.js";
import { Tsukiko } from "../main";
import { TsuGuild } from "../dataObjects";
import { DBHandler } from "../common";

export class ReadyEventHandler {
    private client: Client;
    private dbConn: DBHandler;

    constructor(client: Client, dbConn: DBHandler) {
        this.client = client;
        this.dbConn = dbConn;

        client.on('ready', () => {
            console.log(`Ready`);
            this.client.guilds.forEach(guild => {
                console.log(`Added new guild: ${guild.name}`)
                Tsukiko.GUILDS.push(new TsuGuild(guild, this.dbConn));
            });
        });
    }

    // private initEvent() {
        
    // }
}