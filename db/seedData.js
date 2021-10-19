
const client = require('./client');
const {
    createUser,
    createProductItem,
    createCart,
    addItemToCart,
} = require('./index');

async function dropTables() {
	try {
		console.log('Dropping All Tables...');
		await client.query(`
            DROP TABLE IF EXISTS order_items;
            DROP TABLE IF EXISTS orders;
			DROP TABLE IF EXISTS cart_item;
			DROP TABLE IF EXISTS product;  
			DROP TABLE IF EXISTS cart;  
			DROP TABLE IF EXISTS users;
		`);
	} catch (error) {
		console.error("Error dropping tables!");
		throw error;
	}
}

async function createTables () {
    console.log('Creating tables...')
   
    // await client.query(`
    //     CREATE OR REPLACE FUNCTION trigger_set_timestamp()
    //     RETURNS TRIGGER AS $$
    //     BEGIN
    //     NEW.modified_at = NOW();
    //     RETURN NEW;
    //     END;
    //     $$ LANGUAGE plpgsql;

    //     CREATE TRIGGER set_timestamp
    //     BEFORE UPDATE ON users
    //     FOR EACH ROW
    //     EXECUTE PROCEDURE trigger_set_timestamp();
    // `);

    try {
        await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                first_name VARCHAR(255),
                last_name VARCHAR(255),
                email VARCHAR(255) UNIQUE NOT NULL, 
                phone INT,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );

            CREATE TABLE cart(
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                total DECIMAL(10,2),
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );

        CREATE TABLE product(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            description VARCHAR,
            sku VARCHAR(255),
            price DECIMAL(10,2),
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            deleted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE cart_item(
            id SERIAL PRIMARY KEY,
            cart_id INTEGER REFERENCES cart(id),
            product_id INTEGER REFERENCES product(id),
            quantity INTEGER,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

            // CREATE TABLE payment_details(
            //     id SERIAL PRIMARY KEY,
            //     order_id INTEGER REFERENCES orders(id),
            //     amount INTEGER,
            //     provider VARCHAR(255) NOT NULL,
            //     status VARCHAR,
            //     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            //     modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            // )

            // CREATE TABLE product_category(
            //     id SERIAL PRIMARY KEY,
            //     name VARCHAR(255),
            //     desc
            // )

         CREATE TABLE orders(
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            total DECIMAL(10, 2),
            status VARCHAR(255),
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        // CREATE TABLE order_details(
        //     id SERIAL PRIMARY KEY,
        //     user_id INTEGER REFERENCES users(id),
        //     total DECIMAL(10,2),
        //     payment_id INTEGER REFERENCES payment_details(id),
        //     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        //     modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        // );

        CREATE TABLE order_items(
            id SERIAL PRIMARY KEY,
            order_id INTEGER REFERENCES orders(id),
            product_id INTEGER REFERENCES product(id),
            quantity INTEGER,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

            CREATE TABLE cart_item(
                id SERIAL PRIMARY KEY,
                cart_id INTEGER REFERENCES cart(id),
                product_id INTEGER REFERENCES product(id),
                quantity INTEGER,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
            
            CREATE TABLE orders(
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                product_id INTEGER REFERENCES product(id)
            );

            CREATE TABLE order_items(
                id SERIAL PRIMARY KEY,
                order_id INTEGER REFERENCES orders(id),
                product_id INTEGER REFERENCES product(id),
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `)

        await client.query(`
            CREATE OR REPLACE FUNCTION trigger_set_timestamp()
            RETURNS TRIGGER AS $$
            BEGIN
            NEW.modified_at = NOW();
            RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;

            CREATE TRIGGER set_timestamp
            BEFORE UPDATE ON users
            FOR EACH ROW
            EXECUTE PROCEDURE trigger_set_timestamp()
        );
      
            CREATE TABLE reviews(
                id SERIAL PRIMARY KEY,  
                title VARCHAR(255) NOT NULL,
                content VARCHAR(500);
                product_name INTEGER REFERENCES product(name),
                review_creator INTEGER REFERENCES users(username),
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )



            CREATE TABLE orders(
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                product_id INTEGER REFERENCES product(id),
            )


            CREATE TABLE order_items(
                id SERIAL PRIMARY KEY,
                order_id INTEGER REFERENCES orders(id),
                product_id INTEGER REFERENCES product(id),
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
            `);
            
    } catch (error) {
        console.error(error);
    }
}

/* Initial user data seeding into tables */
async function createInitialUsers() {
    console.log('Creating dummy list of users...')
    try {
        const usersToCreate = [
            {username:'SmarmyTerrier', password:'dummypassword', first_name:'John', last_name:'Doe',email: 'user1@testmail.com',  phone: 1111111111},
            {username:'MiyagiSan14', password:'dummypassword', first_name:'Tom', last_name:'Collins',email: 'user2@testmail.com', phone: 1111111112},
            {username:'TebCrux', password:'dummypassword', first_name:'Ted', last_name:'Cruz',email: 'user3@testmail.com', phone: 1111111113},
            {username:'JSeed2', password:'dummypassword', first_name:'Joseph', last_name:'Seed',email: 'user4@testmail.com', phone: 1111111114},
            {username:'BloodyBookworm', password:'dummypassword', first_name:'Bernie', last_name:'Sanders',email: 'user5@testmail.com', phone: 1111111115},
            {username:'punctuallyqueasy', password:'dummypassword', first_name:'Kamala', last_name:'Harris',email: 'user6@testmail.com', phone: 1111111116},
            {username:'Yearly_Helper', password:'dummypassword', first_name:'James', last_name:'Inhofe',email: 'user7@testmail.com', phone: 1111111117},
            {username:'LilCrunk', password:'dummypassword', first_name:'Joseph', last_name:'Biden',email: 'user8@testmail.com', phone: 1111111118},
            {username:'DavetheGoat', password:'dummypassword', first_name:'David', last_name:'Beckham',email: 'user9@testmail.com', phone: 1111111119},
            {username:'JustTim', password:'dummypassword', first_name:'Tim', last_name:'Sweeny',email: 'user10@testmail.com', phone: 1111111121},
            {username:'Froge37', password:'dummypassword', first_name:'Dermott', last_name:'Smith',email: 'user11@testmail.com', phone: 1111111131},
            {username:'NattheCat', password:'dummypassword', first_name:'Natalie', last_name:'Felonius',email: 'user12@testmail.com', phone: 1111111141},
            {username:'QuizicallyYours', password:'dummypassword', first_name:'Pat', last_name:'Sajak',email: 'user13@testmail.com', phone: 1111111151},
            {username:'Boomer-Sooner-12', password:'dummypassword', first_name:'Bob', last_name:'Stoops',email: 'user14@testmail.com', phone: 1111111161},
            {username:'PistolsFiring', password:'dummypassword', first_name:'Michael', last_name:'Gundy',email: 'user15@testmail.com', phone: 1111111171}
        ];

        const users = await Promise.all(usersToCreate.map(createUser));
        console.log('Dummy user list created!')
        console.log(users);
    } catch (error) {
        console.log('Error creating dummy users!')
        throw error;
    }
}

async function createInitialCart() {
    try {
        console.log('starting to create cart...');

        const cartsToCreate = [
            {user_id: 1, total: 0.00 },
            {user_id: 2, total: 0.00 }
        ]
        const carts = await Promise.all(cartsToCreate.map(cart => createCart(cart)));
        console.log('Carts Created: ', carts)
        console.log('Finished creating carts.')
    } catch (error) {
        console.error("Error creating carts.");
        throw error;
    }
}

async function createInitialCartItem() {
    try {
        console.log('starting to create cart...');

        const cartItemsToAdd = [
            {cart_id: 1, product_id: 1, quantity: 3},
            {cart_id: 2, product_id: 2, quantity: 6}
        ]
        const cartItem = await Promise.all(cartItemsToAdd.map(cartItem => addItemToCart(cartItem)));
        console.log('Cart Items Added: ', cartItem)
        console.log('Finished adding cart items.')
    } catch (error) {
        console.error("Error adding cart items.");
        throw error;
    }
}

async function createInitialProducts() {
    console.log('Creating initial list of products...')
    try {
        const productsToCreate= [
            {name:'Khaki Fanny Pack', description:'placeholder_description', sku:'001', category_id:000001, inventory_id:1, price:09.99},
            {name:'Oakley Sunglasses', description:'placeholder_description', sku:'002', category_id:000002, inventory_id:2, price:10.50},
            {name:'"Kiss the Cook" apron', description:'placeholder_description', sku:'003', category_id:000003, inventory_id:3, price:11.32},
            {name:'Neon Budweiser Sign', description:'placeholder_description', sku:'004', category_id:000004, inventory_id:4, price:08.38},
            {name:'Vintage Updog', description:'placeholder_description', sku:'005', category_id:000005, inventory_id:5, price:100.00},
            {name:'Cotton Tube Socks', description:'placeholder_description', sku:'006', category_id:000006, inventory_id:6, price:99.99},
            {name:'White Newbalance Sneakers: Size 10', description:'placeholder_description', sku:'007', category_id:000007, inventory_id:7, price:30.00},
            {name:'AC/DC Greatest Hits', description:'placeholder_description', sku:'008', category_id:000007, inventory_id:8, price:15.25},
            {name:'Flannel Shirt', description:'placeholder_description', sku:'009', category_id:000007, inventory_id:9, price:18.24},
            {name:'NFL regulation football', description:'placeholder_description', sku:'010', category_id:000010, inventory_id:10, price:19.93},
            {name:'Novelty Dad Coozy', description:'placeholder_description', sku:'011', category_id:000011, inventory_id:11, price:19.94},
            {name:'Grill Tongs', description:'placeholder_description', sku:'012', category_id:000012, inventory_id:12, price:19.95},
            {name:'"The Big Lebowski" Blu-Ray edition', description:'placeholder_description', sku:'013', category_id:000013, inventory_id:13, price:19.57},
            {name:'Jean Shorts: Size 34', description:'placeholder_description', sku:'014', category_id:000014, inventory_id:14, price:19.55},
            {name:'Faux-leather belt', description:'placeholder_description', sku:'015', category_id:000015, inventory_id:15, price:42.56},
            {name:'Cordless electric drill', description:'placeholder_description', sku:'016', category_id:000016, inventory_id:16, price:78.25},
            {name:'Shop-Vac', description:'placeholder_description', sku:'017', category_id:000017, inventory_id:17, price:45.00},
            {name:'Red metal toolbox', description:'placeholder_description', sku:'018', category_id:000017, inventory_id:18, price:61.00},
            {name:'Ken Burns "Baseball"', description:'placeholder_description', sku:'019', category_id:000017, inventory_id:19, price:25.32},
            {name:'Ken Burns "The Civil War"', description:'placeholder_description', sku:'020', category_id:000020, inventory_id:20, price:23.23},
            {name:'Ken Burns "Frank Lloyd Wright"', description:'placeholder_description', sku:'021', category_id:000021, inventory_id:21, price:75.75},
            {name:'Ken Burns "The Address"', description:'placeholder_description', sku:'022', category_id:000022, inventory_id:22, price:0.00},
            {name:'Ken Burns "The War"', description:'placeholder_description', sku:'023', category_id:000023, inventory_id:23, price:43.22},
            {name:'Ken Burns "Jazz"', description:'placeholder_description', sku:'024', category_id:000024, inventory_id:24, price:53.42},
            {name:'Ken Burns "The Dust Bowl"', description:'placeholder_description', sku:'025', category_id:000025, inventory_id:25, price:36.43},
            {name:'Golf Club Set', description:'placeholder_description', sku:'026', category_id:000026, inventory_id:26, price:43.42},
            {name:'Gibson Les Paul', description:'placeholder_description', sku:'027', category_id:000027, inventory_id:27, price:21.66},
            {name:'Gibson Flying V', description:'placeholder_description', sku:'028', category_id:000027, inventory_id:28, price:84.31},
            {name:'15-piece beard trimmer set', description:'placeholder_description', sku:'029', category_id:000027, inventory_id:29, price:13.13},
            {name:'"Silk" tie', description:'placeholder_description', sku:'030', category_id:000030, inventory_id:30, price:4.56},
            {name:'Silk tie', description:'placeholder_description', sku:'031', category_id:000031, inventory_id:31, price:95.05},
            {name:'Money clip', description:'placeholder_description', sku:'032', category_id:000032, inventory_id:32, price:440.43},
            {name:'Steel-toe boots', description:'placeholder_description', sku:'033', category_id:000033, inventory_id:33, price:15.21},
            {name:'Octodad: Dadliest Catch', description:'placeholder_description', sku:'034', category_id:000034, inventory_id:34, price:20.32},
            {name:'Wooden novelty coasters', description:'placeholder_description', sku:'035', category_id:000035, inventory_id:35, price:53.23},
            {name:'Whiskey Stones: Set of 6', description:'placeholder_description', sku:'036', category_id:000036, inventory_id:36, price:64.23},
            {name:'"#1 Dad" coffee mug', description:'placeholder_description', sku:'037', category_id:000037, inventory_id:37, price:57.11},
            {name:'"#2 Dad" coffee mug', description:'placeholder_description', sku:'038', category_id:000037, inventory_id:38, price:43.44},
            {name:'"Dad" coffee mug', description:'placeholder_description', sku:'039', category_id:000037, inventory_id:39, price:12.21},
            {name:'"Hi Hungry, I\'m Dad: 1001 Dad Jokes"', description:'placeholder_description', sku:'040', category_id:000040, inventory_id:40, price:13.41}
        ]
        const products = await Promise.all(productsToCreate.map(createProductItem));

		console.log('products created:');
		console.log(products);
		console.log('Finished creating products!');
    } catch (error) {
        console.error("Error creating products.");
        throw error;
    }
}

async function rebuildDB() {
	try {
		client.connect();
        await dropTables();
		await createTables();
		await createInitialUsers();
        await createInitialCart();
		await createInitialProducts();
        await createInitialCartItem();
	} catch (error) {
		console.log('Error during rebuildDB')
		throw error;
	}
}

module.exports = {
	rebuildDB
};
