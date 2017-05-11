/**
 * Created by admin on 2017/4/12.
 */
window.onload=function(){
    search();
    banner();
    downTime();


    // 搜索栏的js效果
    function search(){
        /*
        * 需求分析：
        * 1、当我们滑动页面的时候，不超过轮播图的高度的时候，颜色需要随着高度去改变透明度
        * 2、当我们滑动页面的时候，超过轮播图的高度的时候，颜色的透明度固定在0.85（opacity=0.85）
        * */
        /*搜索栏*/
        var search = document.getElementsByClassName('jd_header_box')[0];
        /*轮播图*/
        var banner = document.getElementsByClassName('jd_banner')[0];
        /*获取轮播图的高度*/
        var height = banner.offsetHeight;
        /*透明度*/
        var opacity = 0;

        window.onscroll=function(){
            if(window.pageYOffset>height){
                opacity = 0.85;
            }else{
                opacity = window.pageYOffset/height*0.85;
            }
            search.style.background='rgba(201,21,35,'+opacity+')';
        }
    }

    //轮播图
    function banner(){
        /*
        * 需求分析：
        * 1、自动轮播（定时器 过渡）
        * 2、小圆点随着图片滚动（监听图片的当前索引，设置当前样式）
        * 3、图片能滑动（touch）
        * 4、滑动不超过一定的距离，吸附回去，左右都一样（有过渡效果）
        * 5、滑动超过了一定的距离，滑动到上一张/下一张 （有过渡效果）
        * */

        /*0、获取DOM*/
        /*获取banner*/
        var banner = document.getElementsByClassName('jd_banner')[0];
        var width = banner.offsetWidth;//不带单位
        /*获取图片盒子imageBox*/
        var imageBox = banner.children[0];
        /*获取小圆点盒子pointBox*/
        var pointBox = banner.children[1];
        /*获取到所有的小圆点*/
        var points = pointBox.children;
        /*需要一个变量记录当前的索引*/
        var index = 1;
        /*公共的方法*/
        /*点亮小圆点*/
        function light(){
            /*把所有小圆点上的类名都去除*/
            for(var i=0;i<points.length;i++){
                points[i].className = '';
            }
            /*把对应索引的小圆点点亮*/
            points[index-1].className = 'now';
        }
        /*添加过渡*/
        function addTransiton(){
            imageBox.style.transition = "all 0.2s";
            imageBox.style.webkitTransition = "all 0.2s";
        }
        /*移出过渡*/
        function removeTransiton(){
            imageBox.style.transition = "";
            imageBox.style.webkitTransition = "";
        }
        /*设置位移*/
        function setTransform(distance){
            imageBox.style.transform = "translateX("+distance+"px)";
            imageBox.style.webkitTransform = "translateX("+distance+"px)";
        }
        /*1、自动轮播（定时器 过渡）*/
        /*定时器*/
        var timer= setInterval(function(){
            index++;
            addTransiton();
            setTransform(-index*width);

        },5000);
        /*添加过渡结束事件*/
        zhengzhaoming.addEvent(imageBox,function(){
            if(index>=9){
                index = 1;
                removeTransiton();
                setTransform(-index*width);
            }else if(index<=0){
                index = 8;
                removeTransiton();
                setTransform(-index*width);
            }
            /*2、小圆点随着图片滚动（监听图片的当前索引，设置当前样式）*/
            light();
        });

        /*  添加过渡结束事件原始版本
        imageBox.addEventListener('transitionEnd',function(){
            if(index>=9){
                index = 1;
                removeTransiton();
                setTransform(-index*width);
            }else if(index<=0){
                index = 8;
                removeTransiton();
                setTransform(-index*width);
            }
            light();
        });
        imageBox.addEventListener('webkitTransitionEnd',function(){
            if(index>=9){
                index = 1;
                removeTransiton();
                setTransform(-index*width);
            }else if(index<=0){
                index = 8;
                removeTransiton();
                setTransform(-index*width);
            }
            light();
        });

        */

        /*3、图片能滑动*/
        var startX = 0;
        var moveX = 0;
        var isMove = false;
        var distance = 0;
        imageBox.addEventListener('touchstart',function(e){
            /*手指放到轮播图上，停止轮播*/
            clearInterval(timer);
            startX = e.touches[0].clientX;
        });
        imageBox.addEventListener('touchmove',function(e){
            isMove = true;
            moveX = e.touches[0].clientX;
            distance = moveX - startX;
            removeTransiton();
            setTransform(-index*width+distance);
        });
        imageBox.addEventListener('touchend',function(e){
            /* 4、滑动不超过一定的距离，吸附回去，左右都一样（有过渡效果）
            * 5、滑动超过了一定的距离，滑动到上一张/下一张 （有过渡效果）*/
            if(isMove){
                if(Math.abs(distance)>width/3){
                        if(distance>0){
                            index--;
                        }else{
                            index++;
                        }
                }
                addTransiton();
                setTransform(-index*width);
            }

            startX = 0;
            moveX = 0;
            isMove = false;
            distance = 0;
            addTransiton();
            clearInterval(timer);/*要用定时器，先清定时器*/
            timer= setInterval(function(){
                index++;
                addTransiton();
                setTransform(-index*width);

            },5000);
        });
    }

    //倒计时
    function downTime(){
        /*需求分析：
        * 1、需要倒计时的时间：5小时
        * 2、倒计时  计时器
        * 3、把事件渲染到6个盒子当中
        * */
        /*获取DOM元素*/
        var skTime = document.getElementsByClassName('sk_time')[0];
        var spans = skTime.children;
        /*5小时到底有多少秒*/
        /*如果今天晚上8点开始秒杀*/
        var nowTime = new Date();
        var skDate = new Date('2017-04-13 15:00');
        var time = Math.floor((skDate.getTime()-nowTime.getTime())/1000);
        var timer = setInterval(function () {
            if(time<=0){
                clearInterval(timer);
                return;
            }
            time--;
            /*格式化*/
            var h = Math.floor(time/3600);
            var m = Math.floor(time%3600/60);
            var s = time%60;
            spans[0].innerHTML = Math.floor(h/10);
            spans[1].innerHTML = h%10;
            spans[3].innerHTML = Math.floor(m/10);
            spans[4].innerHTML = m%10;
            spans[6].innerHTML = Math.floor(s/10);
            spans[7].innerHTML = s%10;
        },1000)

    }
};