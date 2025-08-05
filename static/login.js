const video = document.createElement('video');
const camera = document.getElementById('camera');
const notification = document.getElementById('notification');
const back_button = document.getElementById('back_button');
const mypopup = document.getElementById('mypopup');

navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
    .then(stream => {
        video.srcObject = stream;
        video.play();
        camera.appendChild(video);

        // Call the function to capture and send frames
        captureAndSendFrames(stream);
    })
    .catch(error => {
        console.error('Error accessing camera:', error);
        notification.innerHTML = '<p>카메라에 접근할 수 없습니다.</p>';
    });

function captureAndSendFrames(stream) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    video.addEventListener('loadeddata', () => {
        setInterval(() => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(blob => {
                const formData = new FormData();
                formData.append('video', blob, 'video.jpg');

                fetch('/login', {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(recognitionResult => {
                    if (recognitionResult.isRecognized) {
                        showConfirmationPopup(recognitionResult.name, recognitionResult.age);
                    } else {
                        showRecognitionFailurePopup();
                    }
                })
                .catch(error => {
                    console.error('Error during face recognition:', error);
                    showRecognitionFailurePopup();
                });
            }, 'image/jpeg');
        }, 1000);
    });
}

// 얼굴 인식 성공 시
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


function showRecognitionFailurePopup() {
    notification.innerHTML = '<p>얼굴을 인식할 수 없습니다.</p>';
}

const confirmLogin = (name, age) => {
    // Save name and age to localStorage
    localStorage.setItem('name', name);
    localStorage.setItem('age', age);

    // Redirect to the memberorder page
    window.location.href = '/memberorder';
};


function retryRecognition() {
    notification.innerHTML = '';
    captureAndSendFrames();
}

function goBack() {
    window.history.back();
}

function closePopup() {
    mypopup.style.display = 'none';
}
