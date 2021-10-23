const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');

const {     
    createUser, 
    getUserByUsername, 
    getUserById,
    getAllUsers,
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
         throw('Incorrect Username or Password!')
    } catch (error) {
        console.log(error);
    }
})

usersRouter.get(`/:username`, async(req, res, next) => {
    try {
        const chosenUser = await getUserByUsername(username);
        res.send(chosenUser)
    } catch (error) {
        throw error;
    }

})

usersRouter.get(`/`, async(req,res,next) => {
    try {
        const userlist = await getAllUsers();
        res.send(userlist);
    } catch (error) {
        console.error(error)
    }
})

module.exports = usersRouter;