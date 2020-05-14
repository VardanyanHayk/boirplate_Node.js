
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('refreshToken', (table) => {
      table.increments('id').unsigned().primary()
      table.uuid('uuid')
      table.text('token')
    })
  ])
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('refreshToken')
}
