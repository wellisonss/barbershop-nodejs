import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

interface NewUser {
  id: 'string';
  name: 'string';
  email: 'string';
  password?: 'string';
  created_at: 'date';
  updated_at: 'date';
}

usersRouter.patch('/avatar', ensureAuthenticated, async (request, response) => {
  return response.send('okay');
});

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const { password: deletePassword, ...responseUser } = user;

    return response.json(responseUser);
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
