import { Request, Response } from "express";
import { Course } from "../models/courseModel";
import { handleError } from "../utils/errorHandler";

export const createCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const courseData = req.body;
    const newCourse = new Course(courseData);
    const savedCourse = await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: savedCourse,
    });
  } catch (error) {
    handleError(res, error);
  }
};
