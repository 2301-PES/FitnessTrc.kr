require('dotenv').config();
const { Client } = require('pg');
const connection = process.env.DATABASE_URL || 'postgres://localhost:5432/fitness-dev'
// const connection = 'postgres://localhost:5432/fitness-dev'
const client = new Client(connection);
client.password="CjhwkqG8NYoBUIt5l7cIYbSC1p959Xa4"

module.exports = {
    client
}