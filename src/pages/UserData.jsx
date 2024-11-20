import React, { useEffect, useState } from 'react';
import axios from '../Auth/axiosConfig';

export default function UserData() {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/api/v1/user/getUsersData');
        if (res.data ) {
          setData(res.data);
        } else {
          setData([]); // Ensure it's always an array
        }
      } catch (error) {
        console.error(error);
        setError('Failed to fetch user data. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false regardless of success/failure
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading user data...</p>; // Display loading message
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Display error message
  }

  return (
    <div className="sm:pl-80 p-5 font-poppins">
      <h1 className="text-2xl font-bold mb-4">User Data</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Address</th>
              <th className="border border-gray-300 p-2">Phone Number</th>
         
              <th className="border border-gray-300 p-2">Verified</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{user.id}</td>
                  <td className="border border-gray-300 p-2">{user.firstName} {user.lastName}</td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">
                    {user.street || 'N/A'}, {user.city}, {user.state}, {user.country}
                  </td>
                  <td className="border border-gray-300 p-2">{user.phoneNumber || 'N/A'}</td>
                 
                  <td className="border border-gray-300 p-2">
                    {user.isVerified ? 'Yes' : 'No'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="border border-gray-300 p-2 text-center text-gray-500"
                >
                  No user data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
