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



const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// Routes - User
router.post("/users", new CreateUserController().handle);

router.post("/session", new AuthUserController().handle);

router.get("/me", isAuthenticated ,new DetailUserController().handle);

// Routes - Category

router.post("/category/create", isAuthenticated, new CreateCategoryController().handle);
router.get("/category/listall", isAuthenticated, new ListCategoriesController().handle);

// Routes - Products

router.post("/product/create", isAuthenticated, upload.single('file'), new CreateProductController().handle);


export { router };