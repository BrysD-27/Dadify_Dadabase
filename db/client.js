const { Client } = require('pg');
const client = new Client(process.env.DATABASE_URL || 'bryso://localhost:5432/dadify');
module.exports = client