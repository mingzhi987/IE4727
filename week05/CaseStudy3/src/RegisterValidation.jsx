import { useState } from "react";
import "./App.css";

function RegisterValidation() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    birthday: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });

  //setting up state variable errors to manage form validation errors
  const [errors, setErrors] = useState({});

  //setting up formStatus to manage form validation errors
  const [formStatus, setFormStatus] = useState({
    usernameValid: false,
    emailValid: false,
    birthdayValid: false,
    phonenumberValid: false,
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
  //Validate phone number
  const checkPhonenumber = (phonenumber) => {
    const requirements = [];

    if (phonenumber.length === 8) requirements.push("8 numbers");
    if (/[a-z]/.test(password)) requirements.push("no letters");
    if (/[A-Z]/.test(password)) requirements.push("no letters");
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password))
      requirements.push("no special character");
    if (!/[0-9]/.test(password)) requirements.push("at least 1 number");

    return requirements;
  };

  // Validation logic moved to a separate function
  const validateForm = (updatedData) => {
    const usernameValid = updatedData.username.length >= 10;
    const emailValid = /@(?=[\w]).*\.(?=[\w])/.test(updatedData.email);
    const birthdayValid = new Date(updatedData.birthday) <= new Date();
    const phonenumberValid = updatedData.phonenumber.length === 8;
    const passwordsMatch = updatedData.password === updatedData.confirmPassword;
    const passwordRequirements = checkPassword(updatedData.password);
    const passwordValid = passwordRequirements.length === 0;
    const allFieldsFilled = Object.values(updatedData).every((value) =>
      Boolean(value.trim())
    );

    setErrors((prevErrors) => ({
      ...prevErrors,
      username: updatedData.username ? !usernameValid
        ? "Username must be at least 10 characters. Please try again." 
        : null : "Please enter a username.",
      email: updatedData.email
        ? !emailValid
          ? "Email is invalid. Please try again."
          : null : "Please enter an email.",
      birthday: updatedData.birthday
        ? !birthdayValid ? "Please enter a valid birthday." 
        : null: "Please enter a birthday.",
      phonenumber: updatedData.phonenumber
        ? !phonenumberValid ? "Please enter a valid phone number."
        : null: "Please enter a phone number.",
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
      phonenumberValid,
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
      phonenumber: "",
      password: "",
      confirmPassword: "",
    });
    setFormStatus({
      usernameValid: false,
      emailValid: false,
      birthdayValid: false,
      phonenumberValid: false,
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
        <label>Phone Number<em>*</em></label>
        <input
          name="phonenumber"
          type="tel"
          placeholder="89237293"
          className={errors.phonenumber ? "errors" : null}
          value={formData.phonenumber}
          onChange={handleChange}
          required={true}
        />
        {errors.phonenumber && <p>{errors.phonenumber}</p>}
        <label>Password<em>*</em></label>
        <input
          name="password"
          type="password"
          placeholder="**********"
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
          placeholder="**********"
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