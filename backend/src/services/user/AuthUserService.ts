import { compare } from "bcryptjs";
import prismaClient from "../../prisma";


interface AuthRequest{
    email: string;
    password: string;
};

class AuthUserService{

    async execute({email, password}: AuthRequest){
        
        // Email not existent
        const user = await prismaClient.user.findFirst({
            where:{
                email: email,
            }
        })

        if (!user) {throw new Error("Incorrect user or password")}

        // Check if password is correct

        const correctPassword = await compare(password, user.password);
        if (!correctPassword) {throw new Error("Incorrect user or password")};

        

        return {Auth: true};

    }

}

export { AuthUserService };