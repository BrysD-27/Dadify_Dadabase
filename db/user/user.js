const client = require('../client');
const bcrypt = require('bcrypt');

async function createUser({username, password, first_name, last_name, email, phone}) {
    const SALT_COUNT = 10;  
    try {
        const hashPassword = bcrypt.hashSync(password, SALT_COUNT);
        const {rows: [createdUser]} = await client.query(`
            INSERT INTO users(username, password, first_name, last_name, email, phone)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [username, hashPassword, first_name, last_name, email, phone]);

        return createdUser;
    } catch (error) {
        throw error;
    }
}

async function getUserByUsername(username) {
    try {
        const {rows: [user]} = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1;
        `, [username]);
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUserById(id) {
    try {
        const {rows: [user]} = await client.query(`
            SELECT * 
            FROM users 
            WHERE id=${id}
            RETURNING *;
        `);
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUser({username, password}) {
    try {
        const user = await getUserByUsername(username);
        const hashedPassword = user.password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        if(passwordMatch) {
            return user;
        } else {
            throw Error('Invalid password');
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser, 
    getUserByUsername, 
    getUserById,
    getUser
}