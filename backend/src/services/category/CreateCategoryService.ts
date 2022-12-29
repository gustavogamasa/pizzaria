import prismaClient from "../../prisma";

interface CategoryRequest {
    name: string;
}

class CreateCategoryService {

    async execute({ name }: CategoryRequest) {

        if (!name || name ==="") {throw new Error("Invalid name");}

        const newCategory = await prismaClient.category.create({
            data: {
                name: name,
            }, select: {
                id: true,
                name: true
            }
        });

        return newCategory;

    }

}

export { CreateCategoryService };