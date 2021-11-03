const client = require('../client');
const bcrypt = require('bcrypt');

async function createUser({username, password, email}) {
    const SALT_COUNT = 10;  
    try {
        const hashPassword = bcrypt.hashSync(password, SALT_COUNT);
        const {rows: [createdUser]} = await client.query(`
            INSERT INTO users(username, password, email)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [username, hashPassword, email]);

        return createdUser;
    } catch (error) {
        throw error;
    }
}

async function getAllUsers(){
    try {
        const {rows: users} = await client.query(`
        SELECT * FROM users;
        `)
        return users;
    } catch (error) {
        console.error(error)
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

async function updateUser({username, password, first_name, last_name, email, phone, admin, id}) {
    try {
        const {rows: [user]} = await client.query(`
            UPDATE users
            SET
                username = $1, 
                password = $2, 
                first_name = $3, 
                last_name = $4, 
                email = $5, 
                phone = $6, 
                admin = $7
                WHERE id = $8
                RETURNING *;
        `, [username, password, first_name, last_name, email, phone, admin, id])

        return user;

    } catch (error) {
        console.error('Error updating user')
        throw error;
    }
}

module.exports = {
    createUser, 
    getUserByUsername, 
    getUserById,
    getUser,
    getAllUsers,
    updateUser
}