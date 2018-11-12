import { CommandBase } from "./commandBase";
import { Client, Message } from "discord.js";
import { TsuParameters } from "..";
import { Suggestions } from "../entity";

export class ApproveCommand extends CommandBase{
    isAdminCommand = false;

    constructor(client: Client, parameters: TsuParameters, message: Message) {                     
        super(client, parameters, message);
                
        if (!this.CanUseCommand(message.author)) return;

        this.ExecuteCommand();
    }

    protected ExecuteCommand() {

    }
}