import prismaClient from '../../prisma';

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    // verifica se usuario enviou email
    if (!email) {
      throw new Error('Email incorrect');
    }
    // verificar se esse email já está cadastrado no banco
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
