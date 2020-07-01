from flask import Flask, render_template
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/2006_Draft_Analysis"
mongo = PyMongo(app)

@app.route("/")
def index():
    data = mongo.db["2006_Draft_Analysis_Collection"].find({})
    print(list(data))
    # render an index.html template and pass it the data you retrieved from the database
    #return render_template("index.html", data=data, data2=data2, )
    return "Bagel, Dave?"

if __name__ == "__main__":
    app.run(debug=True)