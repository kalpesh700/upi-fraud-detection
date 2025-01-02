import React from 'react';
import { useLocation } from 'react-router-dom';

const PredictionResult = () => {
  const location = useLocation();
  const { result } = location.state || {}; // Get the prediction result from location state

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-4 text-red-600">Prediction Result</h1>
        <p className="text-xl text-center">
          {result ? `The transaction is ${result === '1' ? 'fraudulent' : 'valid'}.` : 'No result available.'}
        </p>
      </div>
    </div>
  );
};

export default PredictionResult;
