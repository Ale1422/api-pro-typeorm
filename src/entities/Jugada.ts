import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Jugada{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    partidoId:number;

    @Column()
    userId:number;

    @Column()
    resultadoLocal:number;

    @Column()
    resultadoVisitante:number;

    @Column()
    puntaje:number;

    @Column()
    check:boolean;
}