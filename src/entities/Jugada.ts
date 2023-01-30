import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { User } from './User'

@Entity()
export class Jugada extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    partidoId:number;

    @Column()
    userId:number;

    @Column({
        default: 0
    })
    resultadoLocal:number;

    @Column({
        default: 0
    })
    resultadoVisitante:number;

    @Column({
        default: 0
    })
    puntaje:number;

    @Column({
        default: false
    })
    check:boolean;

    @ManyToOne(() => User, (user) => user.jugadas)
    user: User
}