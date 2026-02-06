/* ======================
   GLOBAL LOGOUT
   ====================== */
function logout() {
  localStorage.clear();
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
  }

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
      const res = await fetch("http://localhost:5000/api/users/register", {
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
   STUDENT DASHBOARD
   ====================== */
function openCourse(courseName) {
  localStorage.setItem("selectedCourse", courseName);
  window.location.href = "studentCourse.html";
}

/* ======================
   STUDENT COURSE PAGE
   ====================== */
const courseTitle = document.getElementById("courseTitle");

if (courseTitle) {
  const user = JSON.parse(localStorage.getItem("user"));
  const course = localStorage.getItem("selectedCourse");
  const desc = document.getElementById("courseDescription");

  if (!user || user.role !== "student") {
    window.location.href = "login.html";
  }

  if (!course) {
    courseTitle.textContent = "No course selected";
    desc.textContent =
      "Please go to dashboard and select a course.";
  } else {
    const descriptions = {
      "Web Development Basics": "HTML, CSS and basic layouts.",
      "JavaScript Fundamentals": "JS syntax, DOM and logic.",
      "Backend with Node.js": "Node, Express and APIs."
    };

    courseTitle.textContent = course;
    desc.textContent = descriptions[course] || "Course details coming soon.";
  }
}

/* ======================
   ADD COURSE (TEACHER)
   ====================== */
const addCourseForm = document.getElementById("addCourseForm");

if (addCourseForm) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "teacher") {
    window.location.href = "login.html";
  }

  addCourseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Course created successfully (demo)");
    addCourseForm.reset();
  });
}

/* ======================
   EDIT PROFILE
   ====================== */
const editProfileForm = document.getElementById("editProfileForm");

if (editProfileForm) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "login.html";
  }

  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("role").value = user.role;

  editProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    user.name = document.getElementById("name").value.trim();
    user.email = document.getElementById("email").value.trim();

    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated");

    window.location.href =
      user.role === "teacher"
        ? "teacherProfile.html"
        : "studentProfile.html";
  });
}
