import express from "express";
import { createPermission } from "../controllers/administration/permissionController";

const Router = express.Router();

Router.post("/new-permission", createPermission);

export default Router;
