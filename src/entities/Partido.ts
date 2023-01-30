import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

enum Resultado {
    LOCAL = 'LOCAL',
    VISITANTE = 'VISITANTE',
    EMPATE = 'EMPATE'
};

enum Fase {
    GRUPO = 'GRUPO',
    OCTAVOS = 'OCTAVOS',
    CUARTOS = 'CUARTOS',
    SEMI = 'SEMI',
    FINAL = 'FINAL'
}

@Entity()
export class Partido extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    localId:number

    @Column()
    visitanteId:number;

    @Column()
    fecha:Date;

    @Column({
        default: 0
    })
    resultadoLocal:number;

    @Column({
        default: 0
    })
    resultadoVisitante:number;

    @Column({
        type: 'enum',
        enum: Resultado
    })
    resultado: Resultado;

    @Column({
        type: 'enum',
        enum: Fase
    })
    fase: Fase;

    @Column({
        default: false
    })
    checkFlag:boolean;
}