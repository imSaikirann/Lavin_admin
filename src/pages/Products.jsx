import React, { useEffect, useState } from 'react';
import axios from '../Auth/axiosConfig';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);

    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
    const [isEditVariantModalOpen, setIsEditVariantModalOpen] = useState(false);

    const [editProductData, setEditProductData] = useState({
        productName: '',
        price: '',
        productDescription: '',
        offeredPrice: '',
        categoryId: '',
        categoryName: '',
        images: [],
    });

    const [editVariantData, setEditVariantData] = useState({
        color: '',
        stock: '',
        price: '',
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/v1/bookProducts/getProducts');
                setProducts(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Handle product edit click
    const handleEditProductClick = (product) => {
        setSelectedProduct(product);
        setEditProductData({
            productName: product.productName,
            price: product.price,
            productDescription: product.productDescription,
            offeredPrice: product.offeredPrice || '',
            categoryId: product.categoryId || '',
            categoryName: product.categoryName || '',
            images: [],
        });
        setIsEditProductModalOpen(true);
    };

    // Handle variant edit click
    const handleEditVariantClick = (product, variant) => {
        setSelectedProduct(product);
        setSelectedVariant(variant);
        setEditVariantData({
            color: variant.color,
            stock: variant.stock,
            price: variant.price,
        });
        setIsEditVariantModalOpen(true);
    };

    // Handle input change for product edit form
    const handleProductFormChange = (e) => {
        const { name, value } = e.target;
        setEditProductData({ ...editProductData, [name]: value });
    };

    // Handle input change for variant edit form
    const handleVariantFormChange = (e) => {
        const { name, value } = e.target;
        setEditVariantData({ ...editVariantData, [name]: value });
    };

    // Handle product edit form submission
    const handleProductFormSubmit = async () => {
        try {
            const formData = new FormData();
            Object.keys(editProductData).forEach((key) => {
                if (key === 'images') {
                    editProductData.images.forEach((file) => formData.append('files', file));
                } else {
                    formData.append(key, editProductData[key]);
                }
            });

            const response = await axios.put(
                `/api/v1/bookProducts/editProduct/${selectedProduct.id}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            if (response.data.success) {
                const updatedProduct = response.data.data;
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === updatedProduct.id ? updatedProduct : product
                    )
                );
                setIsEditProductModalOpen(false);
            }
        } catch (err) {
            console.error('Error updating product:', err.message);
        }
    };

    // Handle variant edit form submission
    const handleVariantFormSubmit = async () => {
        try {
            const response = await axios.put(
                `/api/v1/bookProducts/editVariant/${selectedVariant.id}`,
                editVariantData
            );

            if (response.data.success) {
                const updatedVariant = response.data.data;
                setProducts((prevProducts) =>
                    prevProducts.map((product) => {
                        if (product.id === selectedProduct.id) {
                            return {
                                ...product,
                                variants: product.variants.map((variant) =>
                                    variant.id === updatedVariant.id ? updatedVariant : variant
                                ),
                            };
                        }
                        return product;
                    })
                );
                setIsEditVariantModalOpen(false);
            }
        } catch (err) {
            console.error('Error updating variant:', err.message);
        }
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setEditProductData({ ...editProductData, images: files });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4 sm:pl-80 font-poppins">
            <h1 className="text-2xl font-bold mb-6">Products</h1>
            {products.length === 0 ? (
                <div>No products found.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition duration-300"
                        >
                            <img
                                src={product.images[0]}
                                alt={product.productName}
                                className="w-full h-64 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
                            <p className="text-gray-700 mb-4">{product.productDescription}</p>
                            <div className="text-lg font-bold mb-2">Price: ${product.price}</div>
                            {product.offeredPrice && (
                                <div className="text-lg font-bold text-red-500 mb-2">
                                    Offer Price: ${product.offeredPrice}
                                </div>
                            )}
                            <div className="mt-4">
                                <h3 className="text-lg font-medium mb-2">Available Variants:</h3>
                                {product.variants?.length > 0 ? (
                                    <table className="table-auto w-full">
                                        <thead>
                                            <tr className="bg-gray-200 text-left">
                                                <th className="p-2">Color</th>
                                                <th className="p-2">Stock</th>
                                                <th className="p-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.variants.map((variant) => (
                                                <tr key={variant.id} className="border-b">
                                                    <td className="p-2">{variant.color}</td>
                                                    <td
                                                        className={`p-2 ${
                                                            variant.stock > 0
                                                                ? 'text-gray-800'
                                                                : 'text-red-500'
                                                        }`}
                                                    >
                                                        {variant.stock > 0
                                                            ? `In Stock (${variant.stock})`
                                                            : 'Out of Stock'}
                                                    </td>
                                                    <td className="p-2">
                                                        <button
                                                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                                                            onClick={() =>
                                                                handleEditVariantClick(
                                                                    product,
                                                                    variant
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-gray-500">No variants available.</p>
                                )}
                            </div>
                            <div className="mt-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleEditProductClick(product)}
                                >
                                    Edit Product
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Product Modal */}
            {isEditProductModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div
                        className="bg-white p-6 rounded-lg max-w-lg w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
                        <input
                            type="text"
                            name="productName"
                            value={editProductData.productName}
                            onChange={handleProductFormChange}
                            placeholder="Product Name"
                            className="w-full mb-4 p-2 border rounded-md"
                        />
                        <input
                            type="number"
                            name="price"
                            value={editProductData.price}
                            onChange={handleProductFormChange}
                            placeholder="Price"
                            className="w-full mb-4 p-2 border rounded-md"
                        />
                        <textarea
                            name="productDescription"
                            value={editProductData.productDescription}
                            onChange={handleProductFormChange}
                            placeholder="Description"
                            className="w-full mb-4 p-2 border rounded-md h-24"
                        ></textarea>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="mb-4"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setIsEditProductModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleProductFormSubmit}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Variant Modal */}
            {isEditVariantModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div
                        className="bg-white p-6 rounded-lg max-w-lg w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-4">Edit Variant</h2>
                        <input
                            type="text"
                            name="color"
                            value={editVariantData.color}
                            onChange={handleVariantFormChange}
                            placeholder="Color"
                            className="w-full mb-4 p-2 border rounded-md"
                        />
                        <input
                            type="number"
                            name="stock"
                            value={editVariantData.stock}
                            onChange={handleVariantFormChange}
                            placeholder="Stock"
                            className="w-full mb-4 p-2 border rounded-md"
                        />
                        <input
                            type="number"
                            name="price"
                            value={editVariantData.price}
                            onChange={handleVariantFormChange}
                            placeholder="Price"
                            className="w-full mb-4 p-2 border rounded-md"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setIsEditVariantModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleVariantFormSubmit}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
