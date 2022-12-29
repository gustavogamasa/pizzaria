import { Router } from 'express';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoriesController } from './controllers/category/ListCategoriesController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';


const router = Router();

// Routes - User
router.post("/users", new CreateUserController().handle);

router.post("/session", new AuthUserController().handle);

router.get("/me", isAuthenticated ,new DetailUserController().handle);

// Routes - Category

router.post("/category/create", isAuthenticated, new CreateCategoryController().handle);
router.get("/category/list", isAuthenticated, new ListCategoriesController().handle);

// Routes - Products


export { router };