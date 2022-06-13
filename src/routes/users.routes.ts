import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import multer from 'multer';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const uplaod = multer(uploadConfig);

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

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uplaod.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        userId: request.user.id,
        avatarFileName: request.file!.filename,
      });

      console.log(request.file);

      return response.json(user);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default usersRouter;
