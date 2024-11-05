import { newAttendance } from "@/controllers/attendance.controller";
import express from "express";

const Router = express.Router();

Router.post("/", newAttendance);

export default Router;
