import React, { useEffect, useState } from "react";
import axios from "../Auth/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/v1/bookProducts/deleteProduct/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err.message);
      alert("Failed to delete the product. Please try again.");
    }
  };

  const handleNavigation = (id, path) => {
    navigate(`/${path}/${id}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/v1/bookProducts/getProducts");
        setProducts(response.data.data);
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6  bg-gray-100 min-h-screen sm:pl-80">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Product Details</h1>
      {products.length === 0 ? (
        <div className="text-center text-gray-600">No products available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, productIndex) => (
            <div
              key={productIndex}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
             
              {/* Product Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.productName}
                  </h2>
                  <p className="text-gray-600 mb-4">{product.productDescription}</p>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-lg font-semibold text-gray-800">
                      Price: ${product.price}
                    </span>
                    {product.offeredPrice && (
                      <span className="text-lg font-semibold text-red-500">
                        Offer Price: ${product.offeredPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
                    onClick={() => handleNavigation(product.id, "editProduct")}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
                    onClick={() => handleNavigation(product.id, "specifications")}
                  >
                    Specifications
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded w-full"
                    onClick={() => handleNavigation(product.id, "reviews")}
                  >
                    Reviews
                  </button>
                  <button
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded w-full"
                    onClick={() => handleNavigation(product.id, "internalPages")}
                  >
                    Internal Pages
                  </button>
                  <button
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded w-full"
                    onClick={() => handleNavigation(product.id, "variants")}
                  >
                    Variants
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
