
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products', (table) => {
      table.increments('id').unsigned().primary()
      table.bigint('userId').references('id').inTable('users').notNullable()
      table.bigint('productTypeId').references('id').inTable('productTypes').notNullable()
      table.bigint('emporiumId').references('id').inTable('emporiums').notNullable()
      table.json('name')
      table.json('description')
      table.integer('availability')
      table.integer('discount')
      table.integer('price')
      table.integer('selled')
      table.integer('likes')
      table.integer('views')
      table.double('rate')
      table.double('priority')
      table.boolean('publish')
      table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
      table.dateTime('updated_at').nullable()
      table.dateTime('deleted_at').nullable()
    })
  ])
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('products')
}
