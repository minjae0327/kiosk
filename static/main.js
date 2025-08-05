function forMember(){
    if (isMobileDevice()) {
        window.location.href = '/login';
    }
    else {
        window.location.href = '/login';
    }
}

// 타깃 디바이스가 모바일인지 아니지를 확인하는 함수
function isMobileDevice() {
    return typeof window.orientation !== "undefined" || 
    navigator.userAgent.indexOf('IEMobile') !== -1;
}


function forNonMember() {
    const name = 'default';
    localStorage.setItem('name', name);

    const age = -1;
    localStorage.setItem('age', age);

    window.location.href = '/chooseFastOrder';
}


function signup()
{
    window.location.href = '/signup';
}

// 페이지가 로드될 때 실행되는 함수
// window.onload = function() {
//     // button-container2 요소 가져오기
//     var buttonContainer2 = document.querySelector('.button-container2');
    
//     // 모바일 디바이스인 경우에만 클래스 추가
//     if (isMobileDevice()) {
//         pass;
//     } else {
//         buttonContainer2.style.display = 'none';
//     }
// };
 