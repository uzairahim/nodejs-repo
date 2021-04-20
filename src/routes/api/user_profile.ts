import { Router } from "express";
import userController from '../../controllers/user_controller';
import auth from "../../middleware/auth";

const router: Router = Router();

router.post("/upload_file", auth, userController.uploadFile);
router.post("/update", auth, userController.updateProfile);
router.post("/user_skills", auth, userController.userSkills);
router.post("/search_by_name", auth, userController.searchByName);
router.post("/create_list", auth, userController.createList);
router.get("/get_list", auth, userController.getList);

export default router;
