import { Router } from "express";
import authController from '../../controllers/auth_controller';
import auth from "../../middleware/auth";

const router: Router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user_details",auth, authController.userDetail);
export default router;
