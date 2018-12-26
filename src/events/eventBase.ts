import { TsuParameters } from "./../main";
import { Client, TextChannel, RichEmbed, MessageOptions, Attachment, Message } from "discord.js";
import { Base } from "../common";

export abstract class EventBase extends Base {
    constructor(client: Client, parameters: TsuParameters) {
        super(client, parameters);
        this.RegisterEvent();
    }

    protected SendDeletableMessage(message: string | RichEmbed | MessageOptions | Attachment) {
        const channel = this.client.guilds.get(this.parameters.GUILD_ID).channels.get(this.parameters.Channels.LOG_CHANNEL) as TextChannel;
        channel.send(message).then((_message: Message) => {
            setTimeout(() => {
                _message.delete();     
            }, this.parameters.MESSAGE_DELETE_TIME);
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