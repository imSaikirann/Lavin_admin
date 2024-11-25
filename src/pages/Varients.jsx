import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../store/StoreContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function Variants() {
    const {
        handleDeleteVariant,
        handleAddVariant,
        newVariant,
        setNewVariant,
        setNewVariantFiles,
        handleUpdateVariant
    } = useContext(AppContext);
    const {id} = useParams()

    const [editingVariantId, setEditingVariantId] = useState(null);
    const [editedVariant, setEditedVariant] = useState({
        images: null,
        color: '',
        size: '',
        stock: '',
    });
    const [isAddVariantModalOpen, setIsAddVariantModalOpen] = useState(false);
    const [product,setProduct] = useState(null)
    const handleEditClick = (variant) => {
        setEditingVariantId(variant.id);
        setEditedVariant({ ...variant });
    };
    const handleEditClickSave = (variantId) => {
        handleUpdateVariant(variantId, editedVariant).then(() => {
            // Optionally refresh the product data or update the state directly
            setEditingVariantId(null); // Exit editing mode
            setEditedVariant({ color: '', size: '', stock: '' }); // Reset form
        });
    };
    

    const handleCancelEdit = () => {
        setEditingVariantId(null);
        setEditedVariant({ color: '', size: '', stock: '' });
    };

    const handleFileUpload = (e) => {
        setEditedVariant({ ...editedVariant, images: e.target.files });
    };
    console.log(product)

    useEffect(()=>{
         async function fetchProduct()
        {
            const res = await axios.get(`/api/v1/bookProducts/getProduct/${id}`)
            setProduct(res.data.data)
         
        }
        fetchProduct()
    },[id])
    return (
        <div className='sm:pl-80'>
            <h3 className="text-lg font-bold mt-6 mb-2">Variants</h3>
            {product?.variants?.length > 0 ? (
                <>
                    <table className="table-auto w-full border-collapse mt-4">
                        <thead className="text-left">
                            <tr className="bg-gray-100">
                                <th className="p-2 border-b">Image</th>
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
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileUpload}
                                                    className="w-full p-1 border rounded"
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="text"
                                                    value={editedVariant.color}
                                                    onChange={(e) =>
                                                        setEditedVariant({
                                                            ...editedVariant,
                                                            color: e.target.value,
                                                        })
                                                    }
                                                    className="w-full p-1 border rounded"
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="text"
                                                    value={editedVariant.size}
                                                    onChange={(e) =>
                                                        setEditedVariant({
                                                            ...editedVariant,
                                                            size: e.target.value,
                                                        })
                                                    }
                                                    className="w-full p-1 border rounded"
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    value={editedVariant.stock}
                                                    onChange={(e) =>
                                                        setEditedVariant({
                                                            ...editedVariant,
                                                            stock: e.target.value,
                                                        })
                                                    }
                                                    className="w-full p-1 border rounded"
                                                />
                                            </td>
                                            <td className="p-2 flex gap-2">
                                                <button
                                                    className="text-green-500 hover:underline"
                                                    onClick={() =>
                                                        handleEditClickSave(variant.id)
                                                    }
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
                                            <td className="p-2">
                                                <img
                                                    className="w-14 h-auto"
                                                    src={variant.images[0]}
                                                    alt="Variant"
                                                />
                                            </td>
                                            <td className="p-2">{variant.color}</td>
                                            <td className="p-2">{variant.size || 'N/A'}</td>
                                            <td className="p-2">{variant.stock}</td>
                                            <td className="p-2 flex gap-2">
                                                <button
                                                    className="text-blue-500 hover:underline"
                                                    onClick={() => handleEditClick(variant)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="text-red-500 hover:underline"
                                                    onClick={() =>
                                                        handleDeleteVariant(variant.id)
                                                    }
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
                            onChange={(e) =>
                                setNewVariant({ ...newVariant, color: e.target.value })
                            }
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Enter color"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Size</label>
                        <input
                            type="text"
                            value={newVariant.size}
                            onChange={(e) =>
                                setNewVariant({ ...newVariant, size: e.target.value })
                            }
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Enter size"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            value={newVariant.stock}
                            onChange={(e) =>
                                setNewVariant({ ...newVariant, stock: e.target.value })
                            }
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
                            onClick={() =>   handleAddVariant(id)}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
