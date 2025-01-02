import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import upiFraudImage from '../../../public/1.png'; // Ensure image path is correct

const UPIFraudDetection = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [transDatetime, setTransDatetime] = useState('');
  const [category, setCategory] = useState('');
  const [upiId, setUpiId] = useState('');
  const [dob, setDob] = useState('');
  const [transAmount, setTransAmount] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [upiHolderName, setUpiHolderName] = useState('');
  const [merchant, setMerchant] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!transDatetime || !category || !upiId || !dob || !transAmount || !state || !zip || !upiHolderName || !merchant) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    const response = await fetch('http://localhost:5000/detect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trans_datetime: transDatetime,
        category,
        upi_id: upiId,
        dob,
        trans_amount: transAmount,
        state,
        zip,
        upi_holder_name: upiHolderName,
        merchant,
      }),
    });

    const data = await response.json();
    setLoading(false);
    
    // Redirect to PredictionResult with the result
    navigate('/result', { state: { result: data.result } });
  };

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="text-center mb-6">
          <img src={upiFraudImage} alt="UPI Fraud" className="w-48 h-auto mx-auto rounded-full" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-8 text-red-600">UPI FRAUD DETECTION</h1>

        <form className="grid grid-cols-2 gap-4">
          {/* Form fields */}
          <div>
            <label className="block mb-2 text-gray-700">UPI Holder Name</label>
            <input
              type="text"
              value={upiHolderName}
              onChange={(e) => setUpiHolderName(e.target.value)}
              className="w-full bg-gray-200 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Transaction Date and Time</label>
            <input
              type="datetime-local"
              value={transDatetime}
              onChange={(e) => setTransDatetime(e.target.value)}
              className="w-full bg-gray-200 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">UPI ID</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full bg-gray-200 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-gray-200 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Transaction Amount (Rs)</label>
            <input
              type="text"
              value={transAmount}
              onChange={(e) => setTransAmount(e.target.value)}
              className="w-full bg-gray-200 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full bg-gray-200 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="" disabled>Select state</option>
              <option value="Maharashtra">Maharashtra</option>
              {/* Include all other states */}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Zip Code</label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="w-full bg-gray-200 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Merchant</label>
            <input
              type="text"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              className="w-full bg-gray-200 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Merchant Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-200 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="" disabled>Select merchant category</option>
              <option value="0">Entertainment</option>
              <option value="1">Food Dining</option>
              <option value="2">Gas Transport</option>
              <option value="3">Grocery</option>
              <option value="4">Health</option>
              <option value="5">Kids Pets</option>
              <option value="6">Misc</option>
              <option value="7">Shopping</option>
              <option value="8">Travel</option>
            </select>
          </div>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={handlePredict}
            className="bg-red-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Predict Fraud'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UPIFraudDetection;
