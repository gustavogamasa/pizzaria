import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {

    async handle(req: Request, res: Response) {

        const { name, price, description, category_id } = req.body;

        if (!req.file) {
            throw new Error("Error: File is missing");
        }
        else {

            const {originalname, filename: banner} = req.file;

            const createProductservice = new CreateProductService();

            const newProduct = await createProductservice.execute({
                name, price, description, banner:'', category_id
            });

            return res.json(newProduct);
        }


    }



}

export { CreateProductController }