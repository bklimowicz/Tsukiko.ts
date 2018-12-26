import { EventBase } from "./eventBase";
import { Client } from "discord.js";
import { TsuParameters } from "..";

export class MessageDeleteEventHandler extends EventBase {
    constructor(client: Client, parameters: TsuParameters) {
        super(client, parameters);        
    }

    protected RegisterEvent() {
        this.client.on('messageDelete', (message) => {
            this.GetLogChannel().send(this.BuildEmbedLogMessage('Message Deleted', `Message deleted in ${message.channel}\n\`\`\`${message.content}\`\`\``));
        });
    }
}