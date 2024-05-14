from flask import Flask, flash, request, redirect, url_for
import pytesseract
import cv2
import numpy as np
from openai import OpenAI
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json


UPLOAD_FOLDER = './images'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:@localhost/medicare'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
db = SQLAlchemy(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


class ResultAnalysis(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    #image_url = db.Column(db.String(255))
    image_url='text'
    user_id = db.Column(db.Integer)
    result = db.Column(db.Text)
    
    def __repr__(self):
        print(self.user_id)
        return f'<ResultAnalysis id={self.id}, image_url={self.image_url}, result={self.result},user_id={self.user_id}>'

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'image' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['image']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('uploaded_file',
                                    filename=filename))

@app.route('/', methods=['POST'])
def hello_world():
    # Save the image URL
    #image_url = upload_file()
    image_url=request.form.get('image_url')
    user_id = request.form.get('user_id')
    print(user_id)
    # Your existing code for OCR
    file = request.files['image']
    nparr = np.fromstring(file.read(), np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    text = pytesseract.image_to_string(image)

    # Perform AI analysis
    client = OpenAI(api_key="sk-proj-6j92qSjkNG3KNKOOWBQNT3BlbkFJyO0awHFDUc6Bv8s5D6N6")
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "HI"
            }
        ],
        model="gpt-3.5-turbo",
    )
    ai_result = chat_completion.choices[0].message.content

    # Save the OCR result and AI result
    result_analysis = ResultAnalysis(image_url=image_url, result=ai_result,user_id=user_id)
    db.session.add(result_analysis)
    db.session.commit()

    # Return the AI result
    return json.dumps({"ai_result": ai_result})

if __name__ == '__main__':
    app.run()
