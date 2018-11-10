import { Client, Message, RichEmbed, GuildMember, TextChannel } from "discord.js";
import { TsuParameters } from "../main";
import { CommandBase } from "./commandBase";
import { MutedUsers } from "../entity/mutedUsers";

export class UnmuteCommand extends CommandBase {
    isAdminCommand = true;

    private HELP_MESSAGE = new RichEmbed( {
        title: "Unmute Command",
        description: "Command syntax:\nts!unmute **@user**",
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

        if (!this.DeleteFromDB(user)) {
            return;
        }
        
        this.UnmuteUser(user);        
    }    

    private UnmuteUser(user: GuildMember) {
        user.removeRole(this.parameters.Roles.MUTED);
        this.SendDeletableMessage(`${user} is unmuted`);
        this.logChannel.send(this.BuildEmbedLogMessage(`Mute removed`, `${user} has been unmuted`));
    }

    private DeleteFromDB(user: GuildMember): boolean {
        try {
            MutedUsers.delete( { userID: user.id } );            
        }
        catch (ex) {
            this.SendDeletableMessage(`Error deleting from database. Aborting.\n${ex}`);
            return false;
        }
        return true;
    }

    private CheckParameters(user: GuildMember) {        
        if (user === null) {
            this.SendDeletableMessage(`You haven't selected user to unmute. Please take a look on \`ts!mute -h\``);            
            return false;
        }

        return true;
    }    
}