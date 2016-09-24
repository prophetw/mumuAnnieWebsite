/**
 * Created by apple on 15/7/12.
 */
$(document).ready(function () {


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


    //alert(1);
    $("#wxLogo").hover(function () {
        //alert(1);
        var offsetLeft = $("#wxLogo").offset().left - $("#wxLogo").width()/2+'px';
        //alert(offsetLeft);
        $("#weiXinMa").css({'left':offsetLeft,'display':'block'});
    }, function () {
        $("#weiXinMa").css('display','none');
    });

    if($(window).width() <1024 && $(window).width() > 767){
        //$("div.wrap ul:first-child li img").css("width",$(window).width());
        //$("nav div#nav a img").css("margin-left",($(window).width()-1002)/2);
        $("nav div#nav a img").css("margin-left","auto");
    }else if($(window).width() > 1024){
        $("nav div#nav a img").css("margin-left",($(window).width()-1002)/2);
    }

    //宅屏幕导航效果
    oul = document.getElementById("navul");
    oli = oul.getElementsByTagName("li");
    oa = oul.getElementsByTagName("a");
    //alert(oa.length);
    //alert(console.log(oli));
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
    //li标签的点击事件
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
    for(var q=0;q<arroa.length;q++){
        arroa[q].onclick = function (event) {
            var e = event || window.event;
            if(e.stopPropagation){
                e.stopPropagation();
            }else{
                e.cancelBubble = true;
            }
        };
    }
    //480宽的时候导航的效果,点击变成 "x"型号

    $("div#closeOpenTag").click(function () {
        $("div#closeOpenTag").toggleClass("cross");
        //alert(1);
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
        if($("body").scrollTop()<0){
            $("body").stop(true,true).animate({
                scrollTop:0
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



    $(window).resize(function(){

        $("#main_product").css("height",$("#new_promotion img").height());
        //$("div.wrap ul:first-child").css("width",$("div.wrap ul:first-child li").width()*$("div.wrap ul:first-child li").size());
        //$("div.wrap ul:first-child").css("left",-$("div.wrap ul:first-child li").width()*i-(1920-$(window).width())/2);
        //$(liPare).css("left",($(window).width()-$(liPare).width())/2);

        if($(window).width() <1024 && $(window).width() > 767){
            //$("div.wrap ul:first-child li img").css("width",$(window).width());
            //$("nav div#nav a img").css("margin-left",($(window).width()-1002)/2);
            $("nav div#nav a img").css("margin-left","auto");
        }else if($(window).width() > 1024){
            $("nav div#nav a img").css("margin-left",($(window).width()-1002)/2);
        }

    });


    $(window).scroll(function(){
        if($(window).scrollTop()>76){
            //锁定当前产品的导航条
            $("div.nav_local_product").css({"position":"fixed","width":"100%","top":0,"background-image":"url(nav_prd_bg.png)","background-repeat":"repeat-x"});
            $("#container").css("margin-top",50);
        }else{
            $("div.nav_local_product").css({"position":"static","width":"100%","background-image":""});
            $("#container").css("margin-top",0);
        }
        //检测是否有弹出窗口，有就收回去
    });



});



