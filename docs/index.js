$(document).ready(function(){

		var i = 1;
		var j = 0;

		//让导航条的logo左边距
		$("nav div#nav a img").css("margin-left",($(window).width()-1002)/2);	
		$("div.wrap ul:first-child li img").css("width",$(window).width());
		//为了使第一张和最后一张过渡效果自然，第一张图前面复制并查插入一个最后一张图
		$("div.wrap ul:first-child li:eq(0)").clone().appendTo("div.wrap ul:first-child");
		//为了使第一张和最后一张过渡效果自然，最后一张图后面复制并查插一个第一张图
		//唯一一个麻烦的事是eq里面只能写数字，所以加图片的时候会有问题
		//已解决要使用"+last+"的方法
		
		var last = $("div.wrap ul:first-child li").length-2;
		//$("div.wrap ul li:eq(2)").clone().prependTo("ul");
		$("div.wrap ul:first-child li:eq("+last+")").clone().prependTo("div.wrap ul:first-child");
		$("div.wrap ul:first-child").css("width",$("div.wrap ul:first-child li").width()*$("div.wrap ul:first-child li").length);
		$("div.wrap ul:first-child").css("left",-$("div.wrap ul:first-child li").width());
		
		//给左右箭头的相对高度设定
		$("#left").css("top",($("div.wrap").height()-$("#left").height())/2);
		$("#right").css("top",($("div.wrap").height()-$("#left").height())/2);
		
		var liPare = "div.wrap ul:eq(1)";
		
		//$(liPare).css("left",)
		var lii = '<li><img src="dot.png"/></li>';
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
					left:$("div.wrap ul:first-child li").width()*-i
				},300,"swing",function(){
					$("div.wrap ul:first-child").css("left",-$("div.wrap ul:first-child li").width())
				});	
				i=1;
			}else{
				$("div.wrap ul:first-child").stop(true,true).animate({
					left:$("div.wrap ul:first-child li").width()*-i
				},300,"swing");	
			}
			
			if(i == 0){
				i =	$("div.wrap ul:first-child li").length-2;
				$("div.wrap ul:eq(1) li").each(function(){
					$("div.wrap ul:eq(1) li").css("top",0);
				});
				$("div.wrap ul:eq(1) li:eq("+(i-1)+")").css("top",-22);
			}else if(i>0 || i<$("div.wrap ul:first-child li").length-1){
				$("div.wrap ul:eq(1) li").each(function(){
					$("div.wrap ul:eq(1) li").css("top",0);
				});
				$("div.wrap ul:eq(1) li:eq("+(i-1)+")").css("top",-22);
			}else{
				i = 1
				$("div.wrap ul:eq(1) li").each(function(){
					$("div.wrap ul:eq(1) li").css("top",0);
				});
				$("div.wrap ul:eq(1) li:eq("+(i-1)+")").css("top",-22);
			}
		});
		//点击左边的箭头会向右走一格
		$("div.wrap #left").click(function(){	
			i--;
			if(i == 0){
				$("div.wrap ul:first-child").stop(true,true).animate({
					left:$("div.wrap ul:first-child li").width()*-i
				},300,"swing",function(){
					$("div.wrap ul:first-child").css("left",-$("div.wrap ul:first-child li").width()*($("div.wrap ul:first-child li").length-2))
				});	
				i =	$("div.wrap ul:first-child li").length-2;	
			}else{
				$("div.wrap ul:first-child").stop(true,true).animate({
				left:$("div.wrap ul:first-child li").width()*-i
				},300,"swing");	
			}
			//给小圆点加上相应的反应，点击左键的时候，小圆点也会向左移一格
			if(i == 0){
				i =	$("div.wrap ul:first-child li").length-2;
				$("div.wrap ul:eq(1) li").each(function(){
					$("div.wrap ul:eq(1) li").css("top",0);
				});
				$("div.wrap ul:eq(1) li:eq("+(i-1)+")").css("top",-22);
			}else if(i>0 || i<$("div.wrap ul:first-child li").length-1){
				$("div.wrap ul:eq(1) li").each(function(){
					$("div.wrap ul:eq(1) li").css("top",0);
				});
				$("div.wrap ul:eq(1) li:eq("+(i-1)+")").css("top",-22);
			}else{
				i = 1
				$("div.wrap ul:eq(1) li").each(function(){
					$("div.wrap ul:eq(1) li").css("top",0);
				});
				$("div.wrap ul:eq(1) li:eq("+(i-1)+")").css("top",-22);
			}
		});
		
		//小圆点的功能，是点击产生对应的效果，
		//1.点击事件，点击进入相应的图片
		//2.mouseover事件，会变亮
		//3.当前这张会变亮事件，当前这张图片对应的圆点会是亮的状态  hover事件已经解决
		$("div.wrap ul:eq(1) li").click(function(){
			i = $(this).index()+1;
			$("div.wrap ul:first-child").animate({
					left:$("div.wrap ul:first-child li").width()*-i
				},300);	
			$("div.wrap ul:eq(1) li").each(function(){
				$("div.wrap ul:eq(1) li").css("top",0);
			});
			$(this).css("top",-22);
			//利用hover函数解决over out事件 ，hover（over，out），参数是function
		}).hover(function(){
			$(this).css("top",-22);
		},function(){
			if($(this).index() != i-1)
				$(this).css("top",0);
		});
		
		//自动播放
		var timer = setInterval(function(){
			$("div.wrap #right").click();
		},4000);
		//鼠标移上去自动播放停止  hover（function1，function2），function1鼠标移入 function2是鼠标移出功能
		$("div.wrap ul:first-child").hover(function(){
			clearInterval(timer);
		},function(){
			timer = setInterval(function(){
				$("div.wrap #right").click();
			},4000);
		});
		
		//给导航的a一个点击时间，阻止默认跳转事件，并锁定到top为0的位置
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
				if($("body").scrollTop()<424){
					$("body").stop(true,true).animate({
						scrollTop:424
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
								$("div.nav_sub_bar:eq("+m+")").stop(true,true).toggle("slow")
								$("div.nav_sub_bar:eq("+j+")").stop(true,true).toggle("slow","swing",function(){
									$("nav div#nav ul li a").css("background-position","top");
									$("nav div#nav ul li:eq("+j+")").children().css("background-position","bottom");
								});
							}
						}
					return false;
				}
		});
		
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
				//判断移出的对象索引是否相同，相同，不操作，不相同，
			}else{
				$(this).children().css("background-position","top");
				$("nav div#nav ul li:eq("+l+") a").css("background-position","bottom");
			}
		});
		
		//当滚动条到达一定位置的时候，锁定导航条，上移的时候取消锁定效果 
		$(window).scroll(function(){
			//如果超过了423那么锁定他并半透明
			if($(window).scrollTop()>424){
				$("nav div#nav").css({"position":"fixed","top":0,"opacity":"0.8","border-bottom":"1px solid white"});
				$(".nav_sub_bar").css({"position":"fixed","opacity":"0.8"});
				$("article").css("margin-top",76);
			}else{
				$("nav div#nav").css({"position":"static","top":0,"opacity":"1","border-bottom":"none"});
				$(".nav_sub_bar").css({"position":"static","opacity":"1"});
				$("article").css("margin-top",0);
			}
		});
		
		//当窗口被缩小的时候，图片也会被缩小，并且当前的位置还是此位置
		$(window).resize(function(){
			$("div.wrap ul:first-child li img").css("width",$(window).width());
			$("div.wrap ul:first-child").css("width",$("div.wrap ul:first-child li").width()*$("div.wrap ul:first-child li").size());
			$("div.wrap ul:first-child").css("left",-$("div.wrap ul:first-child li").width()*i);
			$(liPare).css("left",($(window).width()-$(liPare).width())/2);
		});	
});
//该函数，目的是添加轮播图片下面的小圆点，作为导航，
function addLi(liparent,li,piclength){
	for(var i=0;i<piclength;i++){
	$(li).appendTo(liparent);
	}
}

