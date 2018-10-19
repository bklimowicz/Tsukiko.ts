import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export class Guild extends BaseEntity {

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    guildID: string;
}