from flask import Flask, jsonify, request
import pytesseract
import cv2
import numpy as np
from openai import OpenAI

app = Flask(__name__)

def analysis(text):
    client = OpenAI(api_key="sk-proj-6j92qSjkNG3KNKOOWBQNT3BlbkFJyO0awHFDUc6Bv8s5D6N6")
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "analyze below results"+text,
            }
        ],
        model="gpt-3.5-turbo",
    )

     #Extract relevant information from chat_completion object
    if chat_completion:
        print(chat_completion)
        response = chat_completion
    else:
        response = "Movie not found"
        print("No movie names found in the user input.")

    return response


@app.route('/api/analysis', methods=['POST'])
def image_to_text_and_analyse():

    try:
         #Get image file from request
        file = request.files['image']
         #Read image using OpenCV
        nparr = np.fromstring(file.read(), np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
         #Perform OCR using PyTesseract
        text = pytesseract.image_to_string(image)
         #Call analysis function with the OCR result
        chat_completion = analysis(text)
         #Return JSON response
        return jsonify(chat_completion)
    except KeyError:
         #If 'image' key is missing in the request
        return jsonify({"error": "Image file is missing in the request"}), 400
    except Exception as e:
         #Catch any other exceptions and return as internal server error
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)
