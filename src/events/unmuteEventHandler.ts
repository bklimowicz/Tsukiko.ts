import { EventBase } from "./eventBase";
import { Client } from "discord.js";
import { TsuParameters } from "../main";
import { MutedUsers } from "../entity/mutedUsers";

export class UnmuteEventHandler extends EventBase{
    constructor(client: Client, parameters: TsuParameters) {
        super(client, parameters);
    }

    protected RegisterEvent() {
        this.client.on('tick', (date: Date) => {                                    
            MutedUsers.find().then((records) => {
                records.forEach((record) => {
                    if (record.timeToUnmute !== null && record.timeToUnmute <= date) {                       
                        const user = this.client.guilds.get(this.parameters.GUILD_ID).members.get(record.userID);                                            

                        if (user === null || user === undefined) {
                            this.logChannel.send(this.BuildEmbedLogMessage(`Timed mute error`, `Could not find user id in database.`))
                            return;
                        }
                        
                        record.remove().then(() => {
                            user.removeRole(this.parameters.Roles.MUTED).then(_user => {                                
                                this.logChannel.send(this.BuildEmbedLogMessage(`Timed mute removed`, `${user} has been unmuted.`));
                            });
                        });
                    }
                })
            })
        });
    }
}