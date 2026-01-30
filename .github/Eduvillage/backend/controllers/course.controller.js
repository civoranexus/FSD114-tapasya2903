const Course = require("../models/course.model");

exports.createCourse = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const user = req.user;

    if (user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can create courses" });
    }

    const course = new Course({
      title,
      description,
      category,
      createdBy: user._id
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to create course" });
  }
};
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("createdBy", "name role")
      .where("createdBy.role")
      .equals("teacher");

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};
