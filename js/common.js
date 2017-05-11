/**
 * Created by admin on 2017/4/12.
 */
window.zhengzhaoming={};//命名空间

zhengzhaoming.addEvent=function(obj,fn){
    obj.addEventListener('webkitTransitionEnd',fn);
    obj.addEventListener('transitionEnd',fn);
};
zhengzhaoming.tap=function(obj,fn){
    var isMove = false;
    var start = 0 ;
    var end = 0;
    obj.addEventListener('touchstart',function () {
        start = new Date().getTime();
    });
    obj.addEventListener('touchmove',function () {
        isMove =true;
    });
    obj.addEventListener('touchend',function () {
        if(!isMove){
            end = new Date().getTime();
            if(end-start<150){
                fn();
            }
        }
        isMove = false;
        start = 0 ;
        end = 0;
    })
};