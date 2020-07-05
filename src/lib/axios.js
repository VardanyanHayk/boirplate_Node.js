import axios from 'axios';

export const axioss = (method, url, token, body) => {
  return new Promise(function (resolve) {
    axios({
      method,
      url,
      data: body,
      headers: Object.assign(
        { Authorization: token },
        {
          'Content-Type': 'application/json',
          // 'Content-Length': dataString.length,
        }
      ),
    })
      .then(function (response) {
        // console.log('axios response', response);
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
        resolve(error.response.status);
      });
  });
};
