const client = require('../client')

async function createReview({title, content, product_name}) {
    try {
        const { rows: review } = await client.query(`
            INSERT INTO reviews(title, content, product_name)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [title, content, product_name]);

        return review;

    } catch (error) {
        throw error
    }
}

async function deleteReview(id){
    try {
        const {rows: reviews} = await client.query(`
            DELETE FROM reviews
            WHERE id = $1
            RETURNING *;
        `, [id]);
    } catch (error) {
        throw error;
    }
    alert('Review deleted!');
}

async function getAllReviews() {
    try {
        const { rows: reviews } = await client.query(`
            SELECT *
            FROM reviews;
        `);

        return reviews;
    } catch (error) {
        throw error
    }
}

async function getReviewByUsername(username) {
    try {
        const { rows: reviews } = await client.query(`
            SELECT *
            FROM reviews
            WHERE review_creator=${username}
        `);
        return reviews;
    } catch (error) {
        throw error
    }
}

async function getReviewById(id) {
    try {
        const { rows: review} = await client.query(`
            SELECT *
            FROM reviews
            WHERE id=${id};
        `)

        return review;
    } catch (error) {
        throw error
    }
}

async function updateReview({review_id, title, content, product_name}) {
    try {
     const { rows: reviews } = await client.query(`
        UPDATE reviews
        SET title=${title}, content=${content}, product_name=${product_name}
        WHERE id=${review_id}; 
     `)

     return reviews;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createReview,
    deleteReview,
    getAllReviews,
    getReviewById,
    getReviewByUsername,
    updateReview
}