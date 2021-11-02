const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');

const {     
    createUser, 
    getUserByUsername, 
    getAllUsers,
    getUser} = require('../db/user/');

const {createCart, getCartAndItemsByUser} = require('../db/cart/index');

const JWT_SECRET = require('./secret');



usersRouter.post('/register', async(req, res, next) => {
    const {username, password, email} = req.body;
    try {
        const _user = await getUserByUsername(username);
        if (_user) {
            res.send({message: 'Email or Username already taken, please try again!'});
            next();
        }
        const user = await createUser({username, password, email});
        const token = jwt.sign({
            id: user.id, 
            username: user.username
        }, JWT_SECRET);

        const cartData = {userId: user.id, total: 0};

        const cart = await createCart(cartData);

        res.send({user, token, cart, message: "register successful."});
    } catch (error) {
        console.error(error);
    }
});

usersRouter.post('/login', async(req, res, next) => {
    const { username, password} = req.body;
    
    if (!username || !password) {
        throw('Please enter both a valid username and password')
    }
    try {
        const user = await getUser({username,password});
        const token = jwt.sign({
            id: user.id, 
            username: user.username
        }, JWT_SECRET);

        const userId = user.id;
        const cart = await getCartAndItemsByUser(userId);

        res.send({message: 'Login successful', token, cart, id: user.id, isAdmin: user.admin});
         throw('Incorrect Username or Password!')
    } catch (error) {
        console.error(error);
    }
});

usersRouter.get(`/:username`, async(req, res, next) => {
    try {
        const chosenUser = await getUserByUsername(req.params.username);
        res.send(chosenUser)
    } catch (error) {
        throw error;
    }

});

usersRouter.get(`/`, async(req,res,next) => {
    try {
        const userlist = await getAllUsers();
        res.send(userlist);
    } catch (error) {
        console.error(error)
    }
});

module.exports = usersRouter;