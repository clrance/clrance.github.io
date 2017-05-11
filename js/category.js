/**
 * Created by admin on 2017/4/12.
 */
window.onload=function () {
    leftSwipe();
};

function leftSwipe(){
    /*
    * 需求分析：
    * 1、可以滑动（touch Y）
    * 2、往下滑动的时候到达一定距离不能滑动
    * 3、往上滑动的时候到达一定距离不能滑动
    * 4、当滑动超过了最大的定位距离时，定位回去
    * 5、当滑动超过了最小的定位距离时，定位回去
    * 6、点击ul的时候改变当前li的样式
    * 7、点击的时候，当前li滑动到最顶部，在定位区间内
    * 8、如果没有在定位区间内，保持原位的定位位置
    * */
    /*获取div和ul的高度*/
    var leftDiv = document.getElementsByClassName('jd_cate_left')[0];
    var h = leftDiv.offsetHeight;
    var leftUl = leftDiv.children[0];
    console.log(leftUl)
    var H = leftUl.offsetHeight;

    /*定位区间*/
    var maxPosition =  0;
    var minPosition = h - H;

    /*缓冲距离*/
    var distance = 100 ;

    /*滑动区间*/
    var maxSwipe = maxPosition + distance;
    var minSwipe = minPosition - distance;

    /*公共方法*/
    /*添加过渡*/
    function addTransiton(){
        leftUl.style.transition = "all 0.2s";
        leftUl.style.webkitTransition = "all 0.2s";
    }
    /*移出过渡*/
    function removeTransiton(){
        leftUl.style.transition = "";
        leftUl.style.webkitTransition = "";
    }
    /*设置位移*/
    function setTransform(distance){
        leftUl.style.transform = "translateY("+distance+"px)";
        leftUl.style.webkitTransform = "translateY("+distance+"px)";
    }
    /*给一个li设置样式*/
    function light(){
        for(var i=0;i<leftUl.children.length;i++){
            leftUl.children[i].className = '';
            leftUl.children[i].index = i;
        }
        currLi.className = 'now';
    }
    /*我需要记录当前滑动时手指的起始位置和滑动位置*/
    var startY = 0;
    var moveY = 0;
    var isMove = false;
    var currY = 0;

    /*1、可以滑动（touch Y）*/
    leftUl.addEventListener('touchstart',function (e) {
        startY = e.touches[0].clientY;
    });
    leftUl.addEventListener('touchmove',function (e) {
        isMove = true;
        moveY = e.touches[0].clientY;
        /*一定的距离是moveY - startY,如果为正是下滑，如果为负是上滑动*/
        /*
        * 2、往下滑动的时候到达一定距离不能滑动
        * 3、往上滑动的时候到达一定距离不能滑动
        * */
        if(currY+moveY-startY>minSwipe&&currY+moveY-startY<maxSwipe){
            removeTransiton();
            setTransform(currY+moveY-startY);
        }
    });
    leftUl.addEventListener('touchend',function (e) {
        if(isMove){
            if(currY+moveY-startY>maxPosition){
                /*4、当滑动超过了最大的定位距离时，定位回去*/
                currY = maxPosition;
            }else if(currY+moveY-startY<minPosition){
                /*5、当滑动超过了最小的定位距离时，定位回去*/
                currY = minPosition
            }else{
                currY = currY+moveY - startY;
            }
            addTransiton();
            setTransform(currY);
            startY = 0;
            moveY = 0;
            isMove = false;
        }
    });
    /*获取当前的li*/
   
    var currLi;
    zhengzhaoming.tap(leftUl,function () {
    	
        /*通过event的target可以获取事件源*/
        currLi = event.target.parentNode;
        /*6、点击ul的时候改变当前li的样式*/
        light();
        /*
        7、点击的时候，当前li滑动到最顶部，在定位区间内
        8、如果没有在定位区间内，保持原位的定位位置
        */
        var index = currLi.index //获取当前li的索引
        if(index*50>maxPosition&&index*50<H-h){
            currY = -index*50;
        }else if(index*50>H-h){
            currY = minPosition;
        }
        addTransiton();
        setTransform(currY);

    })


}