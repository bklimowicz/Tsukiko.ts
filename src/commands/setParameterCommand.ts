import { Client, Message } from "discord.js";
import { TsuParameters } from "../main";
import { CommandBase } from "./commandBase";
import { MessageConstants } from "../common";
import { Parameters } from "../entity";

export class SetParameterCommand extends CommandBase {
    isAdminCommand = true;
    
    constructor(client: Client, parameters: TsuParameters, message: Message) {
        super(client, parameters, message);                
    }

    protected ExecuteCommand() {
        const splitMessage = this.message.content.split(MessageConstants.COMMAND_SEPARATOR);
        const paramName = splitMessage[1] ? splitMessage[1] : 
            () => { this.message.channel.sendMessage('Invalid command parameter: paramName'); return; };
        const paramValue = splitMessage[2] ? splitMessage[2] : 
            () => { this.message.channel.sendMessage('Invalid command parameter: paramValue'); return; };        

        const parameter = new Parameters();              
    }
}