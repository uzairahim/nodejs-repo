import { Router } from "express";
import jobController from '../../controllers/job_controller';
import auth from "../../middleware/auth";


const router: Router = Router();

// @route   GET api/create/show
// @desc    Create a new show
// @access  Private
router.post("/create", auth, jobController.createJob);
router.get("/all", auth, jobController.allJobs);

export default router;
