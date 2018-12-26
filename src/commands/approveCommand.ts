import { CommandBase } from "./commandBase";
import { Client, Message, RichEmbed, TextChannel } from "discord.js";
import { TsuParameters } from "./..";
import { Suggestions } from "./../entity";
import { MessageConstants, ApprovalConstants } from "./../common/constants/index";

export class ApproveCommand extends CommandBase{
    isAdminCommand = false;

    private HELP_MESSAGE = new RichEmbed( {
        title: "Approve Suggestion Command",
        description: "Command syntax:\nts!approveSuggestion **[SuggestionID as given on the list]** **[switch]**\nUse -y as switch parameter for approval\nUse -n as switch parameter for denial",
        thumbnail: {
            url: 'https://banner2.kisspng.com/20180329/iuq/kisspng-question-mark-white-computer-icons-clip-art-question-mark-5abc8e7b8cc5f5.2576999515223066835766.jpg'
        },
        color: this.parameters.EMBEDED_COLOR
    });    

    constructor(client: Client, parameters: TsuParameters, message: Message) {                     
        super(client, parameters, message);
                
        if (!this.CanUseCommand(message.author)) return;
        if (message.content.endsWith(' -h')) {
            this.SendDeletableMessage(this.HELP_MESSAGE);
            return;
        }
                
        this.ExecuteCommand();
    }
    
    protected ExecuteCommand() {
        const messageArray = this.message.content.split(MessageConstants.COMMAND_SEPARATOR);
    
        const suggestionID = Number(messageArray[1]);
        const approvalSwitch = messageArray[2];

        if (!this.CheckParameters(suggestionID, approvalSwitch)) {
            return;
        }

        this.ApproveSuggestion(suggestionID, approvalSwitch)
    }

    private ApproveSuggestion(suggestionID: number, approveSwitch: string): any {
        switch (approveSwitch) {
            case ApprovalConstants.APPROVAL_CONFIRMATION:
                this.Approve(suggestionID);
                break;
            case ApprovalConstants.APPROVAL_DENIAL:
                this.Deny(suggestionID);
                break;            
        }        
    }
    
    private Deny(suggestionID: number): any {
        Suggestions.findOne( { id: suggestionID} ).then((record) => {
            if (record === null || record === undefined) {
                this.SendDeletableMessage(`You have selected wrong suggestion id`);
                return;
            }
            const user = this.client.guilds.get(this.parameters.GUILD_ID).members.get(record.authorID);
            user.send(`Your suggestion has not been approved`);
            this.GetLogChannel().send(this.BuildEmbedLogMessage(`Suggestion denial`, `${user} suggestion has been denied`))
            this.SendDeletableMessage(`Denied suggestion no. ${record.id}`);
        });

        Suggestions.delete( { id: suggestionID} );

    }
    
    private Approve(suggestionID: number): any {
        const suggestionsChannelID = this.parameters.Channels.SUGGESTIONS_CHANNEL;
        const suggestionsChannel = this.client.guilds.get(this.parameters.GUILD_ID).channels.get(suggestionsChannelID) as TextChannel;

        Suggestions.findOne( { id: suggestionID} ).then(record => {
            if (record === null || record === undefined) {
                this.SendDeletableMessage(`You have selected wrong suggestion id`);
                return;
            }
            const user = this.client.guilds.get(this.parameters.GUILD_ID).members.get(record.authorID);
            user.send(`Your suggestion has been approved`);
            const suggestionMessage = new RichEmbed({
                title: `${record.id}. By ${user.displayName}`,
                description: `${record.suggestionContent}`,
                color: this.parameters.EMBEDED_COLOR
            });
            suggestionsChannel.send(suggestionMessage).then((message: Message) => {
                message.react("👍");
                message.react("👎");
            });
            this.GetLogChannel().send(this.BuildEmbedLogMessage(`Suggestion approval`, `${user} suggestion has been approved`));
            this.SendDeletableMessage(`Approved suggestion no. ${record.id}`);
        });

        Suggestions.delete( { id: suggestionID} );
    }

    private CheckParameters(suggestionID: number, approvalSwitch: string): boolean {
        if (suggestionID === null || suggestionID === undefined) {
            this.SendDeletableMessage(`You haven't selected suggestion. Please take a look on \`ts!approveSuggestion -h\``);
            return false;
        }

        if (approvalSwitch === null || approvalSwitch === undefined) {
            this.SendDeletableMessage(`You haven't selected approval switch. Please take a look on \`ts!approveSuggestion -h\``);
            return false;
        }

        if (approvalSwitch !== ApprovalConstants.APPROVAL_CONFIRMATION && approvalSwitch !== ApprovalConstants.APPROVAL_DENIAL) {
            this.SendDeletableMessage(`You have selected wrong approval switch. Please take a look on \`ts!approveSuggestion -h\``);
            return false;
        }

        return true;
    }
}