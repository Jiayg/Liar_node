const dotenv = require('dotenv');

dotenv.config();

let isDevelop = true;
isDevelop = process.env.NODE_ENV == 'dev';
let database = '';
if (process.env.NODE_ENV === 'dev') {
  database = process.env.DB_DATABASE + '_dev';
} else {
  database = process.env.DB_DATABASE;
}

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: database,
  charset: 'utf8mb4', // 编码
  timezone: 'local', // 时区,默认本地,也可以写"+8"
  entityPrefix: '', // 给此数据库连接上的所有表（或集合）加的前缀。
  entities: [
    './dist/**/entities/**/*.entity.js',
    './src/**/entities/**/*.entity.js',
  ],
  migrations: ['./dist/**/migrations/**/*.js', './src/**/migrations/**/*.js'],
  subscribers: [
    `./dist/**/subscribers/**/*.js`,
    `./src/**/subscribers/**/*.js`,
  ],
  synchronize: isDevelop,
  console: isDevelop,
  cli: {
    migrationsDir: `./src/migrations`,
  },
};
