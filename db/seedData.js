const client = require('./client');


async function createTables () {
    console.log('Creating tables...')

    try {
        await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                first_name VARCHAR(255),
                last_name VARCHAR(255),
                phone INT,
                created_at TIMESTAMP,
                modified_at TIMESTAMP
            );

            CREATE TABLE user_address(
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                address_line1 VARCHAR(255),
                address_line2 VARCHAR(255),
                city VARCHAR(255),
                postal_code VARCHAR(255),
                country VARCHAR(255),
                phone INT
            );

            // CREATE TABLE user_payment(
            //     id SERIAL PRIMARY KEY,
            //     user_id INTEGER REFERENCES users(id),
            //     payment_type VARCHAR(255),
            //     provider VARCHAR(255),
            //     account_no INT,
            //     expiry DATE
            // );

            CREATE TABLE product(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                description VARCHAR,
                sku VARCHAR(255),
                category_id INTEGER REFERENCES product_categories(id),
                inventory_id INTEGER REFERENCES product_inventory(id),
                price DECIMAL(10,2),
                discount_id INTEGER REFERENCES discount(id),
                created_at TIMESTAMP,
                modified_at TIMESTAMP,
                deleted_at TIMESTAMP
            );

            // CREATE TABLE product_category(
            //     id SERIAL PRIMARY KEY,
            //     name VARCHAR(255),
            //     desc
            // )

                CREATE TABLE orders(
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    product_id INTEGER REFERENCES product(id),
                )

        `)

    } catch (error) {
        console.error(error);
    }
}


/* Initial user data seeding into tables */

async function createInitialUsers() {
    console.log('Creating dummy list of users...')
    try {
        const usersToCreate = [
            {username:'', password:'', first_name:'', last_name:'', phone: null}
        ];

        const users = await Promise.all(usersToCreate.map(createUser));
        console.log('Dummy user list created!')
    } catch (error) {
        console.log('Error creating dummy users!')
        throw error;
    }
}

async function createInitialProducts() {
    console.log('Creating initial list of products...')
    try {
        const productsToCreate= [
            {name:'', description:'', sku:'', category_id:null, inventory_id:null, price:null}
        ]
    } catch (error) {
        
    }
}