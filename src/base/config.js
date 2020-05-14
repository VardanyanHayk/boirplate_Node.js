const { passwordDB } = process.env
export const options = {
  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: passwordDB,
      database: 'marketplacetest'
    },
    // debug: true
  },

  prod: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: passwordDB,
      database: 'marketplacelive'
    }
  }
}
