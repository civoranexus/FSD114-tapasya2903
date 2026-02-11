const Course = require("../models/course.model");
const mongoose = require("mongoose");

exports.createCourse = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can create courses" });
    }

    const { title, description, category } = req.body;

    const course = await Course.create({
      title,
      description,
      category,
      createdBy: new mongoose.Types.ObjectId(req.user.id)
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("CREATE COURSE ERROR:", error);
    res.status(500).json({ message: "Failed to create course" });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("createdBy", "name role");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};
exports.getMyCourses = async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied" });
    }

    const courses = await Course.find({ createdBy: req.user.id });
    res.status(200).json(courses);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch teacher courses" });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await course.deleteOne();
    res.status(200).json({ message: "Course deleted" });

  } catch (error) {
    res.status(500).json({ message: "Failed to delete course" });
  }
};
