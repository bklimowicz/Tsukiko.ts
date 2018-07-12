import { DBHandler, Logger } from '../common';
import { Client, Guild } from 'discord.js';
import { SQLQueries } from './../common/sql';
import { TsuGuild } from '../dataObjects';

export class Tsukiko {
    private objDBConnection: DBHandler;
    private botClient: Client;
    private GUILDS: TsuGuild[] = [];

    public objLogger = new Logger();

    constructor(objDBConnection: DBHandler) {
        this.objDBConnection = objDBConnection;
        this.botClient = new Client();
        this.login();        
        this.setupGuilds();
    }        

    private setupGuilds() {
        console.log(`Setting up guilds.`);
        this.botClient.guilds.forEach(guild => {
            this.GUILDS.push(new TsuGuild(this.botClient, guild, this.objDBConnection, this.objLogger));
        });
    }

    private login() {
        const NAME = `Login`;
        this.objLogger.LogEntry(NAME, `Entering ${NAME} function.`, undefined);
        this.objDBConnection.sql(SQLQueries.getToken)
            .then((res: any) => {
                this.botClient.login(res[0].value)
                .then(() => {
                    console.log(`Successfully logged in.`);
                    this.setupGuilds();
                });                
            })
            .catch((err) => {
                console.log(`Error occured on login:\n${err}`);
            });
        this.objLogger.LogExit(NAME, `Exiting ${NAME} function.`, undefined)
    }

    public AddGuild(guild: TsuGuild) {
        this.GUILDS.push(guild);
    }
}