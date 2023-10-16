"use client" 
import {useEffect, useState} from "react";
import axios from 'axios'
const Main = () => {
    const [users, setUsers] = useState([]);

    const handleRoleChange = async (useremail) => {

        try { // Send a request to your API to update the user's role
            const response = await axios.put("/api/admin/changeuserole", {data: {
                    useremail
                }});

            // Assuming your API responds with the updated user data
            const updatedUser = response.data.user;
            console.log(updatedUser)

            // Update the user's role in the client-side data
            const updatedUsers = users.map((user) => {
                if (user.email === updatedUser.email) {
                    return updatedUser;
                }
                return user;
            });

            setUsers(updatedUsers);
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    const handleDelete = async (useremail) => {
        try { // Send a request to your API to delete the user
            await axios.delete("/api/admin/userdelete", {data: {
                    useremail
                }});


            // Remove the deleted user from the client-side data
            const updatedUsers = users.filter((user) => user.email !== useremail);


            setUsers(updatedUsers);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    useEffect(() => { // Fetch user data from the mock API
        axios.get("/api/admin/getuser").then((response) => setUsers(response.data)).catch((error) => console.error("Error fetching user data:", error));
    }, []);


    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-semibold">User Management</h1>
            </div>
            <div className="overflow-x-auto bg-black text-white">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                Index
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                User name
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                User email
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                Admin or not
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                Change role
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                Delete User
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-black text-white">
                        {
                        users.map((user, index) => (
                            <tr key={
                                user.id
                            }>
                                <td className="px-6 py-4 whitespace-no-wrap border border-gray-500">
                                    {
                                    index + 1
                                }</td>
                                <td className="px-6 py-4 whitespace-no-wrap border border-gray-500">
                                    {
                                    user.username
                                }</td>
                                <td className="px-6 py-4 whitespace-no-wrap border border-gray-500">
                                    {
                                    user.email
                                }</td>
                                <td className="px-6 py-4 whitespace-no-wrap border border-gray-500">
                                    {
                                    user.isAdmin ? "Admin" : "User"
                                }</td>
                                <td className="px-6 py-4 whitespace-no-wrap border border-gray-500">
                                    <button onClick={
                                            () => handleRoleChange(user.email)
                                        }
                                        className="bg-blue-500 text-white px-2 py-1 rounded">
                                        Change Role
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border border-gray-500">
                                    <button onClick={
                                            () => handleDelete(user.email)
                                        }
                                        className="bg-blue-500 text-white items-center px-2 py-1 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    } </tbody>
                </table>
            </div>
        </div>
    );
};

export default Main;
