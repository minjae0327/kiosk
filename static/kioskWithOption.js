const orderBoard = document.querySelector('#order_board');
const payButton = document.querySelector('#pay_button');


const prices = {
    "따뜻한 아메리카노": 4000,
    "시원한 아메리카노": 4000,
    "따뜻한 라떼": 5000,
    "시원한 라떼": 5000,
    "콜드 브루" : 5000,
    "딸기 에이드": 4000,
    "라임 에이드": 4000,
    "복숭아 에이드": 5000,
    "자두 에이드": 5000,
    "초콜릿 프라페": 4000,
    "녹차 프라페": 4000,
    "키위 프라페": 5000,
    "오렌지 프라페": 5000
};


/* 선택한 메뉴판에 따라 다른 음료를 보여줌 */
function menu_tab_move(e) {
    let menuTabNameId = e.currentTarget;
    let menuTabName = menuTabNameId.innerText;
    let menuBoard = document.getElementById("menu_board");
    if (menuTabName == '커피') {
        menuBoard.innerHTML = `
            <section class="menu_sec">
                <div class="img_wrap">
                    <img src="${window.baseUrl}src/coffee/hot_americano.png" alt="">
                </div>
                <div class="menu_name" id="Hot_A">따뜻한 아메리카노</div>
                <div class="menu_price" id="HA_P">4000원</div>
                 <div class="menu_options">
                <!-- 샷 추가 옵션 -->
                <select class="option_shot">
                    <option value="shot 1">Shot 1</option>
                    <option value="shot 2">Shot 2</option>
                    <option value="shot X">Shot X</option>
                </select>
                <!-- 사이즈 옵션 -->
                <select class="option_size">
                    <option value="Legular">Legular</option>
                    <option value="Grande">Gradne</option>
                </select>
                <!-- 설탕 추가 옵션 -->
                <select class="option_sugar">
                    <option value="sugar Plus">설탕 추가</option>
                    <option value="no sugar">설탕 추가X</option>
                </select>

            </div>
            </section>
            <section class="menu_sec">
                <div class="img_wrap">
                    <img src="${window.baseUrl}src/coffee/ice_americano.png" alt="">
                </div>
                <div class="menu_name" id="Ice_A">시원한 아메리카노</div>
                <div class="menu_price" id="IA_P">4000원</div>
                 <div class="menu_options">
                <!-- 샷 추가 옵션 -->
                <select class="option_shot">
                    <option value="shot 1">Shot 1</option>
                    <option value="shot 2">Shot 2</option>
                    <option value="shot X">Shot X</option>
                </select>
                <!-- 사이즈 옵션 -->
                <select class="option_size">
                    <option value="Legular">Legular</option>
                    <option value="Grande">Gradne</option>
                </select>
                <!-- 설탕 추가 옵션 -->
                <select class="option_sugar">
                    <option value="sugar Plus">설탕 추가</option>
                    <option value="no sugar">설탕 추가X</option>
                </select>

            </div>
            </section>
            <section class="menu_sec">
                <div class="img_wrap">
                    <img src="${window.baseUrl}src/coffee/hot_latte.png" alt="">
                </div>
                <div class="menu_name" id="Hot_L">따뜻한 라떼</div>
                <div class="menu_price" id="HL_P">5000원</div>
                <div class="menu_options">
                 <div class="menu_options">
                <!-- 샷 추가 옵션 -->
                <select class="option_shot">
                    <option value="shot 1">Shot 1</option>
                    <option value="shot 2">Shot 2</option>
                    <option value="shot X">Shot X</option>
                </select>
                <!-- 사이즈 옵션 -->
                <select class="option_size">
                    <option value="Legular">Legular</option>
                    <option value="Grande">Gradne</option>
                </select>
                <!-- 설탕 추가 옵션 -->
                <select class="option_sugar">
                    <option value="sugar Plus">설탕 추가</option>
                    <option value="no sugar">설탕 추가X</option>
                </select>

            </div>
            </section>
            <section class="menu_sec">
                <div class="img_wrap">
                    <img src="${window.baseUrl}src/coffee/ice_latte.png" alt="">
                </div>
                <div class="menu_name" id="Ice_L">시원한 라떼</div>
                <div class="menu_price" id="IL_P">5000원</div>
                 <div class="menu_options">
                <!-- 샷 추가 옵션 -->
                <select class="option_shot">
                    <option value="shot 1">Shot 1</option>
                    <option value="shot 2">Shot 2</option>
                    <option value="shot X">Shot X</option>
                </select>
                <!-- 사이즈 옵션 -->
                <select class="option_size">
                    <option value="Legular">Legular</option>
                    <option value="Grande">Gradne</option>
                </select>
                <!-- 설탕 추가 옵션 -->
                <select class="option_sugar">
                    <option value="sugar Plus">설탕 추가</option>
                    <option value="no sugar">설탕 추가X</option>
                </select>

            </div>
            </section>
            <section class="menu_sec">
                <div class="img_wrap">
                    <img src="${window.baseUrl}src/coffee/ice_latte.png" alt="">
                </div>
                <div class="menu_name" id="Ice_L">콜드 브루</div>
                <div class="menu_price" id="IL_P">5000원</div>
                 <div class="menu_options">
                <!-- 샷 추가 옵션 -->
                <select class="option_shot">
                    <option value="shot 1">Shot 1</option>
                    <option value="shot 2">Shot 2</option>
                    <option value="shot X">Shot X</option>
                </select>
                <!-- 사이즈 옵션 -->
                <select class="option_size">
                    <option value="Legular">Legular</option>
                    <option value="Grande">Gradne</option>
                </select>
                <!-- 설탕 추가 옵션 -->
                <select class="option_sugar">
                    <option value="sugar Plus">설탕 추가</option>
                    <option value="no sugar">설탕 추가X</option>
                </select>

            </div>
            </section>
        `;
        const newMenuSections = menuBoard.querySelectorAll('.menu_sec');
        newMenuSections.forEach(function(menuSection) {
            menuSection.addEventListener('click', total_menu_count);
            });
    }else if (menuTabName=='에이드') {
        menuBoard.innerHTML = `
        <section class="menu_sec">
            <div class="img_wrap">
            <img src="${window.baseUrl}src/ade/berry_Ade.png" alt="">
            </div>
            <div class="menu_name" id="Berry_Ade">딸기 에이드</div>
            <div class="menu_price" id="BA_P">4000원</div>
             <div class="menu_options">
                <!-- 샷 추가 옵션 -->
                <select class="option_shot">
                    <option value="shot 1">Shot 1</option>
                    <option value="shot 2">Shot 2</option>
                    <option value="shot X">Shot X</option>
                </select>
                <!-- 사이즈 옵션 -->
                <select class="option_size">
                    <option value="Legular">Legular</option>
                    <option value="Grande">Gradne</option>
                </select>
                <!-- 설탕 추가 옵션 -->
                <select class="option_sugar">
                    <option value="sugar Plus">설탕 추가</option>
                    <option value="no sugar">설탕 추가X</option>
                </select>

            </div>
        </section>
        <section class="menu_sec">
            <div class="img_wrap">
                <img src="${window.baseUrl}src/ade/lime_Ade.png" alt="">
            </div>
            <div class="menu_name" id="Lime_Ade">라임 에이드</div>
            <div class="menu_price" id="LA_P">4000원</div>
             <div class="menu_options">
                <!-- 샷 추가 옵션 -->
                <select class="option_shot">
                    <option value="shot 1">Shot 1</option>
                    <option value="shot 2">Shot 2</option>
                    <option value="shot X">Shot X</option>
                </select>
                <!-- 사이즈 옵션 -->
                <select class="option_size">
                    <option value="Legular">Legular</option>
                    <option value="Grande">Gradne</option>
                </select>
                <!-- 설탕 추가 옵션 -->
                <select class="option_sugar">
                    <option value="sugar Plus">설탕 추가</option>
                    <option value="no sugar">설탕 추가X</option>
                </select>

            </div>
        </section>
        <section class="menu_sec">
            <div class="img_wrap">
                <img src="${window.baseUrl}src/ade/peach_Ade.png" alt="">
            </div>
            <div class="menu_name" id="Peach_Ade">복숭아 에이드</div>
            <div class="menu_price" id="PeachA_P">5000원</div>
             <div class="menu_options">
                <!-- 샷 추가 옵션 -->
                <select class="option_shot">
                    <option value="shot 1">Shot 1</option>
                    <option value="shot 2">Shot 2</option>
                    <option value="shot X">Shot X</option>
                </select>
                <!-- 사이즈 옵션 -->
                <select class="option_size">
                    <option value="Legular">Legular</option>
                    <option value="Grande">Gradne</option>
                </select>
                <!-- 설탕 추가 옵션 -->
                <select class="option_sugar">
                    <option value="sugar Plus">설탕 추가</option>
                    <option value="no sugar">설탕 추가X</option>
                </select>

            </div>
        </section>
        <section class="menu_sec">
            <div class="img_wrap">
                <img src="${window.baseUrl}src/ade/plum_Ade.png" alt="">
            </div>
            <div class="menu_name" id="Plum_Ade">자두 에이드</div>
            <div class="menu_price" id="PlumA_P">5000원</div>
             <div class="menu_options">
                <!-- 샷 추가 옵션 -->
                <select class="option_shot">
                    <option value="shot 1">Shot 1</option>
                    <option value="shot 2">Shot 2</option>
                    <option value="shot X">Shot X</option>
                </select>
                <!-- 사이즈 옵션 -->
                <select class="option_size">
                    <option value="Legular">Legular</option>
                    <option value="Grande">Gradne</option>
                </select>
                <!-- 설탕 추가 옵션 -->
                <select class="option_sugar">
                    <option value="sugar Plus">설탕 추가</option>
                    <option value="no sugar">설탕 추가X</option>
                </select>

            </div>
        </section>
        `;
        const newMenuSections = menuBoard.querySelectorAll('.menu_sec');
        newMenuSections.forEach(function(menuSection) {
            menuSection.addEventListener('click', total_menu_count);
            });
    }else if (menuTabName=='블렌디드') {
        menuBoard.innerHTML = `
        <section class="menu_sec">
            <div class="img_wrap">
                <img src="${window.baseUrl}src/blended/choco_frappe.png" alt="">
            </div>
            <div class="menu_name" id="Hot_A">초코 프라페</div>
            <div class="menu_price" id="HA_P">4000원</div>
             <div class="menu_options">
                <!-- 샷 추가 옵션 -->
                <select class="option_shot">
                    <option value="shot 1">Shot 1</option>
                    <option value="shot 2">Shot 2</option>
                    <option value="shot X">Shot X</option>
                </select>
                <!-- 사이즈 옵션 -->
                <select class="option_size">
                    <option value="Legular">Legular</option>
                    <option value="Grande">Gradne</option>
                </select>
                <!-- 설탕 추가 옵션 -->
                <select class="option_sugar">
                    <option value="sugar Plus">설탕 추가</option>
                    <option value="no sugar">설탕 추가X</option>
                </select>

            </div>
        </section>
        <section class="menu_sec">
            <div class="img_wrap">
                <img src="${window.baseUrl}src/blended/green_frappe.png" alt="">
            </div>
            <div class="menu_name" id="Ice_A">녹차 프라페</div>
            <div class="menu_price" id="IA_P">4000원</div>
             <div class="menu_options">
                <!-- 샷 추가 옵션 -->
                <select class="option_shot">
                    <option value="shot 1">Shot 1</option>
                    <option value="shot 2">Shot 2</option>
                    <option value="shot X">Shot X</option>
                </select>
                <!-- 사이즈 옵션 -->
                <select class="option_size">
                    <option value="Legular">Legular</option>
                    <option value="Grande">Gradne</option>
                </select>
                <!-- 설탕 추가 옵션 -->
                <select class="option_sugar">
                    <option value="sugar Plus">설탕 추가</option>
                    <option value="no sugar">설탕 추가X</option>
                </select>

            </div>
        </section>
        <section class="menu_sec">
            <div class="img_wrap">
                <img src="${window.baseUrl}src/blended/kiwi_frappe.png" alt="">
            </div>
            <div class="menu_name" id="Hot_L">키위 프라페</div>
            <div class="menu_price" id="HL_P">5000원</div>
             <div class="menu_options">
                <!-- 샷 추가 옵션 -->
                <select class="option_shot">
                    <option value="shot 1">Shot 1</option>
                    <option value="shot 2">Shot 2</option>
                    <option value="shot X">Shot X</option>
                </select>
                <!-- 사이즈 옵션 -->
                <select class="option_size">
                    <option value="Legular">Legular</option>
                    <option value="Grande">Gradne</option>
                </select>
                <!-- 설탕 추가 옵션 -->
                <select class="option_sugar">
                    <option value="sugar Plus">설탕 추가</option>
                    <option value="no sugar">설탕 추가X</option>
                </select>

            </div>
        </section>
        <section class="menu_sec">
            <div class="img_wrap">
                <img src="${window.baseUrl}src/blended/orange_frappe.png" alt="">
            </div>
            <div class="menu_name" id="Ice_L">오렌지 프라페</div>
            <div class="menu_price" id="IL_P">5000원</div>
             <div class="menu_options">
                <!-- 샷 추가 옵션 -->
                <select class="option_shot">
                    <option value="shot 1">Shot 1</option>
                    <option value="shot 2">Shot 2</option>
                    <option value="shot X">Shot X</option>
                </select>
                <!-- 사이즈 옵션 -->
                <select class="option_size">
                    <option value="Legular">Legular</option>
                    <option value="Grande">Gradne</option>
                </select>
                <!-- 설탕 추가 옵션 -->
                <select class="option_sugar">
                    <option value="sugar Plus">설탕 추가</option>
                    <option value="no sugar">설탕 추가X</option>
                </select>

            </div>
        </section>
        `;
        const newMenuSections = menuBoard.querySelectorAll('.menu_sec');
        newMenuSections.forEach(function(menuSection) {
            menuSection.addEventListener('click', total_menu_count);
            });
    }
};

/*주문 목록에 메뉴를 추가*/
function total_menu_count(e) {
    let menu = e.currentTarget;
    let menuName = menu.querySelector(".menu_name").innerText;
    let menuPrice = prices[menuName];
    let shotAdded = menu.querySelector(".option_shot").value;
    let size = menu.querySelector(".option_size").value;
    let sugarAdded = menu.querySelector(".option_sugar").value;

    // 이미 주문 목록에 있는지 확인
    let existingOrderSection = findExistingOrderSection(menuName);

    if (existingOrderSection) {
        // 이미 주문 목록에 있는 경우 수량 증가
        menu_plus(existingOrderSection.querySelector('.click_button'));
    } else {
        // 주문 목록에 없는 경우 새로운 주문 섹션 추가
        let orderSection = document.createElement('section');
        orderSection.classList.add('order_sec');
        orderSection.innerHTML = `
            <p class="order_menu_name">${menuName}</p>
            <p class="order_menu_options_shot">Shot: ${shotAdded}</p>
            <p class="order_menu_options_size">Size: ${size}</p>
            <p class="order_menu_options_sugar">Sugar: ${sugarAdded}</p>
            <p class="order_menu_cnt">1</p>
            <p class="order_menu_price">${menuPrice}</p>
            <button class="click_button" onclick="menu_plus(this)">+</button>
            <button class="click_button" onclick="menu_down(this)">-</button>
            <button class="click_button" onclick="menu_remove(this)">x</button>
        `;
        orderBoard.appendChild(orderSection);
    }
}


function findExistingOrderSection(menuName) {
    // 이미 주문 목록에 있는지 확인하는 함수
    // 주문 목록이 없다면 null 반환
    if (orderBoard.childElementCount === 0) {
        return null;
    }
    // 주문 목록이 있다면 
    else {
        let orderSections = document.querySelectorAll('.order_sec');
        for (let i = 0; i < orderSections.length; i++) {
            // 각 orderSections[i]가 null인 경우를 확인
            if (orderSections[i]) {
                let orderName = orderSections[i].querySelector('.order_menu_name');
                // orderName이 null이 아닌 경우에만 비교
                if (orderName && orderName.innerText === menuName) {
                    return orderSections[i];
                }
            }
        }
        return null; // 찾지 못한 경우
    }
}

/*주문 목록의 메뉴를 더함*/
function menu_plus(button) {
    let cnt = button.parentElement.querySelector('.order_menu_cnt');
    let menuName = button.parentElement.querySelector('.order_menu_name');
    let menuPrice = button.parentElement.querySelector('.order_menu_price');
    cnt.innerText = Number(cnt.innerText) + 1;
    menuPrice.innerText = Number(cnt.innerText)*Number(prices[menuName.innerText]);
}

/*주문 목록의 메뉴를 뺌*/
function menu_down(button) {
    let cnt = button.parentElement.querySelector('.order_menu_cnt');
    let menuName = button.parentElement.querySelector('.order_menu_name');
    let menuPrice = button.parentElement.querySelector('.order_menu_price');
    cnt.innerText = Math.max(1, Number(cnt.innerText) - 1);
    menuPrice.innerText = Number(cnt.innerText)*Number(prices[menuName.innerText]);
}

/*주문 목록의 메뉴를 삭제*/
function menu_remove(button) {
    button.parentElement.remove();
}

/*총 주문 금액을 계산*/
function calculateTotalPrice() {
    let orderSections = document.querySelectorAll('.order_sec');
    let total = 0;
    orderSections.forEach(orderSection => {
        let priceElement = orderSection.querySelector('.order_menu_price');
        let countElement = orderSection.querySelector('.order_menu_cnt');
        if (priceElement && countElement) {
            let price = parseInt(priceElement.innerText);
            let count = parseInt(countElement.innerText);
            total += price;
        }
    });
    return total;
}

document.addEventListener('DOMContentLoaded', function() {
    const menuSections = document.querySelectorAll('.menu_sec');
    const menuTabs = document.querySelectorAll('.tab-list_trans');
    const payButton = document.querySelector('#pay_button');
    const packagingButton = document.getElementById('packagingButton');
    const noPackagingButton = document.getElementById('noPackagingButton');
    const modal = document.getElementById('myModal');
    const modal2 = document.getElementById('myModal2');
    const closeButton = document.querySelector('.close');
    const closeButton2 = document.querySelector('.close2');

    menuSections.forEach(function(menuSection) {
        menuSection.addEventListener('click', total_menu_count);
    });

    menuTabs.forEach(function(menuTab) {
        menuTab.addEventListener('click', menu_tab_move);
    });

    closeButton.addEventListener('click', function () {
        // 팝업 닫기 버튼 클릭 시 팝업 창 닫기
        closeModal();
    });

    closeButton2.addEventListener('click', function () {
        // 팝업 닫기 버튼 클릭 시 팝업 창 닫기
        closeModal2();
    });

    // 추가: 팝업 창 외부를 클릭하여도 닫히도록 설정
    window.addEventListener('click', function (event) {
        //modal2 또는 modal 외부를 클릭하면 닫힘
        if (event.target === modal) {
            closeModal();
        } else if (event.target === modal2) {
            closeModal2();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
    }

    function closeModal2() {
        modal2.style.display = 'none';
    }

    payButton.addEventListener('click', function (event) {
        if (calculateTotalPrice() === 0) {
            // Display a small pop-up when the shopping cart is empty
            modal2.style.display = 'block';
            event.preventDefault(); // Prevent the default behavior of the button click
        } else {
            modal.style.display = 'block';
    
            let totalPrice = calculateTotalPrice();
            let orderDetails = getOrderDetails();
    
            // Event listener for "포장" button
            packagingButton.addEventListener('click', function () {
                packagingPreference = true;
                handlePackaging(totalPrice, orderDetails);
            });
    
            // Event listener for "매장" button
            noPackagingButton.addEventListener('click', function () {
                packagingPreference = false;
                handlePackaging(totalPrice, orderDetails);
            });
        }
    });
    
    // Function to handle packaging preference and navigation
    function handlePackaging(totalPrice, orderDetails) {
        setPackaging(packagingPreference);
        
        // 주문 정보와 포장 여부를 order.html로 전달
        sendOrderToServer(totalPrice, packagingPreference, orderDetails);
    
        
        localStorage.setItem('totalPrice', totalPrice.toString());
        localStorage.setItem('packagingPreference', packagingPreference);
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    
        window.location.href = '/order';
    }
});

function setPackaging(isPackaging) {
    // Set the 'packaging' cookie based on the user's choice
    document.cookie = `packaging=${isPackaging}`;
}

// 추가: 주문한 커피 목록 확인 함수
function getOrderDetails() {
    let orderSections = document.querySelectorAll('.order_sec');
    let orderDetails = [];

    orderSections.forEach(orderSection => {
        let menuNameElement = orderSection.querySelector('.order_menu_name');
        let menuPriceElement = orderSection.querySelector('.order_menu_price');
        let countElement = orderSection.querySelector('.order_menu_cnt');
        let shotAddedElement = orderSection.querySelector(".order_menu_options_shot");
        let sizeElement = orderSection.querySelector(".order_menu_options_size");
        let sugarAddedElement = orderSection.querySelector(".order_menu_options_sugar");
        

        if (menuNameElement && countElement && shotAddedElement && sizeElement && sugarAddedElement ) {
            let menuName = menuNameElement.innerText;
            let count = parseInt(countElement.innerText);
            let price = parseInt(menuPriceElement.innerText);
            let shotAdded = shotAddedElement.innerText;
            let size = sizeElement.innerText;
            let sugarAdded = sugarAddedElement.innerText;

            orderDetails.push({ menuName, price, count, shotAdded, size, sugarAdded });
        }
    });

    return orderDetails;
}

// 추가: 주문 정보를 서버에 전송하는 함수
// 서버의 /order에 전달함
// 추가: 주문 정보를 서버에 전송하는 함수
// 서버의 /order에 전달함
function sendOrderToServer(totalPrice, packagingPreference, orderDetails) {
    const userName = localStorage.getItem('name');
    const userAge = localStorage.getItem('age');

    // HTTP POST 요청으로 주문 정보 서버에 전송
    fetch("/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // JSON 데이터를 전송하고 있음
        },
        body: JSON.stringify({
            totalPrice: totalPrice,
            packagingPreference: packagingPreference,
            orderDetails: orderDetails,
            name: userName,  // 사용자 이름 추가
            age: userAge     // 사용자 나이 추가
        }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        if (data.status === 'success') {
            // 주문 성공 시 처리 (예: 리다이렉션 또는 메시지 표시)
        } 
        else {
            alert('Error submitting order. Please try again.');
        }
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
    });
}


