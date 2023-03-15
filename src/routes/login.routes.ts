import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import validateLogin from '../middlewares/validateLogin';

const router = Router();

const usersController = new UsersController();

router.route('/login')
  .post(validateLogin, usersController.login);

export default router;