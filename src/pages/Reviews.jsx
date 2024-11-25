import React, { useEffect, useState } from "react";
import axios from "../Auth/axiosConfig"; // Ensure this is correctly set up
import { useParams } from "react-router-dom";

export default function Reviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newReview, setNewReview] = useState({ comment: "", rating: "", userName: "" });

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/v1/reviews/reviews/${id}`);
      setReviews(response.data.data);
    } catch (err) {
      setError("Failed to fetch reviews. Please try again.");
      console.error("Error fetching reviews:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const addReview = async () => {
    if (!newReview.comment || !newReview.rating || !newReview.userName) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(`/api/v1/reviews/addReviews/${id}`, {
        ...newReview,
      });
      setReviews((prevReviews) => [...prevReviews, response.data.data]);
      setNewReview({ comment: "", rating: "", userName: "" }); 
    } catch (err) {
      console.error("Error adding review:", err.message);
      alert("Failed to add review. Please try again.");
    }
  };

  const removeReview = async (reviewId) => {
    try {
      await axios.delete(`/api/v1/reviews/reviews/${reviewId}`);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
    } catch (err) {
      console.error("Error removing review:", err.message);
      alert("Failed to remove review. Please try again.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]); // Fetch reviews when productId changes

  if (loading) return <div className="text-center">Loading reviews...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="sm:pl-80 p-6">
      <h1 className="text-3xl font-bold mb-8">Reviews</h1>

      {/* Form for Adding Review */}
      <div className="p-4 border rounded-lg bg-gray-100 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add a Review</h2>
        <input
          type="text"
          placeholder="Your Name"
          className="block w-full p-2 mb-3 border rounded"
          value={newReview.userName}
          onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
        />
        <textarea
          placeholder="Your Review"
          className="block w-full p-2 mb-3 border rounded"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        ></textarea>
        <input
          type="number"
          placeholder="Rating (1-5)"
          className="block w-full p-2 mb-3 border rounded"
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
        />
        <button
          onClick={addReview}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Review
        </button>
      </div>

      {/* Display Reviews */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg bg-white shadow">
              <h4 className="font-medium text-gray-700">{review.userName}</h4>
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-gray-500">Rating: {review.rating}</p>
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
  );
}
