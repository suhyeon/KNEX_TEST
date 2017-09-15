const bcrypt = require('bcrypt')

exports.up = function(knex, Promise) {
  return knex('user')
  .then(users => {
    const hash = bcrypt.hashSync(user.password,10)
    knex('user')
    .where({id: user.id})
    .update({password: hash})
  })
};

exports.down = function(knex, Promise) {
  return Promise.resolve(1)
};
