/**
 * Created by admin on 2017/4/13.
 */
window.onload=function(){
    delBtn();
};
function delBtn(){
    /*
    * 需求分析：
    * 1、点击删除按钮，mask显示
    * 2、点击删除按钮，delete_up逆时针旋转30deg
    * 3、点击取消按钮，mask隐藏，delete_up顺时针旋转30deg
    * 4、点击确定按钮，删除当前的商品
    * 5、点击+数字+1，点击-，数字-1……
    * */

    /*获取DOM元素*/
    var delbtn = document.querySelectorAll('.delete_btn');
    var mask = document.querySelector('.jd_mask');
    var cancel = document.querySelector('.cancel');
    var yes = document.querySelector('.yes');
    var index = 0;
    /*1、点击删除按钮，mask显示
    * 2、点击删除按钮，delete_up逆时针旋转30deg*/
    for(var i = 0;i<delbtn.length;i++){
        delbtn[i].index = i;
        delbtn[i].onclick=function () {
            index = this.index;
            mask.style.display = 'block';
            this.children[0].style.transform = 'rotate(-30deg)';
            this.children[0].style.webkitTransform = 'rotate(-30deg)';
            /*3、点击取消按钮，mask隐藏，delete_up顺时针旋转30deg*/
            cancel.onclick=function () {
                mask.style.display = 'none';
                delbtn[index].children[0].style.transform = 'rotate(0deg)';
                delbtn[index].children[0].style.webkitTransform = 'rotate(0deg)';
            };
            /*4、点击确定按钮，删除当前商品，mask隐藏*/
            yes.onclick=function () {
                mask.style.display = 'none';
                delbtn[index].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild( delbtn[index].parentNode.parentNode.parentNode.parentNode);
            }
        }
    }


}