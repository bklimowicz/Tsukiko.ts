import { TextChannel, Client, Collection, } from 'discord.js';
import { TypeDef } from './Common/TypeDef';

export class Tsukiko {   

    public readonly client: Client;

    constructor() {
        this.client = new Client;
        let channel: any = {};
        let adID: number = 0;
        let usersOnCmdCooldown: any[] = [];
        let commands: Collection<any, any> = new Collection();
        
        this.login(this.client);
        // this.loadCommands(client);
        // this.loadAdminCommands(client);
        this.setupEvents(this.client);        
    }        
    
    login(client: Client): void {
        client.login(TypeDef.Token.token);
    }
    
    setupEvents(client: Client): any {
        // new ReadyHandler(client);
        // new GuildBanHandler(client);        
        // this.setupGuildBanRemoveEvent(client);
        // this.setupGuildMemberAddEvent(client);
        // this.setupGuildMemberRemoveEvent(client);
        // this.setupMessageEvent(client);
        // this.setupChannelCreatedEvent(client);
    }
    
    loadAdminCommands(client: Client): any {
        throw new Error("Method not implemented.");
    }
    
    loadCommands(client: Client): any {
        throw new Error("Method not implemented.");
    }
}