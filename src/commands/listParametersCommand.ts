import { CommandBase } from "./commandBase";
import { Client, Message } from "discord.js";
import { TsuParameters } from "..";
import { ParametersConstants } from "./../common/constants/index";

export class ListParametersCommand extends CommandBase{
    isAdminCommand = true;

    constructor(client: Client, parameters: TsuParameters, message: Message) {                     
        super(client, parameters, message);
                
        if (!this.CanUseCommand(message.author)) return;

        this.ExecuteCommand();
    }

    protected ExecuteCommand() {
        let reply = "List of available parameters:\n";        
        ParametersConstants.PARAMETERS.forEach(parameter => {
            reply += `# **${parameter}**\n`;
        });
        this.SendDeletableMessage(reply);        
    }
}