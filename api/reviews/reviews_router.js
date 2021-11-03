const reviewsRouter = require('express').Router();
const {
    createReview,
    deleteReview,
    getAllReviews,
    getReviewById,
    updateReview
} = require('../../db/reviews/reviews');

reviewsRouter.post('/reviews', async (req, res, next) => {
    const { title, content, product_name} = req.body;

    try {
        const createdReview = await createReview({
            title,
            content,
            product_name
        });
        res.send(createdReview);
    } catch (error) {
        throw error
    }
});

reviewsRouter.delete('/reviews', async (req, res, next) => {
    try {
        const {id} = req.params;
        const review = await getReviewById(id);
        if (reviewsRouter.created_by === req.users.id) {
            const deletedReview = await deleteReview(review.id);
            res.send(deletedReview);
        } else {
            next();
        }
    } catch (error) {
        throw error;
    }
});

reviewsRouter.get('/reviews/:userId', async (req, res, next) => {
    const {review_creator} = req.params;
    try {
        const userReviews = await getReviewsByUsername(review_creator);
        res.send(userReviews);
    } catch (error) {
        throw error
    }
});

reviewsRouter.get('/reviews', async (req, res, next) => {
    try {
        const reviews = await getAllReviews();
        res.send(reviews);
    } catch (error) {
        throw error;
    }
})

reviewsRouter.patch('/reviews/:reviewId', async (req, res, next) => {
    const {review_id} = req.params;
    const review = await getReviewById(review_id);
    const { title, content, product_name} = req.body;

    try {
        if(req.user.id === review.review_creator){
            const updatedReview = await updateReview({
                title,
                content,
                product_name
            });
            res.send(updatedReview);
        }
    } catch (error) {
        throw error
    }
});

module.exports = reviewsRouter;