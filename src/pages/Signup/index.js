import { Link } from "react-router-dom";
import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setErrors("");
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    setIsLengthValid(password.length >= 6 && password.length <= 15);
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasSymbol(/[@#$&*!]/.test(password));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace the following lines with actual login logic and authentication handling
    validatePassword(formData.password);
    if (!isLengthValid && !hasLowercase && !hasUppercase && !hasSymbol) {
      setErrors("Incorrect username or password ");
      console.log("incorrect Password");
    }
    if (errors === "" && formData.username.trim() !== "") {
      setIsLoading(true);
      let response = await fetch("./api/auth/login", {
        body: JSON.stringify(formData),
        method: "POST",
      });
      let jsonData = await response.json();
      setIsLoading(false);
      if (jsonData.errors) setErrors(jsonData.errors);
    }
    // You can add your authentication logic here, like sending the credentials to a server
    // and handling the login process accordingly
  };

  return (
    <div className="h-fit rounded-xl flex items-center justify-center bg-white dark:bg-black dark:text-white text-black">

      <div className="w-96 mx-auto p-4 bg-white dark:bg-black rounded shadow-xl border-2 border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>

        {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="dark:bg-gray-800 bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="dark:bg-gray-800 bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="flex justify-center items-center w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Create you Account
            {isLoading && (
              <>
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 ml-4 border-4 border-blue-500 border-r-white rounded-full animate-spin"></div>
                </div>
              </>
            )}
          </button>
          <p className="mt-2">
            Already have a Account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-600"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
