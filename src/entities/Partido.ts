import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import { Equipo } from './Equipo';
import { Jugada } from './Jugada';

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
        default: 'EMPATE',
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
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    upadatedAt: Date;

    @OneToOne(() => Equipo)
    @JoinColumn()
    local: Equipo

    @OneToOne(() => Equipo)
    @JoinColumn()
    visitante: Equipo

    @OneToMany(() => Jugada, (jugada) => jugada.partido)
    jugadas: Jugada[];
}