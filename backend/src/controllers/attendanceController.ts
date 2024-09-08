import express, { Request, Response } from "express";
import { Student } from "@/models/studentModel";
import { Attendance } from "@/models/attendanceModel";

// POST request to create
export const newAttendance = async (req: Request, res: Response) => {
  const { studentId } = req.body;

  try {
    // Step 1: Find the student by studentId
    const student = await Student.findOne({ studentId });

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

    // Step 4: Create new attendance record for the student
    const newAttendance = new Attendance({
      student: student._id,
      // class: student.class,
      // section: student.section,
      date: today,
    });

    // Step 5: Save the attendance record
    await newAttendance.save();

    res.status(201).json({
      message: "Attendance successfully marked",
      attendance: newAttendance,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error marking attendance",
      error: error.message,
    });
  }
};
