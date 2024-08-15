const JWT = require('jsonwebtoken');

const generateToken = (useradmin) => {
  const token = JWT.sign(
    { id: useradmin._id, role: useradmin.role, email: useradmin.email },
    process.env.ADMIN_SECRET_KEY,
    { expiresIn: '1h' }
  );
  return token;
}

module.exports = { generateToken };