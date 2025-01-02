import React, { useState } from 'react';
import Bgimage from "../../public/2.png"; // Background image import
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

function Banner() {
  return (
    <div className="hero min-h-screen">
      {/* Hero Section with Image Only */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${Bgimage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex-col lg:flex-row-reverse">
          <h1 className="text-5xl font-bold text-white ml-4">
            UPI Fraud Detection Using Machine Learning 
          </h1>
          <p className="py-6 text-white ml-4">
            UPI Fraud is becoming more and more popular in financial transactions, at the same time frauds are also increasing. Conventional methods use rule-based expert systems to detect fraud behaviors.
          </p>
          <div className="ml-4">
            {/* Links for Prediction and Analysis */}
            <Link to="/detect" className="btn btn-primary mr-4">
              Prediction
            </Link>
            <Link to="/analysis" className="btn btn-secondary">
              Analysis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
