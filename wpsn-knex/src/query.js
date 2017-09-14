const knex = require('./knex')

function getUserById(id){
  return knex('user')
  .where({id})
  .first()
}
function getEntryByUserId(user_id){
  return knex('url_entry')
  .where({
   user_id
  })
}
function getUser(id, password){
  return knex('user')
  .where({
    id,
    password
  })
}
module.exports = {
  getUserById,
  getEntryByUserId,
  getUser
}
