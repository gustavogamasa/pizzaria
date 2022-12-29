
import { Request, Response } from "express";
import { ListProductByCategoryService } from "../../services/product/ListProductByCategoryService";



class ListProductsByCategoryController {

    async handle(req: Request, res: Response) {

       const category_id = req.query.category_id as string;

       const listProductsService = new ListProductByCategoryService;

       const lista = await listProductsService.execute(category_id);

       return res.json(lista);

    }

}

export { ListProductsByCategoryController }