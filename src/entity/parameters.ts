import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Parameters extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    parameter: string;

    @Column()
    value: string;
}