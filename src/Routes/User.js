const { Router } = require('express');
const { DeleteUser, Register, SignIn, UpdateUser } = require('../Controllers/User.js');

const UserRouter = Router();

UserRouter.post('/create', Register);

UserRouter.post('/get', SignIn);

UserRouter.put('/update', UpdateUser);

UserRouter.delete('/delete', DeleteUser);

module.export = UserRouter;
