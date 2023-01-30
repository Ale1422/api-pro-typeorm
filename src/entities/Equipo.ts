import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Equipo{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    grupo: string;

    @Column()
    puntajeGrupo: number;
}