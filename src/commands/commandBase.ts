import { TsuParameters } from "./../common";
import { Client, Message, User, GuildMember, RichEmbed, MessageOptions, Attachment, TextChannel } from "discord.js";

export abstract class CommandBase {    
    protected isAdminCommand: boolean;
    protected client: Client;
    protected parameters: TsuParameters;
    protected message: Message;
    protected logChannel: TextChannel;

    constructor(client: Client, parameters: TsuParameters, message: Message)
    {
        this.client = client;
        this.parameters = parameters;
        this.message = message;
        this.logChannel = this.client.channels.get(this.parameters.Channels.LOG_CHANNEL) as TextChannel; 
    }

    protected CanUseCommand(author: User): boolean {
        if (!this.isAdminCommand) return true;

        // Make here command for szyk just in case
        // const myUserID = 
        // if (author.id = )
        
        var guildMember = this.client.guilds.get(this.parameters.GUILD_ID).members.get(author.id) as GuildMember;

        if (!this.isPrivilegedMember(guildMember)) {
                this.SendDeletableMessage(`Not enough privileges to use this command`);
                return false;
        }

        return true;
    }

    protected isPrivilegedMember(guildMember: GuildMember) {
        return guildMember.roles.has(this.parameters.Roles.ADMIN)
            || guildMember.roles.has(this.parameters.Roles.MOD)
            || guildMember.roles.has(this.parameters.Roles.TECHNICIAN);
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