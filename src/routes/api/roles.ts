import { Router, Response } from "express";
import HttpStatusCodes from "http-status-codes";

import Request from "../../types/Request";
import auth from "../../middleware/auth";
import Role from "../../models/Role";
import { IRole } from "../../interfaces/roles";
import { successResponse } from "../../api-response";
import { customRoleResponse, customRoleCollectionResponse } from "../../custom/roles-response";

const router: Router = Router();

// @route   GET api/all_roles
// @desc    Register user given their name, email and password, returns the token upon successful registration
// @access  Public
router.get("/all_roles", auth, async (req: Request, res: Response) => {
    try {
        const IRole = await Role.find();
        res.json(successResponse(customRoleCollectionResponse(IRole)));
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
});

export default router;
