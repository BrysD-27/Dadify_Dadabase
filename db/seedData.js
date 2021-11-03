
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
            DROP TABLE IF EXISTS reviews;
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

async function createTables() {
    console.log('Creating tables...')

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
                admin BOOLEAN DEFAULT NULL,
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
                admin BOOLEAN DEFAULT NULL,
                name VARCHAR(255) UNIQUE NOT NULL,
                description VARCHAR,
                sku VARCHAR(255),
                price DECIMAL(10,2),
                image VARCHAR(255),
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
        `)

        await client.query(`
            CREATE TABLE reviews(
                id SERIAL PRIMARY KEY,  
                title VARCHAR(255) NOT NULL,
                content VARCHAR(500),
                product_name VARCHAR(255) UNIQUE NOT NULL REFERENCES product(name),
                review_creator VARCHAR(255)UNIQUE NOT NULL REFERENCES users(username),
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
            {username:'SmarmyTerrier', password:'dummypassword', first_name:'John', last_name:'Doe',email: 'user1@testmail.com',  phone: 1111111111, admin: false},
            {username:'MiyagiSan14', password:'dummypassword', first_name:'Tom', last_name:'Collins',email: 'user2@testmail.com', phone: 1111111112, admin: false},
            {username:'TebCrux', password:'dummypassword', first_name:'Ted', last_name:'Cruz',email: 'user3@testmail.com', phone: 1111111113, admin: false},
            {username:'JSeed2', password:'dummypassword', first_name:'Joseph', last_name:'Seed',email: 'user4@testmail.com', phone: 1111111114, admin: false},
            {username:'BloodyBookworm', password:'dummypassword', first_name:'Bernie', last_name:'Sanders',email: 'user5@testmail.com', phone: 1111111115, admin: false},
            {username:'punctuallyqueasy', password:'dummypassword', first_name:'Kamala', last_name:'Harris',email: 'user6@testmail.com', phone: 1111111116, admin: false},
            {username:'Yearly_Helper', password:'dummypassword', first_name:'James', last_name:'Inhofe',email: 'user7@testmail.com', phone: 1111111117, admin: false},
            {username:'LilCrunk', password:'dummypassword', first_name:'Joseph', last_name:'Biden',email: 'user8@testmail.com', phone: 1111111118, admin: false},
            {username:'DavetheGoat', password:'dummypassword', first_name:'David', last_name:'Beckham',email: 'user9@testmail.com', phone: 1111111119, admin: false},
            {username:'JustTim', password:'dummypassword', first_name:'Tim', last_name:'Sweeny',email: 'user10@testmail.com', phone: 1111111121, admin: false},
            {username:'Froge37', password:'dummypassword', first_name:'Ismael', last_name:'Everett',email: 'user11@testmail.com', phone: 1111111131, admin: false},
            {username:'NattheCat', password:'dummypassword', first_name:'Natalie', last_name:'Felonius',email: 'user12@testmail.com', phone: 1111111141, admin: false},
            {username:'QuizicallyYours', password:'dummypassword', first_name:'Pat', last_name:'Sajak',email: 'user13@testmail.com', phone: 1111111151, admin: false},
            {username:'Boomer-Sooner-12', password:'dummypassword', first_name:'Bob', last_name:'Stoops',email: 'user14@testmail.com', phone: 1111111161, admin: false},
            {username:'PistolsFiring', password:'dummypassword', first_name:'Michael', last_name:'Gundy',email: 'user15@testmail.com', phone: 1111111171, admin: false},
            {username:'admin', password:'admin', first_name: 'admin', last_name: 'admin', email: 'admin@adminmail.com', phone: null, admin: true}
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
            {userId: 1, total: 0.00 },
            {userId: 2, total: 0.00 },
            {userId: 3, total: 0.00 },
            {userId: 4, total: 0.00 },
            {userId: 5, total: 0.00 },
            {userId: 6, total: 0.00 },
            {userId: 7, total: 0.00 },
            {userId: 8, total: 0.00 },
            {userId: 9, total: 0.00 },
            {userId: 10, total: 0.00 },
            {userId: 11, total: 0.00 },
            {userId: 12, total: 0.00 },
            {userId: 13, total: 0.00 },
            {userId: 14, total: 0.00 },
            {userId: 15, total: 0.00 },
            {userId: 16, total: 0.00 }
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
            {name:'Khaki Fanny Pack', description:'That Khaki Color Dads Love! Hold your phone, keys, wallet, and SNACKS!', image: "khaki_fanny_pack.jpg", sku:'001', category_id:000001, inventory_id:1, price:09.99},
            {name:'Oakley Sunglasses', description:'Oakley: The Proud Sponsor Of Protecting Dad Eyes. Buy two for when you lose the first pair.', image: "oakley_sunglasses.jpeg", sku:'002', category_id:000002, inventory_id:2, price:10.50},
            {name:'"Kiss the Cook" apron', description:'Cooks Need A Kiss Too. And Beer.', image: "kiss_the_cook_apron.jpg", sku:'003', category_id:000003, inventory_id:3, price:11.32},
            {name:'Neon Budweiser Sign', description:"The King of Beers Sign For The King Of The Castle! Your wife's going to hate this. A lot.", image: "neon_budweiser_sign.jpg", sku:'004', category_id:000004, inventory_id:4, price:08.38},
            {name:'Vintage Updog', description: "What's Updog? HAH Gotcha! Buy two of 'em!", image: "vintage_updog.jpg", sku:'005', category_id:000005, inventory_id:5, price:100.00},
            {name:'Cotton Tube Socks', description:'Only True Dads Rock These Socks. Looks great with Jean Shorts!', image: "cotton_tube_socks.jpg", sku:'006', category_id:000006, inventory_id:6, price:99.99},
            {name:'White Newbalance Sneakers: Size 10', description: 'The Only Shoes Acceptable For True Dads! Buy a pair for each occasion! Watching the game, drinking a cold one, or starting up that lawn mower!', image: "white_newbalance_sneakers.jpg", sku:'007', category_id:000007, inventory_id:7, price:30.00},
            {name:'AC/DC Greatest Hits', description:'For Those About To Rock! Help educate those rugrats while you can with some Rock Theory.', image: "acdc_greatest_hits.jpg", sku:'008', category_id:000007, inventory_id:8, price:15.25},
            {name:'Flannel Shirt', description:'Might As Well Be Your Sunday Best. Also comfortable to wear while watching the game in the recliner.', image: "flannel_shirt.jpeg", sku:'009', category_id:000007, inventory_id:9, price:18.24},
            {name:'NFL regulation football', description:'The Ole Pigskin! Take that tablet from your kids hands and relive your glory days with a game of catch!', image: "nfl_regulation_football.jpg", sku:'010', category_id:000010, inventory_id:10, price:19.93},
            {name:'Novelty Dad Coozy', description: "Use Twice Daily! Or as needed!", image: "novelty_dad_coozy.jpg", sku:'011', category_id:000011, inventory_id:11, price:19.94},
            {name:'Grill Tongs', description: 'For The Grill-Master Himself! Goes great in one hand with a cold one in the other!', image: "grill_tongs.jpg", sku:'012', category_id:000012, inventory_id:12, price:19.95},
            {name:'"The Big Lebowski" Blu-Ray edition', description:'If The Dude Abides, So Do The Dads. A classic everyone in the family should watch.', image: "lebowski_blu_ray.jpg", sku:'013', category_id:000013, inventory_id:13, price:19.57},
            {name:'Jean Shorts: Size 34', description:'The Staple Of Dad Fashion. Get a pair for chores, and a pair to dress nice.', image: "jean_shorts.jpg", sku:'014', category_id:000014, inventory_id:14, price:19.55},
            {name:'Faux-leather belt', description: 'Keep Your Jorts Pulled Up! Includes a fish hook buckle to show off your favorite past time.', image: "faux_leather_belt.jpeg", sku:'015', category_id:000015, inventory_id:15, price:42.56},
            {name:'Cordless electric drill', description: "Take The Drill Anywhere! Even if you don't have a reason to use it.", image: "cordless_electric_drill.jpg", sku:'016', category_id:000016, inventory_id:16, price:78.25},
            {name:'Shop-Vac', description:'For The Shop Or The House. Why use a regular vacuum when Shop-Vac does it all.', image: "shop_vac.jpg", sku:'017', category_id:000017, inventory_id:17, price:45.00},
            {name:'Red metal toolbox', description: 'Like The One Your Dad Had! Comes with rust and dents!', image: "red_metal_toolbox.jpg", sku:'018', category_id:000017, inventory_id:18, price:61.00},
            {name:'Ken Burns "Baseball"', description: "America's Pastime. Teach your kids the history that's not taught in History.", image: "ken_burns_baseball.jpg", sku:'019', category_id:000017, inventory_id:19, price:25.32},
            {name:'Ken Burns "The Civil War"', description: 'Informative Video. Why read a textbook or the internet?', image: "ken_burns_civil_war.jpg", sku:'020', category_id:000020, inventory_id:20, price:23.23},
            {name:'Ken Burns "Frank Lloyd Wright"', description: "That Boring Film Every Household Needs. Great to threaten your kids with to watch if they don't behave.", image: "ken_burns_frank_lloyd_wright.jpg", sku:'021', category_id:000021, inventory_id:21, price:75.75},
            {name:'Ken Burns "The Address"', description: 'A History Lesson You Can Watch. For when your kids have to write an essay on Lincoln.', image: "ken_burns_the_address.jpg", sku:'022', category_id:000022, inventory_id:22, price:0.00},
            {name:'Ken Burns "The War"', description: 'Important To Know. Ken does a better job covering this than most textbooks.', image: "ken_burns_the_war.jpg", sku:'023', category_id:000023, inventory_id:23, price:43.22},
            {name:'Ken Burns "Jazz"', description: 'For The Soul. Ditch that rap music, and pop this in the DVD player.', image: "ken_burns_jazz.jpg", sku:'024', category_id:000024, inventory_id:24, price:53.42},
            {name:'Ken Burns "The Dust Bowl"', description: 'An Important Lesson. What happens when man-made and natural disasters collide.', image: "ken_burns_dust_bowl.jpg", sku:'025', category_id:000025, inventory_id:25, price:36.43},
            {name:'Golf Club Set', description: "Every Dad Needs A Set. Even if you don't golf, threaten your daughters boyfriend with 'em.", image: "golf_club_set.jpg", sku:'026', category_id:000026, inventory_id:26, price:43.42},
            {name:'Gibson Les Paul', description: "If You Want Your Kids To Think You're Cool. Shred on this bad boy.", image: "gibson_les_paul.jpg", sku:'027', category_id:000027, inventory_id:27, price:21.66},
            {name:'Gibson Flying V', description: "If You Want Your Kids To Think You're Cooler Than Cool. Shred on this bad boy even more.", image: "gibson_flying_v.jpeg", sku:'028', category_id:000027, inventory_id:28, price:84.31},
            {name:'15-piece beard trimmer set', description: "Clean Up That Face! You'll never use more than two pieces, but that's not the point!", image: "beard_trimmer_set.jpg", sku:'029', category_id:000027, inventory_id:29, price:13.13},
            {name:'"Silk" tie', description: 'Fake Silk Tie! But looks super sharp.', image: "silk_tie.jpg", sku:'030', category_id:000030, inventory_id:30, price:4.56},
            {name:'Silk tie', description:'Real Silk Tie! Looks exactly like the fake material.', image: "silk_tie_two.jpg", sku:'031', category_id:000031, inventory_id:31, price:95.05},
            {name:'Money clip', description: 'Carry Your Bills Like Mr. Cool! Spend all your money on this clip! Worth it!', image: "money_clip.jpg", sku:'032', category_id:000032, inventory_id:32, price:440.43},
            {name:'Steel-toe boots', description:'A Right Of Passage. Not a true Dad until a pair of these are dusty in the garage.', image: "steel_toe_boots.jpg", sku:'033', category_id:000033, inventory_id:33, price:15.21},
            {name:'Octodad: Dadliest Catch', description:'No Idea What This Is. Buy it anyway, kids love cartoons!', image: "octodad_dadliest_catch.jpg", sku:'034', category_id:000034, inventory_id:34, price:20.32},
            {name:'Wooden novelty coasters', description: "You'll Laugh Every Time! Others will hate it, and you'll laugh more!", image: "novelty_coasters.jpg", sku:'035', category_id:000035, inventory_id:35, price:53.23},
            {name:'Whiskey Stones: Set of 6', description: 'Drink Like A Real Dad. Even if you never use them, people might think you do!', image: "whiskey_stones.jpg", sku:'036', category_id:000036, inventory_id:36, price:64.23},
            {name:'"#1 Dad" coffee mug', description: '#1 In The Family. #1 on the bills.', image: "dad_coffee_mug.jpg", sku:'037', category_id:000037, inventory_id:37, price:57.11},
            {name:'"#2 Dad" coffee mug', description: "#2 In The Family. We're okay with that.",image: "dad_coffee_mug_two.jpg", sku:'038', category_id:000037, inventory_id:38, price:43.44},
            {name:'"Dad" coffee mug', description: "For Joke Fuel. Can't tell all the best jokes until you're fueled up!", image: "dad_coffee_mug_three.jpg", sku:'039', category_id:000037, inventory_id:39, price:12.21},
            {name:'"Hi Hungry, I\'m Dad: 1001 Dad Jokes"', description: "Knee Slappers! Be the life of the party even when there is no party!", image: "dad_joke_book.jpg", sku:'040', category_id:000040, inventory_id:40, price:13.41}
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
