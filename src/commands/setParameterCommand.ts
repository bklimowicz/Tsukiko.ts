import { Client, Message } from "discord.js";
import { TsuParameters } from "./../main";
import { CommandBase } from "./commandBase";
import { MessageConstants, ParametersConstants } from "./../common/constants/index";
import { Parameters } from "./../entity";

export class SetParameterCommand extends CommandBase {
    isAdminCommand = true;
    
    constructor(client: Client, parameters: TsuParameters, message: Message) {
        super(client, parameters, message);
        
        if (!this.CanUseCommand(message.author)) return;

        this.ExecuteCommand();
    }

    protected ExecuteCommand() {
        const { paramName, paramValue } = this.PrecheckParameters();
        if (paramName === undefined || paramValue === undefined) return;
        if (ParametersConstants.PARAMETERS.indexOf(<string>paramName) > -1) {
            Parameters.findOne({ parameter: <string>paramName }).then(record => {
                if (record !== undefined) {
                    record.value = <string>paramValue;
                    record.save();
                }
                else {
                    const newParam = new Parameters();                    
                    newParam.parameter = <string>paramName;
                    newParam.value = <string>paramValue;
                    newParam.save();
                }
                this.SendDeletableMessage(`Parameter set`);
                this.logChannel.send(this.BuildEmbedLogMessage(`Parameter set`, `${paramName} set to value: ${paramValue}`))            
            });
        }
        else {
            this.SendDeletableMessage(`Unknown parameter name`);            
        }
    }
    

    private PrecheckParameters() {        
        const splitMessage = this.message.content.split(MessageConstants.COMMAND_SEPARATOR);
        const paramName = splitMessage[1] ? splitMessage[1] :
            () => { this.SendDeletableMessage('Invalid command parameter: paramName'); return ""; };
        const paramValue = splitMessage[2] ? splitMessage[2] :
            () => { this.SendDeletableMessage('Invalid command parameter: paramValue'); return ""; };
        return { paramName, paramValue };
    }
}