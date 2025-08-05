const camera = document.getElementById('camera');
const signinbtn = document.getElementById('signinbtn');
const notification = document.getElementById('notification');
const back_button = document.getElementById('back_button');
const mypopup = document.getElementById('mypopup');

// 로그인 버튼에 클릭 이벤트 리스너 추가
if (signinbtn) {
    signinbtn.addEventListener('click', function (event) {
        event.preventDefault(); // 이벤트 기본 동작 중단
        checkFaceRecognition(); // 로그인 버튼 클릭 시 얼굴 인식 시도
    });
}

// Check for face recognition
const checkFaceRecognition = async () => {
    const photo = cameraInput.files[0];
    
    if (!photo) {
        // 이미지가 선택되지 않은 경우 처리
        return;
    }

    const formData = new FormData();
    formData.append('cameraInput', photo);

    const recognitionResult = await recognizeFaceOnServer(formData);

    if (recognitionResult.isRecognized) {
        showConfirmationPopup(recognitionResult.name, recognitionResult.age);
    } else {
        showRecognitionFailurePopup();
    }
};

const recognizeFaceOnServer = async (formData) => {
    try {
        const serverResponse = await fetch('/mobilelogin', {
            method: 'POST',
            body: formData,
        });

        const recognitionResult = await serverResponse.json();

        return recognitionResult;
    } catch (error) {
        console.error('Error during face recognition:', error);
        return { isRecognized: false };
    }
};

const showConfirmationPopup = (name, age) => {
    mypopup.style.display = 'block';
    mypopup.innerHTML = `
        <div class="popup-content">
            <span class="close" onclick="closePopup()">&times;</span>
            <p>${name}(${age})님 맞으십니까?</p>
            <button class="confirm-button" onclick="confirmLogin('${name}', '${age}')">예</button>
            <button class="deny-button" onclick="retryRecognition()">아니오</button>
        </div>
    `;
};


const showRecognitionFailurePopup = () => {
    notification.style.display = 'block';
    notification.innerHTML = `
        <div class="popup-content">
            <span class="close" onclick="closeNotification()">&times;</span>
            <p>얼굴을 인식할 수 없습니다.</p>
        </div>
    `;
};

const closeNotification = () => {
    notification.style.display = 'none';
};

const confirmLogin = (name, age) => {
    // Save name and age to localStorage
    localStorage.setItem('name', name);
    localStorage.setItem('age', age);

    // Redirect to the memberorder page
    window.location.href = '/memberorder';
};


const retryRecognition = () => {
    mypopup.style.display = 'none';
    notification.innerHTML = '';
    // checkFaceRecognition();
};
const goBack = () => {
    window.history.back();
};

const closePopup = () => {
    mypopup.style.display = 'none';
};

document.addEventListener("DOMContentLoaded", function() {
    // checkFaceRecognition();
});

document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault();
    checkFaceRecognition();
});

document.getElementById('back_button').addEventListener('click', function(event) {
    event.preventDefault();
    window.history.back();
});

// Initial check for face recognition (you may need to call this function at intervals)
checkFaceRecognition();
