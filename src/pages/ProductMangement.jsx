import React, { useState } from 'react';
import axios from '../Auth/axiosConfig';

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        productName: '',
        price: '',
        productDescription: '',
        offeredPrice: '',
        categoryName: '',
    });

    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage(null);
  
      const parsedData = {
          ...formData,
          price: parseFloat(formData.price) || 0, // Convert to number
          offeredPrice: parseFloat(formData.offeredPrice) || 0, // Convert to number
      };
  
      try {
          const response = await axios.post('/api/v1/bookProducts/addProduct', parsedData);
          if (response.data.success) {
              setMessage({ type: 'success', text: response.data.message });
              setFormData({
                  productName: '',
                  price: '',
                  productDescription: '',
                  offeredPrice: '',
                  categoryName: '',
              });
          }
      } catch (error) {
          console.error('Error adding product:', error);
          setMessage({ type: 'error', text: error.response?.data?.message || 'An error occurred' });
      }
  };
  

    return (
        <div className="container mx-auto p-4 pl-0 sm:pl-80">
            <h1 className="text-2xl font-bold mb-4">Add Product</h1>
            {message && (
                <div
                    className={`p-2 mb-4 ${
                        message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                >
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="productName" className="block font-medium">Product Name</label>
                    <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block font-medium">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="productDescription" className="block font-medium">Product Description</label>
                    <textarea
                        name="productDescription"
                        value={formData.productDescription}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="offeredPrice" className="block font-medium">Offered Price</label>
                    <input
                        type="number"
                        name="offeredPrice"
                        value={formData.offeredPrice}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="categoryName" className="block font-medium">Category Name</label>
                    <input
                        type="text"
                        name="categoryName"
                        value={formData.categoryName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;
