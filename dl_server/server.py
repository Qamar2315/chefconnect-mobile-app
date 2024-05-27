from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename

# Configure Flask app
app = Flask(__name__)

# Define uploads folder path (adjust as needed)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Function to handle image upload and prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Check if request has a file part
    if 'image' not in request.files:
        response = {
            'error': 'No image file uploaded'
        }
        return jsonify(response), 400  # Bad request

    # Get the uploaded image
    image = request.files['image']

    # Check if the file is an image
    if image.filename.rsplit('.', 1)[1].lower() not in ['jpg', 'jpeg', 'png']:
        response = {
            'error': 'Invalid image format. Only JPG, JPEG, and PNG allowed.'
        }
        return jsonify(response), 415  # Unsupported media type

    # Generate secure filename to prevent conflicts
    filename = secure_filename(image.filename)

    # Save the image to uploads folder
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'image_to_analyze.jpg')  # Adjust extension if needed
    image.save(image_path)

    # Implement your prediction logic here (replace with your specific code)
    prediction = "This is a placeholder prediction. Replace with your model's output."

    # Send JSON response
    response = {
        'message': 'Image uploaded successfully.',
        'prediction': prediction
    }
    return jsonify(response), 200  # OK

if __name__ == '__main__':
    app.run(debug=True)
