const { Client } = require('pg');
const client = new Client('bryso://localhost:5432/dadify');
module.exports = client