import { EventBase } from "./eventBase";
import { TsuParameters } from "./..";
import { Client } from "discord.js";
import { MutedUsers } from "./../entity";

export class GuildMemberAddHandler extends EventBase {
    constructor(client: Client, parameters: TsuParameters) {
        super(client, parameters);        
    }    
    
    protected RegisterEvent() {
        this.client.on('guildMemberAdd', (user) => {            
            this.GetGeneralChannel().send(`Witaj na M&A - Discord ${user}(${user.id})!`);
            this.GetLogChannel().send(this.BuildEmbedLogMessage('Member Joined.', `${user}(${user.id}) joined the server.`));
            MutedUsers.find( { userID: user.id } ).then(records => {            
                if (records === null) return;
                records.forEach(record => {
                    const userToMute = this.client.guilds.get(this.parameters.GUILD_ID).members.get(record.userID);
                    userToMute.addRole(this.parameters.Roles.MUTED);                    
                });
            });
        });
    }
}