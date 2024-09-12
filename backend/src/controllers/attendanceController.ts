import express, { Request, Response } from "express";
import { Student } from "@/models/studentModel";
import { Attendance } from "@/models/attendanceModel";

// POST request to create
export const newAttendance = async (req: Request, res: Response) => {
  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAttendance = await Attendance.findOne({
      student: student._id,
      date: today,
    });

    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: "Attendance already marked for today" });
    }

    const newAttendance = new Attendance({
      student: student._id,
      course: student.course,
      section: student.section,
      date: today,
    });

    await newAttendance.save();

    res.status(201).json(newAttendance);
  } catch (error: any) {
    console.error("Error marking attendance:", error);
    res.status(500).json({
      message: "Error marking attendance",
      error: error.message,
    });
  }
};
