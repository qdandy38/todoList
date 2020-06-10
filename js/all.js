//指定DOM
var list = document.querySelector('.list');
var sendData = document.getElementById('send');
var data = JSON.parse(localStorage.getItem('listData')) || []; //抓出localStorage內的資料並轉為陣列，如果沒有則回傳空陣列

//監聽
sendData.addEventListener('click', addData, false);
list.addEventListener('click', toggleDone, false);
updateList(data); //一開始先更新網頁內容，顯示的是目前localStorage內的資料

//function
// 按下enter=按下送出鈕
window.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        sendData.click();
    }
}, false);
//新增待辦事項
function addData(e) {
    e.preventDefault();
    var txt = document.querySelector('.search').value; //抓出input的內容
    if (txt !== '') { //有輸入內容才傳值
        var todo = { //儲存txt的Obj
            content: txt
        };
        data.push(todo); //存入data陣列
        updateList(data); //存入資料後更新網頁內容
        localStorage.setItem('listData', JSON.stringify(data)); //更新localStorage內容
        document.querySelector('.search').value = ''; //新增內容後將input清空
    }
}
//更新網頁內容
function updateList(item) {
    var str = '';
    var len = item.length;
    for (var i = 0; i < len; i++) {
        str += '<li><label><input type="checkbox"><span>' + item[i].content + '</span></label><a href="#" data-index=' + i + '><i class="fas fa-trash-alt" data-index=' + i + '></i></a></li>';
    }
    list.innerHTML = str;
}

//刪除待辦事項
function toggleDone(e) {
    var clickTarget = e.target.nodeName;

    if (clickTarget == 'A' || clickTarget == 'I') {
        //抓出該事項的data-index，並在localStorage刪除後，更新網頁內容
        e.preventDefault();
        var index = e.target.dataset.index;
        data.splice(index, 1);
        localStorage.setItem('listData', JSON.stringify(data));
        updateList(data);
    } else {
        return;
    }
}