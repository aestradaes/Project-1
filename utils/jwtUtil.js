const jwt = require('jsonwebtoken');
const Promise = require('bluebird');

jwt.verify = Promise.promisify(jwt.verify); // Turn jwt.verify into a function that returns a promise
const secretKey = 'supersecretkey';

function createJWT(username, role) {
  return jwt.sign(
    {
      username,
      role,
    },
    secretKey,
    {
      expiresIn: '1d',
    }
  );
}

// (header + payload) sign with the secret -> signature "thisisasecret"

/**
 * The JWT will be sent to the client
 * When the client sends the JWT back to the server, the server needs to check if the JWT is valid
 * (header + payload + signature) -> we need to verify that the signature was generated using our secret
 * You cannot forge any of the information inside of the payload or header, becuase the server will know that it was forged
 */

// verify
function verifyTokenAndReturnPayload(token) {
  return jwt.verify(token, secretKey);
}

module.exports = {
  createJWT,
  verifyTokenAndReturnPayload,
};
