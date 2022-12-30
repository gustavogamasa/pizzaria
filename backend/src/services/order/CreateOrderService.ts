import prismaClient from "../../prisma";

interface OrderRequest {
    table: number;
    name: string;
}



class CreateOrderService {

    async execute({table, name}: OrderRequest){

        const mewOrder = await prismaClient.order.create({
            data:{
                table: table,
                name: name
            }
        });
        
        return mewOrder;
    }
}

export { CreateOrderService }