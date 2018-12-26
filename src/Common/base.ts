import { Client, TextChannel, GuildMember } from "discord.js";
import { TsuParameters } from ".";

export abstract class Base {
    protected client: Client;
    protected parameters: TsuParameters;    

    constructor(client: Client, parameters: TsuParameters) {
        this.client = client;
        this.parameters = parameters;        
    }

    protected GetUser(userID: string): GuildMember {
        return this.client.guilds.get(this.parameters.GUILD_ID).members.get(userID);
    }

    protected GetGeneralChannel(): TextChannel {
        return this.GetChannel(this.parameters.Channels.GENERAL_CHANNEL);
    }

    protected GetBotChannel(): TextChannel {
        return this.GetChannel(this.parameters.Channels.BOT_CHANNEL);
    }

    protected GetLogChannel(): TextChannel {
        return this.GetChannel(this.parameters.Channels.LOG_CHANNEL);
    }

    protected GetChannel(channelID: string): TextChannel {
        return this.client.channels.get(channelID) as TextChannel;
    }
}