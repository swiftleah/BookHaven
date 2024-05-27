document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.token);
          alert("Login successful!");
          // Redirect to a protected page or dashboard
        } else {
          console.error("Login error:", data);
          alert(data.msg || "Login failed. Please try again.");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("An error occurred. Please try again.");
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Registration successful!");
          // Optionally redirect to login page
        } else {
          console.error("Registration error:", data);
          alert(data.msg || "Registration failed. Please try again.");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("An error occurred. Please try again.");
      }
    });
  }
});
