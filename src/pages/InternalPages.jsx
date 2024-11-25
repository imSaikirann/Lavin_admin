import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function InternalPages() {
  const { id } = useParams();
  const [internalPages, setInternalPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newPage, setNewPage] = useState({
    pageType: "",
    pageCount: "",
    images: [],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [editingPage, setEditingPage] = useState(null); // To track the page being edited

  // Fetch all internal pages
  const fetchInternalPages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/v1/bookProducts/getInternalPage/${id}`);
      setInternalPages(response.data.data.internalPages || []);
    } catch (error) {
      console.error("Error fetching internal pages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternalPages();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPage({ ...newPage, [name]: value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  // Add a new internal page
  const addInternalPage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pageType", newPage.pageType);
    formData.append("pageCount", newPage.pageCount);
    imageFiles.forEach((file) => formData.append("images", file));

    try {
      await axios.post(`/api/v1/bookProducts/addInternalPage/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Internal page added successfully");
      fetchInternalPages();
      setNewPage({ pageType: "", pageCount: "", images: [] });
      setImageFiles([]);
    } catch (error) {
      console.error("Error adding internal page:", error);
      alert("Failed to add the internal page");
    }
  };

  // Update an internal page
  const updateInternalPage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pageType", newPage.pageType);
    formData.append("pageCount", newPage.pageCount);
    imageFiles.forEach((file) => formData.append("images", file));

    try {
      await axios.put(`/api/v1/bookProducts/editInternalPage/${editingPage.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Internal page updated successfully");
      fetchInternalPages();
      setEditingPage(null);
      setNewPage({ pageType: "", pageCount: "", images: [] });
      setImageFiles([]);
    } catch (error) {
      console.error("Error updating internal page:", error);
      alert("Failed to update the internal page");
    }
  };

  // Delete an internal page
  const deleteInternalPage = async (pageId) => {
    if (!window.confirm("Are you sure you want to delete this internal page?")) return;

    try {
      await axios.delete(`/api/v1/bookProducts/deleteInternalPage/${pageId}`);
      alert("Page deleted successfully");
      fetchInternalPages();
    } catch (error) {
      console.error("Error deleting page:", error);
      alert("Failed to delete the page");
    }
  };

  // Set the page to be edited
  const handleEdit = (page) => {
    setEditingPage(page);
    setNewPage({
      pageType: page.pageType,
      pageCount: page.pageCount,
      images: [],
    });
  };

  return (
    <div className="container mx-auto p-6 sm:pl-80">
      <h1 className="text-3xl font-bold mb-6 text-center">Internal Pages</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {!loading && internalPages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internalPages.map((page) => (
            <div key={page.id} className="border border-gray-200 rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-semibold text-gray-700">Type: {page.pageType}</h2>
              <p className="text-gray-600">Count: {page.pageCount}</p>
              <div className="flex space-x-2 mt-2 overflow-x-auto">
                {page.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Page ${idx + 1}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(page)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteInternalPage(page.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No internal pages found.</p>
      )}

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        {editingPage ? "Edit Internal Page" : "Add New Internal Page"}
      </h2>
      <form
        onSubmit={editingPage ? updateInternalPage : addInternalPage}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Page Type</label>
          <input
            type="text"
            name="pageType"
            value={newPage.pageType}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Page Count</label>
          <input
            type="number"
            name="pageCount"
            value={newPage.pageCount}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {editingPage ? "Update Page" : "Add Page"}
        </button>
      </form>
    </div>
  );
}
