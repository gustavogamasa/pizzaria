import prismaClient from "../../prisma"

// interface CategoryRequest{
//     category_id: string;
// }


class ListProductByCategoryService {
    async execute(category_id){

        const lista = prismaClient.product.findMany({
            where:{
                category_id: category_id
            },
            select:{
                id: true,
                name: true
            }
        });

        return lista;
    }
}

export { ListProductByCategoryService }