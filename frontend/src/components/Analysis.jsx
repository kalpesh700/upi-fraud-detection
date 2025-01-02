import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Analysis() {
  const [confusionMatrix, setConfusionMatrix] = useState([[50, 10], [5, 35]]);
  const [accuracy, setAccuracy] = useState(0.85);
  const [fraudRate, setFraudRate] = useState(0.2);

  useEffect(() => {
    // Fetch the analysis data from the backend
    const fetchAnalysisData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/analysis');
        const data = await response.json();
        setConfusionMatrix(data.confusionMatrix);
        setAccuracy(data.accuracy);
        setFraudRate(data.fraudRate);
      } catch (error) {
        console.error('Error fetching analysis data:', error);
      }
    };

    fetchAnalysisData();
  }, []);

  // Bar Chart Data for Accuracy & Fraud Rate
  const chartData = {
    labels: ['Accuracy', 'Fraud Rate'],
    datasets: [
      {
        label: 'Metrics',
        data: [accuracy, fraudRate],
        backgroundColor: ['#4CAF50', '#FF5733'], // Green for accuracy, Red for fraud rate
      },
    ],
  };

  return (
    <div className="container p-6">
      <h2 className="text-2xl font-bold mb-4">Analysis</h2>

      <div className="confusion-matrix">
        <h3 className="text-xl font-bold">Confusion Matrix</h3>
        {/* Display Confusion Matrix as a Table */}
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th>Predicted: 0</th>
              <th>Predicted: 1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{confusionMatrix[0][0]}</td>
              <td>{confusionMatrix[0][1]}</td>
            </tr>
            <tr>
              <td>{confusionMatrix[1][0]}</td>
              <td>{confusionMatrix[1][1]}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="metrics mt-8">
        <h3 className="text-xl font-bold">Accuracy & Fraud Rate</h3>
        {/* Bar Chart for Accuracy and Fraud Rate */}
        <div className="chart-container">
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default Analysis;
