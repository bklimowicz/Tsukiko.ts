import { EventBase } from "./eventBase";
import { Client } from "discord.js";
import { TsuParameters } from "..";

export class GuildBanAddEventHandler extends EventBase {
    constructor(client: Client, parameters: TsuParameters) {
        super(client, parameters);        
    }
    
    protected RegisterEvent() {
        this.client.on('guildBanAdd', (guild, user) => {
            user.send(this.BuildEmbedLogMessage('Ban', `You were banned from ${guild.name}.`));
            this.GetLogChannel().send(this.BuildEmbedLogMessage(`Member Banned.`, `${user.username} was banned.`));
        });
    }    
}