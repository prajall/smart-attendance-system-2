import { newAttendance } from "@/controllers/attendanceController";
import express from "express";

const Router = express.Router();

Router.post("/", newAttendance);

export default Router;
