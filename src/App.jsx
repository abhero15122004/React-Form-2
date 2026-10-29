import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [submitted, setSubmitted] = useState(false);

  // Validation rules
  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());

  const isPasswordValid = formData.password.length >= 8;

  const isConfirmPasswordValid =
    formData.confirmPassword !== "" &&
    formData.confirmPassword === formData.password;

  // Error messages
  const errors = {
    email: !formData.email.trim()
      ? "Email is required."
      : !isEmailValid
        ? "Please enter a valid email address."
        : "",

    password: !formData.password
      ? "Password is required."
      : !isPasswordValid
        ? "Password must be at least 8 characters long."
        : "",

    confirmPassword: !formData.confirmPassword
      ? "Please confirm your password."
      : !isConfirmPasswordValid
        ? "Passwords do not match."
        : "",
  };

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleBlur(event) {
    const { name } = event.target;

    setTouched((previousTouched) => ({
      ...previousTouched,
      [name]: true,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);

    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
    });

    const formIsValid =
      formData.email.trim() !== "" &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid;

    if (formIsValid) {
      alert("Form submitted successfully");
    } else {
      alert("Can't submit the form");
    }
  }

  function getInputClass(fieldName, isValid) {
    if (!touched[fieldName] && !submitted) {
      return "form-input";
    }

    return `form-input ${isValid ? "valid" : "invalid"}`;
  }

  return (
    <main className="signup-page">
      <section className="signup-card">
        <div className="signup-header">
          <div className="signup-icon" aria-hidden="true">
            ✦
          </div>

          <h1>Create Account</h1>
          <p>Sign up to get started with your account.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass(
                "email",
                formData.email.trim() !== "" && isEmailValid
              )}
              aria-invalid={
                (touched.email || submitted) &&
                errors.email !== ""
              }
              aria-describedby="email-error"
              autoComplete="email"
            />

            {(touched.email || submitted) && errors.email && (
              <p className="error-message" id="email-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass(
                "password",
                isPasswordValid && formData.password !== ""
              )}
              aria-invalid={
                (touched.password || submitted) &&
                errors.password !== ""
              }
              aria-describedby="password-error"
              autoComplete="new-password"
            />

            {(touched.password || submitted) && errors.password && (
              <p
                className="error-message"
                id="password-error"
                role="alert"
              >
                {errors.password}
              </p>
            )}

            <small className="input-hint">
              Use at least 8 characters.
            </small>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass(
                "confirmPassword",
                isConfirmPasswordValid
              )}
              aria-invalid={
                (touched.confirmPassword || submitted) &&
                errors.confirmPassword !== ""
              }
              aria-describedby="confirm-password-error"
              autoComplete="new-password"
            />

            {(touched.confirmPassword || submitted) &&
              errors.confirmPassword && (
                <p
                  className="error-message"
                  id="confirm-password-error"
                  role="alert"
                >
                  {errors.confirmPassword}
                </p>
              )}
          </div>

          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>

        <p className="signup-footer">
          Already have an account? <span>Sign in</span>
        </p>
      </section>
    </main>
  );
}

export default App;