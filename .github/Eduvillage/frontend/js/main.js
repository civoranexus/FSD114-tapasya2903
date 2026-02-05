const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    const message = document.getElementById("message");

    message.textContent = "";
    message.style.color = "red";


    if (!name || !email || !password) {
      message.textContent = "All fields are required.";
      return;
    }

    if (email !== email.toLowerCase()) {
      message.textContent = "Email must be in lowercase.";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.textContent = "Please enter a valid email address.";
      return;
    }

    if (password.length < 6) {
      message.textContent = "Password must be at least 6 characters long.";
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        message.textContent = data.message || "Signup failed.";
        return;
      }

      message.style.color = "green";
      message.textContent = "Signup successful! Redirecting to login...";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } catch (error) {
      message.textContent = "Server error. Please try again.";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  if (!loginBtn) return;

  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    message.textContent = "";
    message.style.color = "red";

    if (!email || !password) {
      message.textContent = "Email and password are required.";
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        message.textContent = data.message || "Login failed.";
        return;
      }

  
      localStorage.setItem("user", JSON.stringify(data.user));

      message.style.color = "green";
      message.textContent = "Login successful! Redirecting...";

      setTimeout(() => {
        if (data.user.role === "teacher") {
          window.location.href = "teacherDashboard.html";
        } else {
          window.location.href = "studentDashboard.html";
        }
      }, 800);

    } catch (error) {
      message.textContent = "Server error. Please try again.";
    }
  });
});
