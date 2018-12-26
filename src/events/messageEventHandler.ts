import { EventBase } from "./eventBase";
import { Client, Message } from "discord.js";
import { TsuParameters } from "./../main";
import { Commands, MessageConstants } from "./../Common/constants/index";
import { SetParameterCommand } from "./../commands/setParameterCommand";
import { PingCommand, GetParameterCommand, ListParametersCommand, ReloadParametersCommand, BanCommand, ListSuggestionsCommand, SuggestCommand, ApproveCommand } from "./../commands";
import { TimeMuteCommand } from "./../commands/timeMuteCommand";
import { MuteCommand } from "./../commands/muteCommand";
import { ListMutedUsersCommand } from "./../commands/listMutedUsersCommand";
import { KickCommand } from "./../commands/kickCommand";

export class MessageEventHandler extends EventBase {
    constructor(client: Client, parameters: TsuParameters) {
        super(client, parameters);        
    }
    
    protected RegisterEvent() {
        this.client.on('message', message => {            
            if (!this.IsCommand(message)) {
                return;
            }
            
            this.commandFactory(message);
        });        
    }

    commandFactory(message: Message) {
        let commandSplited = message.content.split(MessageConstants.COMMAND_SEPARATOR);
        let command = commandSplited[0].substring(this.parameters.COMMAND_PREFIX.length);

        switch (command)
        {
            case Commands.SET_PARAMETER:
                new SetParameterCommand(this.client, this.parameters, message);
                break;
            case Commands.GET_PARAMETER:
                new GetParameterCommand(this.client, this.parameters, message);
                break;
            case Commands.PING:
                new PingCommand(this.client, this.parameters, message);
                break;
            case Commands.LIST_PARAMETERS:
                new ListParametersCommand(this.client, this.parameters, message);
                break;
            case Commands.TIMED_MUTE:
                new TimeMuteCommand(this.client, this.parameters, message);
                break;
            case Commands.MUTE:
                new MuteCommand(this.client, this.parameters, message);
                break;
            case Commands.LIST_MUTED_USERS:
                new ListMutedUsersCommand(this.client, this.parameters, message);
                break;
            case Commands.RELOAD_PARAMETERS:
                new ReloadParametersCommand(this.client, this.parameters, message);
                break;
            case Commands.KICK:
                new KickCommand(this.client, this.parameters, message);
                break;
            case Commands.BAN:
                new BanCommand(this.client, this.parameters, message);
                break;
            case Commands.APPROVE_SUGGESTION:
                new ApproveCommand(this.client, this.parameters, message);
                break;
            case Commands.SUGGEST:
                new SuggestCommand(this.client, this.parameters, message);
                break;
            case Commands.LIST_SUGGESTIONS:
                new ListSuggestionsCommand(this.client, this.parameters, message);
                break;
            default:
                message.reply("this is not a command.").then((_message: Message) => {
                    setTimeout(() => {
                        _message.delete();
                    }, this.parameters.MESSAGE_DELETE_TIME);
                });
        }
    }

    private IsCommand(message: Message) {
        return message.content.startsWith(this.parameters.COMMAND_PREFIX);
    }
}