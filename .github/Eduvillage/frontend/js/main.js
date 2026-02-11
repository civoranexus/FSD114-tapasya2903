/* ======================
   GLOBAL LOGOUT
   ====================== */
function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("selectedCourseId");
  window.location.href = "login.html";
}

/* ======================
   SIGNUP
   ====================== */
const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {
  const params = new URLSearchParams(window.location.search);
  const roleFromHome = params.get("role");

  if (!roleFromHome) {
    window.location.href = "homePage.html";
  } else {
    document.getElementById("role").value = roleFromHome;

    signupBtn.addEventListener("click", async () => {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const role = document.getElementById("role").value;
      const message = document.getElementById("message");

      message.textContent = "";

      if (!name || !email || !password) {
        message.textContent = "All fields are required.";
        return;
      }

      try {
        const res = await fetch("https://eduvillage-3ydb.onrender.com/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role })
        });

        const data = await res.json();

        if (!res.ok) {
          message.textContent = data.message;
          return;
        }

        message.style.color = "green";
        message.textContent = "Signup successful! Redirecting...";

        setTimeout(() => {
          window.location.href = "login.html";
        }, 1200);

      } catch {
        message.textContent = "Server error.";
      }
    });
  }
}

/* ======================
   LOGIN
   ====================== */
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    message.textContent = "";

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        message.textContent = data.message;
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href =
        data.user.role === "teacher"
          ? "teacherDashboard.html"
          : "studentDashboard.html";

    } catch {
      message.textContent = "Server error.";
    }
  });
}

/* ======================
   VIEW COURSE HANDLER
   ====================== */
function viewCourse(courseId) {
  localStorage.setItem("selectedCourseId", courseId);
  window.location.href = "studentCourse.html";
}

/* ======================
   STUDENT DASHBOARD
   ====================== */
const studentCoursesDiv = document.getElementById("studentCourses");

if (studentCoursesDiv) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "student") {
    window.location.href = "login.html";
  } else {
    document.getElementById("studentName").textContent = user.name;

    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    studentCoursesDiv.innerHTML = "";

    if (courses.length === 0) {
      studentCoursesDiv.innerHTML = "<p>No courses available.</p>";
    } else {
      courses.forEach(course => {
        studentCoursesDiv.innerHTML += `
          <div class="card">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <button class="btn" onclick="viewCourse(${course.id})">
              View Course
            </button>
          </div>
        `;
      });
    }
  }
}

/* ======================
   STUDENT COURSE PAGE
   ====================== */
const studentCoursePage = document.getElementById("studentCoursePage");

if (studentCoursePage) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "student") {
    window.location.href = "login.html";
  } else {
    const courseId = localStorage.getItem("selectedCourseId");
    const courses = JSON.parse(localStorage.getItem("courses")) || [];

    const titleEl = document.getElementById("courseTitle");
    const descEl = document.getElementById("courseDescription");

    if (!courseId) {
      titleEl.textContent = "No course selected";
      descEl.textContent = "Please select a course from dashboard.";
    } else {
      const course = courses.find(c => c.id == courseId);

      if (!course) {
        titleEl.textContent = "Course not found";
        descEl.textContent = "This course does not exist.";
      } else {
        titleEl.textContent = course.title;
        descEl.textContent = course.description;
      }
    }
  }
}

/* ======================
   ADD COURSE
   ====================== */
const addCourseForm = document.getElementById("addCourseForm");

if (addCourseForm) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "teacher") {
    window.location.href = "login.html";
  } else {
    addCourseForm.addEventListener("submit", (e) => {
      e.preventDefault();

const title = document.getElementById("addCourseTitle").value.trim();
const description = document.getElementById("addCourseDescription").value.trim();
const category = document.getElementById("courseCategory").value.trim();
const materialsRaw = document.getElementById("courseMaterials").value.trim();

const materials = materialsRaw
  .split("\n")
  .map(line => line.trim())
  .filter(line => line !== "");

      if (!title || !description || !category) return;

      const courses = JSON.parse(localStorage.getItem("courses")) || [];


      localStorage.setItem("courses", JSON.stringify(courses));
      window.location.href = "teacherCourse.html";
    });
  }
}

/* ======================
   TEACHER COURSES
   ====================== */
const teacherCoursesDiv = document.getElementById("teacherCourses");

if (teacherCoursesDiv) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "teacher") {
    window.location.href = "login.html";
  } else {
    const courses = JSON.parse(localStorage.getItem("courses")) || [];

    teacherCoursesDiv.innerHTML =
      courses.length === 0
        ? "<p>No courses created yet.</p>"
        : courses.map(course => `
            <div class="card">
              <h3>${course.title}</h3>
              <p>${course.description}</p>
              <small>${course.category}</small>
            </div>
          `).join("");
  }
}
