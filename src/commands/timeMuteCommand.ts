import { Client, Message, RichEmbed, GuildMember } from "discord.js";
import { TsuParameters } from "./../main";
import { CommandBase } from "./commandBase";
import { MessageConstants } from "./../common/constants/index";
import { MutedUsers } from "./../entity/mutedUsers";
import moment = require("moment");

export class TimeMuteCommand extends CommandBase {
    isAdminCommand = true;

    private HELP_MESSAGE = new RichEmbed( {
        title: "Timed Mute Command",
        description: "Command syntax:\nts!timedMute **[@user]** **[DD.MM-hh:mm]**\n**Date format:** D-Day, M-Month\n**Time format:** h-hour, m-minute",
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
        const messageSplited = this.message.content.split(MessageConstants.COMMAND_SEPARATOR);
        let user: GuildMember = this.message.mentions.members.first();
        let date: string = messageSplited[2];

        const dot = date.indexOf('.');
        const dash = date.indexOf('-');
        const colon = date.indexOf(':');

        const day = parseInt(date.substr(0, dot));        
        const month = parseInt(date.substr(dot + 1, dash - dot));
        const hour = parseInt(date.substr(dash + 1, colon - dash));
        const minute = parseInt(date.substr(colon + 1));

        var m = moment([day, month, hour, minute]);
        m.format('MM.DD-HH:mm');        
        if (!m.isValid()) {
            this.SendDeletableMessage(`Invalid date/time format. Please take a look on \`ts!timedMute -h\``); 
            return;
        }

        let objDate = new Date();        

        this.BuildDateObject(objDate, day, month, hour, minute);

        if (!this.CheckParameters(user, objDate)) {
            return;
        }

        if (!this.InsertToDB(user, objDate)) {
            return;
        }
        
        this.MuteUser(user, objDate);        
    }
    
    private BuildDateObject(objDate: Date, day: number, month: number, hour: number, minute: number) {
        objDate.setDate(day);
        objDate.setMonth(month - 1);
        objDate.setFullYear(objDate.getFullYear());
        objDate.setHours(hour);
        objDate.setMinutes(minute);
        objDate.setSeconds(0);
        objDate.setMilliseconds(0);
    }

    private MuteUser(user: GuildMember, objDate: Date) {
        user.addRole(this.parameters.Roles.MUTED);
        this.SendDeletableMessage(`${user} has been muted until ${objDate.toLocaleString()}`);                 
        this.GetLogChannel().send(this.BuildEmbedLogMessage(`Timed mute applied`, `${user} has been muted until ${objDate.toLocaleString()}`));
    }

    private InsertToDB(user: GuildMember, objDate: Date): boolean {        
        const newRecord = new MutedUsers();
        newRecord.userID = user.id;
        newRecord.timeToUnmute = objDate;
        try {
            newRecord.save();
        }
        catch (ex) {
            this.SendDeletableMessage(`Error inserting to database. Aborting.\n${ex}`);
            return false;
        }
        return true;
    }

    private CheckParameters(user: GuildMember, date: Date) {        
        if (user === null) {
            this.SendDeletableMessage(`You haven't selected user to mute. Please take a look on \`ts!timedMute -h\``);
            return false;
        }

        return true;
    }    
}