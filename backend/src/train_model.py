import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, confusion_matrix
import tensorflow as tf
import os
import joblib
import seaborn as sns
import matplotlib.pyplot as plt

# Get the directory of the current script
base_dir = os.path.dirname(os.path.abspath(__file__))

# Load the dataset using an absolute path
dataset_path = os.path.join(base_dir, '../dataset/upi_fraud_dataset.csv')

# Check if the dataset file exists
if not os.path.exists(dataset_path):
    raise FileNotFoundError(f"Dataset not found at: {dataset_path}")

dataset = pd.read_csv(dataset_path, index_col=0)

# Prepare features and target variable
x = dataset.iloc[:, :10].values
y = dataset.iloc[:, 10].values

# Split the dataset
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.15, random_state=0)

# Standardize the data
scaler = StandardScaler()
x_train = scaler.fit_transform(x_train)
x_test = scaler.transform(x_test)

# Initialize and train models
models = {
    "Logistic Regression": LogisticRegression(random_state=0),
    "K-Nearest Neighbors": KNeighborsClassifier(n_neighbors=5, metric='minkowski', p=2),
    "SVM": SVC(kernel='linear', random_state=0),
    "Naive Bayes": GaussianNB(),
    "Decision Tree": DecisionTreeClassifier(criterion='entropy', random_state=0),
    "Random Forest": RandomForestClassifier(random_state=0),
    "Gradient Boosting": XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=0)
}

# Train and evaluate models
scores = {}
for name, model in models.items():
    model.fit(x_train, y_train)
    score = accuracy_score(y_test, model.predict(x_test))
    scores[name] = score

# Convolutional Neural Network (CNN)
CNN_model = tf.keras.models.Sequential()
CNN_model.add(tf.keras.layers.Dense(64, input_dim=10, activation='relu'))
CNN_model.add(tf.keras.layers.Dense(128, activation='relu'))
CNN_model.add(tf.keras.layers.Dense(1, activation='sigmoid'))
CNN_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
CNN_model.fit(x_train, y_train, batch_size=32, epochs=200, verbose=0)
cnn_score = CNN_model.evaluate(x_test, y_test, verbose=0)[1]
scores["CNN"] = cnn_score

# Plot Bar Chart for Model Performance Comparison
plt.figure(figsize=(10, 6))
plt.bar(scores.keys(), [score * 100 for score in scores.values()], color='skyblue')
plt.title('Model Performance Comparison')
plt.xlabel('Model')
plt.ylabel('Accuracy (%)')
plt.xticks(rotation=45)
plt.show()

# Display Fraud vs Not Fraud Distribution (Target Variable)
fraud_count = np.sum(y == 1)
not_fraud_count = np.sum(y == 0)

plt.figure(figsize=(8, 6))
sns.barplot(x=['Fraud', 'Not Fraud'], y=[fraud_count, not_fraud_count], palette='viridis')
plt.title('Fraud vs Not Fraud Transactions')
plt.ylabel('Count')
plt.xlabel('Transaction Type')
plt.show()

# Accuracy Comparison Results
best_model_name = max(scores, key=scores.get)
best_accuracy = max(scores.values())

# Save Best Model
model_dir = os.path.join(base_dir, '../model/')
os.makedirs(model_dir, exist_ok=True)
if best_model_name == "CNN":
    CNN_model.save(os.path.join(model_dir, 'best_model.h5'))
    print(f"Model saved at {model_dir}best_model.h5")
elif best_model_name == "Random Forest":
    joblib.dump(models['Random Forest'], os.path.join(model_dir, 'best_model_rf.pkl'))
    print(f"Model saved at {model_dir}best_model_rf.pkl")
elif best_model_name == "Gradient Boosting":
    joblib.dump(models['Gradient Boosting'], os.path.join(model_dir, 'best_model_gb.pkl'))
    print(f"Model saved at {model_dir}best_model_gb.pkl")

# Print Results
print("\nModel Accuracy Comparison:")
for name, score in scores.items():
    print(f"{name}: {score * 100:.2f}%")

print(f"\nBest model: {best_model_name} with accuracy {best_accuracy * 100:.2f}%")

# Generate Confusion Matrix for the Best Model
if best_model_name == "CNN":
    y_pred = (CNN_model.predict(x_test) > 0.5).astype(int)  # Convert probabilities to class labels (0 or 1)
elif best_model_name == "Random Forest":
    y_pred = models['Random Forest'].predict(x_test)
elif best_model_name == "Gradient Boosting":
    y_pred = models['Gradient Boosting'].predict(x_test)

cm = confusion_matrix(y_test, y_pred)

# Plot Confusion Matrix
plt.figure(figsize=(6, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=['0', '1'], yticklabels=['0', '1'])
plt.title(f'Confusion Matrix for {best_model_name}')
plt.xlabel('Predicted Label')
plt.ylabel('True Label')
plt.show()
