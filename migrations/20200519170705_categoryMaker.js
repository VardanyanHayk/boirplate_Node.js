
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categoryMaker', (table) => {
      table.increments('id').unsigned().primary()
      table.bigint('categoryId').references('id').inTable('categories').notNullable()
      table.bigint('makerId').references('id').inTable('makers').notNullable()
    })
  ])
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('categoryMaker')
}
