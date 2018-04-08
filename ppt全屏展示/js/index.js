var ppt = {
    $wrapper: $('.wrapper'),
    len: $('.slider').length,
    nowIndex: 0,
    lastIndex: undefined,
    $slider: $('.slider'),
    flag: true,
    timer: undefined,
    init: function () {
        if (this.len > 1) {
            this.createDom(this.len);
            this.bindEvent();
            this.slider_auto();
        }
    },
    createDom: function (len) {
        var str = '', strBtn = '';
        for (var i = 0; i < len; i++) {
            if (i == 0) {
                str += "<li class='active'>" + (i + 1) + "</li>"
            } else {
                str += "<li>" + (i + 1) + "</li>";
            }

        }
        str = "<div class ='slider-order'>" + str + "</div>";
        strBtn = '<div class="slider-btn">\
            <span class="left-btn"></span>\
            <span class="right-btn"></span>\
        </div>'
        this.$wrapper.append(str).append(strBtn);
    },
    bindEvent: function () {
        var _this = this;
        $('li').add('.left-btn').add('.right-btn').on('click', function () {
            if ($(this).attr('class') == 'left-btn') {
                _this.tool('left');
            } else if ($(this).attr('class') == 'right-btn') {
                _this.tool('right');
            } else {
                var index = $(this).index();
                _this.tool(index);
            }


        })
        this.$slider.on('leave', function () {
            var _this = this;
            $(this).fadeOut(300, function () {

            });
            $('p').animate({
                fontSize: '1px'
            }, 300)
            $('img').animate({
                width: '5%'
            }, 300)
                ;
        })
        this.$slider.on('come', function () {
            $(this).fadeIn(300, function () {

                _this.flag = true;
            });
            $('p').animate({
                fontSize: '16px'
            }, 400)
            $('img').animate({
                width: '30%'
            }, 400)
        })
    },
    tool: function (dirction) {
        if (this.flag) {      
            this.getIndex(dirction);
            if (this.nowIndex != this.lastIndex) {
                this.flag = false;
                this.$slider.eq(this.lastIndex).trigger('leave');
                this.$slider.eq(this.nowIndex).delay(300).trigger('come');
                this.changeActive(this.nowIndex);
                this.slider_auto()
            }

        }

    },
    getIndex: function (dirction) {
        this.lastIndex = this.nowIndex;
        if (dirction == 'left' || dirction == 'right') {
            if (dirction == 'left') {
                this.nowIndex = this.nowIndex == 0 ? this.nowIndex = this.len - 1 : this.nowIndex - 1;
            } else if (dirction == 'right') {
                this.nowIndex = this.nowIndex == this.len - 1 ? this.nowIndex = 0 : this.nowIndex + 1;
            }
        } else {
            this.nowIndex = dirction;
        }
    },
    changeActive: function (index) {
        $('.active').removeClass('active');
        $('li').eq(this.nowIndex).attr('class', 'active')
    },
    slider_auto: function () {
        clearTimeout(this.timer);
        var _this = this;
        this.timer = setTimeout(function () {
            _this.tool('right');
        }, 3000)
    }

}
ppt.init()