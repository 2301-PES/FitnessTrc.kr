const client = require("./client");

// database functions

// user functions
async function createUser({ username, password }) {
    try {
        const saltCount = 12;
        const hashedPassword = await bcrypt.hash(password, saltCount);
    
        const { rows } = await client.query(`
            INSERT INTO users(username, password)
            VALUES($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `, [username, hashedPassword]);
    
        return rows;
      } catch (error) {
        throw error;
      }

}

async function getUser({ username, password }) {
    try {
        const { rows } = await client.query(`
          SELECT id, username, password
          FROM users
          WHERE username = $1;
        `, [username]);
    
        if (rows.length === 0) {
          throw new Error('User not found');
        }
    
        const user = rows[0];
        // const saltCount = 12;
        const hashedPassword = user.password;
    
        const isValid = await bcrypt.compare(password, hashedPassword);
        if (!isValid) {
          throw new Error('Invalid password');
        }
    
        return user;
      } catch (error) {
        throw error;
      }
}

async function getUserById(userId) {

}

async function getUserByUsername(userName) {

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}