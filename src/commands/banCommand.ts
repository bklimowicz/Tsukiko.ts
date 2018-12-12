import { Client, Message, RichEmbed, GuildMember } from "discord.js";
import { TsuParameters } from "./../main";
import { CommandBase } from "./commandBase";

export class BanCommand extends CommandBase {
    isAdminCommand = true;

    private HELP_MESSAGE = new RichEmbed( {
        title: "Ban Command",
        description: "Command syntax:\nts!ban **[@user]**",
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
        
        this.BanUser(user);        
    }    

    private BanUser(user: GuildMember) {
        user.ban();
        this.SendDeletableMessage(`${user} has been banned`);
        this.logChannel.send(this.BuildEmbedLogMessage(`Mute removed`, `${user} has been banned`));
    }

    private CheckParameters(user: GuildMember) {        
        if (user === null) {
            this.SendDeletableMessage(`You haven't selected user to ban. Please take a look on \`ts!ban -h\``);
            return false;
        }

        return true;
    }    
}