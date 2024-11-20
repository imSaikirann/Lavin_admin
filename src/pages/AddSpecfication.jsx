import React, { useState } from "react";
import axios from "../Auth/axiosConfig";
import { useParams } from "react-router-dom";

export default function AddSpecification() {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    weight: "",
    dimensions: "",
    material: "",
    color: "",
    brand: "",
    manufacturer: "",
    warrantyPeriod: "",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await axios.post(
        `/api/v1/specifications/addProductSpecification/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage({ type: "success", text: response.data.message });
      setFormData({
        weight: "",
        dimensions: "",
        material: "",
        color: "",
        brand: "",
        manufacturer: "",
        warrantyPeriod: "",
      });
    } catch (error) {
        console.log(error)
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "An error occurred while submitting the form.",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Add Product Specification</h1>
      {message && (
        <div
          className={`p-2 mb-4 rounded ${
            message.type === "success"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="mb-4" key={key}>
            <label className="block font-medium mb-1" htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
