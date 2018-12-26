import { EventBase } from "./eventBase";
import { Client } from "discord.js";
import { TsuParameters } from "..";

export class ErrorEventHandler extends EventBase {
    constructor(client: Client, parameters: TsuParameters) {
        super(client, parameters);        
    }
    
    protected RegisterEvent() {
        this.client.on('error', (error) => {
            this.GetLogChannel().send(this.BuildEmbedLogMessage(`Error Event.`, `${error.name}\n${error.message}`));
        }); 
    }
}