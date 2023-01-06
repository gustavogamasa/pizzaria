import prismaClient from "../../prisma";

interface SendOrder {
    order_id: string;
}

class FinishOrderService {

    async execute({ order_id }: SendOrder) {
        
        console.log("Service, ID:"+order_id);


        //PROBLEMA ESTÁ AQUI? Frontend falhando
        const finishdOrder = await prismaClient.order.update({
            where: {
                id: order_id
            }, data: {
                status: true
            }
        });

        
        return finishdOrder ;

    }

}

export { FinishOrderService }