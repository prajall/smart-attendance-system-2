import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import permissionRoute from "@/routes/administration/permissionRoute";
import roleRoute from "./routes/administration/roleRoute";
import userRoute from "./routes/administration/userRoute";
import jwt from "jsonwebtoken";

const app = express();

export default app;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// SETUP ROUTES
app.use("/user", userRoute);
app.use("/permission", permissionRoute);
app.use("/role", roleRoute);

app.get("/env", (req, res) => {
  try {
    const envVariables: any = {};

    Object.keys(process.env).forEach((key: any) => {
      if (key.startsWith("CLIENT_")) {
        envVariables[key] = process.env[key];
      }
    });

    const token = jwt.sign(envVariables, process.env.JWT_SECRET || "jwtsecret");

    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
