require('dotenv').config()

module.exports = require('knex')({
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root', // 실제 서비스에서는 root 계정을 사용하지 않는 것이 좋습니다.
      password: '2453',
      database: 'url_shortner'
    },
    debug: true
})
