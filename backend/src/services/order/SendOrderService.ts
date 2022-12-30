import prismaClient from "../../prisma";

interface SendOrder {
    order_id: string;
}

class SendOrderService {

    async execute({order_id}: SendOrder) {

        const sendOrder = await prismaClient.order.update({
            where: {
                id: order_id
            }, data: {
                draft: false
            }
        });
        return {sendOrder};

    }

}

export { SendOrderService }