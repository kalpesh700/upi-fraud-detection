const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');

// Define the /train endpoint
router.post('/train', (req, res) => {
    // Get the absolute path to train_model.py
    const scriptPath = path.join(__dirname, '../src/train_model.py'); // Adjust if your folder structure is different
    exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing training script: ${error.message}`);
            return res.status(500).json({ message: 'Failed to train model.', error: stderr });
        }
        res.json({ message: 'Model trained successfully.', output: stdout });
    });
});

module.exports = router;
