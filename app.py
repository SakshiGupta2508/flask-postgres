from flask import Flask, render_template, request, jsonify
from dao import get_data, edit_data, delete_data, insert_data, filter_data

app = Flask(__name__)


@app.route('/')
def show_page():
    return render_template('store.html')


@app.route('/getdata', methods=['GET'])
def gettingdata():
    data = get_data()
    return jsonify(data)


@app.route('/updatedata', methods=['PUT'])
def updatingdata():
    request_data = request.get_json()
    preEditData = request_data['preEditData']
    postEditData = request_data['postEditData']
    edit_data(preEditData, postEditData)
    # return jsonify(edit_response)
    return 'Edited'


@app.route('/deletedata', methods=['DELETE'])
def deletingdata():
    id = request.get_json()
    delete_data(id)
    return 'Deleted'


@app.route('/insertdata', methods=['POST'])
def insertingdata():
    data = request.get_json()
    insert_data(data)
    return 'Added'


@app.route('/getfilterdata', methods=['GET', 'POST'])
def filteringdata():
    request_data = request.get_json()
    data = filter_data(request_data)
    return jsonify(data)

@app.route('/contact', methods=['GET', 'POST'])
def contactpage():
    return render_template('contact.html')

if __name__ == '__main__':
    #app.run("0.0.0.0",port=80,debug=True)
    app.run(debug=True)
