import { Student } from "@/models/studentModel";
import { Request, Response } from "express";

export const createStudent = async (req: Request, res: Response) => {
  const {
    name,
    studentId,
    email,
    phone,
    section,
    faceEmbedding,
    course,
    batch,
  } = req.body;

  try {
    const existingStudent = await Student.findOne({
      $or: [{ studentId }, { email }],
    });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student with this ID or email already exists" });
    }

    const newStudent = new Student({
      name,
      studentId,
      email,
      phone,
      course,
      section,
      batch,
      faceEmbedding,
    });

    await newStudent.save();

    return res.status(201).json({
      message: "Student created successfully",
      student: newStudent,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error creating student",
      error: error.message,
    });
  }
};
