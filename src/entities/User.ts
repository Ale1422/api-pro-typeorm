import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    name: String;

    @Column()
    lastName: String;

    @Column()
    passwordHash: String;

    @Column()
    email: String;

    @Column()
    img: String;

    @Column()
    saldo: Number;

    @Column()
    puntaje: Number;

    @Column()
    isAdmin: Boolean;

    @Column()
    isActive: Boolean;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    upadatedAt: Date;
}