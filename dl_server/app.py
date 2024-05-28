from flask import Flask, request, jsonify
from keras.preprocessing.image import load_img, img_to_array
from keras.models import load_model
import numpy as np
from PIL import Image
import os
from flask_cors import CORS
from tensorflow.keras.preprocessing import image

app = Flask(__name__)
CORS(app, origins="192.168.18.29:8081")

# Load the pre-trained model
model = load_model('./models/FV.h5')
model_new =load_model('./models/new_food.h5')




# Define the labels and categories
labels = {0: 'apple', 1: 'banana', 2: 'beetroot', 3: 'bell pepper', 4: 'cabbage', 5: 'capsicum', 6: 'carrot',
          7: 'cauliflower', 8: 'chilli pepper', 9: 'corn', 10: 'cucumber', 11: 'eggplant', 12: 'garlic', 13: 'ginger',
          14: 'grapes', 15: 'jalepeno', 16: 'kiwi', 17: 'lemon', 18: 'lettuce', 19: 'mango', 20: 'onion', 21: 'orange', 
          22: 'paprika', 23: 'pear', 24: 'peas', 25: 'pineapple', 26: 'pomegranate', 27: 'potato', 28: 'raddish', 
          29: 'soy beans', 30: 'spinach', 31: 'sweetcorn', 32: 'sweetpotato', 33: 'tomato', 34: 'turnip', 35: 'watermelon'}

fruit_names = ['apple', 'banana', 'bell pepper', 'chilli pepper', 'grapes', 'jalepeno', 'kiwi', 'lemon', 'mango', 
               'orange', 'paprika', 'pear', 'pineapple', 'pomegranate', 'watermelon']

vegetable_names = ['beetroot', 'cabbage', 'capsicum', 'carrot', 'cauliflower', 'corn', 'cucumber', 'eggplant', 'garlic', 
                   'ginger', 'lettuce', 'onion', 'peas', 'potato', 'raddish', 'soy beans', 'spinach', 'sweetcorn', 
                   'sweetpotato', 'tomato', 'turnip']

calories_per_100g = {
    'apple': 52,
    'banana': 89,
    'beetroot': 43,
    'bell pepper': 20,
    'cabbage': 25,
    'capsicum': 20,
    'carrot': 41,
    'cauliflower': 25,
    'chilli pepper': 18,
    'corn': 86,
    'cucumber': 16,
    'eggplant': 25,
    'garlic': 149,
    'ginger': 80,
    'grapes': 69,
    'jalapeño': 29,
    'kiwi': 61,
    'lemon': 29,
    'lettuce': 15,
    'mango': 60,
    'onion': 40,
    'orange': 47,
    'paprika': 282,
    'pear': 57,
    'peas': 81,
    'pineapple': 50,
    'pomegranate': 83,
    'potato': 77,
    'radish': 16,
    'soy beans': 446,
    'spinach': 23,
    'sweetcorn': 86,
    'sweet potato': 86,
    'tomato': 18,
    'turnip': 28,
    'watermelon': 30
}

def processed_img(img_path):
    img = load_img(img_path, target_size=(224, 224))
    img = img_to_array(img)
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    prediction = model.predict(img)
    y_class = prediction.argmax(axis=-1)[0]
    res = labels[y_class]
    return res.capitalize()

@app.route('/api/predict-calories', methods=['POST'])
def predict():    
    print(request.files)
    if 'image' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400

    if file:
        try:
            filename = file.filename
            file_path = os.path.join('./uploads', filename)
            file.save(file_path)

            result = processed_img(file_path)
            # os.remove(file_path)  # Clean up the saved file

            category = 'Vegetable' if result.lower() in vegetable_names else 'Fruit'
            calories = calories_per_100g.get(result.lower(), 'Unknown')

            response = {
                'success': True,
                'category': category,
                'name': result,
                'calories_per_100g': calories
            }

            return jsonify(response)
        except Exception as e:
            return jsonify({'success':False,'error': str(e)}), 200

@app.route('/api/predict', methods=['POST'])
def predict():    
    print(request.files)
    if 'image' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400

    if file:
        try:
            filename = file.filename
            file_path = os.path.join('./uploads', filename)
            file.save(file_path)

            result = processed_img(file_path)
            os.remove(file_path)  # Clean up the saved file
            img=image.load_img(file_path,target_size=(64,64)) #load and reshaping the image
            x=image.img_to_array(img)#converting image to array
            x=np.expand_dims(x,axis=0)#changing the dimensions of the image

            pred = model.predict(x)  # predicting classes
            print(pred)  # printing the prediction
            index = ['French Fries', 'Pizza', 'Samosa']
            result = str(index[pred.argmax()])
            print(result)

            response = {
                'success': True,
                'result': result
            }

            return jsonify(response)
        except Exception as e:
            return jsonify({'success':False,'error': str(e)}), 200


if __name__ == "__main__":
    if not os.path.exists('./uploads'):
        os.makedirs('./uploads')
    app.run(host='0.0.0.0',port=3000)
