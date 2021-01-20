import {MigrationInterface, QueryRunner} from "typeorm";

export class schevma1611154120905 implements MigrationInterface {
    name = 'schevma1611154120905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL COMMENT '账号', `password` varchar(255) NOT NULL COMMENT '密码', `flag` tinyint NOT NULL DEFAULT 1, `status` tinyint NOT NULL DEFAULT 1, `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `users`");
    }

}
