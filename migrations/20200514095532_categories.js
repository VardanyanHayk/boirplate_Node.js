
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categories', (table) => {
      table.increments('id').unsigned().primary()
      table.json('name')
      table.json('description')
      table.integer('level')
      table.boolean('product')
      table.bigint('bindId')
      table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
      table.dateTime('updated_at').nullable()
      table.dateTime('deleted_at').nullable()
    })
  ])
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('categories')
}
