//knex migrate:make add_user
//변경하는 것
//knex migrate:latest
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', t => {
    t.string('id').primary()
    t.string('password').notNullable()
  })
};
//변경하는 걸 되돌리는 것
//knex migrate:rollback
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user')
};
