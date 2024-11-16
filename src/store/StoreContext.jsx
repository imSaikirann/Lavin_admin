import React, { useState, useEffect } from 'react';
import axios from '';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [allowsInternalPages, setAllowsInternalPages] = useState(false);

  // Fetch categories from the backend
  useEffect(() => {
    axios.get('/api/getCategories')
      .then(response => {
        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          console.log('No categories found');
        }
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // Fetch details of a category by ID
  const fetchCategoryById = (id) => {
    axios.get(`/api/getCategory/${id}`)
      .then(response => {
        if (response.data.success) {
          setSelectedCategory(response.data.data);
        }
      })
      .catch(error => console.error('Error fetching category:', error));
  };

  // Handle form submission to add a new category
  const handleAddCategory = (e) => {
    e.preventDefault();
    axios.post('/api/addProductCategory', {
      category: categoryName,
      allowsInternalPages,
    })
    .then(response => {
      if (response.data.success) {
        setCategories([...categories, response.data.data]);
        setCategoryName('');
        setAllowsInternalPages(false);
        alert('Category added successfully');
      }
    })
    .catch(error => {
      console.error('Error adding category:', error);
      alert('Failed to add category');
    });
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">Product Categories</h1>

      {/* Add Category Form */}
      <form onSubmit={handleAddCategory} className="mb-4">
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="p-2 border rounded-md mb-2 w-full"
          required
        />
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={allowsInternalPages}
            onChange={() => setAllowsInternalPages(!allowsInternalPages)}
            className="mr-2"
          />
          <label>Allow Internal Pages</label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Add Category
        </button>
      </form>

      {/* Categories List */}
      <div className="space-y-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="border p-4 rounded-md">
              <h2 className="text-xl font-semibold">{category.category}</h2>
              <button
                onClick={() => fetchCategoryById(category.id)}
                className="text-blue-500 hover:underline mt-2"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>

      {/* Category Details */}
      {selectedCategory && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Category Details</h2>
          <div className="border p-4 rounded-md mt-4">
            <p><strong>Category Name:</strong> {selectedCategory.category}</p>
            <p><strong>Allows Internal Pages:</strong> {selectedCategory.allowsInternalPages ? 'Yes' : 'No'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
