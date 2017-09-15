const knex = require('./knex')
const randomstring = require('randomstring')
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
  .orderBy('created_at','desc')
}
function getUser(id, password){
  return knex('user')
  .where({
    id,
    password
  })
}
function createUrlEntry(long_url,user_id){
  const id = randomstring.generate(8)
  return knex('url_entry')
  .insert({
    id,
    long_url,
    user_id
  })
}
function getUrlById(id){
  return knex('url_entry')
  .where({id})
  .first()
}
module.exports = {
  getUserById,
  getEntryByUserId,
  getUser,
  createUrlEntry,
  getUrlById
}
