import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from 'typeorm';
import { Jugada } from './Jugada'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    passwordHash: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        nullable: true
    })
    img: string;

    @Column({
        default: 0
    })
    saldo: number;

    @Column({
        default: 0
    })
    puntaje: number;

    @Column({
        default: false
    })
    isAdmin: boolean;

    @Column({
        default: true
    })
    isActive: boolean;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    upadatedAt: Date;

    @OneToMany(() => Jugada, (jugada) => jugada.userId)
    jugadas: Jugada[];
}