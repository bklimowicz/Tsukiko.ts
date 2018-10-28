import { Tsukiko, TsuParameters } from "../main";
import { Client, TextChannel, RichEmbed, MessageOptions, Attachment, Message } from "discord.js";

export abstract class EventBase{
    protected client: Client;
    protected parameters: TsuParameters;
    protected logChannel: TextChannel;

    constructor(client: Client, parameters: TsuParameters) {
        this.client = client;
        this.parameters = parameters;
        this.logChannel = this.logChannel = this.client.channels.get(this.parameters.Channels.LOG_CHANNEL) as TextChannel;

        this.RegisterEvent();
    }

    protected SendDeletableMessage(message: string | RichEmbed | MessageOptions | Attachment) {
        const channel = this.client.guilds.get(this.parameters.GUILD_ID).channels.get(this.parameters.Channels.LOG_CHANNEL) as TextChannel;
        channel.send(message).then((_message: Message) => {
            setTimeout(() => {
                _message.delete();     
            }, this.parameters.MESSAGE_TIME_DELETE);
        });
    }

    protected BuildEmbedLogMessage(title: string, desctiption: string): RichEmbed {
        return new RichEmbed({ 
            title: title,
            description: desctiption,
            color: this.parameters.EMBEDED_COLOR
        });
    }

    protected abstract RegisterEvent(): any;
}