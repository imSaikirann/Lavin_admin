import React, { useEffect, useState } from 'react';
import axios from '../Auth/axiosConfig';
import { useContext } from 'react';
import { AppContext } from '../store/StoreContext'
import {useNavigate} from 'react-router-dom'

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { removeReview, handleSaveSpecification, handleDeleteVariant, handleAddVariant, handleCancel, newVariant, setNewVariant, setNewVariantFiles ,handleAddSpecification} = useContext(AppContext)
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState({});
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate()

    const handleTabChange = (index, tab) => {
        setActiveTab((prev) => ({ ...prev, [index]: tab }));
    };


    const [editingVariantId, setEditingVariantId] = useState(null);
    const [editedVariant, setEditedVariant] = useState({ color: "", size: "", stock: "" });
    const [isAddVariantModalOpen, setIsAddVariantModalOpen] = useState(false);




    const handleEditClick = (variant) => {
        setEditingVariantId(variant.id);
        setEditedVariant({ ...variant }); 
    };
    const handleCancelEdit = () => {
        setEditingVariantId(null);
        setEditedVariant({ color: "", size: "", stock: "" }); 
    };
 
    const [editProductData, setEditProductData] = useState({
        productName: '',
        price: '',
        productDescription: '',
        offeredPrice: '',
        categoryId: '',
        categoryName: '',
        images: [],
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

   
 


  
 


    const handleDeleteProduct = async (id) => {
        console.log(id)
        try {
            const response = await axios.delete(`/api/v1/bookProducts/deleteProduct/${id}`,

            );
        } catch (error) {
            console.log(error)
        }
    }

   
    const handleSubmitSpecification = (id) => {
        navigate(`/product/addSpecification/${id}`); // Redirect to AddSpecification with product ID
      }
      
      const handleSubmitEditSpecification = (id) => {
        navigate(`/product/editSpecification/${id}`); 
      }
      


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

   
    return (

        <div className="container mx-auto p-4 sm:pl-80 font-poppins">
            <h1 className="text-3xl font-bold mb-8">Product Details</h1>
            {products.map((product, productIndex) => (
                <div key={productIndex} className="bg-white rounded-lg shadow-lg mb-8">
                    <div className='flex flex-row justify-between items-center p-4'>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800">
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
                        <div>
                            <button className='bg-main px-2 py-3' onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        </div>
                    </div>
                    <div className="border-t">
                        <ul className="flex justify-start border-b text-sm font-medium text-gray-700">
                            <li
                                className="px-4 py-2 hover:text-blue-500 cursor-pointer"
                                onClick={() => handleTabChange(productIndex, 'details')}
                            >
                                Details
                            </li>
                            <li
                                className="px-4 py-2 hover:text-blue-500 cursor-pointer"
                                onClick={() => handleTabChange(productIndex, 'specifications')}
                            >
                                Specifications
                            </li>
                            <li
                                className="px-4 py-2 hover:text-blue-500 cursor-pointer"
                                onClick={() => handleTabChange(productIndex, 'internalPages')}
                            >
                                Internal Pages
                            </li>
                            <li
                                className="px-4 py-2 hover:text-blue-500 cursor-pointer"
                                onClick={() => handleTabChange(productIndex, 'reviews')}
                            >
                                Reviews
                            </li>
                        </ul>
                        <div className="p-6">
                            {activeTab[productIndex] === "details" && (
                                <div>
                                    <h3 className="text-lg font-bold mt-6 mb-2">Variants</h3>
                                    {product.variants?.length > 0 ? (
                                        <>
                                            <table className="table-auto w-full border-collapse mt-4">
                                                <thead>
                                                    <tr className="bg-gray-100">
                                                        <th className="p-2 border-b">Color</th>
                                                        <th className="p-2 border-b">Size</th>
                                                        <th className="p-2 border-b">Stock</th>
                                                        <th className="p-2 border-b">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {product.variants.map((variant) => (
                                                        <tr key={variant.id} className="hover:bg-gray-50">
                                                            {editingVariantId === variant.id ? (
                                                                <>
                                                                    <td className="p-2">
                                                                        <input
                                                                            type="text"
                                                                            value={editedVariant.color}
                                                                            onChange={(e) =>
                                                                                setEditedVariant({ ...editedVariant, color: e.target.value })
                                                                            }
                                                                            className="w-full p-1 border rounded"
                                                                        />
                                                                    </td>
                                                                    <td className="p-2">
                                                                        <input
                                                                            type="text"
                                                                            value={editedVariant.size}
                                                                            onChange={(e) =>
                                                                                setEditedVariant({ ...editedVariant, size: e.target.value })
                                                                            }
                                                                            className="w-full p-1 border rounded"
                                                                        />
                                                                    </td>
                                                                    <td className="p-2">
                                                                        <input
                                                                            type="number"
                                                                            value={editedVariant.stock}
                                                                            onChange={(e) =>
                                                                                setEditedVariant({ ...editedVariant, stock: e.target.value })
                                                                            }
                                                                            className="w-full p-1 border rounded"
                                                                        />
                                                                    </td>
                                                                    <td className="p-2 flex gap-2">
                                                                        <button
                                                                            className="text-green-500 hover:underline"
                                                                            onClick={handleSaveEdit}
                                                                        >
                                                                            Save
                                                                        </button>
                                                                        <button
                                                                            className="text-red-500 hover:underline"
                                                                            onClick={handleCancelEdit}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    </td>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <td className="p-2">{variant.color}</td>
                                                                    <td className="p-2">{variant.size || "N/A"}</td>
                                                                    <td className="p-2">{variant.stock}</td>
                                                                    <td className="p-2 flex gap-2">
                                                                        <button
                                                                            className="text-blue-500 hover:underline"
                                                                            onClick={() => handleEditClick(variant.id)}
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            className="text-red-500 hover:underline"
                                                                            onClick={() => handleDeleteVariant(variant.id)}
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </td>
                                                                </>
                                                            )}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <button
                                                className="mt-4 text-green-500 hover:underline"
                                                onClick={() => setIsAddVariantModalOpen(true)}
                                            >
                                                Add Variant
                                            </button>
                                        </>
                                    ) : (
                                        <div>
                                            <p className="text-gray-500">No variants available.</p>
                                            <button
                                                className="mt-4 text-green-500 hover:underline"
                                                onClick={() => setIsAddVariantModalOpen(true)}
                                            >
                                                Add Variant
                                            </button>
                                        </div>
                                    )}

                                    {isAddVariantModalOpen && (
                                        <div className="mt-4 p-4 border rounded-md bg-gray-50">
                                            <h4 className="text-md font-semibold mb-2">Add New Variant</h4>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Color</label>
                                                <input
                                                    type="text"
                                                    value={newVariant.color}
                                                    onChange={(e) => setNewVariant({ ...newVariant, color: e.target.value })}
                                                    className="mt-1 block w-full p-2 border rounded-md"
                                                    placeholder="Enter color"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Size</label>
                                                <input
                                                    type="text"
                                                    value={newVariant.size}
                                                    onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })}
                                                    className="mt-1 block w-full p-2 border rounded-md"
                                                    placeholder="Enter size"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Stock</label>
                                                <input
                                                    type="number"
                                                    value={newVariant.stock}
                                                    onChange={(e) => setNewVariant({ ...newVariant, stock: e.target.value })}
                                                    className="mt-1 block w-full p-2 border rounded-md"
                                                    placeholder="Enter stock"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Images</label>
                                                <input
                                                    type="file"
                                                    multiple
                                                    onChange={(e) => setNewVariantFiles(e.target.files)}
                                                    className="mt-1 block w-full"
                                                />
                                            </div>
                                            <div className="flex justify-end gap-2 mt-4">
                                                <button
                                                    className="text-red-500 hover:underline"
                                                    onClick={() => setIsAddVariantModalOpen(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="text-green-500 hover:underline"
                                                    onClick={() => handleAddVariant(product.id)}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}



                          {activeTab[productIndex] === 'specifications' && (
    <div className="p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-xl font-bold mb-4">Specifications</h3>

        {product.specifications?.length > 0 ? (
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Brand</th>
                            <th className="p-3 text-left">Weight</th>
                            <th className="p-3 text-left">Dimensions</th>
                            <th className="p-3 text-left">Material</th>
                            <th className="p-3 text-left">Manufacturer</th>
                            <th className="p-3 text-left">Warranty Period</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.specifications.map((spec, index) => (
                            <tr key={spec.id} className="hover:bg-gray-50">
                                <td className="p-3">{spec.brand || 'N/A'}</td>
                                <td className="p-3">{spec.weight || 'N/A'}</td>
                                <td className="p-3">{spec.dimensions || 'N/A'}</td>
                                <td className="p-3">{spec.material || 'N/A'}</td>
                                <td className="p-3">{spec.manufacturer || 'N/A'}</td>
                                <td className="p-3">{spec.warrantyPeriod || 'N/A'}</td>
                                <td className="p-3 flex gap-2">
                                <button
                                        onClick={() => handleSubmitEditSpecification(spec.id)}
                                        className="bg-white  text-orange-900 border-2 border-black px-4 py-2 rounded-md"
                                    >
                                       Edit
                                    </button>
                                    <button
                                        // onClick={() => handleDeleteSpecification(spec.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            showForm ? (
                <form onSubmit={handleSubmit} className="mt-4 bg-gray-50 p-6 rounded-md shadow-md">
                    <h4 className="text-lg font-bold mb-4">Add New Specification</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="brand"
                            value={newSpec.brand}
                            onChange={handleFormChange}
                            placeholder="Brand"
                            className="border p-2 rounded-md w-full"
                        />
                        <input
                            type="text"
                            name="weight"
                            value={newSpec.weight}
                            onChange={handleFormChange}
                            placeholder="Weight"
                            className="border p-2 rounded-md w-full"
                        />
                        <input
                            type="text"
                            name="dimensions"
                            value={newSpec.dimensions}
                            onChange={handleFormChange}
                            placeholder="Dimensions"
                            className="border p-2 rounded-md w-full"
                        />
                        <input
                            type="text"
                            name="material"
                            value={newSpec.material}
                            onChange={handleFormChange}
                            placeholder="Material"
                            className="border p-2 rounded-md w-full"
                        />
                        <input
                            type="text"
                            name="manufacturer"
                            value={newSpec.manufacturer}
                            onChange={handleFormChange}
                            placeholder="Manufacturer"
                            className="border p-2 rounded-md w-full"
                        />
                        <input
                            type="text"
                            name="warrantyPeriod"
                            value={newSpec.warrantyPeriod}
                            onChange={handleFormChange}
                            placeholder="Warranty Period"
                            className="border p-2 rounded-md w-full"
                        />
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setShowForm(false)}
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    onClick={() => handleSubmitSpecification(product.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
                >
                    Add Specification
                </button>
            )
        )}
    </div>
)}


                            {activeTab[productIndex] === 'internalPages' && (
                                <div>
                                    <h3 className="text-lg font-bold mb-4">Internal Pages</h3>
                                    {product.internalPages?.length > 0 ? (
                                        <ul className="list-disc ml-5">
                                            {product.internalPages.map((page, index) => (
                                                <li key={index} className="mb-2">
                                                    {page.pageType} - {page.pageCount} pages
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">
                                            No internal pages available.
                                        </p>
                                    )}
                                </div>
                            )}
                            {activeTab[productIndex] === 'reviews' && (
                                <div>
                                    <h3 className="text-lg font-bold mb-4">Reviews</h3>
                                    {product.reviews?.length > 0 ? (
                                        <div className="space-y-4">
                                            {product.reviews.map((review, index) => (
                                                <div
                                                    key={index}
                                                    className="p-4 border rounded-lg"
                                                >
                                                    <h4 className="font-medium text-gray-700">
                                                        {review.reviewer}
                                                    </h4>
                                                    <p className="text-gray-600">
                                                        {review.comment}
                                                    </p>
                                                    <button
                                                        onClick={() => removeReview(review.id)}
                                                        className="text-red-500 hover:text-red-700 mt-2"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No reviews yet.</p>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            ))}
        </div>



    );
}
