import { Client } from "discord.js";
import { DBHandler } from "../common";
import { EventBase } from "./eventBase";
import { Tsukiko } from "../main";

export class GuildBanRemoveHandler extends EventBase {
    constructor(bot: Tsukiko, client: Client, dbHandler: DBHandler) {
        super(bot, client, dbHandler);
    }
    protected RegisterEvent(): void {
        // this.client.on('guildBanRemove', (guild, user) => {
        //     this.DisplayMessage(guild, user);
        //     this.LogMessage(guild, user);
        // });
    }
}