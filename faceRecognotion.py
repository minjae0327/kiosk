import os
import cv2
import chardet
import numpy as np
import pandas as pd
import face_recognition


customer_database = 'customerDatabase.csv'


def detect_face(img):
    img = cv2.imread(img)
    try:
        face_loc = face_recognition.face_locations(img)[0] #Test 이미지에서 얼굴 위치 찾기
        return True
    except:
        return False
    

def get_descriptor(img):
    img = cv2.imread(img)
    encode = face_recognition.face_encodings(img)[0] #Test 이미지에서 얼굴 인코딩하기
    
    return encode


# 회원가입시 사용된 이름과 나이, 기술자(사진)를 csv파일에 저장
# 사진은 dlib를 통해 128차원 벡터로 변환되어 넘파이 배열로 저장
# 넘파이 배열의 위치를 csv파일에 저장
def save_to_csv(name, age, customer_file):
    customer_img = cv2.imread(customer_file)
    customer_descriptors = face_recognition.face_encodings(customer_img)[0]
    np.save('data/' + name + '.npy', customer_descriptors)
    loc = 'data/' + name + '.npy'
    data = {'Name': [name], 'Age': [age], 'descriptor': [loc]}
    dataframe = pd.DataFrame(data)
    if not os.path.exists(customer_database):
        dataframe.to_csv(customer_database, index=False, encoding='cp949')
    else:
        dataframe.to_csv(customer_database, mode='a', header=False, index=False, encoding='cp949')



# 로그인 함수, 비디오 파일을 받아와서 얼굴을 인식
def login(image_path):
    # Get the customer descriptor from the database
    database_descriptors = get_customer_descriptors()
            
    video_descriptor = get_descriptor(image_path)
    # Compare the descriptors
    return get_customer_info(database_descriptors, video_descriptor)
            

# 데이터베이스에서 기술자들을 가져옴
def get_customer_descriptors():
    # df의 모든 descroptor를 customer_decriptors에 요소로 하나씩 저장
    
    df = pd.DataFrame(pd.read_csv(open(customer_database, encoding='cp949')))
    customer_descriptors = [np.load(descriptor) for descriptor in df['descriptor'].values]
    
    return customer_descriptors            


# 매치되는 기술자의 이름과 나이를 반환    
def get_customer_info(customer_descriptors, video_descriptor):
    df = pd.DataFrame(pd.read_csv(open(customer_database, encoding='cp949')))

    length = len(customer_descriptors)
    for i in range(length):
        if compare_descriptors(customer_descriptors[i], video_descriptor):
            name, age = df['Name'].values[i], df['Age'].values[i]
            return name, age
    
    return None, None


# 로그인 사진과 데이터베이스에 저장된 기술자를 비교
# 기술자 비교를 통해 얼굴이 일치하는지 확인
def compare_descriptors(descriptor1, descriptor2, tolerance=0.6):
    results = face_recognition.compare_faces([descriptor1],descriptor2, tolerance) #인코딩한 이미지를 비교하기
    
    return results[0]