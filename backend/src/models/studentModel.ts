import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    faceData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FaceData",
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    batch: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", StudentSchema);
