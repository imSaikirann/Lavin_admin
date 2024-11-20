import React, { useEffect, useState } from 'react';
import axios from '../Auth/axiosConfig';

export default function Admin() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/admin/traffic');
        // Calculate total visits from the fetched data
        const totalVisits = response.data.reduce((sum, entry) => sum + entry.visits, 0);
        setVisitorCount(totalVisits);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Total Visitors</h1>
        <div className="text-6xl font-bold text-blue-600 mb-4">{visitorCount}</div>
        <p className="text-gray-500 text-sm">
          This count represents the total number of unique visits recorded.
        </p>
      </div>
    </div>
  );
}
