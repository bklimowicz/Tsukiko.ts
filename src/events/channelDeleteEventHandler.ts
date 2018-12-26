import { EventBase } from "./eventBase";
import { Channel, TextChannel, Client } from "discord.js";
import { ChannelType, TsuParameters } from "..";

export class ChannelDeleteEventHandler extends EventBase {
    constructor(client: Client, parameters: TsuParameters) {
        super(client, parameters);        
    }
    
    protected RegisterEvent() {
        this.client.on('channelDelete', (_channel: Channel) => {
            if (!(_channel.type === ChannelType.TEXT)) {
                return;
            }
            const channel = _channel as TextChannel;
            this.GetLogChannel().send(this.BuildEmbedLogMessage('Channel Deleted.', `${channel.name} was deleted.`));
        })
    }
}