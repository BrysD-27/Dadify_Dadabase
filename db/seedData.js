const client = require('./client');

async function dropTables() {
    console.log('Dropping All Tables...');
    // drop all tables, in the correct order
    try {
      await client.query(` 
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS user_address;
        DROP TABLE IF EXISTS product;
        // DROP TABLE IF EXISTS product_category;
       `);    
    } catch (error) {
      console.error(error);
    }
  
  }


async function createTables () {
    console.log('Creating tables...')
   
    await client.query(`
        CREATE OR REPLACE FUNCTION trigger_set_timestamp()
        RETURNS TRIGGER AS $$
        BEGIN
        NEW.modified_at = NOW();
        RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON users, products
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();

        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            phone INT,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            deleted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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

    try {
        
    } catch (error) {
        
    }
}