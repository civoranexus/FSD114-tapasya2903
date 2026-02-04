const express = require("express");
const router = express.Router();

const courseController = require("../controllers/course.controller");
const verifyToken = require("../middleware/verifyToken");

router.get("/", courseController.getAllCourses);

router.post("/", verifyToken, courseController.createCourse);

router.get("/my-courses", verifyToken, courseController.getMyCourses);

router.delete("/:id", verifyToken, courseController.deleteCourse);

module.exports = router;
