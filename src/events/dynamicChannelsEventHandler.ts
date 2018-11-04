import { EventBase } from "./eventBase";
import { Client, TextChannel, GuildMember, RichEmbed, Channel, GuildChannel, VoiceChannel } from "discord.js";
import { TsuParameters } from "../main";
import { MutedUsers } from "../entity/mutedUsers";
import { ForVoiceChannels } from "../entity";

export class DynamicChannelsEventHandler extends EventBase{


    constructor(client: Client, parameters: TsuParameters) {
        super(client, parameters);
    }

    protected RegisterEvent() {
        this.client.on('tick', (date: Date) => {
            this.client.guilds.get(this.parameters.GUILD_ID).channels.forEach(channel => {
                if (channel.type !== ChannelType.VOICE) return;
                if (this.ShouldCreateNewChannel(channel as VoiceChannel)) {
                    new ForVoiceTextChannel(this.client, this.parameters, channel, `tsu${channel.name.replace(' ', '')}`);
                }
    
                if (this.ShouldDeleteChannel(channel as VoiceChannel)) {                                        
                    ForVoiceChannels.findOne( { correspondingVoiceChannelID: channel.id } ).then(record => {
                        if (record === null || record === undefined) return;
                        const channelToDelete = this.client.guilds.get(this.parameters.GUILD_ID).channels.get(record.channelID);
                        channelToDelete.delete().then((channel) => {
                            ForVoiceChannels.delete( { channelID: channel.id } );
                        });
                    })
                }
            })                
        });
    }

    private ShouldCreateNewChannel(channel: VoiceChannel): boolean {
        if (channel.members.size > 0 && !this.ChannelAlreadyExists(channel)) return true;
        return false;
    }

    private ShouldDeleteChannel(channel: VoiceChannel): boolean {
        if (channel.members.size <= 0) return true;
        return false;
    }

    private ChannelAlreadyExists(channel: VoiceChannel): boolean {
        ForVoiceChannels.findOne( { correspondingVoiceChannelID: channel.id } ).then(records => {
            if (records !== null || records !== undefined) return true;
        });
        return false;
    }
}

class ForVoiceTextChannel {
    private _ID;
    private _name: string;
    
    private client: Client;
    private tsuParameters: TsuParameters;
    
    constructor(client: Client, tsuParameters: TsuParameters, voiceChannel: GuildChannel, name: string) {
        this.client = client;
        this.tsuParameters = tsuParameters;
        this.CreateChannel(voiceChannel, name);
    }

    public GetID() {
        return this._ID;
    }    

    public GetName() {
        return this._name;
    }    

    private CreateChannel(voiceChannel: GuildChannel, name: string) {               
        this.client.guilds.get(this.tsuParameters.GUILD_ID).createChannel(name, ChannelType.TEXT).then(channel => {
            this._ID = channel.id;
            this._name = channel.name;
            var channelToDB = new ForVoiceChannels();
            channelToDB.channelID = channel.id;
            channelToDB.channelName = channel.name;
            channelToDB.correspondingVoiceChannelID = voiceChannel.id;
            channelToDB.correspondingVoiceChannelName = voiceChannel.name;
            channelToDB.save();
        })
    }
}

enum ChannelType {
    TEXT = 'text',
    VOICE = 'voice',
    CATEGORY = 'category'
}