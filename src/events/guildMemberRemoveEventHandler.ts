import { EventBase } from "./eventBase";
import { Client } from "discord.js";
import { TsuParameters } from "..";

export class GuildMemberRemoveEventHandler extends EventBase {
    constructor(client: Client, parameters: TsuParameters) {
        super(client, parameters);        
    }

    protected RegisterEvent() {
        this.client.on('guildMemberRemove', (user) => {
            this.GetGeneralChannel().send(`${user.nickname}(${user.id}) wyszedł z serwera.`);
            this.GetLogChannel().send(this.BuildEmbedLogMessage('Member left.', `${user.nickname}(${user.id}) left the server.`));
        });
    }
}