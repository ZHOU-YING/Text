
window.onload=function (){
	
	var oBtn1=document.getElementById('Login');
	var oMenu=document.getElementById('menu');
	var oCov=document.getElementById('cover');
	var oClo=document.getElementById('close');
	var oBtn2=document.getElementById('butn');

	var oCarousel=document.getElementById('Carousel')
	var oPrev=document.getElementById('prev');
	var oNext=document.getElementById('next');
	var oImg=document.getElementById('img1');
	var oUl=document.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('li');
	var arrUrl=['img/21.jpg','img/32.jpg','img/41.jpg'];

	var oSearchinput=document.getElementById('searchinput');
	var oBtn3=document.getElementById('btn3');
	var oHistory=document.getElementById('history');
	var aInput=oHistory.getElementsByTagName('input');
	var arrHist=new Array();
	var a=new RegExp("^[\u4e00-\u9fa5]+$");

	var num=0;
	var timer=null;

/*-------登录框--------*/	
	
//*点击登录弹出登录框
	oBtn1.onclick=function (){
    	oCov.style.display='block';
		oMenu.style.display='block';
	};
//点击红色叉关闭弹出页面
	oClo.onclick=function (){
		oMenu.style.display='none';
		oCov.style.display='none';
	};
//点击登录关闭弹出页面
	oBtn2.onclick=function (){
		oMenu.style.display='none';
		oCov.style.display='none';
	};
//点击灰色部分关闭页面
 	oCov.onclick=function (){
 		oMenu.style.display='none';
		oCov.style.display='none';
 	};

/*--------轮播-------*/

//向UL添加列表
	for (var i = 0; i < arrUrl.length; i++) {
		oUl.innerHTML+='<li></li>';
	}
//初始化
	function fnTab(){
		oImg.src=arrUrl[num];
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].className='';
		}
		aLi[num].className='active';
     }
     fnTab();
//定时器
	function auto(){
		timer=setInterval(function(){
			num++;
			num%=arrUrl.length;
			fnTab();
	 	},2500);
	}
	auto();

	oCarousel.onmouseover=function (){
		clearInterval(timer);
	};
	oCarousel.onmouseout=auto;
//点击列表切换
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;   //索引值
		aLi[i].onclick=function(){
			num=this.index;
			fnTab();
		};
	}
	
//点击'<' '>'图片切换
	oPrev.onclick=function (){
		num--;
		if (num==-1) {
			num=arrUrl.length-1;
		}
		fnTab();
	};
	oNext.onclick=function (){
		num++;
		if (num==arrUrl.length) {
			num=0;
		}
			fnTab();
	};


/*--------搜索框-------*/

	for (var i = 0; i < 10; i++) {
//动态增加input标签数
		oHistory.innerHTML+='<input type="text" value="" readonly="true">';
	}

	oBtn3.onclick=function (){	
		//正则表达，输入的必须是中文且必须包含‘大学’
		if (a.test(oSearchinput.value)&&(oSearchinput.value.indexOf("大学")>0)) {
			//判定输入内容长度
				if (oSearchinput.value.length<11) {
						arrHist.unshift(oSearchinput.value);
				} else{
					arrHist.unshift(oSearchinput.value.substring(0,10));
				}

				//数组里的内容一一对应到input标签里
				for (var i = 0; i < arrHist.length; i++) {
				//判断是否有重复的历史记录
					  	 for (var j = 1; j< 11; j++) {	if(arrHist[0]==(arrHist[j])){  
								arrHist.splice(j,1);
						}	
				 	}
					 	
						//判定数组元素个数是否超出10个
							if(arrHist.length<11){

								aInput[i].value=arrHist[i];
					 			aInput[0].style.color='#bed742';//当前输入的内容为绿色
	
							} else{
								arrHist.pop();//超出10个删掉最开始的历史纪录
								aInput[i].value=arrHist[i];
								} //

						
				} 
		}
				
		else{
			alert('输入错误请重新输入!');
		}
		oSearchinput.value='';
	};
};