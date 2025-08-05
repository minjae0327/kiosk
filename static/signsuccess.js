cnt = 5

function page_return() {
    if (cnt == 0) {
        window.location.href="/"
    }else{
        const cntsec = document.getElementById('cntsec')
        cntsec.innerText = cnt + "초 후에 화면이 전환됩니다."
        setTimeout("page_return()", 1000)
        cnt --
    };
};

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", page_return);