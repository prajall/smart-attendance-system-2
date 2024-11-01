import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const Attendance = mongoose.model("Attendance", AttendanceSchema);
