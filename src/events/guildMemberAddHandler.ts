import { Client } from "discord.js";
import { DBHandler } from "../common";
import { Tsukiko } from "../main";
import { EventBase } from "./eventBase";

export class GuildMemberAddHandler extends EventBase {
    constructor(bot: Tsukiko, client: Client, dbHandler: DBHandler) {
        super(bot, client, dbHandler);
    }
    protected RegisterEvent(): void {
        throw new Error("Method not implemented.");
    }

}