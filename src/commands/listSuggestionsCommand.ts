import { CommandBase } from "./commandBase";
import { Client, Message } from "discord.js";
import { TsuParameters } from "..";
import { Suggestions } from "../entity";

export class ListSuggestionsCommand extends CommandBase{
    isAdminCommand = false;

    constructor(client: Client, parameters: TsuParameters, message: Message) {                     
        super(client, parameters, message);
                
        if (!this.CanUseCommand(message.author)) return;

        this.ExecuteCommand();
    }

    protected ExecuteCommand() {
        let suggestionsList = 'Here is a list of suggestions:';
        Suggestions.find().then(records => {
            if (records.length <= 0) {
                this.message.channel.send(`There is no new suggestions for review`);
            }
            
            records.forEach((record) => {
                const user = this.client.guilds.get(this.parameters.GUILD_ID).members.get(record.authorID);
                suggestionsList += `\n${record.id}. Author: ${user}.\nContent: ${record.suggestionContent}\n******`
            });
            this.message.channel.send(suggestionsList);   
        });
    }
}