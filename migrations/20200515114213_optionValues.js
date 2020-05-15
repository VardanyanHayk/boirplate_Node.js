

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('optionValues', (table) => {
      table.increments('id').unsigned().primary()
      table.bigint('optionId').references('id').inTable('options').notNullable()
      table.json('value')
      table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
      table.dateTime('updated_at').nullable()
      table.dateTime('deleted_at').nullable()
    })
  ])
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('optionValues')
}
