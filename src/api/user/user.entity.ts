import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar'})
    public email: string;

    @Exclude()                       // that we going to remove this property (password) from our response data. 
    @Column({ type: 'varchar'})
    public password: string;

    @Column({ type: 'varchar', nullable: true})
    public name: string | null;

    @Column({ type: 'timestamp', nullable: true, default: null})
    public lastloginAt: Date | null;

}