from flask import Flask
 
# Flask constructor takes the name of 
# current module (_name_) as argument.
app = Flask(__name__)
 
# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/test',methods=['GET'] )
# ‘/’ URL is bound with hello_world() function.
def hello_world():
        print('hello')
        return 'Hello World'
 
# main driver function
if __name__ == '_main_':
 
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run(debug=True)
