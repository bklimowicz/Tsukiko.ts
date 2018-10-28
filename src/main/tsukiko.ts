import { Logger, ParametersKeysConstants } from '../common';
import { Client, Guild, Collection } from 'discord.js';
import { ReadyEventHandler } from '../events/readyEventHandler';
import { MessageEventHandler, UnmuteEventHandler } from '../events';
import { TsuParameters } from '../common/parameters';
import { emit } from 'cluster';
import { EventEmitter } from 'events';

export class Tsukiko {    
    private client: Client;
    private parameters: TsuParameters;    

    constructor() {        
        this.client = new Client();        

        this.InitBot();
    }

    private InitBot() {
        this.parameters = new TsuParameters();        

        const ticker = new Ticker(this.client, TickerStamps.HALF_MINUTE);        
        
        this.LoginSync();
        this.SetupEvents();        
    }    

    private SetupEvents() {
        //const readyEvent = new ReadyEventHandler(this.client);
        const messageEvent = new MessageEventHandler(this.client, this.parameters);
        const unmuteEvent = new UnmuteEventHandler(this.client, this.parameters);
    }

    private LoginSync() {
        this.parameters.GetToken().then(record => {
            record ? this.client.login(record.value) : console.log('No token provided');
        });
    }
}

enum TickerStamps {
    HALF_MINUTE = 30000,
    FULL_MINUTE = 60000
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
    }    
}