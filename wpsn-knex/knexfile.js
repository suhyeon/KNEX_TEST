// Update with your config settings.
require('dotenv').config()

module.exports = {

  development: { //개발단계에서 쓸 설정(일반적)
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root', // 실제 서비스에서는 root 계정을 사용하지 않는 것이 좋습니다.
      password: '2453',
      database: 'url_shortner'
    },
    debug: true
  },

  staging: { //스테이징 단계에서 쓸 설정(운영단계에 올리는 단계) (일반적)
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: { //운영단계에서 쓸 설정 (일반적)
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

// NODE_ENV=(PRODUCTION, STAGING, DEVELOPMENT) node src/index.js 로 많이 쓰인다.3중 택1
//개발단계에서 쓸 때 --save-dev 옵션으로 설치 (faker, mocha...)
//production 에서는 가장 가볍고 가장 최적화된 설정으로만 두어야한다.
