var arr = [{
        url: './img/1.jpg'
    },
    {
        url: './img/2.jpg'
    },
    {
        url: './img/3.jpg'
    },
    {
        url: './img/4.jpg'
    },
    {
        url: './img/5.jpg'
    },
    {
        url: './img/6.jpg'
    },
    {
        url: './img/7.jpg'
    },
    {
        url: './img/8.jpg'
    }
]
var deviceW_H = $(window).width() / $(window).height(),
    acitveIndex;

function init() {
    renderPage(arr);

    $('li').css('height', $('li').width());
}
init();

function renderPage(arr) {
    var str = '';
    arr.forEach(function (ele, index) {
        str += '<li><img src=' + ele.url + '></li>'
    })
    $('.wrapper').append(str);

}

$('ul').on('tap', 'li', function () {
    var index = acitveIndex = $(this).index();
    loadImg(index);
})

function loadImg(index) {
    $('.show').html('').css('display', 'block');
    var img = new Image();
    img.src = arr[index].url;
    img.onload = function () {
        var imgW_H = this.width / this.height;
        if (imgW_H < deviceW_H) {
            $(this).appendTo('.show').css({height: '100%'}).animate({opacity: 1 });

        } else {
            $(this).appendTo('.show').css({ width: '100%'}).animate({opacity: 1 });

        }
    }
    $('.show').append(img);
}

$('.show')
    .on('tap', function () {
        $(this).css('display', 'none');
    })
    .on('swipeLeft', function () {
        ++acitveIndex;
        if (acitveIndex > arr.length - 1) {
            acitveIndex = 0;
        } else {
            loadImg(acitveIndex);
        }
    })
    .on('swipeRight', function () {
        --acitveIndex;
        if (acitveIndex < 0) {
            acitveIndex = arr.length - 1;
        } else {
            loadImg(acitveIndex);
        }

    })