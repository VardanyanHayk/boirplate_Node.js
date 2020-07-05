import { Model } from 'objection';
import knex from '../../../base/index';
Model.knex(knex);

class Users extends Model {
  static get tableName() {
    return 'users';
  }
}
export default Users;
