import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import validateNewUser from '../middlewares/validateNewUser';
import validateNewUserInputs from '../middlewares/validateNewUserInputs';

const router = Router();

const usersController = new UsersController();

router.route('/users')
  .post(validateNewUser, validateNewUserInputs, usersController.create);

export default router;