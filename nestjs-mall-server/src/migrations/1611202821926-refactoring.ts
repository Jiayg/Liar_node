import { plainToClass } from 'class-transformer';
import { User } from 'src/modules/user/entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class refactoring1611202821926 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tempUser = new User();
    await queryRunner.manager.getRepository<User>(User).save(
      plainToClass(User, [
        {
          id: 10000001,
          username: '123123',
          role: ['superAdmin', 'admin'],
          password: await tempUser.createPassword('123123'),
        },
        {
          id: 10000002,
          username: '124124',
          role: ['admin'],
          password: await tempUser.createPassword('124124'),
        },
        {
          id: 10000003,
          username: '125125',
          role: [],
          password: await tempUser.createPassword('125125'),
        },
      ]),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
