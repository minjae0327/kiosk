let orderedData = [];
const modal = document.getElementById('myModal');
const isPopupDisplayed = false;

function getCustomerOrderData() {
    if (isPopupDisplayed) {
        return;
    }

    const storedName = localStorage.getItem('name');
    const storedAge = localStorage.getItem('age');

    formData = new FormData();
    formData.append('name', storedName);
    formData.append('age', storedAge);

    fetch('/memberorder', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(result => {
        console.log('Server response:', result);
        if (result.status === 'success') {
            saveOrderedData(result.totalPrice, result.packagingPreference, result.orderDetails);
            populateTable();
        } else {
            showNoOrderPopup();
        }
    })
    .catch(error => {
        console.error('Error processing order:', error);
        showNoOrderPopup();
    });
}

function saveOrderedData(resultTotalPrice, resultPackagingPreference, resultOrderDetails) {
    orderedData = {
        totalPrice: resultTotalPrice,
        packagingPreference: resultPackagingPreference,
        orderDetails: resultOrderDetails
    };
}

function showNoOrderPopup() {
    modal.style.display = 'block';
    isPopupDisplayed = true;
}

function populateTable() {
    const tableContent = document.getElementById('tableContent');
    tableContent.innerHTML = '';

    orderedData.orderDetails.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.classList.add('table-row');
        orderDiv.style.border = '1px solid black';
        orderDiv.style.marginBottom = '10px'; // 테이블 행 사이 간격 조절

        const nameDiv = document.createElement('div');
        nameDiv.textContent = order.menuName;
        nameDiv.classList.add('table-data');
        orderDiv.appendChild(nameDiv);

        const detailDiv = document.createElement('div');
        // 각 상세사항을 한 줄에 출력, undefined인 경우 'x'로 대체
        const shotAdded = order.shotAdded !== undefined ? order.shotAdded : 'x';
        const size = order.size !== undefined ? order.size : 'x';
        const sugarAdded = order.sugarAdded !== undefined ? order.sugarAdded : 'x';
        detailDiv.textContent = `${shotAdded}, ${size}, ${sugarAdded}`;
        detailDiv.classList.add('table-data');
        orderDiv.appendChild(detailDiv);

        const priceDiv = document.createElement('div');
        priceDiv.textContent = '4000원';
        priceDiv.classList.add('table-data');
        orderDiv.appendChild(priceDiv);

        const quantityDiv = document.createElement('div');
        quantityDiv.textContent = order.count;
        quantityDiv.classList.add('table-data');
        orderDiv.appendChild(quantityDiv);

        tableContent.appendChild(orderDiv);
    });

    const packagingPreferenceDiv = document.getElementById('packagingInfo');
    packagingPreferenceDiv.textContent = '포장여부: ' + (orderedData.packagingPreference.toLowerCase() === 'true' ? 'O' : 'X');
    packagingPreferenceDiv.classList.add('table-data');

    const totalPriceDiv = document.getElementById('totalAmount');
    totalPriceDiv.textContent = '총액: ' + orderedData.totalPrice;
    totalPriceDiv.classList.add('table-data');
}

function confirmOrder(){
    localStorage.setItem('totalPrice', orderedData.totalPrice);
    localStorage.setItem('packagingPreference', orderedData.packagingPreference);
    localStorage.setItem('orderDetails', JSON.stringify(orderedData.orderDetails));
    window.location.href = '/setpackage2';
}

function newOrder() {
    window.location.href = '/chooseFastOrder';
}

getCustomerOrderData();
