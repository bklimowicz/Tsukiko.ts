import { CommandBase } from "./commandBase";
import { Client, Message } from "discord.js";
import { TsuParameters, MessageConstants } from "..";

export class PingCommand extends CommandBase{
    isAdminCommand = true;

    constructor(client: Client, parameters: TsuParameters, message: Message) {                     
        super(client, parameters, message);
                
        if (!this.CanUseCommand(message.author)) return;

        this.ExecuteCommand();
    }

    protected ExecuteCommand() {
        this.message.reply(this.isAdminCommand);
    }
}