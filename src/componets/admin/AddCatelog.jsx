import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = ({ isOpen, onClose, onAddProduct }) => {
    const [formData, setFormData] = useState({ name: '', description: '', image: null });

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     setFormData({
    //         ...formData,
    //         image: file, // Store the selected image in the formData
    //     });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/admin/catelogadding', formData);

            // Handle success
            if (response.data.message === 'Product added successfully') {
                alert('Catalog added successfully');
                onClose();
            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            if (error.response) {
                console.error('Product add failed:', error.response.data);
                alert(error.response.data);
            } else {
                console.error('Product add failed:', error.message);
                alert('Product add failed. Please try again later.' + error);
            }
        }
    };

    return (
        <div
            className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 overflow-y-auto z-50`}
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center text-black sm:block sm:p-0 sm:items-center">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>

                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                        Add catalog
                                    </h3>
                                    <div className="mt-2">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Catalog Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Description
                                            </label>
                                            <input
                                                type="text"
                                                name="description"
                                                value={formData.description}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, description: e.target.value })
                                                }
                                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                                                required
                                            />
                                        </div>
                                        {/* <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Product Image
                                            </label>
                                            <input
                                                type="file"
                                                name="image"
                                                onChange={handleImageChange}
                                                className="w-full"
                                                accept="image/*"
                                                required
                                            />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Add
                            </button>
                            <button
                                onClick={onClose}
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 sm:mt-0 sm:w-auto sm:text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProductForm;
