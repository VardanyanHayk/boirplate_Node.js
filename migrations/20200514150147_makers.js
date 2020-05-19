
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('makers', (table) => {
      table.increments('id').unsigned().primary()
      table.json('name')
      table.json('country')
      table.json('description')
      table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
      table.dateTime('updated_at').nullable()
      table.dateTime('deleted_at').nullable()
    })
  ])
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('makers')
}
