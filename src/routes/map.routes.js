import {Router} from "express";
import { query } from "express-validator";
import { authUser as auth} from "../middlewares/auth.middleware.js";
import { getCoordinates,getDistanceTime,getAutoCompleteSuggestions } from "../controllers/map.controller.js";

const router = Router();

router.get(
    "/get-coordinates",
    query("address").isString().isLength({ min: 3 }),
    auth,
    getCoordinates
);

router.get(
    "/get-distance-time",
    query("origin").isString().isLength({ min: 3 }),
    query("destination").isString().isLength({ min: 3 }),
    auth,getDistanceTime
);

router.get(
    "/get-suggestions",
    query("input").isString().isLength({ min: 3 }),
    auth,getAutoCompleteSuggestions
);

export default router;
