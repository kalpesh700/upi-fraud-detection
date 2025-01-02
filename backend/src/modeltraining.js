const { exec } = require('child_process');

function trainModel() {
  return new Promise((resolve, reject) => {
    exec('python backend/src/train_model.py', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during training: ${error.message}`);
        reject({ message: 'Error training the model', error: stderr || error.message });
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}

module.exports = { trainModel };
