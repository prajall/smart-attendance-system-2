import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courseCode: { type: String, required: true, unique: true },
  description: { type: String },
});

const Course = mongoose.model("Course", CourseSchema);
