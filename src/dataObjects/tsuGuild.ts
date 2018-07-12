import { Guild, TextChannel, GuildChannel, Client } from 'discord.js';
import { DBHandler } from './../common/dbHandler';
import { SQLQueries, Logger } from '../common';
import { TsuObject } from './tsuObject';

export class TsuGuild extends TsuObject {
    protected objGuild: Guild;    
    protected botChannel = {} as TextChannel;
    protected logChannel = {} as TextChannel;

    protected readonly GUILD_READY_EVENT_MESSAGE_TITLE: string = "READY EVENT";
    protected readonly GUILD_READY_EVENT_MESSAGE_DESCRIPTION: string;

    constructor(client: Client, guild: Guild, dbConn: DBHandler, objLogger: Logger) {
        super(client, dbConn, objLogger);

        const NAME = `TsuGuild Constructor`;
        this.objGuild = guild;
        this.GUILD_READY_EVENT_MESSAGE_DESCRIPTION = `Ready for:\n\tName:\t${this.objGuild.name}\n\tID:\t${this.objGuild.id}`; // i want this parametrized for guilds

        dbConn.sql(SQLQueries.getBotChannel)
        .then((res: any) => {
            this.botChannel = guild.channels.get(res[0].channelID) as TextChannel;
        });

        dbConn.sql(SQLQueries.getLogChannel)
        .then((res: any) => {
            this.logChannel = guild.channels.get(res[0].channelID) as TextChannel;
            this.objLogger.LogEntry(NAME, `Logged to ${this.objGuild}`, this.getLogsChannel());
        });

    }

    public getBotChannel(): TextChannel {
        return this.botChannel;
    }

    public getLogsChannel(): TextChannel {
        return this.logChannel;
    }
}