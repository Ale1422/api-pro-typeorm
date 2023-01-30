import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Partido {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    localId:number

    @Column()
    visitanteId:number;

    @Column()
    fecha:Date;

    @Column()
    resultadoLocal:number;

    @Column()
    resultadoVisitante:number;

    @Column()
    resultado:string;

    @Column()
    fase:string;

    @Column()
    checkFlag:boolean;
}