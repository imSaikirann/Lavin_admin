import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

export default function Sidebar() {
  const [isDropdownOpenProducts, setIsDropdownOpenProducts] = React.useState(false);
  const [isDropdownOpenOrders, setIsDropdownOpenOrders] = React.useState(false);
  const [isDropdownOpenCustomers, setIsDropdownOpenCustomers] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleDropdownProducts = () => setIsDropdownOpenProducts(!isDropdownOpenProducts);
  const toggleDropdownOrders = () => setIsDropdownOpenOrders(!isDropdownOpenOrders);
  const toggleDropdownCustomers = () => setIsDropdownOpenCustomers(!isDropdownOpenCustomers);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className=''>
      {/* Sidebar toggle button for mobile view */}
      <div className="md:hidden flex flex-row-reverse items-center justify-between p-4 sm:pl-72 h-16 font-poppins">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-orange-600 rounded-full text-white focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
        </button>

        <img src={Logo} className="w-24 md:w-28 lg:w-32" alt="Logo" />
      </div>

      {/* Sidebar content */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-orange-50 text-black border-r-2 transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 z-50 flex flex-col ease-in-out duration-300`}
      >
        {/* Close button for mobile view */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={closeSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-4 font-poppins">
          <Link
            to="/"
            className="rounded-md p-3 hover:bg-orange-600 hover:text-white transition-all duration-200 flex items-center gap-2"
            onClick={closeSidebar}
          >
            <span>Admin Dashboard</span>
          </Link>

          <Link
            to="/events"
            className="rounded-md p-3 hover:bg-orange-600 hover:text-white transition-all duration-200 flex items-center gap-2"
            onClick={closeSidebar}
          >
            <span>Events</span>
          </Link>

          {/* Products Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdownProducts}
              className="rounded-md p-3 w-full text-left flex justify-between items-center hover:bg-orange-600 hover:text-white transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18M3 19h18" />
                </svg>
                <span>Products</span>
              </span>
              <span>{isDropdownOpenProducts ? '-' : '+'}</span>
            </button>
            {isDropdownOpenProducts && (
              <div className="flex flex-col bg-white shadow-md rounded-md p-2 mt-1">
                <Link
                  to="/allproducts"
                  className="p-2 text-black rounded-md hover:bg-orange-600 hover:text-white"
                  onClick={closeSidebar}
                >
                  View Products
                </Link>
                <Link
                  to="/addProduct"
                  className="p-2 text-black rounded-md hover:bg-orange-600 hover:text-white"
                  onClick={closeSidebar}
                >
                  Add Product
                </Link>
                <Link
                  to="/dashboard/categories"
                  className="p-2 text-black rounded-md hover:bg-orange-600 hover:text-white"
                  onClick={closeSidebar}
                >
                  Categories
                </Link>
              </div>
            )}
          </div>

          {/* Orders Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdownOrders}
              className="rounded-md p-3 w-full text-left flex justify-between items-center hover:bg-orange-600 hover:text-white transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18M3 19h18" />
                </svg>
                <span>Orders</span>
              </span>
              <span>{isDropdownOpenOrders ? '-' : '+'}</span>
            </button>
            {isDropdownOpenOrders && (
              <div className="flex flex-col bg-white shadow-md rounded-md p-2 mt-1">
                <Link
                  to="/dashboard/orders"
                  className="p-2 text-black rounded-md hover:bg-orange-600 hover:text-white"
                  onClick={closeSidebar}
                >
                  View Orders
                </Link>
                <Link
                  to="/dashboard/orders/reports"
                  className="p-2 text-black rounded-md hover:bg-orange-600 hover:text-white"
                  onClick={closeSidebar}
                >
                  Sales Reports
                </Link>
              </div>
            )}
          </div>

          {/* Customers Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdownCustomers}
              className="rounded-md p-3 w-full text-left flex justify-between items-center hover:bg-orange-600 hover:text-white transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18M3 19h18" />
                </svg>
                <span>Customers</span>
              </span>
              <span>{isDropdownOpenCustomers ? '-' : '+'}</span>
            </button>
            {isDropdownOpenCustomers && (
              <div className="flex flex-col bg-white shadow-md rounded-md p-2 mt-1">
                <Link
                  to="/userdata"
                  className="p-2 text-black rounded-md hover:bg-orange-600 hover:text-white"
                  onClick={closeSidebar}
                >
                  View Users
                </Link>
              
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
