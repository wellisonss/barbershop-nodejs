import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User';


interface Request {
  email: string,
  password: string
}

interface Response {
  user: User,
  token: string
}

class AuthenticateUserService {
  public async execute( { email, password }: Request): Promise<Response>{

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne( {
    where: { email }
  });

  if(!user) {
    throw new Error('Senha ou Email inválidos');
  }

  const correctPassword = await compare( password, user.password );

  if(!correctPassword) {
    throw new Error('Senha ou Email inválidos');
  }

  const token = sign({}, 'e4df104f4a590a8c99082d23d3732ee7', {
    subject: user.id,
    expiresIn: '1d',
  });

  return {
    user,
    token
   };

  }
}

export default AuthenticateUserService;
