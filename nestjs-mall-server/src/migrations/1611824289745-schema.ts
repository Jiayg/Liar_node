import {MigrationInterface, QueryRunner} from "typeorm";

export class schema1611824289745 implements MigrationInterface {
    name = 'schema1611824289745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `accounts` (`id` int NOT NULL AUTO_INCREMENT, `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `categorys` (`id` int NOT NULL AUTO_INCREMENT, `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `goods` (`id` int NOT NULL AUTO_INCREMENT, `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sysrole` (`id` int NOT NULL AUTO_INCREMENT COMMENT '主键Id', `name` varchar(255) NOT NULL COMMENT '名称', `alias` varchar(255) NOT NULL COMMENT '别名', `status` tinyint NOT NULL COMMENT '状态 1:启用 0:禁用' DEFAULT 1, `create_time` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), `create_user` varchar(255) NOT NULL COMMENT '创建用户', `update_time` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6), `update_user` varchar(255) NOT NULL COMMENT '更新用户', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sysmenu` (`id` int NOT NULL AUTO_INCREMENT COMMENT '主键Id', `icon` varchar(255) NOT NULL COMMENT 'Icon', `name` varchar(255) NOT NULL COMMENT '名称', `code` varchar(255) NOT NULL COMMENT '编码', `component` varchar(255) NOT NULL COMMENT '组件地址', `sort` int NOT NULL COMMENT '排序', `url` varchar(255) NOT NULL COMMENT '请求url', `tips` varchar(255) NOT NULL COMMENT '提示', `ismenu` tinyint NOT NULL COMMENT '是否是菜单/按钮', `isopen` tinyint NOT NULL COMMENT '是否开放', `level` int NOT NULL COMMENT '级别', `pcode` varchar(255) NOT NULL COMMENT '父级编码', `purls` varchar(255) NOT NULL COMMENT '递归父级菜单编号', `status` tinyint NOT NULL COMMENT '状态 1:启用 0:禁用' DEFAULT 1, `create_time` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), `create_user` varchar(255) NOT NULL COMMENT '创建用户', `update_time` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6), `update_user` varchar(255) NOT NULL COMMENT '更新用户', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sysrelation` (`id` int NOT NULL AUTO_INCREMENT COMMENT '主键Id', `roleid` int NOT NULL COMMENT '角色id', `menuid` int NOT NULL COMMENT '菜单id', `status` tinyint NOT NULL COMMENT '状态 1:启用 0:禁用' DEFAULT 1, `update_time` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6), `update_user` varchar(255) NOT NULL COMMENT '更新用户', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sysuser` (`id` int NOT NULL AUTO_INCREMENT COMMENT '主键Id', `username` varchar(255) NOT NULL COMMENT '账号', `password` varchar(255) NOT NULL COMMENT '密码', `role` text NULL COMMENT '角色', `status` tinyint NOT NULL COMMENT '状态 1:启用 0:禁用' DEFAULT 1, `create_time` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), `create_user` varchar(255) NOT NULL COMMENT '创建用户', `update_time` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6), `update_user` varchar(255) NOT NULL COMMENT '更新用户', PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `sysuser`");
        await queryRunner.query("DROP TABLE `sysrelation`");
        await queryRunner.query("DROP TABLE `sysmenu`");
        await queryRunner.query("DROP TABLE `sysrole`");
        await queryRunner.query("DROP TABLE `goods`");
        await queryRunner.query("DROP TABLE `categorys`");
        await queryRunner.query("DROP TABLE `accounts`");
    }

}
