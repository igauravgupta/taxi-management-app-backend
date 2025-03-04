import {Router} from "express";
import { body, query } from "express-validator";
import { CreateRide, GetFare, ConfirmRide, StartRide, EndRide } from "../controllers/ride.controller.js";
import {authUser, authCaption}from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/create",
    authUser,
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    body("vehicleType").isString().isIn(["auto", "car", "moto"]).withMessage("Invalid vehicle type"),
    CreateRide
);

router.get(
    "/get-fare",
    authUser,
    query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    query("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    GetFare
);

router.post(
    "/confirm",
    authUser,
    body("rideId").isMongoId().withMessage("Invalid ride id"),
    ConfirmRide
);

router.get(
    "/start-ride",
    authCaption,
    query("rideId").isMongoId().withMessage("Invalid ride id"),
    query("otp").isString().isLength({ min: 6, max: 6 }).withMessage("Invalid OTP"),
    StartRide
);

router.post(
    "/end-ride",
    authCaption,
    body("rideId").isMongoId().withMessage("Invalid ride id"),
    EndRide
);

export default router;
