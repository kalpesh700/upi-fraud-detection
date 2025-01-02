import React, { useState } from 'react';
import Bgimage from "../../public/1.png";
import Login from './login';

function Banner() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  return (
    <div
      className="hero bg-base-200 min-h-screen"
      style={{
        backgroundImage: `url(${Bgimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero min-h-screen">
        <div className="flex-col lg:flex-row-reverse">
          <h1 className="text-5xl font-bold text-black ml-4">UPI Fraud Detection Using Machine Learning Approaches</h1>
          <p className="py-6 text-black ml-4">
            UPI Fraud is becoming more and more popular in financial transactions, at the same time frauds are also increasing. Conventional methods use rule-based expert systems to detect fraud behaviors.
          </p>
          <button className="btn btn-primary ml-4" onClick={openLoginModal}>Get Started</button>
        </div>
      </div>
      
      {/* Render the Login component if the modal is open */}
      {isLoginOpen && (
        <Login closeModal={closeLoginModal} />
      )}
    </div>
  );
}

export default Banner;
