import { Guild, TextChannel, GuildChannel } from 'discord.js';
import { DBHandler } from './../common/dbHandler';
import { SQLQueries } from '../common';

export class TsuGuild {
    private GUILD: Guild;
    private defaultChannel: TextChannel;
    private botChannel = {} as TextChannel;
    private logChannel = {} as TextChannel;

    private readonly GUILD_READY_EVENT_MESSAGE_TITLE: string = "READY EVENT";
    private readonly GUILD_READY_EVENT_MESSAGE_DESCRIPTION: string;


    constructor(guild: Guild, dbConn: DBHandler) {
        this.GUILD = guild;
        this.GUILD_READY_EVENT_MESSAGE_DESCRIPTION = `Ready for:\n\tName:\t${this.GUILD.name}\n\tID:\t${this.GUILD.id}`
        this.defaultChannel = guild.defaultChannel;
        dbConn.sql(SQLQueries.getBotChannel)
            .then((res: any) => {
                this.botChannel = guild.channels.get(res[0].channelID) as TextChannel;
            })
        dbConn.sql(SQLQueries.getLogChannel)
            .then((res: any) => {
                this.logChannel = guild.channels.get(res[0].channelID) as TextChannel;
                this.logChannel.send({
                    embed: {
                        title: this.GUILD_READY_EVENT_MESSAGE_TITLE,
                        description: this.GUILD_READY_EVENT_MESSAGE_DESCRIPTION,                        
                        color: 0x17A589
                    }
                });
            })

    }

    public getBotChannel(): GuildChannel {
        return this.botChannel;
    }

    public getLogsChannel(): GuildChannel {
        return this.logChannel;
    }

    public getDefaultChannel(): GuildChannel {
        return this.defaultChannel;
    }
}