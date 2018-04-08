var personArr = [
    {name: '王港', src: './img/3.png', des: '颈椎不好', sex: 'm'}, 
    {name: '刘莹', src: './img/5.png',des: '我是谁', sex: 'f'},
    {name: '王秀莹', src: './img/4.png', des: '我很好看', sex: 'f'},
    {name: '刘金雷', src: './img/1.png', des: '你没有见过陌生的脸', sex: 'm'},
    {name: '刘飞翔', src: './img/2.png', des: '瓜皮刘', sex: 'm'}
];
var oUl = document.getElementsByTagName('ul')[0];
var oSearch = document.getElementsByClassName('search-box')[0];
var oP = document.getElementsByTagName('p')[0];
// 把传入的数组渲染出来
function renderList(list) {
    var str = '';
    list.forEach(function (ele, index) {
        str += '<li>\
            <img src='+ ele.src +' alt="">\
            <p class="username">'+ ele.name +'</p>\
            <p class="description">'+ ele.des +'</p>\
        </li>';
    })
    oUl.innerHTML = str;
}
renderList(personArr);
//存储数据状态
var state = {
    text: '',
    sex: 'a'
}
//在input框中输入值
oSearch.oninput = function () {
    state.text = this.value;
    renderList(lastFilterFunc(personArr));
}
//点击性别
oP.addEventListener('click', function (e) {
    if(e.target.tagName == 'SPAN') {
        
        document.getElementsByClassName('active')[0].className = '';
        e.target.className = 'active';

        state.sex = e.target.getAttribute('sex');
        
        renderList(lastFilterFunc(personArr));
    }
})
// 根据name属性筛选数据
function filterText(text, arr) {
        return arr.filter(function (ele, index) {
            return ele.name.indexOf(text) != -1 ? true : false;
        })
}
// 根据sex属性筛选数据
function filterSex(sex, arr) {
    if(sex == 'a') {
        return arr;
    }else{
        return arr.filter(function (ele, index) {
            return ele.sex == sex;
        })
    }
}
//合并筛选条件
function combineFilterFunc(obj) {
    return function (arr) {
        var lastArr = arr;
        for(var prop in obj) {
            lastArr = obj[prop](state[prop], lastArr);
        }
        return lastArr; 
    }
}
var lastFilterFunc = combineFilterFunc({text: filterText, sex: filterSex});




