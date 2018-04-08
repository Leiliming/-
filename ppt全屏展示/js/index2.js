var ppt = {
    len: $('.slider').length,
    $wrapper: $('.wrapper'),
    $slider: $('.slider'),
    nowIndex: 0,
    lastIndex: undefined,
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
                str += '<li class = "active">' + (i + 1) + '</li>'
            } else {
                str += '<li>' + (i + 1) + '</li>'
            }

        }
        strBtn = '<div class="slider-btn">\
            <span class="btn-left" ></span >\
                <span class="btn-right"></span>\
        </div >';
        str = '<div class = "slider-order"><ul>' + str + '</ul></div>';
        this.$wrapper.append(strBtn).append(str)
    },
    bindEvent: function () {
        var _this = this;
        $('li').add('.btn-left').add('.btn-right').on('click', function () {
            if ($(this).attr('class') == 'btn-left') {
                _this.tool('left');
            } else if ($(this).attr('class') == 'btn-right') {
                _this.tool('right');
            } else {
                var index = $(this).index()
                _this.tool(index);
            }

        })
        this.$slider.on('come', function () {
            $(this).fadeIn(300)
                .find('p').delay(300).animate({ fontSize: '16px' }).end()
                .find('img').delay(300).animate({ width: '40%' }, function () {
                    _this.flag = true;
                    _this.slider_auto();
                })

        });
        this.$slider.on('leave', function () {
            $(this).fadeOut(300)
                .find('p').animate({ fontSize: '0px' }).end()
                .find('img').animate({ width: '0' });
        });

    },
    tool: function (dirction) {

        if (this.flag) {
            this.getIndex(dirction)
            if (this.nowIndex != this.lastIndex) {
                this.flag = false;
                this.changeActive();
                this.$slider.eq(this.lastIndex).trigger('leave');
                this.$slider.eq(this.nowIndex).delay(300).trigger('come')

            }

        }


    },
    getIndex: function (dirction) {
        this.lastIndex = this.nowIndex
        if (dirction == 'left' || dirction == 'right') {
            if (dirction == 'left') {
                this.nowIndex = this.nowIndex == 0 ? this.len - 1 : this.nowIndex - 1;
            } else {
                this.nowIndex = this.nowIndex == this.len - 1 ? 0 : this.nowIndex + 1;
            }
        } else {
            this.nowIndex = dirction;
        }

    },
    changeActive: function () {
        $('.active').removeClass('active');
        $('li').eq(this.nowIndex).attr('class', 'active')
    },
    slider_auto: function () {
        clearTimeout(this.timer)
        var _this = this;
        this.timer = setTimeout(function () {
            _this.tool('right')
        }, 3000)

    }

}
ppt.init()