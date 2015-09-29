$(document).ready(function(){

    //给下面轮播使用的变量
    var i = 1;
    var j = 0;
    //alert($(document).height());
    //让导航条的logo左边距
    if($(window).width()>1024){
        $("nav div#nav a img").css("margin-left",($(window).width()-1002)/2);
    }

    //article部分下面的三张图片中间一张由于他的宽度是34%，有时候高度不对齐
    //此处用window.onload是因为 jq里面的document ready不是等图片完全加载
    window.onload = function () {
        if(window.innerWidth>768){
            $("img#contact_img").css("height",$("img#brand_img").height());
        }
    };


    //窄屏幕导航效果
    onav = document.getElementById("nav");
    oul = document.getElementById("navul");
    oli = oul.getElementsByTagName("li");
    oa = oul.getElementsByTagName("a");
    //这个空数组，用来放筛选后的ul#navul>li
    var arr =[];
    //装那么会冒泡的a标签
    var arroa =[];


    for(var q=0;q<oli.length;q++){
        if(oli[q].parentNode.className == "navul"){
            arr.push(oli[q]);
        }
    }
    //console.log(arr);
    for(var q=0;q<arr.length;q++){
        arr[q].onclick = function () {
            if(this.className == "active"){
                this.className = "";
            }else{
                for(var q=0;q<arr.length;q++){
                    arr[q].className = '';
                }
                this.className = "active";
            }
        };
    }
    //首先找到冒泡的a 标签取消冒泡
    for(var q=0;q<oa.length;q++){
        if(oa[q].parentNode.parentNode.className != "navul"){
            arroa.push(oa[q]);
        }
    }
    //alert(arroa.length);
    for(var q=0;q<arroa.length;q++){
        arroa[q].onclick = function (event) {
            var e = event || window.event;
        };
    }
    //480宽的时候导航的效果
    $("div#closeOpenTag").click(function () {
        $("div#closeOpenTag").toggleClass("cross");
        if($("div#closeOpenTag").hasClass("cross")){
            $("div#phonenav").slideDown();
        }else{
            for(var q=0;q<arr.length;q++){
                arr[q].className = '';
            }
            $("div#phonenav").slideUp();
        }
    });


    //弹性运动,初始速度应该是由，触屏开始，触屏结束，触点距离差除以触屏时间
    var flexibleTimer = null;
    //此处的速度应该由触屏定
    var flexibleSpeed = 0;
    //480导航的滑动效果
    if("ontouchstart" in document) {
        oul.ontouchstart = function (e) {
            //alert(window.innerWidth);
            var e = e.touches[0];
            var startX = e.pageX;
            var curPos = oul.offsetLeft;

            var time0 = new Date();
            var timeMil = time0.getTime();
            //alert(timeMil);

            //alert(e.pageX);
            document.ontouchmove = function (e) {
                var e = e || window.event;
                var moveX = e.changedTouches[0].pageX;
                oul.style.left =curPos + moveX-startX+"px";
                //move(oul,{"left":endX});
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
                var e = e.changedTouches[0];
                var endX = e.pageX;
                //alert(1);
                var time1 = new Date();
                var timerMil1 = time1.getTime();
                //alert(time1);
                flexibleSpeed = timerMil1-timeMil>300?0:(endX-startX)/(timerMil1-timeMil)*100;
                //alert(timerMil1-timeMil);
                flexibleMove(oul,"left");
                document.ontouchmove = null;
                document.ontouchend = null;
            };
        };
   }else{
        oul.onmousedown = function (e) {
            //alert(1);
            var e = e || window.event;
            //console.log("x轴:"+e.clientX+"scroll:"+ scrollX);
            //alert(e.pageX);
            //点击时候的初始鼠标的坐标值
            //电脑端clientX和scrollX
            var time0 = new Date();
            var timeMil = time0.getTime();
            //alert(time1);

            var startX = e.clientX;
            //手机端只支持pageX
            //初始被拖动的元素的初始的左边距和上边距
            var origX = oul.offsetLeft;

            document.onmousemove = function (e) {
                var e = e || window.event;
                //移动时候鼠标x和y的位置
                var moveX =  e.clientX;
                oul.style.left =origX + moveX - startX + 'px';
            };
            //因为抬起的时候，鼠标的位置可以不在oul身上
            document.onmouseup = function (e) {
                var e = e || window.event;
                var endX = e.clientX;

                var time1 = new Date();
                var timerMil1 = time1.getTime();
                //alert(time1);
                flexibleSpeed = timerMil1-timeMil>300?0:(endX-startX)/(timerMil1-timeMil)*100;

                flexibleMove(oul,'left');
                //注销掉move的事件和up的事件
                document.onmousemove = null;
                document.onmouseup = null;
            };
            if(e.stopPropagation){
                e.stopPropagation();
            }else{
                e.cancelBubble = true;
            }
            //取消默认事件 ，鼠标按下拖动就会选中文本这是我们不想见到的
            if(e.preventDefault){
                e.preventDefault();
            }else{
                e.returnValue = false;
            }
        };
    }
    //弹性运动函数
    function flexibleMove(obj,attr){
        clearInterval(flexibleTimer);
        flexibleTimer = setInterval(function () {
            //停止条件
            flexibleSpeed *= 0.7;
            if(Math.abs(flexibleSpeed)<1){
                clearInterval(flexibleTimer);
                //如果超出边界那么修正
                if(obj.offsetLeft >0){
                    move(obj,{"left":0});
                    //obj.style[attr] = 0;
                }else if(obj.offsetLeft < - obj.offsetWidth + window.innerWidth ){
                    move(obj,{"left":- obj.offsetWidth + window.innerWidth});
                }
                flexibleSpeed=0;
            }else{
                ////当到达左边界的时候flexibleSpeed会变成向右正方向
                //if(obj.offsetLeft >50){
                //    flexibleSpeed = - flexibleSpeed;
                //    //当到达右边界的时候flexibleSpeed会变成负方向
                //}else if(obj.offsetLeft < - obj.offsetWidth + window.innerWidth -50){
                //    flexibleSpeed = Math.abs(flexibleSpeed);
                //}
                obj.style[attr] = obj.offsetLeft + flexibleSpeed +'px';
            }
        },30)
    }

    //设置热卖单品的高度，因为这个地方是绝对定位的
    $("#main_product").css("height",$("#new_promotion img").height());

    //$("div.wrap ul:first-child li img").css("width",$(window).width());
    //为了使第一张和最后一张过渡效果自然，第一张图前面复制并查插入一个最后一张图
    $("div.wrap ul:first-child li:eq(0)").clone().appendTo("div.wrap ul:first-child");
    //为了使第一张和最后一张过渡效果自然，最后一张图后面复制并查插一个第一张图
    //唯一一个麻烦的事是eq里面只能写数字，所以加图片的时候会有问题
    //已解决要使用"+last+"的方法

    var last = $("div.wrap ul:first-child li").length-2;
    //$("div.wrap ul li:eq(2)").clone().prependTo("ul");
    $("div.wrap ul:first-child li:eq("+last+")").clone().prependTo("div.wrap ul:first-child");
    $("div.wrap ul:first-child").css("width",$("div.wrap ul:first-child li").width()*$("div.wrap ul:first-child li").length);
    $("div.wrap ul:first-child").css("left",-$("div.wrap ul:first-child li").width()-($("div.wrap ul:first-child li").width()-$(window).width())/2);

    //给左右箭头的相对高度设定
    $("#left").css("top",($("div.wrap").height()-$("#left").height())/2);
    $("#right").css("top",($("div.wrap").height()-$("#left").height())/2);

    var liPare = "div.wrap ul:eq(1)";

    //$(liPare).css("left",)
    var lii = '<li><img src="dot2.png" style="width:10px;height:20px;"/></li>';
    var picleng = $("div.wrap ul:first-child li").length-2;
    //有几张图片，就加几个小圆点
    addLi(liPare,lii,picleng);
    //给img价格width的属性，相当于是个占位符，方便后面计算，如果没有width那么问题来了
    //outerWidth的值算出来的仅仅是margin的值
    $(liPare).css("left",($(window).width()-$(liPare).width())/2);

    //利用回调函数解决，当图片移到最后一张的时候，利用回调函数偷偷把它位置变换成第一张图
    //点击右键的事件，且小圆点也会变色
    $("div.wrap #right").click(function(){
        i++;
        if(i == $("div.wrap ul:first-child li").length-1){

            $("div.wrap ul:first-child").stop(true,true).animate({
                left:$("div.wrap ul:first-child li").width()*(-i)-($("div.wrap ul:first-child li").width()-$(window).width())/2
            },500,"swing",function(){
                $("div.wrap ul:first-child").css("left",-$("div.wrap ul:first-child li").width()-($("div.wrap ul:first-child li").width()-$(window).width())/2)
            });
            i=1;
        }else{
            $("div.wrap ul:first-child").stop(true,true).animate({
                left:$("div.wrap ul:first-child li").width()*(-i)-($("div.wrap ul:first-child li").width()-$(window).width())/2
            },500);
        }
        //小圆点也会改变  ul:eq(1) 这个代表选择的是第二个ul标签
        if(i == 0){
            i =	$("div.wrap ul:first-child li").length-2;
            $("div.wrap ul:eq(1) li").each(function(){
                $("div.wrap ul:eq(1) li").css("top",0);
            });
            $("div.wrap ul:eq(1) li:eq("+(i-1)+")").css("top",-10);
        }else if(i>0 || i<$("div.wrap ul:first-child li").length-1){
            $("div.wrap ul:eq(1) li").each(function(){
                $("div.wrap ul:eq(1) li").css("top",0);
            });
            $("div.wrap ul:eq(1) li:eq("+(i-1)+")").css("top",-10);
        }else{
            i = 1;
            $("div.wrap ul:eq(1) li").each(function(){
                $("div.wrap ul:eq(1) li").css("top",0);
            });
            $("div.wrap ul:eq(1) li:eq("+(i-1)+")").css("top",-10);
        }
    });
    //点击左边的箭头会向右走一格
    $("div.wrap #left").click(function(){
        i--;
        if(i == 0){
            $("div.wrap ul:first-child").stop(true,true).animate({
                left:$("div.wrap ul:first-child li").width()*(-i)-($("div.wrap ul:first-child li").width()-$(window).width())/2
            },500,"swing",function(){
                $("div.wrap ul:first-child").css("left",-$("div.wrap ul:first-child li").width()*($("div.wrap ul:first-child li").length-2)-($("div.wrap ul:first-child li").width()-$(window).width())/2)
            });
            i =	$("div.wrap ul:first-child li").length-2;
        }else{
            $("div.wrap ul:first-child").stop(true,true).animate({
                left:$("div.wrap ul:first-child li").width()*(-i)-($("div.wrap ul:first-child li").width()-$(window).width())/2
            },500);
        }
        //给小圆点加上相应的反应，点击左键的时候，小圆点也会向左移一格
        if(i == 0){
            i =	$("div.wrap ul:first-child li").length-2;
            $("div.wrap ul:eq(1) li").each(function(){
                $("div.wrap ul:eq(1) li").css("top",0);
            });
            $("div.wrap ul:eq(1) li:eq("+(i-1)+")").css("top",-10);
        }else if(i>0 || i<$("div.wrap ul:first-child li").length-1){
            $("div.wrap ul:eq(1) li").each(function(){
                $("div.wrap ul:eq(1) li").css("top",0);
            });
            $("div.wrap ul:eq(1) li:eq("+(i-1)+")").css("top",-10);
        }else{
            i = 1;
            $("div.wrap ul:eq(1) li").each(function(){
                $("div.wrap ul:eq(1) li").css("top",0);
            });
            $("div.wrap ul:eq(1) li:eq("+(i-1)+")").css("top",-10);
        }
    });

    //小圆点的功能，是点击产生对应的效果，
    //1.点击事件，点击进入相应的图片
    //2.mouseover事件，会变亮
    //3.当前这张会变亮事件，当前这张图片对应的圆点会是亮的状态  hover事件已经解决
    $("div.wrap ul:eq(1) li").click(function(){
        i = $(this).index()+1;
        $("div.wrap ul:first-child").animate({
            left:$("div.wrap ul:first-child li").width()*(-i)-($("div.wrap ul:first-child li").width()-$(window).width())/2
        },500);
        $("div.wrap ul:eq(1) li").each(function(){
            $("div.wrap ul:eq(1) li").css("top",0);
        });
        $(this).css("top",-10);
        //利用hover函数解决over out事件 ，hover（over，out），参数是function
    }).hover(function(){
        $(this).css("top",-10);
    },function(){
        if($(this).index() != i-1)
            $(this).css("top",0);
    });

    //给导航的a一个点击事件，阻止默认跳转事件，并锁定到top为0的位置
    $("nav div#nav ul li").click(function(event){
        //先判断是否有动画在运行,有就让他直接运行到终点，然后在执行相应的点击事件
        if($("div.nav_sub_bar").is(":animated")){
            $("div.nav_sub_bar").stop(true,true);
        }
        //event.preventDefault();
        //event.stopProgation();
        //阻止冒泡和阻止默认事件 return false可以直接把冒泡和默认操作给阻止掉
        //判断如果当前已经到了424的位置，就不做下面的操作
        //点击的索引值放在j里面
        j = $(this).index();
        var m = $("div.nav_sub_bar:visible").index();

        //当前点击的这张的如果导航位置不在顶部
        if($("body").scrollTop()<524){
            $("body").stop(true,true).animate({
                scrollTop:524
            },1000,"swing",function(){
                //判断当前点击的是不是已经弹出，如果已经弹出，那么就缩回去
                //之前写错的原因在于回调函数里面的this代表的不是li标签而是，回调函数的宿主也就是body
                //不存在弹窗
                if(m == -1){
                    $("div.nav_sub_bar:eq("+j+")").toggle("slow");
                    $("nav div#nav ul li a").css("background-position","top");
                    $("nav div#nav ul li:eq("+j+")").children().css("background-position","bottom");
                    //存在弹窗的话 判断点击的与弹窗是否一致，一致的话
                }else{
                    if($("div.nav_sub_bar:visible").index() == j){
                        $("nav div#nav ul li:eq("+j+")").children().css("background-position","top");
                        $("div.nav_sub_bar:eq("+j+")").toggle("slow");
                    }else{
                        //如果点击的和已点击的不同，
                        //1 把所有的hover移除，然后把当前点击的这张变亮
                        //2 把所有的div全部设置为隐藏，再把对应的div显示出来
                        $("div.nav_sub_bar:eq("+m+")").toggle("slow");
                        //$("div.nav_sub_bar").css("display","none");
                        $("div.nav_sub_bar:eq("+j+")").toggle("slow");

                        //点击会变亮
                        $("nav div#nav ul li a").css("background-position","top");
                        $("nav div#nav ul li:eq("+j+")").children().css("background-position","bottom");

                    }
                }
            });
            return false;
            //滚动条已经到达顶部
        }else{
            if(m == -1){
                $("div.nav_sub_bar:eq("+j+")").stop(true,true).toggle("slow");
                $("nav div#nav ul li a").css("background-position","top");
                $("nav div#nav ul li:eq("+j+")").children().css("background-position","bottom");
                //存在弹窗的话 判断点击的与弹窗是否一致，一致的话
            }else{
                if($("div.nav_sub_bar:visible").index() == j){
                    //为了避免这个与移出时间产生冲突，所以把 a便签变暗放到toggle回调函数里面
                    //$("nav div#nav ul li:eq("+j+")").children().css("background-position","top");
                    $("div.nav_sub_bar:eq("+j+")").stop(true,true).toggle("slow","swing",function(){
                        $("nav div#nav ul li:eq("+j+")").children().css("background-position","top");
                    });
                }else{
                    //如果点击的和已点击的不同，
                    //1 把所有的hover移除，然后把当前点击的这张变亮
                    //2 把所有的div全部设置为隐藏，再把对应的div显示出来
                    $("div.nav_sub_bar:eq("+m+")").stop(true,true).toggle("slow");
                    $("div.nav_sub_bar:eq("+j+")").stop(true,true).toggle("slow","swing",function(){
                        $("nav div#nav ul li a").css("background-position","top");
                        $("nav div#nav ul li:eq("+j+")").children().css("background-position","bottom");
                    });
                }
            }
            return false;
        }
    });

    //导航的移入事件
    $("nav div#nav ul li").hover(function(){
        //移入的时候判断，没有弹出的项就正常的hover事件，如果
        var k = $(this).index();  //移入的对象的索引值
        var l = $("div.nav_sub_bar:visible").index();

        //没有弹出项 正常移入
        if(l == -1){
            $(this).children().css("background-position","bottom");
            //有弹出项的时候,判断移入的索引值与弹出值是否相同，相同的话，
        }else{
            $(this).children().css("background-position","bottom");
        }
        //移出的时候,如果移出的对象索引值和，弹出的不相同，那么，清空所有的然后把弹出的那个a
    },function(){
        var k = $(this).index();  //移出的对象的索引值
        var l = $("div.nav_sub_bar:visible").index();
        //判断
        if(l == -1){
            $(this).children().css("background-position","top");
            //判断移出的对象索引是否相同，相同，不操作，不相同，操作
        }else{
            $(this).children().css("background-position","top");
            $("nav div#nav ul li:eq("+l+") a").css("background-position","bottom");
        }
    });

    //上面两张图的动态效果
    //右边的效果移入到div的时候，上面的遮罩会消失
    $("article div.top div.top_two_section#main_product").hover(function() {
        //判断是否有正在运动的物体，有就结束他
        $(this).children(":animated").stop(true,true);
        $(this).children(":first-child").fadeOut(1000,"easeInQuad");
        //$(this).children(":first-child").slideUp(1000,"easeInQuad");
    },function() {
        $(this).children(":animated").stop(true,true);
        $(this).children(":first-child").fadeIn(1000,"easeInQuad");
        //$(this).children(":first-child").slideDown(1000,"easeInQuad");
    });

    //下面三张小图的动态效果
    //点击联系我们的图像，有弹出层
    //设置遮罩的高和文档高度相同
    //$("div.screen").css("height",$(window).height());
    //一个很奇特的现象出现了，在此处设置的高度不包含，浮动元素部分，因为高度未设置所以计算的时候都是0，原因是onload和ready事件的区别，ready不是完全加载的，结构出来就可以了
    //下面的表达式写进
    //    var x123 = $("div.screen").css("height",$(document).height());


    //联系我们的动态效果
    $("div#contact_us").click(function() {
        //这里把设置高度设置为click事件，可以跟随高度不同自适应
        //alert(document.body.offsetHeight);
        $("div.screen").css("height",$(document).height());
        //alert(document.body.offsetHeight);

        //console.log('total:'+$(document).height()+'img:'+$("#brand_story img").height()+'img:'+$("#new_promotion img").height());
        //alert(screenHeight);

        $("div.screen").show(1000);
        $("div#alert").show(1000);
    });
    //点击右上角的X弹出层会被关闭
    $("div#alert div button").click(function(e) {
        //alert(123);
        $("div.screen").hide(1000);
        $("div#alert").hide(1000);
        //对于嵌套的结构尤其要注意冒泡的发生
        e.stopPropagation();
        //return false;
    });
    //FAQ弹出效果
    $("div#FAQ").click(function() {
        $("div.screen").css("height",$(document).height());
        $("div.screen").show(1000);
        $("div#comeout").show(1000);
    });
    //点击右上角的X弹出层会被关闭
    $("div#comeout button").click(function(e) {
        //alert(123);
        $("div.screen").hide(1000);
        $("div#comeout").hide(1000);
        //对于嵌套的结构尤其要注意冒泡的发生
        e.stopPropagation();
        //return false;
    });
    //常见问题汇总的动态效果
    $("article div div#FAQ div#comeout ul#faqnav li").click(function() {
        //有运动的那么停止
        $("article div div#FAQ div#comeout article section:animated").stop(true,true);

        var j = $(this).index();
        var s = $("article div div#FAQ div#comeout article section:visible").index();

        if(j == s){
            return false;
        }else{

            $("article div div#FAQ div#comeout ul#faqnav li:eq("+j+")").addClass("active");
            $("article div div#FAQ div#comeout ul#faqnav li:eq("+s+")").removeClass("active");
            $("article div div#FAQ div#comeout article section:eq("+j+")").slideDown();
            $("article div div#FAQ div#comeout article section:eq("+s+")").slideUp();

        }
    });


    //导航下面的弹出，每个产品的简介，动态效果
    $("div.inner a").hover(function () {
        //var This = this;
        $(this).next().css("display","block");
        $(this).next().stop(true,true).animate({
            top:56,
            opacity:1
        },1000)
    }, function () {
        $(this).next().stop(true,true).animate({
            top:0,
            opacity:0
        },1000)
    });

    //当滚动条到达一定位置的时候，锁定导航条，上移的时候取消锁定效果
    $(window).scroll(function(){
        //如果屏幕宽度超过1024 才有锁屏效果
        if($(window).width()>1024) {
            //如果超过了524那么锁定他并半透明
            if ($(window).scrollTop() > 524) {
                $("nav div#nav").css({
                    "position": "fixed",
                    "top": 0,
                    "opacity": "0.8",
                    "border-bottom": "1px solid white"
                });
                $(".nav_sub_bar").css({"position": "fixed", "top": 76, "opacity": "0.8"});
                $("article#article").css("margin-top", 76);
            } else {
                $("nav div#nav").css({"position": "relative", "opacity": "1", "border-bottom": "none"});
                $(".nav_sub_bar").css({"position": "relative", "top": 0, "opacity": "1"});
                $("article#article").css("margin-top", 0);
            }
        }else{
            $("nav div#nav").css({"position": "relative", "opacity": "1", "border-bottom": "none"});
            $(".nav_sub_bar").css({"position": "relative", "top": 0, "opacity": "1"});
            $("article#article").css("margin-top", 0);
        }

    });
    //alert($(window).width());
    //当窗口被缩小的时候，图片也会被缩小，并且当前的位置还是此位置
    $(window).resize(function(){

        $("#main_product").css("height",$("#new_promotion img").height());

        $("img#contact_img").css("height",$("img#brand_img").height());

        $("div.wrap ul:first-child").css("width",$("div.wrap ul:first-child li").width()*$("div.wrap ul:first-child li").size());
        $("div.wrap ul:first-child").css("left",-$("div.wrap ul:first-child li").width()*i-($("div.wrap ul:first-child li").width()-$(window).width())/2);
        $(liPare).css("left",($(window).width()-$(liPare).width())/2);

        //1024写在上面 这个是用来给logo定位用的
        if($(window).width() > 1024){
            //判断是否有下拉弹出如果弹出，收回去，否则没反应
            if($("#closeOpenTag").hasClass("cross")){
                $("#closeOpenTag").click();
            }
            $("nav div#nav a img").css("margin-left",($(window).width()-1002)/2);
        }else{
            $("nav div#nav a img").css("margin-left","auto");
        }
        if($(window).width() < 768){
            $("contanct_img").css('height','auto');
        }else{
            $("contanct_img").css('height',$("#brand_img").height());
        }
    });

    //footer效果里面的效果
    //公司简介
    $("footer a#company").click(function (e) {
        $("div.screen").css("height",$(document).height());
        //alert(1);
        $("div.screen").show(1000);
        $("div#brandBrief").show(1000);
        //e.preventDefault();
        return false;
    });
    $("div#brandBrief button").click(function(e) {
        //alert(123);
        $("div.screen").hide(1000);
        $("div#brandBrief").hide(1000);
        //对于嵌套的结构尤其要注意冒泡的发生
        e.stopPropagation();
        //return false;
    });

    //隐私
    $("footer a#privacy").click(function (e) {
        $("div.screen").css("height",$(document).height());
        //alert(1);
        $("div.screen").show(1000);
        $("div#privacyContent").show(1000);
        //e.preventDefault();
        return false;
    });
    $("div#privacyContent button").click(function(e) {
        //alert(123);
        $("div.screen").hide(1000);
        $("div#privacyContent").hide(1000);
        //对于嵌套的结构尤其要注意冒泡的发生
        e.stopPropagation();
        //return false;
    });
    //服务条款
    $("footer a#service").click(function (e) {
        $("div.screen").css("height",$(document).height());
        //alert(1);
        $("div.screen").show(1000);
        $("div#serviceContent").show(1000);
        //e.preventDefault();
        return false;
    });
    $("div#serviceContent button").click(function(e) {
        //alert(123);
        $("div.screen").hide(1000);
        $("div#serviceContent").hide(1000);
        //对于嵌套的结构尤其要注意冒泡的发生
        e.stopPropagation();
        //return false;
    });
    //客户服务中心
    $("footer a#seviveCenter").click(function (e) {
        $("div.screen").css("height",$(document).height());
        //alert(1);
        $("div.screen").show(1000);
        $("div#servcenter").show(1000);
        //e.preventDefault();
        return false;
    });
    $("div#servcenter button").click(function(e) {
        //alert(123);
        $("div.screen").hide(1000);
        $("div#servcenter").hide(1000);
        //对于嵌套的结构尤其要注意冒泡的发生
        e.stopPropagation();
        //return false;
    });
    //footer页尾部分的二维码弹出
    $("#wxLogo").hover(function () {
        //alert(1);
        var offsetLeft = $("#wxLogo").offset().left - $("#wxLogo").width()/2+'px';
        //alert(offsetLeft);
        $("#weiXinMa").css({'left':offsetLeft,'display':'block'});
    }, function () {
        $("#weiXinMa").css('display','none');
    });
});

//该函数，目的是根据轮播图片数量来添加轮播图片下面的小圆点，作为导航，
function addLi(liparent,li,piclength){
    for(var i=0;i<piclength;i++){
        $(li).appendTo(liparent);
    }
}