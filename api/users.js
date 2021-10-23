const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');

const {     
    createUser, 
    getUserByUsername, 
    getUserById,
    getUser} = require('../db/user/');
const JWT_SECRET = require('./secret');



usersRouter.post('/register', async(req, res, next) => {
    try {
        const user = await createUser(req.body);
            res.send(user);
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

        res.send({message: 'Login successful', token})
        
    } catch (error) {
        console.log(error);
    }
})

usersRouter.get(`/users/:username`, async(req, res, next) => {
    const username = req.params.username;
    const { user } = req.body;
    try {
        const chosenUser = await getUserById(user);
        const { username, first_name, last_name, email, phone} = chosenUser
        res.send({username, first_name, last_name, email, phone})
    } catch (error) {
        throw error;
    }

})

module.exports = usersRouter;