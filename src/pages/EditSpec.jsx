import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditProductSpecification = () => {
  const { id } = useParams();

  const [specification, setSpecification] = useState({
    weight: '',
    dimensions: '',
    material: '',
    color: '',
    brand: '',
    manufacturer: '',
    warrantyPeriod: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecification = async () => {
      try {
        const response = await axios.get(`/api/v1/specifications/getProductSpecification/${id}`);
        setSpecification(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching specification');
        setLoading(false);
      }
    };
    fetchSpecification();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpecification((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/specifications/editProductSpecification/${id}`, specification);
      alert('Product specification updated successfully');
    } catch (err) {
      alert('Error updating product specification');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 sm:pl-80">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Product Specification</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={specification.weight || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter weight"
            />
          </div>

          <div>
            <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">Dimensions</label>
            <input
              type="text"
              id="dimensions"
              name="dimensions"
              value={specification.dimensions || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter dimensions"
            />
          </div>

          <div>
            <label htmlFor="material" className="block text-sm font-medium text-gray-700">Material</label>
            <input
              type="text"
              id="material"
              name="material"
              value={specification.material || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter material"
            />
          </div>

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="text"
              id="color"
              name="color"
              value={specification.color || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter color"
            />
          </div>

          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={specification.brand || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter brand"
            />
          </div>

          <div>
            <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700">Manufacturer</label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={specification.manufacturer || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter manufacturer"
            />
          </div>

          <div>
            <label htmlFor="warrantyPeriod" className="block text-sm font-medium text-gray-700">Warranty Period</label>
            <input
              type="text"
              id="warrantyPeriod"
              name="warrantyPeriod"
              value={specification.warrantyPeriod || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter warranty period"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Specification
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductSpecification;
