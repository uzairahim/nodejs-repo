import { Router } from "express";
import showController from '../../controllers/show_controller';
import auth from "../../middleware/auth";


const router: Router = Router();

// @route   GET api/create/show
// @desc    Create a new show
// @access  Private
router.post("/create_show", auth, showController.createShow);
router.post("/update_show", auth, showController.updateShow);
router.get("/all", auth, showController.allShows);
router.post("/create_show_episode", auth, showController.createShowEpisode);
router.post("/update_show_episode", auth, showController.updateShowEpisode);
router.post("/create_show_budget", auth, showController.createShowBudget);
router.post("/search_show_by_name", auth, showController.searchShowByName);
router.post("/show_invitation", auth, showController.showInvitation);
router.post("/show_team_member", auth, showController.showTeamMember);
router.post("/show_working_day_title", auth, showController.showWorkingDayTitle);

export default router;
