import { Client } from "discord.js";
import { DBHandler } from "../common";
import { EventBase } from "./eventBase";
import { Tsukiko } from "..";

export class GuildBanAddHandler extends EventBase {
    constructor(objBot: Tsukiko, objClient: Client, objDBHandler: DBHandler) {
        super(objBot, objClient, objDBHandler);
        // this.RegisterEvent();
    }

    RegisterEvent(): void {
        
    }    
}