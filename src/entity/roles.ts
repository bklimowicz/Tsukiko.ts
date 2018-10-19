import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export class Roles extends BaseEntity {

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    roleID: string;

    @Column()
    isPriveileged: boolean;
}