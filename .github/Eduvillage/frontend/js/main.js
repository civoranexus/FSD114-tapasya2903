/*GLOBAL LOGOUT*/
function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("selectedCourse"); 
  window.location.href = "login.html";
}


/*SIGNUP*/
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

/*LOGIN*/
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

/*STUDENT DASHBOARD*/
function openCourse(courseName) {
  localStorage.setItem("selectedCourse", courseName);
  window.location.href = "studentCourse.html";
}

/*STUDENT COURSE PAGE*/
const courseTitleEl = document.getElementById("courseTitle");

if (courseTitleEl) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "student") {
    window.location.href = "login.html";
    return;
  }

  const selectedCourseTitle = localStorage.getItem("selectedCourse");
  const descEl = document.getElementById("courseDescription");

  if (!selectedCourseTitle) {
    courseTitleEl.textContent = "No course selected";
    descEl.textContent =
      "Please go to dashboard and select a course.";
    return;
  }

  const courses = JSON.parse(localStorage.getItem("courses")) || [];

  const course = courses.find(
    c => c.title === selectedCourseTitle
  );

  if (!course) {
    courseTitleEl.textContent = selectedCourseTitle;
    descEl.textContent = "Course details not found.";
    return;
  }

  courseTitleEl.textContent = course.title;
  descEl.textContent = course.description;
}


/*ADD COURSE*/
const addCourseForm = document.getElementById("addCourseForm");

if (addCourseForm) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "login.html";
  }

  if (user.role !== "teacher") {
    window.location.href = "studentDashboard.html";
  }

  addCourseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("addCourseTitle").value.trim();
    const description = document.getElementById("addCourseDescription").value.trim();
    const category = document.getElementById("courseCategory").value.trim();

    if (!title || !description || !category) {
      alert("All fields are required");
    }

    const courses = JSON.parse(localStorage.getItem("courses")) || [];

    courses.push({
      title,
      description,
      category,
      teacherEmail: user.email
    });

    localStorage.setItem("courses", JSON.stringify(courses));
    alert("Course added successfully");

    window.location.href = "teacherCourse.html";
  });
}

/*TEACHER COURSES*/
const teacherCoursesDiv = document.getElementById("teacherCourses");

if (teacherCoursesDiv) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "teacher") {
    window.location.href = "login.html";
  }

  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  const myCourses = courses.filter(c => c.teacherEmail === user.email);

  teacherCoursesDiv.innerHTML =
    myCourses.length === 0
      ? "<p>No courses created yet.</p>"
      : myCourses.map(course => `
          <div class="card">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <small>${course.category}</small>
          </div>
        `).join("");
}

/*STUDENT DASHBOARD COURSE*/
const studentCoursesDiv = document.getElementById("studentCourses");

if (studentCoursesDiv) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "student") {
    window.location.href = "login.html";
  }

  const courses = JSON.parse(localStorage.getItem("courses")) || [];

  if (courses.length === 0) {
    studentCoursesDiv.innerHTML = "<p>No courses available.</p>";
  } else {
    studentCoursesDiv.innerHTML = "";

    courses.forEach(course => {
      studentCoursesDiv.innerHTML += `
        <div class="card">
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <a class="btn" onclick="openCourse('${course.title}')">
            View Course
          </a>
        </div>
      `;
    });
  }
}


/*EDIT PROFILE*/
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

    window.location.href =
      user.role === "teacher"
        ? "teacherProfile.html"
        : "studentProfile.html";
  });
}

/*PROFILE DISPLAY*/
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  const nameEl = document.getElementById("profileName");
  if (!nameEl) return;

  document.getElementById("profileName").value = user.name;
  document.getElementById("profileEmail").value = user.email;
  document.getElementById("profileRole").value = user.role;
});
