import { CommandBase } from "./commandBase";
import { Client, Message } from "discord.js";
import { TsuParameters } from "..";

export class ReloadParametersCommand extends CommandBase{
    isAdminCommand = true;

    constructor(client: Client, parameters: TsuParameters, message: Message) {                     
        super(client, parameters, message);
                
        if (!this.CanUseCommand(message.author)) return;

        this.ExecuteCommand();
    }

    protected ExecuteCommand() {
        this.parameters.ReloadParameters();
        this.SendDeletableMessage(`Parameters reloaded`);
        this.GetLogChannel().send(this.BuildEmbedLogMessage('Parameters reload', 'Parameters reloaded successfully'));
    }
}