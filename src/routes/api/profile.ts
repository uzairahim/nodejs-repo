import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";

import auth from "../../middleware/auth";
import UserProfile from "../../models/UserProfile";
import { IUserProfile } from "../../interfaces/user_profile";
import Request from "../../types/Request";
import User from "../../models/User";
import { IUser } from "../../interfaces/users";
import {successResponse} from "../../api-response";
import {customUserProfileResponse} from "../../custom/user-profile-response";

const router: Router = Router();

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", auth, async (req: Request, res: Response) => {
  try {
    const profile: IUserProfile = await UserProfile.findOne({
      user: req.userId,
    }).populate("user", ["avatar", "email"]);
    if (!profile) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "There is no profile for this user",
          },
        ],
      });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route   POST api/profile
// @desc    Create or update user's profile
// @access  Private
router.post(
  "/update",
  [
    auth,
    check("gender", "Gender is required").optional(),
    check("dateOfBirth", "Date of Birth is required").optional(),
    check("height", "Height is required").optional(),
    check("weight", "Weight is required").optional(),
    check("hair", "Hair is required").optional(),
    check("eyeColor", "Eye Color is required").optional(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { gender, dateOfBirth, height, weight, hair, eyeColor } = req.body;

    // Build profile object based on IUserProfile
    const profileFields = {
      userId: req.userId,
      gender,
      dateOfBirth,
      height,
      weight,
      hair,
      eyeColor,
    };

    try {
      let user: IUser = await User.findOne({ _id: req.userId });
      if (!user) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "User not registered",
            },
          ],
        });
      }

      let profile: IUserProfile = await UserProfile.findOne({ user: req.userId });
      if (profile) {
        // Update/
        profile = await UserProfile.findOneAndUpdate(
          { user: req.userId  },
          { $set: profileFields },
          { new: true }
        ).populate("user");
        return res.json(successResponse(customUserProfileResponse((profile))));
      }

      // Create
      profile = new UserProfile(profileFields);
      await profile.save();
      const getUpdatedProfile = await UserProfile.findOne({"_id": profile._id}).populate("user");
      res.json(successResponse(customUserProfileResponse((getUpdatedProfile))));
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get("/", async (_req: Request, res: Response) => {
  try {
    const profiles = await UserProfile.find().populate("user", ["avatar", "email"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route   GET api/profile/user/:userId
// @desc    Get profile by userId
// @access  Public
router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const profile: IUserProfile = await UserProfile.findOne({
      user: req.params.userId,
    }).populate("user", ["avatar", "email"]);

    if (!profile)
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ msg: "UserProfile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ msg: "UserProfile not found" });
    }
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route   DELETE api/profile
// @desc    Delete profile and user
// @access  Private
router.delete("/", auth, async (req: Request, res: Response) => {
  try {
    // Remove profile
    await UserProfile.findOneAndRemove({ user: req.userId });
    // Remove user
    await User.findOneAndRemove({ _id: req.userId });

    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default router;
