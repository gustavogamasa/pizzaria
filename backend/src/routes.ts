import { Router } from 'express';
import multer from 'multer';


import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoriesController } from './controllers/category/ListCategoriesController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig from './config/multer';
import { ListProductsByCategoryController } from './controllers/product/ListProductsByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemToOrderController } from './controllers/order/AddItemToOrderController';
import { RemoveItemFromOrderController } from './controllers/order/RemoveItemFromOrderController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';



const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// Routes - User
router.post("/users", new CreateUserController().handle);

router.post("/session", new AuthUserController().handle);


router.get("/me", new DetailUserController().handle);

// Routes - Category

router.post("/category/create",  new CreateCategoryController().handle);
router.get("/category/list-all",  new ListCategoriesController().handle);

// Routes - Products

router.post("/product/create",  upload.single('file'), new CreateProductController().handle);
router.get("/category/products",  new ListProductsByCategoryController().handle);

// Routes - Orders

router.post("/order/create",  new CreateOrderController().handle);
router.delete("/order/delete",  new RemoveOrderController().handle);
router.post("/order/add-item",  new AddItemToOrderController().handle);
router.delete("/order/remove-item",  new RemoveItemFromOrderController().handle);
router.put("/order/send",  new SendOrderController().handle);
router.get("/order/list-pending",  new ListOrdersController().handle);
router.get("/order/detail",  new DetailOrderController().handle);
router.put("/order/finish",  new FinishOrderController().handle);


export { router };