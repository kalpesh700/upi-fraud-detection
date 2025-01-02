import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Update the import
import Papa from 'papaparse';
import Bgimage from "../../public/1.png";

function Upload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log(`File selected: ${selectedFile.name}`);
    }
  };

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          // Store the parsed data in localStorage
          localStorage.setItem('csvData', JSON.stringify(results.data));
          // Navigate to the new page
          navigate('/preview'); // Use navigate instead of history.push
        },
        header: true, // Set to true if your CSV has headers
      });
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${Bgimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload File</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input w-full max-w-xs mb-4"
          accept=".csv"
        />
        <button 
          className="btn btn-primary w-full" 
          onClick={handleUpload}
          disabled={!file} // Disable button if no file is selected
        >
          Upload
        </button>
        {file && <p className="mt-2 text-center">Selected File: {file.name}</p>}
      </div>
    </div>
  );
}

export default Upload;
