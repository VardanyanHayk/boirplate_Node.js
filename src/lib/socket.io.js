import socket from 'socket.io';
import jwt from 'jsonwebtoken';
import secret from '../middleware/passport/secret';
// import chalk from 'chalk';
let urlPrefix = '';
if (process.env.devMode === 'test') urlPrefix = '/socket.io';
if (process.env.devMode === 'prod') urlPrefix = '/api/v1/socket.io';
const onlineMembers = new Set();
let io = {};
export const Socket = (server) => {
  io = socket(server, {
    path: urlPrefix,
  });

  io.sockets.on('connect', function (client) {
    try {
      if (client.handshake.query.jwt) {
        console.log('jwt', client.handshake.query.jwt);
        jwt.verify(client.handshake.query.jwt, secret.secret1, function(err, decoded) {
          if(err) { console.log(err); return  io.sockets.connected[client.id].disconnect(true);}
          if (decoded) {
            client.join(decoded.id);
            onlineMembers.add(decoded.id)
          }
        });
      } else {
        io.sockets.connected[client.id].disconnect(true);
      }
      client.on('disconnect', function () {
        jwt.verify(client.handshake.query.jwt, secret.secret1, function(err, decoded) {
          if(err) { console.log(err); return  io.sockets.connected[client.id].disconnect(true);}
          if (decoded) {
            onlineMembers.delete(decoded.id)
          }
        });
      });
    } catch (e) {
      console.log('e -> ', e);
    }
  });
  return io;
};

export const send = (id, serviceName, data) => {
  const members = [...onlineMembers];
  const users = members.filter(it => it !== id)
  console.log(socket)
  users.map(it => {
    io.to(it).emit('updateData', { service_name: serviceName, data });
  })
};