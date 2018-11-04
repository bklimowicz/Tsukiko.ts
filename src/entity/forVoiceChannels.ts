import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ForVoiceChannels extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    channelName: string;

    @Column()
    channelID: string;

    @Column()
    correspondingVoiceChannelName: string;

    @Column()
    correspondingVoiceChannelID: string;
}