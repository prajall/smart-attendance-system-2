import { createStudent } from "@/controllers/studentController";
import express from "express";

const Router = express.Router();
export default Router;

Router.post("/", createStudent);
