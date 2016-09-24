/**
 * Created by apple on 15/6/11.
 */
//用法时这样的  json里面 属性必须双引号，属性值数字不要加双引号
function move(obj,json,fn){
    clearTimeout(obj.timer);  //防止两个物体产生干扰
var End = true;   //整体结束了没
    obj.timer = setTimeout(function(){
            for(var prop in json) {

                if (prop == "opacity") {
                    //虽然设置的是小数，但是通过获取的opacity是个近似值，所有四舍五入精确到2位
                    //获取初始样式
                    var y = getStyle(obj, prop);
                    var q = parseFloat(y).toFixed(2);
                    var cur = parseInt(q * 100);
                }else {
                    var cur = parseInt(getStyle(obj, prop));

                }
                    //计算速度
                var speed = json[prop] > cur ? parseInt(Math.ceil((json[prop] - cur) / 12)) : parseInt(Math.floor((json[prop] - cur) / 12));

                    //判断是否到达终点
                //console.log(cur);
                //console.log(json[prop]);
                if(cur != json[prop]){   //假如设置成相等有趣的是只要有一个值成立，那么这个就成立，内部的关系是或只要有一个是真就都是真
                    End = false;
                }
                    //设置样式
                if(prop == "opacity"){
                    obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                    obj.style[prop] = (cur + speed) / 100;
                } else {
                    obj.style[prop] = cur + speed + "px";
                }
            }
            if(End){
                 if(fn){
                 fn();
                 }
            }else{
                move(obj,json,fn);   //回调函数
            }
    },1)
}
function getStyle(obj,objStyle){
    return obj.currentStyle?obj.currentStyle[objStyle]:getComputedStyle(obj,null)[objStyle];
}