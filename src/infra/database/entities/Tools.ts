import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Tools {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column()
    title!: string;

    @Column()
    link!: string;

    @Column()
    description!: string;

    @Column({ type: "text" })
    tags!: string;
}
