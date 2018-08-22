import { DBHandler, Logger } from '../common';
import { Client, Guild, Collection } from 'discord.js';
import { SQLQueries } from './../common/sql';
import { TsuGuild } from '../dataObjects';

export class Tsukiko {
    private objDBConnection: DBHandler;
    private botClient: Client;
    private GUILDS: TsuGuild[] = [];    
    private objLogger = new Logger();

    constructor(objDBConnection: DBHandler) {
        this.objDBConnection = objDBConnection;
        this.botClient = new Client();            
        this.login();
        //this.setupGuilds();
    }

    private setupGuilds(): void {
        console.log(`Setting up guilds.`);
        this.botClient.guilds.forEach(guild => {
            this.GUILDS.push(new TsuGuild(this.botClient, guild, this.objDBConnection, this.objLogger));
        });
    }

    private login(): void {
        const NAME = `Login`;        
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
    }
}