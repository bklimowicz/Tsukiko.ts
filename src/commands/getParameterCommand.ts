import { Client, Message } from "discord.js";
import { TsuParameters } from "./../main";
import { CommandBase } from "./commandBase";
import { MessageConstants } from "./../common/constants/index";
import { Parameters } from "./../entity";

export class GetParameterCommand extends CommandBase {
    isAdminCommand = true;
    
    constructor(client: Client, parameters: TsuParameters, message: Message) {
        super(client, parameters, message);
        
        if (!this.CanUseCommand(message.author)) return;

        this.ExecuteCommand();
    }

    protected ExecuteCommand() {
        const paramName = this.PrecheckParameters();
        if (paramName === undefined) return;
        Parameters.findOne({ parameter: <string>paramName }).then(record => {
            if (record !== undefined) {
                this.SendDeletableMessage(`**Parameter:** ${paramName}\n**Value:** ${record.value}`);
            }
        });
    }
    

    private PrecheckParameters() {        
        const splitMessage = this.message.content.split(MessageConstants.COMMAND_SEPARATOR);
        const paramName = splitMessage[1] ? splitMessage[1] :
            () => { this.SendDeletableMessage('Invalid command parameter: paramName'); return ""; };
        return paramName;
    }
}