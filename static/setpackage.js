function setPackaging(isPackaging) {
    // Set the 'packaging' cookie based on the user's choice
    localStorage.setItem('packagingPreference', isPackaging);

    // Additional code to send the packaging preference to the server
    //sendPackagingPreferenceToServer(isPackaging);
    
    // Redirect to the '/order' page
    window.location.href = '/main2';
}

// 추가: 포장 여부 확인 함수
function getPackagingPreferenceFromCookie() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'packaging') {
            return value === 'true';
        }
    }
    return false;
}