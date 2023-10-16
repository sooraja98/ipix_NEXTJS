"use client" 
import Link from 'next/link';
import React from 'react'
import axios from 'axios'
import {Toaster, toast} from 'react-hot-toast'
import {useRouter} from 'next/navigation'

const LoginPage = () => {
    const [errors, setErrors] = React.useState({});
    const router = useRouter()
    const [successMessage, setSuccessMessage] = React.useState("");
    const [formData, setFormData] = React.useState({email: "", password: ""});

    //reading the data

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //login logic
    const handleOnsubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', formData)
            if (response.data.message === "User not found") {
                toast.error("User not found")
            } else if (response.data.message === "Incorrect password") {
                toast.error("Incorrect password")
            } else if (response.data.message === "Login successful") {
                setTimeout(() => {
                    router.push('/userprofile')
                }, 1000)
                toast.success("Login successful")
            }
        } catch (error) {
            console.log(error)
            toast.error(error)
        }

    }


    return (
        <>
            <Toaster position="top-right"/>
            <section className="text-white min-h-screen flex flex-col items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                            Log In
                        </h1>
                        <form className="space-y-4"
                            onSubmit={handleOnsubmit}>
                            {
                            errors.general && (
                                <div className="text-red-500 text-sm">
                                    {
                                    errors.general
                                }</div>
                            )
                        }
                            {
                            successMessage && (
                                <div className="text-green-500 text-sm">
                                    {successMessage}</div>
                            )
                        }
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Your Email
                                </label>
                                <input type="email" name="email" id="email" className="w-full px-4 py-3 border rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"
                                    value={
                                        formData.email
                                    }
                                    onChange={handleChange}
                                    required/>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Password
                                </label>
                                <input type="password" name="password" id="password" className="w-full px-4 py-3 border rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••"
                                    value={
                                        formData.password
                                    }
                                    onChange={handleChange}
                                    required/>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 hoverbg-primary-900 focus:ring-4 focus:outline-none focus:ring-primary-300 text-white font-semibold rounded-lg text-sm py-3">
                                Log In
                            </button>

                            <p className="text-sm font-light mt-3">
                                Dont have an account?{' '}
                                <Link href="/register" className="font-semibold text-primary-600 hover:underline">
                                    Register here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}


export default LoginPage
