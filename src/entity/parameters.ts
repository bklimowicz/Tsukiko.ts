import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export class Parameters extends BaseEntity {

    @PrimaryColumn()
    id: number;

    @Column()
    parameter: string;

    @Column()
    value: string;
}