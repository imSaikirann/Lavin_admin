import React, { useState, useEffect } from 'react';
import axios from '../Auth/axiosConfig';

const AddProductForm = () => {
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
          console.log(response.data.data)
        } else {
          setMessage({ type: "error", text: "Failed to fetch categories" });
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setMessage({ type: "error", text: "Error fetching categories" });
      }
    };

    fetchCategories();
  }, []);

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
      price: parseFloat(formData.price) || 0,
      offeredPrice: parseFloat(formData.offeredPrice) || 0,
    };

    try {
      const response = await axios.post("/api/v1/bookProducts/addProduct", parsedData);
      if (response.data.success) {
        setMessage({ type: "success", text: response.data.message });
        setFormData({
          productName: "",
          price: "",
          productDescription: "",
          offeredPrice: "",
          categoryId: "",
        });
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "An error occurred while submitting the product",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 sm:pl-80">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
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
          <label htmlFor="productName" className="block font-medium">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block font-medium">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="productDescription" className="block font-medium">Description</label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="offeredPrice" className="block font-medium">Offered Price</label>
          <input
            type="number"
            id="offeredPrice"
            name="offeredPrice"
            value={formData.offeredPrice}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="categoryId" className="block font-medium">Category</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="" disabled>Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option> 
            ))}
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </div>
  );
};

export default AddProductForm;
