import { Request, Response, NextFunction } from "express";
import Show from "../models/Show";
import Episode from "../models/Episode";
import ShowBudget from "../models/ShowBudget";
import ShowInvitation from "../models/ShowInvitation";
import ShowTeamMember from "../models/ShowTeamMember";
import ShowWorkingDayTitle from "../models/showWorkingDayTitle";
import ShowWorkingDay from "../models/ShowWorkingDay";
import HttpStatusCodes from "http-status-codes";
import mongoose from "mongoose";
import { successResponse } from "../api-response";
import { customUserResponse } from "../custom/user-response";
import { customShowResponse } from "../custom/show-response";

const createShow = (req: Request, res: Response, next: NextFunction) => {

    // Show
    let title = req.body.title;
    let additionalInfo = req.body.additionalInfo;
    let remarks = req.body.remarks;
    let ShowType = req.body.ShowType;
    let createdUser = req.body.createdUser;
    let date = req.body.date;

    // Episodes
    let episodes = req.body.episodes;

    const show = new Show({
        title,
        remarks,
        additionalInfo,
        ShowType,
        createdUser,
        date,
        "createdBy": req["userId"]
    });
    return show.save()
        .then(async data => {
            let i;
            let j;
            for (i = 0; i < episodes.length; i++) {
                const showEpisodes = new Episode({
                    showId: show.id,
                    episodeNo: episodes[i].episodeNo,
                    title: episodes[i].title,
                    date: episodes[i].date,
                    createdBy: req["userId"],
                });
                await showEpisodes.save();
                for (j = 0; j < episodes[i].episodeDays.length; j++) {
                    const showEpisodesDays = new ShowWorkingDay({
                        showId: show.id,
                        episodeId: showEpisodes.id,
                        title: episodes[i].episodeDays[j].title,
                        dateNo: episodes[i].episodeDays[j].dateNo,
                        date: episodes[i].episodeDays[j].date,
                    });
                    await showEpisodesDays.save();
                }
            }
            let showData = await Show.findById(show.id).populate('createdBy')
                .populate("episodes");
            return res.status(HttpStatusCodes.CREATED).json(showData);
        })
        .catch(err => {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                errors: [
                    {
                        message: err.message,
                    },
                ],
            });
        });
};

const updateShow = (req: Request, res: Response, next: NextFunction) => {
    let {
        showId,
        title,
        type,
        remarks,
        additionalInfo,
        userIds,
        episodes,
        showWorkingDays,
        invitationList,
    } = req.body;

    Show.findByIdAndUpdate(showId, {
        $set:
        {
            "title": title,
            "type": type,
            "remarks": remarks,
            "additionalInfo": additionalInfo,
            "userIds": userIds,
            "episodes": episodes,
            "showWorkingDays": showWorkingDays,
            "invitationList": invitationList,
        }
    }).then(data => {
        return res.status(HttpStatusCodes.OK).json(data);
    })
        .catch(err => {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                errors: [
                    {
                        message: err.message,
                    },
                ],
            });
        });
};

const allShows = (req: Request, res: Response, next: NextFunction) => {
    let ids = mongoose.Types.ObjectId('607820e475055b3e734fd68c');

    Show.aggregate([
        { "$match": { "_id": ids } },
        {
            "$lookup": {
                "from": "episodes",
                "localField": "_id",
                "foreignField": "showId",
                "as": "episodes"
            }
        },
        {
            '$project': {
                'title': '$title',
                'episodes': 1,
            }
        }

    ]).exec(function (err, results) {
        return res.status(HttpStatusCodes.OK).json(results);
    })
};

const createShowEpisode = (req: Request, res: Response, next: NextFunction) => {
    let {
        showId,
        episodeNo,
        title,
        episodeDays
    } = req.body;

    const episode = new Episode({
        _id: new mongoose.Types.ObjectId(),
        showId,
        episodeNo,
        title,
        episodeDays
    });
    return episode.save()
        .then(data => {
            return res.status(HttpStatusCodes.CREATED).json(data);
        })
        .catch(err => {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                errors: [
                    {
                        message: err.message,
                    },
                ],
            });
        });
};

const updateShowEpisode = (req: Request, res: Response, next: NextFunction) => {
    let {
        episodeId,
        episodeNo,
        title,
        episodeDays
    } = req.body;

    Episode.findByIdAndUpdate(episodeId, {
        $set:
        {
            "episodeNo": episodeNo,
            "title": title,
            "episodeDays": episodeDays
        }
    }).then(data => {
        return res.status(HttpStatusCodes.OK).json(data);
    })
        .catch(err => {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                errors: [
                    {
                        message: err.message,
                    },
                ],
            });
        });
};


const createShowBudget = (req: Request, res: Response, next: NextFunction) => {
    let {
        showId,
        budgetType,
        amount,
    } = req.body;

    const showBudget = new ShowBudget({
        _id: new mongoose.Types.ObjectId(),
        showId,
        budgetType,
        amount
    });
    return showBudget.save()
        .then(data => {
            return res.status(HttpStatusCodes.CREATED).json(data);
        })
        .catch(err => {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                errors: [
                    {
                        message: err.message,
                    },
                ],
            });
        });
};

const searchShowByName = (req: Request, res: Response, next: NextFunction) => {
    let {
        title
    } = req.body;

    return Show.find({ $text: { $search: title } })
        .then(data => {
            return res.status(HttpStatusCodes.OK).json(data);
        }).catch(err => {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                message: err.message
            });
        });
};

const showInvitation = (req: Request, res: Response, next: NextFunction) => {
    let {
        showId,
        email
    } = req.body;

    const showInvitation = new ShowInvitation({
        _id: new mongoose.Types.ObjectId(),
        showId,
        email
    });
    return showInvitation.save()
        .then(data => {
            return res.status(HttpStatusCodes.CREATED).json(data);
        })
        .catch(err => {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                errors: [
                    {
                        message: err.message,
                    },
                ],
            });
        });
};
const showTeamMember = (req: Request, res: Response, next: NextFunction) => {
    let {
        showId,
        episodeId,
        userId,
        userRole,
    } = req.body;

    const showTeamMember = new ShowTeamMember({
        _id: new mongoose.Types.ObjectId(),
        showId,
        episodeId,
        userId,
        userRole,
        "createdBy": req["userId"]
    });
    return showTeamMember.save()
        .then(data => {
            return res.status(HttpStatusCodes.CREATED).json(data);
        })
        .catch(err => {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                errors: [
                    {
                        message: err.message,
                    },
                ],
            });
        });
};
const showWorkingDayTitle = (req: Request, res: Response, next: NextFunction) => {
    let {
        workingDayId,
        title,
        order
    } = req.body;

    const showWorkingDayTitle = new ShowWorkingDayTitle({
        _id: new mongoose.Types.ObjectId(),
        workingDayId,
        title,
        order
    });
    return showWorkingDayTitle.save()
        .then(data => {
            return res.status(HttpStatusCodes.CREATED).json(data);
        })
        .catch(err => {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                errors: [
                    {
                        message: err.message,
                    },
                ],
            });
        });
};

export default {
    createShowBudget,
    createShow,
    updateShow,
    allShows,
    createShowEpisode,
    updateShowEpisode,
    searchShowByName,
    showInvitation,
    showTeamMember,
    showWorkingDayTitle
};
