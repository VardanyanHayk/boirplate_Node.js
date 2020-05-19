
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categoryProduct', (table) => {
      table.increments('id').unsigned().primary()
      table.bigint('categoryId').references('id').inTable('categories').notNullable()
      table.bigint('productId').references('id').inTable('products').notNullable()
    })
  ])
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('categoryProduct')
}
