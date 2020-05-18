class BaseDAO {
  constructor (model) {
    this.model = model
  }

  findAll() {
    return this.model
      .query()
      .whereNull('deleted_at')
  }

  create(data) {
    return this.model
      .query()
      .insertAndFetch(data)
  }

  update(id, data) {
    return this.model
      .query()
      .patch(data)
      .where('id', id)
      .returning('*')
  }

  delete(id) {
    return this.model
      .query()
      .patch({ deleted_at: new Date() })
      .whereNull('deleted_at')
      .where('id', id)
      .returning('*')
  }
}

export default BaseDAO