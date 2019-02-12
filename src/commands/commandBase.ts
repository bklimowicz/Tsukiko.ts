import { TsuParameters, Base } from "./../Common";
import { Client, Message, User, GuildMember, RichEmbed, MessageOptions, Attachment } from "discord.js";

export abstract class CommandBase extends Base {    
    protected isAdminCommand: boolean;
    protected client: Client;
    protected parameters: TsuParameters;
    protected message: Message;

    constructor(client: Client, parameters: TsuParameters, message: Message)
    {
        super(client, parameters);        
        this.message = message;        
    }

    protected CanUseCommand(author: User): boolean {
        if (!this.isAdminCommand) return true;

        // SZK EXCLUSIVE USEAGE START
        const myUserID = this.GetUser("225521387480154112").user.id;
        if (author.id === myUserID) return true;
        // SZK EXCLUSIVE USEAGE END
        
        var guildMember = this.client.guilds.get(this.parameters.GUILD_ID).members.get(author.id) as GuildMember;

        if (!this.isPrivilegedMember(guildMember)) {
                this.SendDeletableMessage(`Not enough privileges to use this command`);
                return false;
        }

        return true;
    }

    protected SendDeletableMessage(message: string | RichEmbed | MessageOptions | Attachment) {
        
        this.message.channel.send(message).then((_message: Message) => {
            setTimeout(() => {
                _message.delete();
            }, this.parameters.MESSAGE_DELETE_TIME);
        });        
    }

    protected BuildEmbedLogMessage(title: string, description: string): RichEmbed {
        return new RichEmbed({ 
            title: title,
            description: description,
            color: this.parameters.EMBEDED_COLOR
        });
    }

    protected abstract ExecuteCommand(): void;
}