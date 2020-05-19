

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('options', (table) => {
      table.increments('id').unsigned().primary()
      table.bigint('categoryId').references('id').inTable('categories').notNullable()
      table.json('name')
      table.boolean('filter')
      table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
      table.dateTime('updated_at').nullable()
      table.dateTime('deleted_at').nullable()
    })
  ])
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('options')
}
