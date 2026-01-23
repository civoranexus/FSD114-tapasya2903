document.getElementById("signupBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;
  const message = document.getElementById("message");

  message.textContent = "";
  message.style.color = "red";

  // 1️⃣ Empty field check
  if (!name || !email || !password) {
    message.textContent = "All fields are required.";
    return;
  }

  // 2️⃣ Email lowercase check
  if (email !== email.toLowerCase()) {
    message.textContent = "Email must be in lowercase.";
    return;
  }

  // 3️⃣ Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    message.textContent = "Please enter a valid email address.";
    return;
  }

  // 4️⃣ Password length check
  if (password.length < 6) {
    message.textContent = "Password must be at least 6 characters long.";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    });

    const data = await response.json();

    // 5️⃣ Backend validation (user exists)
    if (!response.ok) {
      message.textContent =
        data.message || "Signup failed. Please try again.";
      return;
    }

    // ✅ Success
   message.style.color = "green";
message.textContent = "Signup successful! Redirecting to login...";

setTimeout(() => {
  window.location.href = "login.html";
}, 1500);

  } catch (error) {
    message.textContent = "Server error. Please try again later.";
  }
});

/*login*/
document.getElementById("loginBtn")?.addEventListener("click", async () => {
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
    const response = await fetch("http://localhost:5000/api/users");
    const users = await response.json();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      message.textContent = "Invalid email or password.";
      return;
    }

    message.style.color = "green";
    message.textContent = "Login successful!";

    localStorage.setItem("user", JSON.stringify(user));

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  } catch (error) {
    message.textContent = "Server error. Please try again.";
  }
});
