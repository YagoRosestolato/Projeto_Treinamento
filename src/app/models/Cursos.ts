import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("cursos")
class Cursos {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column()
  carga_horaria: string;
}

export default Cursos;
