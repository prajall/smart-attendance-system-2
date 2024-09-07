import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true }, // E.g., BSc Physics, Computer Science
  courseCode: { type: String, required: true, unique: true }, // Unique course code
  description: { type: String },
});

const Course = mongoose.model("Course", CourseSchema);
