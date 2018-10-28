import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MutedUsers extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userID: string;

    @Column({ nullable: true})
    timeToUnmute: Date;
}