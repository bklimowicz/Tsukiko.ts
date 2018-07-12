import { Client } from "discord.js";
import { DBHandler } from "../common";
import { EventBase } from "./eventBase";
import { Tsukiko } from "../main";

export class GuildMemberRemoveHandler extends EventBase {
    constructor(bot: Tsukiko, client: Client, dbHandler: DBHandler) {
        super(bot, client, dbHandler)
    }
    protected RegisterEvent(): void {
        throw new Error("Method not implemented.");
    }
}