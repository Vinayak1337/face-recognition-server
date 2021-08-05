import { Router } from 'express';
import { DeleteUser, Register, SignIn, UpdateUser } from '../Controllers/user.js';

const UserRouter = Router();

UserRouter.post('/create', Register);

UserRouter.post('/get', SignIn);

UserRouter.put('/update', UpdateUser);

UserRouter.delete('/delete', DeleteUser);

export default UserRouter;
