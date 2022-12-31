import prismaClient from "../../prisma";

interface SendOrder {
    order_id: string;
}

class FinishOrderService {

    async execute({order_id}: SendOrder) {

        const sendOrder = await prismaClient.order.update({
            where: {
                id: order_id
            }, data: {
                status: true
            }
        });
        
        return {sendOrder};

    }

}

export { FinishOrderService }