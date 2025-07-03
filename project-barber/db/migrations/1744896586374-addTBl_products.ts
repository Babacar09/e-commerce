import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBlProducts1744896586374 implements MigrationInterface {
    name = 'AddTBlProducts1744896586374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "stock" integer NOT NULL, "images" text array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateddAt" TIMESTAMP NOT NULL DEFAULT now(), "addedById" integer, "categoryId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_d7e7f53b786522ae18147bb853c" FOREIGN KEY ("addedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "description" character varying NOT NULL DEFAULT 'Pas de description'`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "description" DROP DEFAULT`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_d7e7f53b786522ae18147bb853c"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "description" text NOT NULL`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
