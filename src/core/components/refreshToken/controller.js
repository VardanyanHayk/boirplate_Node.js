import RefreshTokens from './model';
import jwt from 'jsonwebtoken';
import nconf from '../../../../config';
import { v4 as uuidv4 } from 'uuid';
import { response } from 'express';

const secret = nconf.get('jwt:secret');

class RefreshToken {
  async create(data) {
    const uuid = uuidv4();
    data.type = 'refresh';
    data.uuid = uuid;
    data.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 48;
    const token = jwt.sign(JSON.stringify(data), secret);
    await RefreshTokens.query().insert({
      uuid,
      token,
    });
    console.log(token);
    return token;
  }

  async refresh(token) {
    try {
      const decoded = jwt.verify(token, secret);
      console.log('decode', decoded);
      if (decoded.type !== 'refresh') return { err: 'expired' };
      const [exist] = await RefreshTokens.query().where('uuid', decoded.uuid);
      console.log('exist', exist);
      if (!exist) return { err: 'expired' };
      const uuid = uuidv4();
      const authToken = jwt.sign(
        JSON.stringify({
          id: decoded.id,
          password: decoded.password,
          exp: Math.floor(Date.now() / 1000) + 60,
        }),
        secret
      );
      const refreshToken = jwt.sign(
        JSON.stringify({
          id: decoded.id,
          password: decoded.password,
          type: 'refresh',
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 48,
          uuid,
        }),
        secret
      );
      await RefreshTokens.query()
        .update({
          uuid,
          token,
        })
        .where('id', exist.id);
      return {
        authToken,
        refreshToken,
      };
    } catch (err) {
      if ((err.name = 'TokenExpiredError')) return { err: 'expired' };
    }
  }
}

const refreshToken = new RefreshToken();

export default refreshToken;
