
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('address', (table) => {
      table.increments('id').unsigned().primary()
      table.bigint('userId').references('id').inTable('users').notNullable()
      table.string('city')
      table.string('street')
      table.string('home')
      table.string('building')
      table.integer('entrace')
      table.integer('floor')
      table.integer('flat')
      table.string('intercom').defaultTo(false)
      table.specificType('location', 'POINT')
      table.boolean('elevator')
      table.boolean('default')
      table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
      table.dateTime('updated_at').nullable()
      table.dateTime('deleted_at').nullable()
    })
  ])
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('address')
}
