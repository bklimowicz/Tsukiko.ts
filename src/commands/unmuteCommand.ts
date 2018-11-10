import { Client, Message, RichEmbed, GuildMember, TextChannel } from "discord.js";
import { TsuParameters } from "../main";
import { CommandBase } from "./commandBase";
import { MutedUsers } from "../entity/mutedUsers";

export class UnmuteCommand extends CommandBase {
    isAdminCommand = true;

    private HELP_MESSAGE = new RichEmbed( {
        title: "Mute Command",
        description: "Command syntax:\nts!mute **@user**",
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
        let user: GuildMember = this.message.mentions.members.first();        

        if (!this.CheckParameters(user)) {
            return;
        }

        if (!this.InsertToDB(user)) {
            return;
        }
        
        this.MuteUser(user);        
    }    

    private MuteUser(user: GuildMember) {
        user.removeRole(this.parameters.Roles.MUTED);
        this.SendDeletableMessage(`${user} is muted permanently`);
        this.logChannel.send(this.BuildEmbedLogMessage(`Mute applied`, `${user} has been muted permanently`));
    }

    private InsertToDB(user: GuildMember): boolean {        
        const newRecord = new MutedUsers();
        newRecord.userID = user.id;
        newRecord.timeToUnmute = null;
        try {
            newRecord.save();
        }
        catch (ex) {
            this.SendDeletableMessage(`Error inserting to database. Aborting.\n${ex}`);
            return false;
        }
        return true;
    }

    private CheckParameters(user: GuildMember) {        
        if (user === null) {
            this.SendDeletableMessage(`You haven't selected user to mute. Please take a look on \`ts!mute -h\``);            
            return false;
        }

        return true;
    }    
}