import { Model } from 'objection';
import knex from '../../../base/index';
Model.knex(knex);

class RefreshTokens extends Model {
  static get tableName() {
    return 'refreshToken';
  }
}
export default RefreshTokens;
