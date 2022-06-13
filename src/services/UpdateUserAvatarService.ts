interface Request {
  userId: string;
  avatarFileName: string | undefined;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: Request): Promise<void> {}
}

export default UpdateUserAvatarService;
