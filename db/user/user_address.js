const client = require('../client');

async function addUserAddress({id, addressLine1, addressLine2, city, postalCode, country, phone}) {
    try {
        const {rows: [userAddress]} = await client.query(`
            INSERT INTO user_address(user_id, 
            address_line1, 
            address_line2, 
            city, 
            postal_code, 
            country, 
            phone)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [id, addressLine1, addressLine2, city, postalCode, country, phone]);
        return userAddress;
    } catch {
        throw error;
    }
}

async function updateUserAddress({id, addressLine1, addressLine2, city, postalCode, country, phone}) {
    try {
        const {rows: [updatedUserAddress]} = await client.query(`
            UPDATE user_address 
            SET address_line1=$1, address_line2=$2, city=$3, postal_code=$4, country=$5, phone=$6, modified_at=NOW()
            WHERE user_id=${id}
            RETURNING *;
        `, [addressLine1, addressLine2, city, postalCode, country, phone]);
        return updatedUserAddress;
    } catch (error) {
        throw error;        
    }
}

async function deleteUserAddress (id) {
    try {
        const {rows: [userAddress]} = await client.query(`
            DELETE FROM user_address
            WHERE user_id=${id}
            RETURNING *;
        `);
        return userAddress;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addUserAddress,
    updateUserAddress,
    deleteUserAddress
}