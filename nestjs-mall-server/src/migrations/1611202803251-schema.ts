import {MigrationInterface, QueryRunner} from "typeorm";

export class schema1611202803251 implements MigrationInterface {
    name = 'schema1611202803251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `accounts` (`id` int NOT NULL AUTO_INCREMENT, `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `categorys` (`id` int NOT NULL AUTO_INCREMENT, `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `goods` (`id` int NOT NULL AUTO_INCREMENT, `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL COMMENT '账号', `password` varchar(255) NOT NULL COMMENT '密码', `role` text NULL COMMENT '角色', `flag` tinyint NOT NULL DEFAULT 1, `status` tinyint NOT NULL DEFAULT 1, `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `goods`");
        await queryRunner.query("DROP TABLE `categorys`");
        await queryRunner.query("DROP TABLE `accounts`");
    }

}
