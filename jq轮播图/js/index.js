var itemWidth = 520,
    len = 5,
    nowIndex = 0,
    timer = undefined,
    flag = true;

function init() {
    bindEvent();
    sliderAuto();
   
}
init()

function bindEvent() {
    $('.order li').add('.prevBtn').add('.nextBtn').on('click', function () {
        if ($(this).attr('class') == 'prevBtn') {
            move('prev');   
            
        } else if ($(this).attr('class') == 'nextBtn') {
            move('next');    
         
        } else {
            var index = $(this).index();
            move(index);
        }
        changeStyle();
    })
   $('.wrapper')
        .on('mouseenter',function(){
        $('.btn').show();
        clearTimeout(timer);
    })
        .on('mouseleave',function(){
        $('.btn').hide();
        sliderAuto();
        })
}
function changeStyle(){
       $('.active').removeClass('active');
       $('.order li').eq(nowIndex).addClass('active');
}
function move(direction) {
    if(flag){
        flag = false;
        var a = 1;
        if (direction == 'prev' || direction == 'next') {

            if (direction == 'prev') {

                if (nowIndex == 0) {
                    $('.img-box').css({ 'left': -(len * itemWidth) });
                    nowIndex = len - 1;
                   
                } else {
                    nowIndex = nowIndex - 1;
                  
                }
            } else if (direction == 'next') {
                if (nowIndex == 4) {
                    a = 0;
                    nowIndex = nowIndex + 1;
                    $('.img-box').animate({ left: -(nowIndex * itemWidth) }, 150, function () {
                        sliderAuto();
                        $(this).css('left', 0);
                        flag = true;
                    })
                    nowIndex = 0;
                } else {
                    nowIndex = nowIndex + 1;
                  
                }

            }

        } else {
            nowIndex = direction;
           
        }
        if(a){
             
             slider();
        }
     
    }
    
    
}
function slider(){

    $('.img-box').animate({ left: -(nowIndex * itemWidth) }, 150, function () {
        sliderAuto();
        flag = true;
    });


}
function sliderAuto(){
  clearTimeout(timer);
  timer = setTimeout(function(){
        move('next');
        changeStyle();
},2000)
}