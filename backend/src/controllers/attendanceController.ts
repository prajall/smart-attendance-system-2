import express from "express";
import { Student } from "@/models/studentModel";
import { Attendance } from "@/models/attendanceModel";

const router = express.Router();

// POST request to create attendance
router.post("/attendance/create", async (req, res) => {
  const { studentId } = req.body;

  try {
    // Step 1: Find the student by studentId
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Step 2: Get the current date (set time to 00:00 to ensure it's only for today)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset hours to midnight to only focus on the date part

    // Step 3: Check if attendance has already been marked for today
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
      // class: student.class, // Assuming student has class populated
      section: student.section, // Assuming student has section populated
      date: today, // Date attendance was marked (today)
      createdAt: new Date(), // Time attendance was marked
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
});

module.exports = router;
