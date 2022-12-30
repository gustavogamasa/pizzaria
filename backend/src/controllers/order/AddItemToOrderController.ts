import { Request, Response } from "express";
import { AddItemToOrderService } from "../../services/order/AddItemToOrderService";


class AddItemToOrderController { 

    async handle(req: Request, res: Response){

        const {order_id, product_id, amount} = req.body;

        const addItemToOrderService = new AddItemToOrderService();

        const addItem = await addItemToOrderService.execute({
            order_id,
            product_id,
            amount
        });
        
        return res.json(addItem);
        
    }
}

export { AddItemToOrderController };