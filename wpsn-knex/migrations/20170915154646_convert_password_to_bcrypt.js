const bcrypt = require('bcrypt')

exports.up = function(knex, Promise) {
  return knex('user')
  .then(users => {
    const promises = users.map(user => { //promise로 된 모든 것이 전부 성공한 뒤에 하고 싶은 의도이라면 all을 사용
      const hash = bcrypt.hashSync(user.password,10) //users.map의 반환은 promise의 배열이다.
      return knex('user')
      .where({id: user.id})
      .update({password: hash})
    })
    return Promise.all(promises)
  })
};

exports.down = function(knex, Promise) {
  return Promise.resolve(1)
};
