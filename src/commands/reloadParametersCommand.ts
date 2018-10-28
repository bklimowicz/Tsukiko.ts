import { CommandBase } from "./commandBase";
import { Client, Message } from "discord.js";
import { TsuParameters } from "..";
import { ParametersConstants } from "../common/constants/index";

export class ReloadParametersCommand extends CommandBase{
    isAdminCommand = true;

    constructor(client: Client, parameters: TsuParameters, message: Message) {                     
        super(client, parameters, message);
                
        if (!this.CanUseCommand(message.author)) return;

        this.ExecuteCommand();
    }

    protected ExecuteCommand() {
        this.parameters.ReloadParameters();
        this.logChannel.send(this.BuildEmbedLogMessage('Parameters reload', 'Parameters reloaded successfully.'));
    }
}