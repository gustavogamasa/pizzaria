import { hash } from "bcryptjs";
import prismaClient from "../../prisma";



interface UserRequest {
    name: string,
    email: string,
    password: string
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {

        // verificar se email foi enviado
        if (!email) { throw new Error("Email is required"); }

        // verificar se usuário já existe
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) { throw new Error("Email is already registered"); }

        // cadastra usuario no banco

        const passwordHash = await hash(password, 8);

        const newUser = prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        return newUser;
    }


}

export { CreateUserService }