import { Client, Message, RichEmbed, User } from "discord.js";
import { TsuParameters } from "../main";
import { CommandBase } from "./commandBase";
import { MessageConstants } from "../common/constants/index";
import { Suggestions } from "../entity";

export class SuggestCommand extends CommandBase {
    isAdminCommand = false;

    private HELP_MESSAGE = new RichEmbed( {
        title: "Suggest Command",
        description: "Command syntax:\nts!suggest **[your suggestion]**",
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
        const author = this.message.author;
        const suggestionContent = this.message.content.substr(this.message.content.indexOf(MessageConstants.COMMAND_SEPARATOR));
        if (!this.CheckParameters(suggestionContent)) {
            return;
        }

        if (!this.InsertToDB(author, suggestionContent)) {
            return;
        }
        
        this.SendDMToAdminsAndMods();
        this.FinalizeSuggestionCommand(author);
    }

    private SendDMToAdminsAndMods(): any {        
        this.client.guilds.get(this.parameters.GUILD_ID).members.forEach(member => {
            if (this.isPrivilegedMember(member)) {
                // simple message or embed with actuall suggestion?
                member.send(`New suggestion to review.`);
            }
        });
    }

    private FinalizeSuggestionCommand(user): any {        
        this.SendDeletableMessage(`Your suggestion will be reviewed shortly`);
        this.logChannel.send(this.BuildEmbedLogMessage(`Suggestion made`, `${user} has made a suggestion`));
    }

    private InsertToDB(user: User, suggestionContent: string): boolean {
        let newRecord = new Suggestions();
        newRecord.authorID = user.id;
        newRecord.suggestionContent = suggestionContent;
        try {
            newRecord.save();
        }
        catch (ex) {
            this.SendDeletableMessage(`Error inserting to database. Aborting.\n${ex}`);
            return false;
        }
        return true;
    }

    private CheckParameters(suggestionContent: string) {               
        if (suggestionContent === null || suggestionContent === undefined) {
            this.SendDeletableMessage(`You did not enter your suggestion. Please take a look on \`ts!suggest -h\``);
            return false;
        }                
        return true;
    }    
}