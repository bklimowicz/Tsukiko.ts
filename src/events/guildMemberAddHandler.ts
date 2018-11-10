import { EventBase } from "./eventBase";
import { TsuParameters } from "..";
import { Client } from "discord.js";
import { MutedUsers } from "../entity";

export class MessageEventHandler extends EventBase {
    constructor(client: Client, parameters: TsuParameters) {
        super(client, parameters);        
    }    
    
    protected RegisterEvent() {
        this.client.on('guildMemberAdd', (user) => {

            // Greet him here then look up the MutedUsers table and if he's there, mute the fuck out of him



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