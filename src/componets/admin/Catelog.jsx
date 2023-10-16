"use client" 
import React, { useState, useEffect } from 'react';
import AddProductForm from './AddCatelog';
import axios from 'axios';

const Catelog = () => {
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [data, setData] = useState([]);

    const toggleAddForm = () => {
        setIsAddFormVisible(!isAddFormVisible);
        // Reset the item being edited when showing the Add form
    };

    const handleCloseForm = () => {
        setIsAddFormVisible(false);
    };

    const handleRemoveFromCatelog = async (itemId) => {
        try {
            const response = await axios.delete('/api/admin/catelogdelete', {
                data: { itemId }
            });

            if (response.data.message === "Product deleted successfully") {
                // Remove the deleted product from the state
                setData((prevData) => prevData.filter((item) => item._id !== itemId));
            }
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/admin/cateloglist');
                setData(response.data.data);
            } catch (error) {
                console.log("Error in frontend catelog viewing: " + error);
            }
        };

        fetchData();
    }, [data]);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-semibold">Product Management</h1>
                <button
                    onClick={toggleAddForm}
                    className="bg-blue-600 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded focus-outline-none focus-ring focus-ring-blue-300"
                >
                    Add Catelog
                </button>
            </div>
            <ul className="space-y-2 text-white">
                {data.map((item, index) => (
                    <li key={item._id} className="border p-3 rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                className="w-48 h-48 rounded-full mr-4"
                                src="https://media.istockphoto.com/id/1272753738/vector/magazine-flat-line-icon-vector-outline-illustration-of-news-brochure-catalog-page-latest.jpg?s=612x612&w=0&k=20&c=vtLU06ppaCFi5YUBGabENgdPcsWLzk3_p2tXMIV8y6Q="
                                alt={item.name}
                            />
                            <div>
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p className="text-gray-400">{item.description}</p>
                            </div>
                        </div>
                        <div>
                            <button
                                className="text-red-500 hover-text-red-600 mr-4"
                                onClick={() => handleRemoveFromCatelog(item._id)}
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {isAddFormVisible && (
                <AddProductForm isOpen={isAddFormVisible} onClose={handleCloseForm} />
            )}
        </div>
    );
};

export default Catelog;
