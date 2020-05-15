
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products', (table) => {
      table.increments('id').unsigned().primary()
      table.bigint('categoryId').references('id').inTable('categories').notNullable()
      table.bigint('emporiumId').references('id').inTable('emporiums').notNullable()
      table.bigint('countryId').references('id').inTable('countries').notNullable()
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
