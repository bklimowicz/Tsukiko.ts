import { EventBase } from "./eventBase";
import { Client } from "discord.js";
import { TsuParameters } from "..";

export class MessageUpdateEventHandler extends EventBase {
    constructor(client: Client, parameters: TsuParameters) {
        super(client, parameters);        
    }

    protected RegisterEvent() {
        this.client.on('messageUpdate', (oldMessage, newMessage) => {       
            if (newMessage.content === oldMessage.content) return;
            this.GetLogChannel().send(this.BuildEmbedLogMessage('Message Edited.', `Message edited by ${newMessage.author}\nin ${oldMessage.channel}\n**Old Message:**\n${oldMessage.content}\n**New Message:**\n${newMessage.content}`));
        });
    }
}