import { useState } from "react";
import "./App.css";

function RegisterValidation() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //setting up state variable errors to manage form validation errors
  const [errors, setErrors] = useState({});

  //setting up formStatus to manage form validation errors
  const [formStatus, setFormStatus] = useState({
    usernameValid: false,
    emailValid: false,
    passwordsMatch: false,
    passwordValid: false,
    isSubmitButtonEnabled: false,
  });

  const checkusername = (username) => {
    if (username.length < 5) requirements.push("at least 5 characters");

    return requirements;
  };
  // Validate password
  const checkPassword = (password) => {
    const requirements = [];

    if (password.length < 10) requirements.push("at least 10 characters");
    if (!/[a-z]/.test(password)) requirements.push("1 lowercase letter");
    if (!/[A-Z]/.test(password)) requirements.push("1 uppercase letter");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      requirements.push("1 special character");
    if (!/[0-9]/.test(password)) requirements.push("1 number");

    return requirements;
  };
  // Validation logic moved to a separate function
  const validateForm = (updatedData) => {
    // Check if username has at least 3 characters
    const usernameValid = updatedData.username.length >= 5;
    // Check if email has .com
    const emailValid = /\S+@\S+\.\S+/.test(updatedData.email);
    // Check if birthday is valid
    const birthdayValid = new Date(updatedData.birthday) <= new Date();
    // Check if passwords match after state update
    const passwordsMatch = updatedData.password === updatedData.confirmPassword;
    // Check password validity and get missing requirements
    const passwordRequirements = checkPassword(updatedData.password);
    const passwordValid = passwordRequirements.length === 0;
    // Check if all fields are filled after state update
    const allFieldsFilled = Object.values(updatedData).every((value) =>
      Boolean(value.trim())
    );

    setErrors((prevErrors) => ({
      ...prevErrors,
      username: updatedData.username ? !usernameValid
        ? "Username must be at least 3 characters. Please try again." 
        : null : "Please enter a username.",
      email: updatedData.email
        ? !emailValid
          ? "Email is invalid. Please try again."
          : null : "Please enter an email.",
      birthday: updatedData.birthday
        ? !birthdayValid ? "Please enter a valid birthday." 
        : null: "Please enter a birthday.",
      password: updatedData.password
        ? !passwordValid
          ? `Password must include ${passwordRequirements.join(", ")}`
          : null : "Please enter a password.",
      confirmPassword: !passwordsMatch ? "Passwords does not match! Please try again." : "",
    }));

    setFormStatus({
      usernameValid,
      emailValid,
      birthdayValid,
      passwordsMatch,
      passwordValid,
      isSubmitButtonEnabled:
        allFieldsFilled && passwordsMatch && passwordValid && emailValid,
    });
  };

  //handleChange function is used to update the formData state based on the user input in the form fields
  const handleChange = (event) => {
    //extract the name (input fields) and value (user input) from the event target
    const { name, value } = event.target;
    setFormData((prevData) => {
      const updatedData = {
        //use ... spread operator to optain the existing data in formData and update the specific input field with the new value
        ...prevData,
        [name]: value.trimStart(),
      };
      validateForm(updatedData);
      return updatedData;
    });
  };

  //handleSubmit function is used to validate the form data when the form is submitted
  const handleSubmit = (event) => {
    //Prevent the default form submission behaviour
    //Check each form field for validation errors based on the defined criteria
    event.preventDefault();
    setFormData((prevData) => {
      const updatedData = {
        //use ... spread operator to optain the existing data in formData and update the specific input field with the new value
        ...prevData,
      };
      // Iterate through formData and trim each value
      for (let key in formData) {
        if (formData.hasOwnProperty(key)) {
          formData[key] = formData[key].trim();
        }
      }
      return updatedData;
    });
    alert("Form has been submitted successfully!");
    console.log(formData);

    // Reset the formData state to clear the form fields
    setFormData({
      username: "",
      email: "",
      birthday: "",
      password: "",
      confirmPassword: "",
    });
    setFormStatus({
      usernameValid: false,
      emailValid: false,
      birthdayValid: false,
      passwordsMatch: false,
      passwordValid: false,
      isSubmitButtonEnabled: false,
    });
    // Clear the input fields
    event.target.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Registration Form</h2>
        <h4>Fill up the form below to join as a new member</h4>
        
        <div class="notebox">
          <b>Note:</b>
          <table class="content">
          <p>* is a required field</p>
          <ol>
          <li>Username must contain at least 5 characters.</li>
          <p></p>
          <li>Password must contain: </li>
            <ul>
              <li>at least 10 characters</li>
              <li>at least 1 lowercase alphabet</li>
              <li>at least 1 uppercase alphabet</li>
              <li>at least 1 special character</li>
              <li>at least 1 number</li>
            </ul>
          </ol>
          </table>
        </div>
        
        <br/>

        <label>Username<em>*</em></label>
        <input
          name="username"
          type="text"
          placeholder="Username"
          className={errors.username ? "errors" : null}
          value={formData.username}
          onChange={handleChange}
          required={true}
        />
        {errors.username && <p>{errors.username}</p>}
        <label>Email<em>*</em></label>
        <input
          name="email"
          type="email"
          placeholder="example@gmail.com"
          className={errors.email ? "errors" : null}
          value={formData.email}
          onChange={handleChange}
          required={true}
        />
        {errors.email && <p>{errors.email}</p>}
        <label>Birthday<em>*</em></label>
        <input
          name="birthday"
          type="date"
          className={errors.birthday ? "errors" : null}
          value={formData.birthday}
          onChange={handleChange}
          required={true}
        />
        {errors.birthday && <p>{errors.birthday}</p>}
        <label>Password<em>*</em></label>
        <input
          name="password"
          type="password"
          placeholder="Enter a strong password"
          className={errors.password ? "errors" : null}
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p>{errors.password}</p>}
        <label>Confirm Password<em>*</em></label>
        <input
          name="confirmPassword"
          type="password" id="myPassword"
          placeholder="Confirm your password"
          className={errors.confirmPassword ? "errors" : null}
          value={formData.confirmPassword}
          onChange={handleChange}
          required={true}
        />

        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button
          type="submit"
          disabled={!formStatus.isSubmitButtonEnabled}
          className={formStatus.isSubmitButtonEnabled ? "enabled" : "disabled"}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default RegisterValidation;