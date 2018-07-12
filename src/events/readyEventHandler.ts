import { Client, Guild } from "discord.js";
import { Tsukiko } from "../main";
import { TsuGuild } from "../dataObjects";
import { DBHandler } from "../common";
import { EventBase } from "./eventBase";

export class ReadyEventHandler extends EventBase {
    constructor(objBot: Tsukiko, objClient: Client, objDBHandler: DBHandler) {
        super(objBot, objClient, objDBHandler);
        this.RegisterEvent();
    }

    protected RegisterEvent(): void {
        this.objClient.on('ready', () => {
            console.log(`Ready`);
            this.objClient.guilds.forEach(guild => {
                console.log(`Added new guild: ${guild.name}`);                
            });
        });
    }
}