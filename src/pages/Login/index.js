import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
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

    const handleReset = () => {
        setFormData({
            username: "",
            password: ""
        });
        setErrors("");
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
            console.log(formData)
            let response = await fetch("https://secret-notebook-api.vercel.app/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });
            let jsonData = await response.json();
            setIsLoading(false);
            if (jsonData.status === 307) {
                localStorage.setItem("userId", jsonData.userId);
                localStorage.setItem("token", jsonData.token);
                jsonData.refreshToken &&
                    localStorage.setItem("refreshToken", jsonData.refreshToken);
                navigate("/dashboard");
            }
            if (jsonData.errors) setErrors(jsonData.errors);
        }
        // You can add your authentication logic here, like sending the credentials to a server
        // and handling the login process accordingly
    };

    return (
        <div className="h-fit rounded-xl flex items-center justify-center bg-white dark:bg-black dark:text-white text-black select-none">

            <div className="w-96 mx-auto p-4 bg-white dark:bg-black rounded shadow-xl border-2 border-gray-200">
                <h2 className="text-xl font-bold mb-4">Login</h2>

                {
                    errors && <div className="p-2 text-red-400">{errors}</div>
                }
                <form onSubmit={handleSubmit}>
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
                    </div>

                    <div className="flex space-x-4 mt-4 text-xs">
                        <button
                            type="submit"
                            className="flex-1 flex justify-center items-center py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <span>Login</span>
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
                        Don't have a Account?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-500 hover:text-blue-600"
                        >
                            signup here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
