import { useState } from "react";
import loginImg from '../assets/login-image.png'; // Path relative to your file

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

const loginUser = async () => {
  setMessage(""); // clear old message

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    setMessage("Email and password are required");
    return;
  }

  if (!emailRegex.test(email)) {
    setMessage("Please enter a valid email address");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      // 👇 Handles 401 responses from backend
      setMessage(data.message || "Login failed");
      return;
    }

    // ✅ Success case
    localStorage.setItem("user", JSON.stringify(data.user));
    setMessage("Login successful");

    console.log("Logged in user:", data.user);


    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 500);

  } catch (error) {
    console.error("Login error:", error);
    setMessage("Server error. Please try again later.");
  }
};
  return (
    <div style={styles.container}>
      {/* LEFT SIDE */}
      <div style={styles.left}>
        <h1>Welcome Back!</h1>
        <p>Login to access your dashboard</p>
<img src={loginImg} alt="login" style={styles.image} />      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2>Login</h2>

          {message && (
            <p style={{ color: message.includes("success") ? "green" : "red" }}>
              {message}
            </p>
          )}

          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              style={styles.eye}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <button style={styles.button} onClick={loginUser}>
            Login
          </button>

          <p style={styles.forgot}>Forgot Password?</p>
        </div>
      </div>
    </div>
  );
}

/* INLINE STYLES */
const styles = {
  container: { display: "flex", height: "100vh",    width: "100%",   // added this line
 },
  left: {
    flex: 1,
    background: "#1D4ED8",
    color: "#fff",
    textAlign: "center",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  image: { width: "80%", maxWidth: "300px", margin: "auto" },
  right: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center" },
  card: {
    width: "400px",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#1D4ED8",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  eye: {
    position: "absolute",
    right: "12px",
    top: "14px",
    cursor: "pointer",
  },
  forgot: { marginTop: "10px", color: "#1D4ED8", cursor: "pointer" },
};
