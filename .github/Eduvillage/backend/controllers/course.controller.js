exports.getAllCourses = (req, res) => {
  res.status(200).json([
    {
      title: "HTML Basics",
      description: "Learn HTML from scratch",
      category: "Web Development"
    },
    {
      title: "CSS Fundamentals",
      description: "Master CSS styling",
      category: "Web Development"
    },
    {
      title: "JavaScript",
      description: "Core JavaScript concepts",
      category: "Programming"
    }
  ]);
};
