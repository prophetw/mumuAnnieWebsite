/**
 * Created by apple on 15/7/28.
 */
//该库仅支持移动客户端，也即手机端和平板电脑端
function swipe(target,f1,f2,f3,f4){
    //该函数在于检测是否是向左滑动
    //target:表示触点元素,e:默认事件对象 fn:表示回调函数

    target.ontouchstart = function (e) {
        var e = e||window.event;
        var startx = e.touches[0].pageX;
        var starty = e.touches[0].pageY;
        var curPos = target.offsetLeft;

        document.ontouchmove = function (e) {
            var movex = e.changedTouches[0].pageX;
            var movey = e.changedTouches[0].pageY;
            target.firstElementChild.style.left = curPos+ movex-startx +'px';
            if(e.stopPropagation){
                e.stopPropagation();
            }else{
                e.cancelBubble = true;
            }
            //取消默认事件 ，手机端就变成按下，上下滑动屏幕还是有效果的，加上这句，上下不会滑动
            if(e.preventDefault){
                e.preventDefault();
            }else{
                e.returnValue = false;
            }
        };
        document.ontouchend = function (e) {
            var e = e||window.event;


            //alert(e.pageX);
            //var endx = e.changedTouches[0].pageX;
            //var endy = e.changedTouches[0].pageY;
            //if(endx-startx>0){
            //    if(f1)f1();
            //}
            //if(endx-startx<0){
            //    if(f2)f2();
            //}
            //if(endy-starty>0){
            //    if(f3)f3();
            //}
            //if(endy-starty<0){
            //    if(f4)f4();
            //}
            document.ontouchmove = null;
            document.ontouchend = null;
        };
    };

}
