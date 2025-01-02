import sys
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
import joblib
import os
import tensorflow as tf  # Import TensorFlow (if needed later)

# Get the directory of the current script
base_dir = os.path.dirname(os.path.abspath(__file__))

# Print received arguments for debugging
print(f"Received arguments: {sys.argv}")

# Check if enough arguments are passed
if len(sys.argv) < 10:  # Now, only expecting 10 arguments (no model choice)
    raise ValueError("Not enough arguments. Expected 10 arguments.")

# Load the Random Forest model (remove model choice logic)
model_path = os.path.join(base_dir, '../model/best_model_rf.pkl')
print(f"Loading Random Forest model from: {model_path}")  # Debug: print the model path
try:
    model = joblib.load(model_path)  # Load the Random Forest model
    print("Model loaded successfully.")
except FileNotFoundError:
    raise FileNotFoundError(f"Model file not found at {model_path}")

# Fetch input parameters from the command line
trans_datetime = sys.argv[1]
category = sys.argv[2]
upi_id = sys.argv[3]
dob = sys.argv[4]
trans_amount = float(sys.argv[5])
state = sys.argv[6]
zip_code = sys.argv[7]
upi_holder_name = sys.argv[8]  # New parameter
merchant = sys.argv[9]         # New parameter

# Construct input features
# Note: Categorical features should be properly encoded if not done during training
# Here, it's assumed that categorical features are being handled elsewhere

input_data = np.array([[trans_amount, category, upi_id, dob, state, zip_code, upi_holder_name, merchant]])

# Load the scaler used during training
scaler_path = os.path.join(base_dir, '../model/scaler.pkl')  # Adjust path as needed
try:
    scaler = joblib.load(scaler_path)  # Load the saved scaler
    print("Scaler loaded successfully.")
except FileNotFoundError:
    raise FileNotFoundError(f"Scaler file not found at {scaler_path}")

# Preprocess the input data
input_data_scaled = scaler.transform(input_data)  # Scale the input data

# Predict using the model
predicted = model.predict(input_data_scaled)

# For Random Forest, no need for thresholding like in CNN
predicted_label = predicted

# Print the result for the server to capture
print(predicted_label[0])  # Output the prediction
