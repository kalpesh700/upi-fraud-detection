import React, { useState, useEffect } from 'react';
import Login from './login';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Check localStorage to determine initial login state
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  const navigate = useNavigate(); // useNavigate hook

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  // Listen to changes in localStorage on page load
  useEffect(() => {
    console.log("Navbar mounted, checking localStorage:", localStorage.getItem("isLoggedIn"));
    
    const handleStorageChange = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      console.log("Local storage changed, updating isLoggedIn to", loggedIn);
      setIsLoggedIn(loggedIn);
    };

    // Check once when component mounts
    handleStorageChange();

    // Event listener to detect when localStorage is updated
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLoginSuccess = () => {
    console.log("Login successful");
    localStorage.setItem("isLoggedIn", "true"); // Save login status in localStorage
    setIsLoggedIn(true); // Update local state
    closeLoginModal(); // Close the login modal
  };

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.setItem("isLoggedIn", "false"); // Log out and remove login status from localStorage
    setIsLoggedIn(false); // Update local state
    navigate('/'); // Navigate to the home page
  };

  return (
    <>
      <div className="navbar bg-white shadow-md">
        <div className="navbar-start">
          <a href="/" className="btn btn-ghost text-xl text-red-600">UPI FRAUD DETECTION</a>
        </div>
        <div className="navbar-end">
          {/* Conditionally Render the Login or Logout Button */}
          {!isLoggedIn ? (
            <button className="btn bg-blue-500 text-white" onClick={openLoginModal}>
              LOGIN
            </button>
          ) : (
            <button className="btn bg-red-500 text-white" onClick={handleLogout}>
              LOGOUT
            </button>
          )}
        </div>
      </div>

      {/* Show the login modal if isLoginOpen is true */}
      {isLoginOpen && <Login closeModal={closeLoginModal} onLoginSuccess={handleLoginSuccess} />}
    </>
  );
}

export default Navbar;
