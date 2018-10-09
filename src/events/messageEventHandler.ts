import { EventBase } from "./eventBase";
import { Client, Message } from "discord.js";
import { BotParameters } from "../main";

export class MessageEventHandler extends EventBase {
    constructor(client: Client, parameters: BotParameters) {
        super(client, parameters);        
    }    
    
    protected RegisterEvent() {
        this.client.on('message', message => {            
            if (!this.IsCommand(message)) {
                return;
            }
            message.reply('dupa');           
        });
    }

    private IsCommand(message: Message) {
        return message.content.startsWith(this.parameters.COMMAND_PREFIX);
    }
}