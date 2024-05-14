from flask import Flask, request
import pytesseract
import cv2
import numpy as np
from openai import OpenAI
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:@localhost/medicare'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


class ResultAnalysis(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(255))
    user_id = db.Column(db.Integer)
    result = db.Column(db.Text)
    
    def __repr__(self):
        print(self.user_id)
        return f'<ResultAnalysis id={self.id}, image_url={self.image_url}, result={self.result},user_id={self.user_id}>'

@app.route('/', methods=['POST'])
def hello_world():
    # Save the image URL
    image_url = request.form.get('image_url')
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
                "content": "ANALYZE RESULTS BELOW " + text
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
    return ai_result

if __name__ == '__main__':
    app.run()
