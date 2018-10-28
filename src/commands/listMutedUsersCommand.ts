import { CommandBase } from "./commandBase";
import { Client, Message } from "discord.js";
import { TsuParameters } from "..";
import { ParametersConstants } from "../common/constants/index";
import { MutedUsers } from "../entity";

export class ListMutedUsersCommand extends CommandBase{
    isAdminCommand = true;

    constructor(client: Client, parameters: TsuParameters, message: Message) {                     
        super(client, parameters, message);
                
        if (!this.CanUseCommand(message.author)) return;

        this.ExecuteCommand();
    }

    protected ExecuteCommand() {
        let reply = "Muted users:\n";        
        MutedUsers.find().then(records => {
            records.forEach(record => {
                const user = this.client.guilds.get(this.parameters.GUILD_ID).members.get(record.userID);
                if (record.timeToUnmute !== null && record.timeToUnmute !== undefined) {
                    reply += `* ${user} is muted until ${record.timeToUnmute}\n`;                
                }
                else {
                    reply += `* ${user} is muted permanently\n`;
                }
            });
            this.message.channel.send(reply);
        });
    }
}