import React, { useState, useEffect } from 'react';
import axios from '../Auth/axiosConfig';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ saleName: '', description: '', isSale: false });
  const [updateEvent, setUpdateEvent] = useState({ id: '', saleName: '', description: '', isSale: false });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch all events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/v1/events/events');
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Create a new event
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/events/events', newEvent);
      setEvents([...events, response.data]);
      setNewEvent({ saleName: '', description: '', isSale: false });
      setShowModal(false); // Close modal after creating event
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  // Update an existing event
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/v1/events/events/${updateEvent.id}`, updateEvent);
      setEvents(events.map(event => event.id === updateEvent.id ? response.data : event));
      setUpdateEvent({ id: '', saleName: '', description: '', isSale: false });
      setShowModal(false); // Close modal after updating event
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  // Delete an event
  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`/api/v1/events/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:pl-80 font-poppins">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Events</h1>

      {loading ? <p className="text-center text-gray-600">Loading...</p> : (
        <div>
          {/* Button to add new event */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-main text-white py-2 px-4 rounded-lg"
            >
              Add New Event
            </button>
          </div>

          {/* Events List */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Existing Events</h2>
            <ul className="space-y-4">
              {events.map((event) => (
                <li key={event.id} className="bg-white p-4 rounded-lg shadow-md">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{event.saleName}</h3>
                    <p className="text-gray-600">{event.description}</p>
                    <p className="text-gray-500">Status: {event.isSale ? "Active Sale" : "Inactive"}</p>
                  </div>
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => { setUpdateEvent(event); setShowModal(true); }}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Modal for creating or updating event */}
          {showModal && (
            <section className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{updateEvent.id ? 'Update Event' : 'Create New Event'}</h2>
                <form onSubmit={updateEvent.id ? handleUpdateEvent : handleCreateEvent} className="space-y-4">
                  <div>
                    <label className="block text-gray-600">Sale Name</label>
                    <input
                      type="text"
                      value={updateEvent.id ? updateEvent.saleName : newEvent.saleName}
                      onChange={(e) => updateEvent.id ? setUpdateEvent({ ...updateEvent, saleName: e.target.value }) : setNewEvent({ ...newEvent, saleName: e.target.value })}
                      required
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Description</label>
                    <textarea
                      value={updateEvent.id ? updateEvent.description : newEvent.description}
                      onChange={(e) => updateEvent.id ? setUpdateEvent({ ...updateEvent, description: e.target.value }) : setNewEvent({ ...newEvent, description: e.target.value })}
                      required
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={updateEvent.id ? updateEvent.isSale : newEvent.isSale}
                      onChange={(e) => updateEvent.id ? setUpdateEvent({ ...updateEvent, isSale: e.target.checked }) : setNewEvent({ ...newEvent, isSale: e.target.checked })}
                      className="h-5 w-5 text-indigo-500 border-gray-300 rounded"
                    />
                    <label className="text-gray-600">Is Sale</label>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-main text-white py-2 px-4 rounded-lg"
                    >
                      {updateEvent.id ? 'Update Event' : 'Create Event'}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
