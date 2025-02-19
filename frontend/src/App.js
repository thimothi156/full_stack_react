import { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user_data, setUserData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const storeInputFields = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const passwordValidation = () => {
    let my_hash = {
      email: "",
      password: "",
      password_confirmation: "",
    };

    if (
      user_data.email === "" ||
      user_data.password === "" ||
      user_data.password_confirmation === ""
    ) {
      if (user_data.email === "") {
        my_hash.email = "Email is required";
      }

      if (user_data.password === "") {
        my_hash.password = "Password is required";
      }

      if (user_data.password_confirmation === "") {
        my_hash.password_confirmation = "Password confirmation is required";
      }

      setErrors(my_hash);
    } else {
      console.log("well");
      const apiUrl = "http://127.0.0.1:4000/sign_up"; // Sample API
      const postData = { user: user_data };

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tells the server you're sending JSON data
        },
        body: JSON.stringify(postData), // Convert JavaScript object to JSON
      })
        .then((response) =>{
          if (response.status ==200){
            toast.success("Signup successful! 🎉");
          } else {
            toast.error("Something went wrong. Please try again.");
          }
    }) // Parse response JSON
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Network error. Please try again.");
        });
    }
  };

  return (
    <div id="parent">
      <div>
        <p>Email</p>
        <input
          type="text"
          name="email"
          value={user_data.email}
          placeholder="Enter your email"
          onChange={storeInputFields}
        />
        <p id="error">{errors.email}</p>
      </div>
      <div>
        <p>Password</p>
        <input
          type="password"
          name="password"
          value={user_data.password}
          placeholder="Enter your password"
          onChange={storeInputFields}
        />
        <p id="error">{errors.password}</p>
      </div>
      <div>
        <p>Password Confirmation</p>
        <input
          type="password"
          name="password_confirmation"
          value={user_data.password_confirmation}
          placeholder="Enter your password confirmation"
          onChange={storeInputFields}
        />
        <p id="error">{errors.password_confirmation}</p>
      </div>
      <button onClick={passwordValidation}>Sign up</button>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
