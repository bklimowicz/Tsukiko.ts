import { EventBase } from "./eventBase";
import { Client, Message } from "discord.js";
import { TsuParameters } from "../main";
import { Commands, MessageConstants } from "../common/constants/index";
import { SetParameterCommand } from "../commands/setParameterCommand";
import { PingCommand } from "../commands";

export class MessageEventHandler extends EventBase {
    constructor(client: Client, parameters: TsuParameters) {
        super(client, parameters);        
    }    
    
    protected RegisterEvent() {
        this.client.on('message', message => {            
            if (!this.IsCommand(message)) {
                return;
            }
            
            this.commandFactory(message);
        });
    }

    commandFactory(message: Message) {
        //let temp = message.content.split(MessageConstants.COMMAND_SEPARATOR);
        let command = message.content.substring(this.parameters.COMMAND_PREFIX.length);

        switch (command)
        {
            case Commands.SET_PARAMETER:
                new SetParameterCommand(this.client, this.parameters, message);
                break;
            case Commands.PING:
                new PingCommand(this.client, this.parameters, message);
                break;
            default:
                message.reply("This is not a command.");
        }
    }

    private IsCommand(message: Message) {
        return message.content.startsWith(this.parameters.COMMAND_PREFIX);
    }
}