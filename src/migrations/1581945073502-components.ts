import {MigrationInterface, QueryRunner} from "typeorm";

export class components1581945073502 implements MigrationInterface {
    name = 'components1581945073502'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "components" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "component" character varying NOT NULL, "title" character varying NOT NULL, "title_pl" character varying NOT NULL, "title_en" character varying NOT NULL, "tags" character varying NOT NULL, "tags_pl" character varying NOT NULL, "tags_en" character varying NOT NULL, CONSTRAINT "PK_0d742661c63926321b5f5eac1ad" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "components"`, undefined);
    }

}
