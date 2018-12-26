import { EventBase } from "./eventBase";
import { Client } from "discord.js";
import { TsuParameters } from "..";

export class GuildBanRemoveEventHandler extends EventBase {
    constructor(client: Client, parameters: TsuParameters) {
        super(client, parameters);        
    }

    protected RegisterEvent() {
        this.client.on('guildBanRemove', (guild, user) => {
            this.GetLogChannel().send(this.BuildEmbedLogMessage('Ban Removed.', `${user.username} was unbanned.`));
        });
    }    
}