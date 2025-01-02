const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { exec } = require('child_process'); // Import exec to run Python scripts
const trainModelRoute = require('./routes/modeltraining'); // Training route

const app = express();
const PORT = 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

// Mount the training model route
app.use('/api', trainModelRoute);

// Prediction endpoint
app.post('/detect', (req, res) => {
  const { 
    trans_datetime,
    category,
    upi_id,
    dob,
    trans_amount,
    state,
    zip,
    upi_holder_name,
    merchant 
  } = req.body;

  // Prepare the command to execute the Python script with parameters
  const command = `python "K:/upi/up/backend/predict.py" "${trans_datetime}" "${category}" "${upi_id}" "${dob}" ${trans_amount} "${state}" "${zip}" "${upi_holder_name}" "${merchant}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return res.status(500).json({ message: 'Error making prediction.', error: stderr });
    }

    const result = stdout.trim(); // Get the prediction result from the output
    res.json({ result });
  });
});

// Model training endpoint
app.post('/api/train', (req, res) => {
  const scriptPath = path.join(__dirname, 'train_model.py'); 
  
  exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error during model training:', error.message);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }

    if (stderr) {
      console.error('Error output:', stderr);
      return res.status(500).json({ message: 'Error occurred', error: stderr });
    }

    console.log('Model trained successfully:', stdout);
    res.status(200).json({ message: 'Model trained and saved successfully', output: stdout });
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
