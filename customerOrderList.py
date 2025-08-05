import os
import csv
import json

ORDER_CSV_FILE = 'customerOrderList.csv'


# 주문 내역을 csv파일에 저장하는 함수 
def save_order_list(total_price, packaging_preference, order_details, name="default", age=-1):
    # Check if the CSV file exists, if not, create it with header
    if not os.path.exists(ORDER_CSV_FILE):
        with open(ORDER_CSV_FILE, 'w', newline='') as csvfile:
            fieldnames = ['Name', 'Age', 'Total Price', 'Packaging Preference', 'Order Details']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()

    # Append the order details to the CSV file
    with open(ORDER_CSV_FILE, 'a', newline='') as csvfile:
        fieldnames = ['Name', 'Age', 'Total Price', 'Packaging Preference', 'Order Details']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writerow({
            'Name': name,
            'Age': age,
            'Total Price': total_price,
            'Packaging Preference': packaging_preference,
            'Order Details': order_details
        })
     
        
#로그인 한 회원의 주문 내역을 불러오는 함수
def get_order_list(name, age):
    previous_order_list = []
    with open(ORDER_CSV_FILE, 'r', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        # Convert DictReader to list and skip the first row
        rows = list(reader)
        
        # # Iterate over the remaining rows in reverse order
        for row in reversed(rows):
            if row['Name'] == name and row['Age'] == str(age):
                previous_order_list.append(row['Total Price'])
                previous_order_list.append(row['Packaging Preference'])
                previous_order_list.append(row['Order Details'])
                
                return previous_order_list
                
        return None


# 주문 내역 전처리 함수
# str형의 주문 내역을 json 형태로 변환
def preprocessing(order_details):
    order_details = order_details
    order_details = order_details.replace("'", '"')
    order_details = json.loads(order_details)
    
    return order_details