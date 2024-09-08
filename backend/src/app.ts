import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
// import permissionRoute from "@/routes/administration/permissionRoute";
import userRoute from "@/routes/administration/userRoute";
import attendanceRoute from "@/routes/attendanceRoute";
import studentRoute from "@/routes/studentRoute";
import faceEmbeddingRoute from "@/routes/faceEmbeddingRoute";

const app = express();

export default app;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// SETUP ROUTES
app.use("/user", userRoute);
app.use("/attendance", attendanceRoute);
app.use("/student", studentRoute);
app.use("/faceEmbedding", faceEmbeddingRoute);

// app.use("/permission", permissionRoute);
// app.use("/role", roleRoute);
