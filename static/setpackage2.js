function setPackaging2(isPackaging) {
    // Set the 'packaging' cookie based on the user's choice
    localStorage.setItem('packagingPreference', isPackaging);

    const totalPrice = localStorage.getItem('totalPrice');
    const packagingPreference = localStorage.getItem('packagingPreference');
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails')); // JSON.parse를 사용하여 객체로 변환

    sendOrderToServer(totalPrice, packagingPreference, orderDetails);
}

function sendOrderToServer(totalPrice, packagingPreference, orderDetails) {
    const userName = localStorage.getItem('name');
    const userAge = localStorage.getItem('age');

    fetch("/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            totalPrice: totalPrice,
            packagingPreference: packagingPreference,
            orderDetails: orderDetails,
            name: userName,  
            age: userAge     
        }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        if (data.status === 'success') {
            window.location.href = '/order'; // 성공적인 경우에만 리디렉션
        } else {
            alert('Error submitting order. Please try again.');
        }
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
    });
}
