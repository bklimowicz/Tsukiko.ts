import { TsuParameters } from "../common";
import { Client, Message, User, GuildMember } from "discord.js";

export abstract class CommandBase {    
    protected isAdminCommand: boolean;
    protected client: Client;
    protected parameters: TsuParameters;
    protected message: Message;    

    constructor(client: Client, parameters: TsuParameters, message: Message)
    {
        this.client = client;
        this.parameters = parameters;
        this.message = message;        
    }

    protected CanUseCommand(author: User): boolean {
        if (!this.isAdminCommand) return true;

        // Make here command for szyk just in case
        // const myUserID = 
        // if (author.id = )
        
        var guildMember = this.client.guilds.get(this.parameters.GUILD_ID).members.get(author.id) as GuildMember;

        if (!(guildMember.roles.has(this.parameters.Roles.ADMIN)
            || guildMember.roles.has(this.parameters.Roles.MOD)
            || guildMember.roles.has(this.parameters.Roles.TECHNICIAN))) {
                return false;
            }

        return true;
    }    

    protected abstract ExecuteCommand(): void;
}