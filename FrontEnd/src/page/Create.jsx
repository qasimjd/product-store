import React, { useState } from 'react';
import { useProductStore } from '../store/product';
import { Link } from 'react-router-dom';

const CreatePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    imgUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    // e.preventDefault();
    const response = await createProduct(formData)
    if (!response.message) {
      return;
    }
    setFormData({
      title: '',
      price: '',
      imgUrl: ''
    });

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black gap-6">
      <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2 ">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">Image URL:</label>
          <input
            type="text"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button onClick={handleAddProduct} className="btn btn-outline">Add Product</button>
        <Link to="/">
          <button className="btn m-2 btn-outline">View Products</button>
        </Link>
      </div>
    </div>
  )
}

export default CreatePage;
