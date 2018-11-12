import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Suggestions extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    authorID: string;

    @Column()
    suggestionContent: string;    
}