import { useState } from "react";

export function Login() {
  return <div></div>;
}

export function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Save registration data
    const registrationData = {
      fullName: formData.fullName,
      email: formData.email,
      username: formData.username,
      password: formData.password,
    };

    // You can save the registrationData or perform further actions here
    console.log("Registration data:", registrationData);

    // Clear form fields
    setFormData({
      fullName: "",
      email: "",
      username: "",
      password: "",
    });
  };

  return (
    <div className="registration-container">
      <Login />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
