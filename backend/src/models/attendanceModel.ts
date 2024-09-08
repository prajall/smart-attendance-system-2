import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    // class: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Class",
    //   required: true,
    // },
    // section: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Section",
    //   required: true,
    // },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Attendance = mongoose.model("Attendance", AttendanceSchema);
