import React, { createContext, useContext, useState } from "react";
import axios from "../Auth/axiosConfig";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
    const [products, setProducts] = useState([]); 
    const [newVariant, setNewVariant] = useState({ color: "", size: "", stock: "" });
    const [newVariantFiles, setNewVariantFiles] = useState(null); 
  
   
 


 

    // Function to add a new variant
    const handleAddVariant = async (productId) => {
        const formData = new FormData();
        formData.append("color", newVariant.color);
        formData.append("size", newVariant.size);
        formData.append("stock", newVariant.stock);

        if (newVariantFiles) {
            Array.from(newVariantFiles).forEach((file) => formData.append("files", file));
        }

        try {
            const response = await axios.post(`/api/v1/bookProducts/addVariant/${productId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                alert("Variant added successfully!");

                // Update the product list with the new variant
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === productId
                            ? { ...product, variants: [...product.variants, response.data.data] }
                            : product
                    )
                );

                // Reset state after successful addition
                setNewVariant({ color: "", size: "", stock: "" });
                setNewVariantFiles(null);
            } else {
                alert("Failed to add variant: " + response.data.message);
            }
        } catch (error) {
            console.error("Error adding variant:", error);
            alert("An error occurred while adding the variant. Please try again.");
        }
    };

    // Function to cancel adding a new variant
    const handleCancel = () => {
        setNewVariant({ color: "", size: "", stock: "" });
        setNewVariantFiles(null);
    };

    // Function to delete a variant
    const handleDeleteVariant = async (variantId) => {
        try {
            const response = await axios.delete(`/api/v1/bookProducts/deleteVariant/${variantId}`);
            if (response.status === 200) {
                alert("Variant deleted successfully!");

                // Remove the deleted variant from the state
                setProducts((prevProducts) =>
                    prevProducts.map((product) => ({
                        ...product,
                        variants: product.variants.filter((variant) => variant.id !== variantId),
                    }))
                );
            } else {
                alert("Failed to delete variant.");
            }
        } catch (error) {
            console.error("Error deleting variant:", error);
            alert("An error occurred. Please try again.");
        }
    };

    // Function to remove a review
    const removeReview = async (reviewId) => {
        try {
            const response = await axios.delete(`/api/v1/reviews/deleteReview/${reviewId}`);
            if (response.status === 200) {
                alert("Review removed successfully!");
            } else {
                alert("Failed to remove review.");
            }
        } catch (error) {
            console.error("Error removing review:", error);
            alert("An error occurred. Please try again.");
        }
    };

 
    const values = {
        products,
        setProducts,
        newVariant,
        setNewVariant,
        newVariantFiles,
        setNewVariantFiles,
        handleAddVariant,
        handleCancel,
        handleDeleteVariant,
        removeReview,

    };

    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
