var pHeight=0;//画布高
var pWidth=0;//画布宽
(function(){

var now = { row:1, col:1 }, last = { row:0, col:0};
const towards = { up:1, right:2, down:3, left:4};
var isAnimating = false;
var wh=414/672;//设计稿的宽高比
var ws=window.innerWidth//手机实际宽
var hs=window.innerHeight;//手机实际高去掉导航栏
var yhh=ws/wh;//当前手机宽度下设计稿的高度，如果此高度大于当前手机高度，那么缩放
var s;
s=hs/yhh;
var ss=yhh/2*(1-s);
var wy=s*ws;
//$('.page').css('height',hs);
$('.wrap').css('height',yhh);//将缩放容器高度设置为当前手机宽度下设计稿的高度，为与宽度缩放基础保持一致
//document.title=yhh+'|'+wy;
$('.wrap').css('-webkit-transform','scale('+s+','+s+') translate(0px,-'+ss+'px)');
pHeight=pWidth=$('.wrap').width()*7/10;
$('.pie').css('height',pHeight);

document.addEventListener('touchmove',function(event){
	event.preventDefault(); },false);

$(document).swipeUp(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 14) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}	
	//第四屏播放饼状图动画	
	if(last.row==3)
	{setTimeout(function(){draw();},600)}
})
$(document).swipeDown(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}
	//第四屏播放饼状图动画	
	if(last.row==14)
	{setTimeout(function(){draw();},600)}	
})


function pageMove(tw){
	var lastPage = ".page-"+last.row+"-"+last.col,
		nowPage = ".page-"+now.row+"-"+now.col;
	
	switch(tw) {
		case towards.up:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;		
		case towards.down:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");
	
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
		setTimeout(function(){
		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		//$(lastPage).find("img").addClass("hide");
		
		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		//$(nowPage).find("img").removeClass("hide");
		
		isAnimating = false;
	},600);
}

})();
function draw(){	
	var canvas = document.getElementById('tutorial');//canvas画布
	canvas.height=pHeight;
	canvas.width=pWidth;
	var ctx = canvas.getContext('2d');	
	var color = ["#4bc1be","#fb853f","#fc4770","#b286dd"];  /*5组扇形，不同颜色*/
    var data = [30,58,2,10];   /*扇形的角度百分比，5组加起来正好是100*/
    var radius = pWidth/2;/*圆半径*/
    var startPoint = 0;  /*起始点位置*/
    var endPoint=0;
    var pi2=Math.PI*2;
    var o={x:radius,y:radius}/*坐标原点*/,rectbox={ox:0,oy:0,wid:pWidth,hei:pHeight}/*画布大小*/;
	var i=0;	
	var c=color[0];
	var r=radius[0];
	var timmer=null;	
	var flag1=true;
	var flag2=true;
	var flag3=true;
	
	timmer=setInterval(function(){	
		if(endPoint>pi2){
			clearInterval(timmer);
			return;
		}
		if(endPoint>pi2*98/100){			
			if(flag3){
				ctx.beginPath();
			}					
			drawfan(color[3]); 
			flag3=false;			
		}	
		else if(endPoint>pi2*40/100){	
			if(flag2){
				ctx.beginPath();
			}		
			drawfan(color[2]); 
			flag2=false;			
		}	
		else if(endPoint>pi2*1/10){	
			if(flag1){
				ctx.beginPath();
			}		
			drawfan(color[1]); 	
			flag1=false;		
		}			
		else{
			drawfan(color[0]);
		}
		//document.title=endPoint;
		
	},10);	
		
	function drawfan(color){		
		endPoint=startPoint+pi2/120;		
        ctx.fillStyle = color;            
        ctx.moveTo(o.x,o.y); 
        ctx.arc(o.x,o.y,radius,startPoint,endPoint,false);  
        ctx.fill();    
		startPoint=endPoint;
	}
}
