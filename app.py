from flask import Flask, render_template, request, send_from_directory, jsonify
import faceRecognotion as fr
import customerOrderList as orderList
import json
import os

import ssl
from flask import redirect

app = Flask(__name__)

# Directory to store uploaded images
UPLOAD_FOLDER = 'kiosk_app\data'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the 'data' directory exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

last_recognition_time = 0


@app.before_request
def before_request():
    if request.url.startswith('http://'):
        url = request.url.replace('http://', 'https://', 1)
        code = 301
        return redirect(url, code=code)

@app.route('/')
def main():
    return render_template('main.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    elif request.method == 'POST':
        try:
            # Check if the 'video' file exists in the request
            if 'video' not in request.files:
                print('error')
                return jsonify({'isRecognized': False, 'error': 'No video file'})

            video_file = request.files['video']
            
            # Check if the file is not empty
            if video_file.filename == '':
                return jsonify({'isRecognized': False, 'error': 'No selected video file'})
            # Get the video file path
            video_path = os.path.join(app.config['UPLOAD_FOLDER'], video_file.filename)

            # Save the video file to the server
            video_file.save(video_path)

            name, age = fr.login(video_path)

            # 성공여부와 이름, 나이 반환
            if name is not None:
                os.remove(video_path)
                age = int(age)
                return jsonify({'isRecognized': True, 'name': name, 'age': age})
            else:
                os.remove(video_path)
                return jsonify({'isRecognized': False})

            return jsonify({'isRecognized': False, 'error': 'Not enough time elapsed between recognitions'})

        except Exception as e:
            print(f"Error: {e}")
            # Send an error response
            return jsonify({'isRecognized': False, 'error': 'Error during face recognition'})


@app.route('/mobilelogin', methods=['GET', 'POST'])
def mobilelogin():
    if request.method == 'GET':
        return render_template('mobilelogin.html')
    elif request.method == 'POST':
        try:
            # Check if the 'cameraInput' file exists in the request
            if 'cameraInput' not in request.files:
                return jsonify({'isRecognized': False, 'error': 'No image file'})

            # Get the image file from the request
            image = request.files['cameraInput']
    
            # Check if the file is not empty
            if image.filename == '':
                return jsonify({'isRecognized': False, 'error': 'No selected image file'})

            # Save the image to the server
            filename = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
            image.save(filename)

            # Check if a face is detected in the image
            if fr.detect_face(filename) == False:
                os.remove(filename)
                return jsonify({'isRecognized': False, 'error': '얼굴이 감지되지 않았습니다. 다시 사진을 등록해주세요.'})

            # Perform face recognition
            name, age = fr.login(filename)
            
            # 성공 여부와 이름, 나이 반환
            if name is not None:
                os.remove(filename)
                age = int(age)
                return jsonify({'isRecognized': True, 'name': name, 'age': age})
            else:
                os.remove(filename)
                return jsonify({'isRecognized': False})

        except Exception as e:
            os.remove(filename)
            print(f"Error: {e}")
            # Send an error response
            return jsonify({'isRecognized': False, 'error': 'Error during face recognition'})
 
       
@app.route('/kioskNoOption')
def kioskNoOption():
    return render_template('kioskNoOption.html')


@app.route('/kioskWithOption')
def kioskWithOption():
    return render_template('kioskWithOption.html')


#로그인 후 주문 내역을 불러오는 페이지
@app.route('/memberorder', methods=['GET', 'POST'])
def memberorder():
    if request.method == 'GET':
        return render_template('memberorder.html')
    else:
        try:
            name = request.form['name']
            age = request.form['age']
            
            previous_order_list = orderList.get_order_list(name, age)
            print(previous_order_list)
            
            if previous_order_list is None:
                return jsonify({'status': 'error'})
            
            else:
                totalPrice = previous_order_list[0]
                packagingPreference = previous_order_list[1]
                orderDetails = orderList.preprocessing(previous_order_list[2])
                
                return jsonify({'status': 'success', 'totalPrice': totalPrice, 'packagingPreference': packagingPreference, 'orderDetails': orderDetails})
        
        except Exception as e:
            error_message = f"Error in memberorder route: {e}"
            print(error_message)
            return jsonify({'status': 'error', 'message': error_message})


#회원가입 페이지
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'GET':
        # This is for loading the signup page
        return render_template('signup.html')
    elif request.method == 'POST':
        try:
            # Get form data
            name = request.form['name']
            age = request.form['age']
            file = request.files['photo']
            
            if file:
                filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
                file.save(filename)
            
            # Check if the uploaded photo contains a face
            if fr.detect_face(filename):
                # 얼굴 사진을 dlib를 통해 128차원 벡터로 변환
                fr.save_to_csv(name, age, filename)
                #print(f"Name: {name}, Age: {age}, Image saved as: {filename}")
                os.remove(filename)
                return jsonify({'status': 'success'})
            else:
                # If no face is detected, return an error status
                os.remove(filename)
                return jsonify({'status': 'error', 'message': '얼굴이 감지되지 않았습니다. 다시 사진을 등록해주세요.'})
    
        except Exception as e:
            print(f"Error: {e}")
            # Send an error response
            return jsonify({'status': 'error'})


@app.route('/chooseFastOrder')
def chooseFastOrder():
    return render_template('chooseFastOrder.html')

# Serve uploaded images
@app.route('/data/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


#회원가입 성공 페이지
@app.route('/signsuccess')
def signsuccess():
    return render_template('signsuccess.html')


#
@app.route('/setpackage')
def setpackage():
    return render_template('setpackage.html')


@app.route('/setpackage2')
def setpackage2():
    return render_template('setpackage2.html')



#주문 페이지
@app.route('/order', methods=['GET', 'POST'])
def order():
    if request.method == 'GET':
        return render_template('order.html')
    else:
        try:
            # JSON 데이터로 받기
            data = request.get_json()
            
            total_price = data['totalPrice']
            packaging_preference = data['packagingPreference']
            order_details = data['orderDetails']
            name = data['name']  
            age = data['age']

            # Save the order list
            if name == 'default':
                orderList.save_order_list(total_price, packaging_preference, order_details)
            else:
                orderList.save_order_list(total_price, packaging_preference, order_details, name, age)
            
            # Assume the order submission is successful and send a success response
            return jsonify({'status': 'success'})
        
        except Exception as e:
            print(f"Error submitting order: {e}")
            # Send an error response
            return jsonify({'status': 'error'})
        

if __name__ == '__main__':
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    ssl_context.load_cert_chain(certfile='usr\local\ssl\server.crt', 
                                keyfile='usr\local\ssl\server.key')
    
    app.run(host='0.0.0.0', port=5001, ssl_context=ssl_context, debug=True)

