import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBLContactMessage1749817165338 implements MigrationInterface {
    name = 'AddTBLContactMessage1749817165338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "contact_message_entity" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "message" text NOT NULL,
                "status" character varying DEFAULT pending,
                "response" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" integer,
                CONSTRAINT "PK_fa2ee39d8543d2912f17d7dca64" PRIMARY KEY ("id")
                )`);
        await queryRunner.query(`
            ALTER TABLE "contact_message_entity"
            ADD CONSTRAINT "FK_abf75d2467655ad19cb5b3698ec"
            FOREIGN KEY ("userId") REFERENCES "users"("id")
            ON DELETE SET NULL ON UPDATE NO ACTION
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_message_entity" DROP CONSTRAINT "FK_abf75d2467655ad19cb5b3698ec"`);
        await queryRunner.query(`DROP TABLE "contact_message_entity"`);
    }

}
