import { EventBase } from "./eventBase";
import { Client } from "discord.js";
import { TsuParameters } from "..";

export class GuildMemberRemoveEventHandler extends EventBase {
    constructor(client: Client, parameters: TsuParameters) {
        super(client, parameters);        
    }

    protected RegisterEvent() {
        this.client.on('guildMemberRemove', (user) => {
            this.GetGeneralChannel().send(`${user} wyszedł z serwera.`);
            this.GetLogChannel().send(this.BuildEmbedLogMessage('Member Left.', `${user} (${user.id}) left the server.`));
        });
    }
}