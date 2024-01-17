import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [isLengthValid, setIsLengthValid] = useState(false);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasLowercase, setHasLowercase] = useState(false);
    const [hasSymbol, setHasSymbol] = useState(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setErrors({});
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        if (name === "password") {
            validatePassword(value);
        }
    };

    const handleReset = () => {
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
        setIsLengthValid(false);
        setHasUppercase(false);
        setHasLowercase(false);
        setHasSymbol(false);
      };

    const validatePassword = (password) => {
        setIsLengthValid(password.length >= 6 && password.length <= 15);
        setHasUppercase(/[A-Z]/.test(password));
        setHasLowercase(/[a-z]/.test(password));
        setHasSymbol(/[@#$&*!]/.test(password));
    };

    const validateForm = (data) => {
        const errors = {};
        const passwordRegex = /^(?=.*[@#$&*!])(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;

        if (!data) return { isFormFilled: false };

        if (!data.firstName.trim()) {
            errors.firstName = "First name is required";
        }

        if (!data.lastName.trim()) {
            errors.lastName = "Last name is required";
        }

        if (!data.username.trim()) {
            errors.username = "username is required";
        }

        // if (!isUsernameAvailable) {
        //   errors.username = "username is not available";
        // }

        if (!data.password) {
            errors.password = "Password is required";
        } else if (!data.password.match(passwordRegex)) {
            errors.password = "Fulfill all the conditions";
        }

        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsUsernameAvailable(true);
        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length !== 0) return;
        // Form is valid, perform signup logic here
        let usersData = formData;
        console.log(usersData);
        setIsLoading(true);
        setIsUsernameAvailable(true);
        fetch("https://secret-notebook-api.vercel.app/signup", {
            body: JSON.stringify(usersData),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
        }).then((response) => {
            response.json().then((jsonData) => {
                console.log(jsonData);
                if (
                    jsonData.isUsernameAvailable !== undefined &&
                    !jsonData.isUsernameAvailable
                ) {
                    setIsUsernameAvailable(jsonData.isUsernameAvailable);
                    setErrors({ username: "username is not available" });
                } else setErrors(jsonData);

                if (jsonData.token && jsonData.userId) {
                    localStorage.setItem("userId", jsonData.userId);
                    localStorage.setItem("token", jsonData.token);
                    jsonData.refreshToken &&
                        localStorage.setItem("refreshToken", jsonData.refreshToken);
                    navigate("/dashboard");
                }
            });
        });
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <div className="h-fit rounded-xl flex items-center justify-center bg-white dark:bg-black dark:text-white text-black">

            <div className="w-96 mx-auto p-4 bg-white dark:bg-black rounded shadow-xl border-2 border-gray-200 select-none">
                <h2 className="text-xl font-bold mb-4">Signup</h2>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-x-2 md:flex-row">
                        <div className="mb-2 flex-1 text-xs">
                            <label htmlFor="firstName" className="block text-xs font-medium">
                                First Name:
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`dark:bg-gray-800 bg-white w-full px-1 py-1 border rounded-md focus:outline-none focus:ring ${errors.firstName ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                            )}
                        </div>

                        <div className="mb-2 flex-1 text-xs">
                            <label htmlFor="lastName" className="block text-xs font-medium">
                                Last Name:
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`dark:bg-gray-800 bg-white w-full px-1 py-1 border rounded-md focus:outline-none focus:ring ${errors.lastName ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="username" className="block text-xs font-medium">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="dark:bg-gray-800 bg-white w-full px-1 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-xs font-medium">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="dark:bg-gray-800 bg-white w-full px-1 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                        {formData.password && (
                            <div className="mt-2 border-2 border-gray-200 rounded-lg p-2">
                                <ul className="list-none list-inside grid grid-cols-1 md:grid-cols-2">
                                    <li className={`text-xs font-medium`}>
                                        <span
                                            className={`text-md pr-2 font-bold ${isLengthValid ? "text-green-600" : "text-red-500"
                                                }`}
                                        >
                                            &#x2713;
                                        </span>
                                        <span>6 and 15 characters</span>
                                    </li>
                                    <li className={`text-xs font-medium`}>
                                        <span
                                            className={`text-md pr-2 font-bold ${hasUppercase ? "text-green-600" : "text-red-500"
                                                }`}
                                        >
                                            &#x2713;
                                        </span>
                                        <span>one uppercase letter</span>
                                    </li>
                                    <li className={`text-xs font-medium`}>
                                        <span
                                            className={`text-md pr-2 font-bold ${hasLowercase ? "text-green-600" : "text-red-500"
                                                }`}
                                        >
                                            &#x2713;
                                        </span>
                                        <span>one lowercase letter</span>
                                    </li>
                                    <li className={`text-xs font-medium`}>
                                        <span
                                            className={`text-md pr-2 font-bold ${hasSymbol ? "text-green-600" : "text-red-500"
                                                }`}
                                        >
                                            &#x2713;
                                        </span>
                                        <span>one symbol (@, #, &, $, *,!)</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="mb-2 flex-1">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-xs font-medium"
                        >
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`dark:bg-gray-800 bg-white w-full px-1 py-1 border rounded-md focus:outline-none focus:ring ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <div className="flex space-x-4 mt-4 text-xs">
                        <button
                            type="submit"
                            className="flex-1 flex justify-center items-center py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <span>Create Your Account</span>
                            {isLoading && (
                                <img src="/resources/loading.svg" alt="loading" className="w-5 h-5 ml-4" />
                            )}
                        </button>
                        <button
                            type="reset"
                            onClick={handleReset}
                            className="flex-1 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-400"
                        >
                            Reset
                        </button>
                    </div>
                    <p className="mt-2 text-xs">
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
