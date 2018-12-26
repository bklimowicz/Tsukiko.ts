import { EventBase } from "./eventBase";
import { Tsukiko, TsuParameters } from "../main";
import { Client } from "discord.js";

export class DisconnectEventHandler extends EventBase {
    constructor(client: Client, parameters: TsuParameters) {
        super(client, parameters);        
    }
    
    protected RegisterEvent() {
        this.client.on('disconnect', () => {
            new Tsukiko();
        });
    }
}