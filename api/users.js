const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');

const {     
    createUser, 
    getUserByUsername, 
    getUserById,
    getUser} = require('../db/user/');



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
        const user = await getUserByUsername(username);
        const token = jwt.sign((user.id, user.username), process.env)

        if(user && user.password == password) {
            res.send({message: 'Login successful', token})
        } else {
         throw('Incorrect Username or Password!')
        }
    } catch (error) {
        console.log(error);
    }
})

usersRouter.get(`/profile/:userId`, async(req, res, next) => {
    const { userId } = req.body;

    try {
        const chosenUser = await getUserById(userId);
        const { username, first_name, last_name, email, phone} = chosenUser
        res.send({username, first_name, last_name, email, phone})
    } catch (error) {
        throw error;
    }

})

usersRouter.patch(``)
module.exports = usersRouter;