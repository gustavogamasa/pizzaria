import { Request, Response } from "express";
import { RemoveItemFromOrderService } from "../../services/order/RemoveItemFromOrderService";


class RemoveItemFromOrderController {

    async handle(req: Request, res: Response) {

        const item_id = req.query.item_id as string;

        const removeItemFromOrderService = new RemoveItemFromOrderService;

        const remItem = await removeItemFromOrderService.execute({
            item_id
        });

        return res.json(remItem);

    }
}

export { RemoveItemFromOrderController };