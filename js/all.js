// 指定DOM
const send = document.getElementById('send');
const reStart = document.getElementById('reStart');
const list = document.querySelector('.list');
const content = document.querySelector('.content');
const feedback = document.querySelector('.invalid-feedback');

let data = JSON.parse(localStorage.getItem('todoList')) || []; // 如果localStorage有資料則載入，否則預設為空

// 監聽
send.addEventListener('click', addData, false);
list.addEventListener('click', updateData, false);
reStart.addEventListener('click', clearAll, false);
window.addEventListener('load', init, false);

// 按下enter=按下送出鈕
window.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        send.click();
    }
}, false);

// function
function init() {
    render(); // 一開始先渲染一次畫面
};

// 增加資料到data[]並存入localStorage
function addData(e) {
    e.preventDefault();
    feedback.setAttribute('style', 'display:none;');
    if (content.value !== '') {
        let todo = {
            content: content.value,
            completed: false
        };
        data.push(todo);
        localStorage.setItem('todoList', JSON.stringify(data)); // 更新localStorage
        content.value = ''; // 點擊新增後，清空input
        render();
    } else {
        feedback.setAttribute('style', 'display:block;');
    }
}

// 更新資料
function updateData(e) {
    e.preventDefault();
    let clickTarget = e.target.nodeName;

    let index = e.target.dataset.index;
    if (clickTarget === 'A') {
        data.splice(index, 1); // 刪除陣列中的資料
        localStorage.setItem('todoList', JSON.stringify(data)); // 更新localStorage
        render(); // 更新畫面
    } else if (clickTarget === 'LABEL' || clickTarget === 'SPAN' || clickTarget === 'INPUT') {
        data[index].completed = data[index].completed ? false : true; // 如果是false改為true, true改為false
        localStorage.setItem('todoList', JSON.stringify(data)); // 更新localStorage
        render(); // 更新畫面
    }
}

// 清除全部
function clearAll(e) {
    e.preventDefault();
    data = [];
    localStorage.clear();
    render();
}

// 處理畫面
function render() {
    let str = '';
    data.forEach(function(item, index) {
        str += `
        <li>
            <label data-index="${index}">
                <input type="checkbox"  ${item.completed ? 'checked' : ''} data-index="${index}">
                <span class="list-item ${item.completed ? 'completed' : '' }" data-index="${index}">${item.content}</span>
            </label>
            <a href="#" class="close" data-index="${index}">&times;</a>
        </li>
        `;
    })
    list.innerHTML = str;
}