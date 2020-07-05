class BaseDAO {
  constructor(model) {
    this.model = model;
  }

  findAll() {
    return this.model.query().whereNull('deleted_at');
  }

  findOne(id) {
    return this.model.query().where('id', id).whereNull('deleted_at');
  }

  create(data) {
    return this.model.query().insertAndFetch(data);
  }

  createRelated(data) {
    return this.model.query().upsertGraph(data, { relate: true });
  }

  update(id, data) {
    return this.model.query().patch(data).where('id', id).returning('*');
  }

  updateRelated(data) {
    return this.model.query().upsertGraph(data, { relate: true });
  }

  delete(id) {
    return this.model
      .query()
      .patch({ deleted_at: new Date() })
      .whereNull('deleted_at')
      .where('id', id)
      .returning('*');
  }
}

export default BaseDAO;
