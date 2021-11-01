const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');

const {     
    createUser, 
    getUserByUsername, 
    getUserById,
    getAllUsers,
    updateUser,
    getUser} = require('../db/user/');
const JWT_SECRET = require('./secret');



usersRouter.post('/register', async(req, res, next) => {
    const {username, password, email} = req.body;
    try {
        const _user = await getUserByUsername(username);
        if(_user){
            res.send({message: 'Username already taken, please select another!'})
        }if (_user.email){
            res.send({message:'An account with this email is already in use. Maybe you wrote down the info somewhere?'})
        } 
        const user = await createUser({username, password, email});
        res.send(user)
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
        res.send({message: 'Login successful', token, id: user.id, isAdmin: user.admin});
         throw('Incorrect Username or Password!')
    } catch (error) {
        console.log(error);
    }
});

usersRouter.get(`/:username`, async(req, res, next) => {
    try {
        console.log(req.params.username);
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

// usersRouter.patch('/:username', async(req, res, next) => {
//         const {username} = req.body.username;
//         const { 
//             id,
//             username,
//             password,
//             first_name,
//             last_name,
//             email,
//             phone,
//             admin
//          } = req.body;

//     try {
//         const patchedUser = await updateUser({
//             username, 
//             password,
//             first_name,
//             last_name,
//             email,
//             phone,
//             admin, 
//             id});
//         res.send(patchedUser)
//     } catch (error) {
//         console.error('Error updating user')
//         throw error;    
//     }

// });

module.exports = usersRouter;