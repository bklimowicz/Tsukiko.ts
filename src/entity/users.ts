import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    userID: string;
}