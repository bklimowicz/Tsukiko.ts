import { Logger, ParametersKeysConstants } from '../common';
import { Client, Guild, Collection } from 'discord.js';
import { ReadyEventHandler } from '../events/readyEventHandler';
import { MessageEventHandler, UnmuteEventHandler, DynamicChannelsEventHandler } from '../events';
import { TsuParameters } from '../common/parameters';

export class Tsukiko {    
    private client: Client;
    private parameters: TsuParameters;    

    constructor() {        
        this.client = new Client();
        this.InitBot();
    }

    private InitBot() {
        this.parameters = new TsuParameters();        

        new Ticker(this.client, TickerStamps.DEBUG_MODE);        
        
        this.LoginSync();
        this.SetupEvents();        
    }    

    private SetupEvents() {
    //    new ReadyEventHandler(this.client, this.parameters);
        new MessageEventHandler(this.client, this.parameters);
        new UnmuteEventHandler(this.client, this.parameters);
        new DynamicChannelsEventHandler(this.client, this.parameters);
    }

    private LoginSync() {
        this.parameters.GetToken().then(record => {
            record ? this.client.login(record.value).then(_ => { console.log(`Logged in successfully.`)}) : console.log('No token provided');
        });
    }
}

enum TickerStamps {
    HALF_MINUTE = 30000,
    FULL_MINUTE = 60000,
    DEBUG_MODE = 5000
}

class Ticker {
    private TICKER_MODE: TickerStamps;
    private client: Client;

    constructor(client: Client, TICKER_MODE: TickerStamps) {
        this.TICKER_MODE = TICKER_MODE;
        this.client = client;
        this.InitTicker();
    }

    private InitTicker() {
        if (this.TICKER_MODE === TickerStamps.HALF_MINUTE) {
            setInterval(() => {
                let date = new Date();
                date.setSeconds(0);
                date.setMilliseconds(0);
                this.client.emit('tick', date);
            }, TickerStamps.HALF_MINUTE)
        }
        else if (this.TICKER_MODE === TickerStamps.FULL_MINUTE) {
            setInterval(() => {
                let date = new Date();
                date.setSeconds(0);
                date.setMilliseconds(0);
                this.client.emit('tick', date);
            }, TickerStamps.FULL_MINUTE)
        }
        else if (this.TICKER_MODE === TickerStamps.DEBUG_MODE) {
            setInterval(() => {
                let date = new Date();
                date.setSeconds(0);
                date.setMilliseconds(0);
                this.client.emit('tick', date);
            }, TickerStamps.DEBUG_MODE)
        }
    }    
}