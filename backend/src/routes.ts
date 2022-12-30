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



const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// Routes - User
router.post("/users", new CreateUserController().handle);

router.post("/session", new AuthUserController().handle);

router.get("/me", isAuthenticated ,new DetailUserController().handle);

// Routes - Category

router.post("/category/create", isAuthenticated, new CreateCategoryController().handle);
router.get("/category/list-all", isAuthenticated, new ListCategoriesController().handle);

// Routes - Products

router.post("/product/create", isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get("/category/products", isAuthenticated, new ListProductsByCategoryController().handle);

// Routes - Orders

router.post("/order/create", isAuthenticated, new CreateOrderController().handle);
router.delete("/order/delete", isAuthenticated, new RemoveOrderController().handle);
router.post("/order/add-item", isAuthenticated, new AddItemToOrderController().handle);
router.delete("/order/remove-item", isAuthenticated, new RemoveItemFromOrderController().handle);
router.put("/order/send", isAuthenticated, new SendOrderController().handle);



export { router };