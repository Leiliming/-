var ppt = {
    len: $('.slider').length,
    $wrapper: $('.wrapper'),
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
        var str = '', btnStr = '';
        for (var i = 0; i < len; i++) {
            if (i == 0) {
                str += '<li class = "active">' + (i + 1) + "</li>";
            } else {
                str += '<li>' + (i + 1) + '</li>'
            }

        }
        btnStr = '<div class="slider-btn">\
            <span class="right-btn"></span>\
            <span class="left-btn"></span>\
        </div>'
        str = "<div class = 'slider-order'>" + str + "</div>";
        this.$wrapper.append(str).append(btnStr);
    },
    bindEvent: function () {
        var _this = this;
        $('li').add('.right-btn').add('.left-btn').on('click', function () {
            if ($(this).attr('class') == 'right-btn') {
                _this.tool('right')
            } else if ($(this).attr('class') == 'left-btn') {
                _this.tool('left')
            } else {
                var index = $(this).index()
                _this.tool(index)
            }

        })

        this.$slider.on('leave', function () {
            $(this).fadeOut(300)
                .find('p').animate({ fontSize: '5px' }).end()
                .find('img').animate({ width: '0%' })

        })
        this.$slider.on('come', function () {
            $(this).fadeIn(300)
                .find('p').delay(300).animate({ fontSize: '16px' }).end()
                .find('img').delay(300).animate({ width: '40%' }, function () {
                    _this.flag = true;
                    _this.slider_auto();
                })
        });
    },
    tool: function (dirction) {
        if (this.flag) {
            this.getIndex(dirction)
            if (this.nowIndex != this.lastIndex) {
                this.flag = false;
                this.$slider.eq(this.lastIndex).trigger('leave');
                this.$slider.eq(this.nowIndex).delay(300).trigger('come');
                this.changeOrder();
                this.slider_auto();

            }

        }
    },
    getIndex: function (dirction) {
        this.lastIndex = this.nowIndex;
        if (dirction == 'right' || dirction == 'left') {
            if (dirction == 'right') {
                this.nowIndex = this.nowIndex == this.len - 1 ? 0 : this.nowIndex + 1;
            } else {
                this.nowIndex = this.nowIndex == 0 ? this.len - 1 : this.nowIndex - 1;
            }
        } else {
            this.nowIndex = dirction;
        }

    },
    changeOrder: function () {
        $('.active').removeClass('active');
        $('li').eq(this.nowIndex).attr('class', 'active');
    },
    slider_auto: function () {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            _this.tool('right');
        }, 3000)
    }

}
ppt.init()