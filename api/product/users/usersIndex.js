const { Router } = require('express');
const {
    createUser, 
    getUserByUsername, 
    getUserById,
    getAllUsers,
    getUser
} = require('./users');

const usersRouter = Router();
usersRouter.get('/', getAllUsers);
usersRouter.get('/:username', getUserByUsername);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);

module.export = usersRouter;