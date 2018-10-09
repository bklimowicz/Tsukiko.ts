import { Logger, ParameterKeyConstants } from '../common';
import { Client, Guild, Collection } from 'discord.js';
import { TsuGuild } from '../dataObjects';
import { ReadyEventHandler } from '../events/readyEventHandler';
import { MessageEventHandler } from '../events';
import { BotParameters } from '../common/parameters';

export class Tsukiko {    
    private client: Client;
    private parameters: BotParameters;

    constructor() {        
        this.client = new Client();

        this.InitBot();
    }

    private InitBot() {
        this.parameters = new BotParameters();

        this.LoginSync();
        this.SetupEvents();        
    }    

    private SetupEvents() {
        //const readyEvent = new ReadyEventHandler(this.client);
        const messageEvent = new MessageEventHandler(this.client, this.parameters);
    }

    // private async Login() {
    //     this.parameters.GetToken().then(record => {
    //         record ? this.client.login(record.value) : console.log('No token provided');
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }

    private LoginSync() {
        this.parameters.GetToken().then(record => {
            record ? this.client.login(record.value) : console.log('No token provided');
        })
    }
}