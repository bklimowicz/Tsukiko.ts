import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Channels extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    channelName: string;

    @Column()
    channelID: string;
}