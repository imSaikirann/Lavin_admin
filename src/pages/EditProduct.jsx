import React, { useState, useEffect } from 'react';
import axios from '../Auth/axiosConfig';
import { useParams, useNavigate } from "react-router-dom";

const EditProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productName: "",
        price: "",
        productDescription: "",
        offeredPrice: "",
        categoryId: "",
    });
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("/api/v1/productCategory/getCategories");
                if (response.data.success) {
                    setCategories(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`/api/v1/bookProducts/getProduct/${id}`);
                if (response.data.success) {
                    setFormData(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchCategories();
        fetchProductDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const parsedData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        offeredPrice: parseFloat(formData.offeredPrice) || 0,
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/v1/bookProducts/editProduct/${id}`,  parsedData);
            if (response.data.success) {
                setMessage({ type: "success", text: "Product updated successfully!" });
                navigate("/products");
            }
        } catch (error) {
            setMessage({ type: "error", text: "Failed to update product." });
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="container mx-auto p-4 sm:pl-80">
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            {message && (
                <div
                    className={`p-2 mb-4 ${
                        message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                >
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Product Name</label>
                    <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="productDescription"
                        value={formData.productDescription}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Offered Price</label>
                    <input
                        type="number"
                        name="offeredPrice"
                        value={formData.offeredPrice}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Category</label>
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default EditProductForm;
