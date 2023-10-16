"use client"
import Link from 'next/link';
import React from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Define the SignupForm component
function SignupForm() {
    // Define state variables to store form data, errors, and success message
    const [formData, setFormData] = React.useState({ username: "", email: "", password: "", confirmPassword: "" });
    const router = useRouter(); // Next.js router for navigation
    const [errors, setErrors] = React.useState({});
    const [successMessage, setSuccessMessage] = React.useState("");

    // Handle input changes and update form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to the server with the form data
            const response = await axios.post('/api/users/signup', formData);

            // Check if the registration was successful
            if (response.data.message === "User created successfully") {
                // Set a success message and display a toast notification
                setSuccessMessage('User registered successfully');
                setTimeout(() => {
                // Redirect to the login page
                router.push("/login");

                }, 1000);
                //tostify 
                toast.success('User registered successfully');
            }
            if(response.data.message==="User already exists"){

                toast.error('User already exists');
            }

            // Clear the form data
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

        } catch (error) {
            // Handle errors (you may want to display an error message)
            console.log(error);
        }
    };

    // Render the SignupForm component
    return (
        <>
            {/* Create a toast notification container */}
            <Toaster position="top-right"/>

            {/* Signup form */}
            <section className="text-white min-h-screen flex flex-col items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                            Create an Account
                        </h1>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* Display errors if any */}
                            {errors.general && (
                                <div className="text-red-500 text-sm">
                                    {errors.general}
                                </div>
                            )}

                            {/* Display success or error message */}
                            {successMessage === "User Already exist" ? (
                                <div className="text-red-800 text-sm">
                                    {successMessage}
                                </div>
                            ) : (
                                <div className="text-green-500 text-sm">
                                    {successMessage}
                                </div>
                            )}

                            {/* User Name input field */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Your User Name
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="name"
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Email input field */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Password input field */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Confirm Password input field */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirm-password"
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-primary-900 focus:ring-4 focus:outline-none focus:ring-primary-300 text-white font-semibold rounded-lg text-sm py-3"
                            >
                                Create an Account
                            </button>

                            {/* Link to the login page */}
                            <p className="text-sm font-light mt-3">
                                Already have an account?{" "}
                                <Link href="/login" className="font-semibold text-primary-600 hover:underline">
                                    Log in here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

// Export the SignupForm component
export default SignupForm;
