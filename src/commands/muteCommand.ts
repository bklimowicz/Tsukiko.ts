import { Client, Message } from "discord.js";
import { TsuParameters } from "../main";
import { CommandBase } from "./commandBase";
import { MessageConstants, ParametersConstants } from "../common/constants/index";
import { Parameters } from "../entity";

export class MuteCommand extends CommandBase {
    isAdminCommand = true;
    
    constructor(client: Client, parameters: TsuParameters, message: Message) {
        super(client, parameters, message);
        
        if (!this.CanUseCommand(message.author)) return;

        this.ExecuteCommand();
    }

    protected ExecuteCommand() {

    }
}