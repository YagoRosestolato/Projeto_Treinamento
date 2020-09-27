import { query } from "express";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export default class CriarTreinamentos1601128873642
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "treinamentos",
        columns: [
          {
            name: "id_funcionario",
            type: "uuid",
          },
          {
            name: "id_curso",
            type: "uuid",
          },
          {
            name: "data",
            type: "timestamp with time zone",
          },
          {
            name: "vencimento",
            type: "timestamp with time zone",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "treinamentos",
      new TableForeignKey({
        columnNames: ["id_funcionario"],
        referencedColumnNames: ["id"],
        referencedTableName: "funcionarios",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "treinamentos",
      new TableForeignKey({
        columnNames: ["id_curso"],
        referencedColumnNames: ["id"],
        referencedTableName: "cursos",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("treinamentos");
  }
}
