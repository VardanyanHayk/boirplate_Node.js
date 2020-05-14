
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').unsigned().primary()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.string('role').notNullable().defaultTo('user')
      table.string('firstname')
      table.string('lastname')
      table.string('age')
      table.string('shop')
      table.string('phone')
      table.string('image')
      table.string('passportImage')
      table.boolean('notification').defaultTo(false)
      table.decimal('priorityNumber')
      table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
      table.dateTime('updated_at').nullable()
      table.dateTime('deleted_at').nullable()
    }).then(function () {
      return knex('users').insert([
        { 
          email: 'marketplace@mail.ru',
          password: 'sha1$663d7697$1$1c0065aee7b97d66b7e0c564ad7b1667736e7683',
          role: 'admin',
          firstname: 'Admin',
          lastname: 'Admin',
        }
      ])
    })
  ])
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
