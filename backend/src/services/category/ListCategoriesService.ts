import prismaClient from "../../prisma"


class ListCategoriesService {
    async execute(){

        const lista = prismaClient.category.findMany({
            
            select:{
                id: true,
                name: true
            }
        });

        return lista;
    }
}

export { ListCategoriesService }