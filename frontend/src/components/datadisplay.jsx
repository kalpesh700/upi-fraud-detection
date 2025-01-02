import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataDisplay = () => {
  const navigate = useNavigate();
  const csvData = JSON.parse(localStorage.getItem('csvData')) || []; // Default to empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePredict = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/train', {
        method: 'POST', // Ensure you are using POST method
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to train the model');
      }

      const data = await response.json();
      alert(data.message); // Show success message

      // Optionally, navigate to the prediction page
      navigate('/final');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white relative">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-500">Transaction Data</h2>
      {csvData.length > 0 ? ( // Check if csvData has elements
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((header, index) => (
                  <th key={index} className="border px-4 py-2">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  {Object.values(row).map((value, idx) => (
                    <td key={idx} className="border px-4 py-2 text-black">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-black text-center">No data available.</p>
      )}
      <button 
        onClick={handlePredict} 
        className="mt-4 p-2 bg-red-500 text-white"
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Training...' : 'Train Model'}
      </button>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default DataDisplay;
