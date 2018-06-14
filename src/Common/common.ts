import { DBHandler } from './dbHandler'
import { TypeDef } from './typeDef';
import { Client, Guild, TextChannel } from 'discord.js';

export class Common {
    static logError(client: Client):void {
        // let logChannel = client.guilds.get();
    }

    static getGuild(client: Client): Guild {
        let guild: Guild = client.guilds.get(TypeDef.guildID) as Guild;        
        return guild;
    }

    // static getChannel(client: Client, channelID: TypeDef.TextChannel): TextChannel {
    //     let channel: TextChannel | undefined = this.getGuild(client).channels.get(channelID);
    //     if (channel === undefined) throw new Error(`Couldnt find {channelID}`)
    //     return channel;
    // }

    static isUndefinedOrNull(_object: object): boolean {
        if (_object === undefined || _object === null) return true;
        return false;
    }
}