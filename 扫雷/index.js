//点击开始游戏 生成100个div

//鼠标左键点击  有地雷时 出现所有地雷位置 同时弹出Gome over 

//             没有地雷时 出现周围地雷数目 如果为 0 扩散开

//鼠标右键点击 出现旗子 同时 鼠标左键不能点击当前位置

//如果游戏结束 胜利 Game-over block 同时图片修改为success
//            失败 Game - over block 同时图片修改为success
//点击 closeBtn  清空棋盘

var land, //土地
    mineMap,
    mineOver,
    mineMap = [],
    boxFlag = true;
var startGame = document.getElementsByClassName('btn')[0];
var box = document.getElementsByClassName('box')[0];
var title = document.getElementsByClassName('title')[0];
var GameOver = document.getElementsByClassName('Game-over')[0];
var closeBtn = document.getElementsByClassName('closeBtn')[0];
var score = document.getElementById('score');
var overWrp = document.getElementsByClassName('overWrp')[0];

bindEvent()

function bindEvent() {

    startGame.onclick = function () {
        if (boxFlag) {
            box.style.display = 'block';
            title.style.display = 'block';
            init()
            boxFlag = false;
        }
    }

    box.oncontextmenu = function () {
        return false;
    } //取消鼠标默认事件


    box.onmousedown = function (e) {
        var event = e.target;
        if (e.which == 1) {
            leftClick(event);
        } else if (e.which == 3) {
            rightClick(event);
        }
    }

    closeBtn.onclick = function () {
        box.style.display = 'none';
        closeBtn.style.display = 'none';
        GameOver.style.display = 'none';
        title.style.display = 'none';
        overWrp.style.display = 'none';
        box.innerHTML = '';
        boxFlag = true;

    }

}


function init() {
    minesNum = 10;
    mineOver = 10;
    score.innerHTML = mineOver;
    for (var i = 1; i <= 10; i++) {
        for (var j = 1; j <= 10; j++) {
            land = document.createElement('div');
            land.classList.add('block');
            land.setAttribute('id', i + '-' + j)
            box.appendChild(land);
            mineMap.push({
                mine: 0
            });
        }

    }

    block = document.getElementsByClassName('block');

    while (minesNum) {
        var mineIndex = Math.floor(Math.random() * 100);
        if (mineMap[mineIndex].mine == 0) {
            block[mineIndex].classList.add('isLei');
            block[mineIndex].mine = 1;
            minesNum--;
        }
    }
}

function leftClick(dom) {
    if (dom && dom.classList.contains('flag')) {
        return
    }
    var isLei = document.getElementsByClassName('isLei');
    if (dom && dom.classList.contains('isLei')) {
        for (var i = 0; i < isLei.length; i++) {
            isLei[i].classList.add('show');
        }
        setTimeout(function () {
            GameOver.style.display = 'block';
            GameOver.style.backgroundImage = 'url("./img/over.jpg")';
            closeBtn.style.display = 'block';
            overWrp.style.display = 'block';
        }, 800);
    } else {
        var n = 0;
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        dom && dom.classList.add('num');
        for (var i = posX - 1; i <= posX + 1; i++) {
            for (var j = posY - 1; j <= posY + 1; j++) {
                var aroundBox = document.getElementById(i + '-' + j);
                if (aroundBox && aroundBox.classList.contains('isLei')) {
                    n++
                }
            }
        }
        dom && (dom.innerHTML = n == 0 ? n = '' : n);

        if (n === '') {
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox && nearBox.length != 0) {
                        if (!nearBox.classList.contains('check')) {
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                        }

                    }
                }
            }

        }
    }

}

function rightClick(dom) {
    if (dom.classList.contains('num')) {
        return;
    } else {

    }
    dom.classList.toggle('flag');
    if (dom.classList.contains('isLei') && dom.classList.contains('flag')) {
        mineOver--;
    }
    if (dom.classList.contains('isLei') && !dom.classList.contains('flag')) {
        mineOver++;
    }
    score.innerHTML = mineOver;
    if (mineOver == 0) {
        GameOver.style.display = 'block';
        GameOver.style.backgroundImage = 'url("./img/success.png")';
        closeBtn.style.display = 'block';
        overWrp.style.display = 'block';
    }


}