import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from 'typeorm';
import { Jugada } from './Jugada'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    name: String;

    @Column()
    lastName: String;

    @Column()
    passwordHash: String;

    @Column({
        unique: true
    })
    email: String;

    @Column({
        nullable: true
    })
    img: String;

    @Column({
        default: 0
    })
    saldo: Number;

    @Column({
        default: 0
    })
    puntaje: Number;

    @Column({
        default: false
    })
    isAdmin: Boolean;

    @Column({
        default: true
    })
    isActive: Boolean;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    upadatedAt: Date;

    @OneToMany(() => Jugada, (jugada) => jugada.userId)
    jugadas: Jugada[];
}