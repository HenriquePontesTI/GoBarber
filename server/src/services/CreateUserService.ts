import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async excute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExist = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExist) {
      throw new AppError('Email adrdress already used.');
    }

    const hashedPassword = hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: await hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}
