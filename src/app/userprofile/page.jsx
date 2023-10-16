"use client" 
import {useEffect, useState} from 'react'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast';


function Profile() {
    const [data, setData] = useState({})
    const router = useRouter()
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/users/getuserdata');
                setData(response.data.data);
                console.log("frontend" + data)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    return (

        <div className="w-full max-w-2xl mx-auto p-4">
            <Toaster position="top-right"/>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Profile
                </h1>

                <div>
                    <p className="text-lg font-semibold">
                        USERNAME: {
                        data.username
                    } </p>
                    <p className="text-lg font-semibold">
                        EMAIL: {
                        data.email
                    } </p>
                </div>
                <div>
                    <button type="button"
                        onClick={logout}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300">
                        Logout
                    </button>
                </div>

            </div>
        </div>

    );
}

export default Profile;
