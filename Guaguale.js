var tempKey;
var key_array;
//避免和上一次的重复
function getKey(oldKey,key_arr){
	
	var key = key_arr[Math.floor((Math.random()*key_arr.length))];
	if(key_arr.length >1){
		if(oldKey === key){
			return getKey(key,key_arr);
		}
	}	
	tempKey = key;
	return key;
}
//初始化数组
function initArray(){
	//设置中奖信息
	key_array = [{name: 'iPhone 1 亮黑版', color: 'rgba(0, 0, 0, 1)',number:2},
		{name: 'iPhone 2 黑色版', color: 'rgba(0, 0, 0, .9)',number:2},
		{name: 'iPhone 3 安卓版', color: 'rgba(0, 255, 0, 1)',number:1},
		{name: 'iPhone 4 塞班版', color: 'rgba(255, 0, 0, 1)',number:1},
		{name: 'iPhone 5 无忧版', color: 'hotpink',number:1},
		{name: 'iPhone 6 JJ版', color: 'rgba(170, 170, 255, 1.0)',number:1},
		{name: 'iPhone 7 白色版', color: 'rgba(0, 255, 0, 1)',number:1},
		{name: 'iPhone 8 联系卓版', color: 'rgba(0, 255, 0, 1)',number:1},
		{name: 'iPhone 9 胡班版', color: 'rgba(255, 170, 255, 1.0)',number:1},
		{name: 'iPhone 10 哈忧版', color: 'rgba(255, 85, 255, 1.0)',number:1}];
	
	return key_array;
}
//删除数组中指定元素
function delOneArray(array,key){
	const idx = array.indexOf(key);
	array.splice(idx,1);
}
	
function getIndex(number_arr){
	 
	var dataIndex=getKey(tempKey,key_array);
	console.log("dataIndex "+dataIndex.name);
	var num = dataIndex.number;
	num--;
	dataIndex.number = num;
	if(num <= 0){
		//将数量小于0的删除
		delOneArray(key_array,dataIndex);
	}		 	
	return dataIndex;
}

function render(canvas,number_arr){
		
	canvas.width = 200;
	canvas.height = 110;
	var area=canvas.width*canvas.height;
	var offsetX = canvas.offsetLeft, offsetY = canvas.offsetTop;  
	// console.log(area);
	
	//联系上下文 建立一个 canvasvasRenderingContext2D 二维渲染上下文。
	var cv = canvas.getContext("2d");	
			
	if(key_array === undefined){
		// console.log("keyarray not define");
		initArray();
	}
	//获得对象
	var dataIndex=getIndex(number_arr);

	//设置文字
	cv.font="200 20px 微软雅黑";
	cv.textBaseline = 'middle';
	cv.textAlign="center";
	cv.fillStyle=dataIndex.color;
	cv.fillText(dataIndex.name,canvas.width/2,canvas.height/2);
	//将背景转换为canvasvas特有的base64格式
	var dataUrl=canvas.toDataURL("image/png",1);
	//将背景图片设置为canvasvas画布的背景
	canvas.style.backgroundImage="url("+dataUrl+")";
	//给画布添加遮罩层
	cv.fillStyle="#CCC";
	cv.fillRect(0,0,canvas.width,canvas.height);
	//设置点击事件
	var flag=false;
	var r=10;

	function eventDown(e){                 
		e.preventDefault();                 
		 flag=true;
		// destination-out 是让重叠部分的内容变为透明
		cv.globalCompositeOperation = 'destination-out';           
	}   
	function eventUp(e){            
		e.preventDefault();                 
		flag=false;          
	}               
	function eventMove(e){                 
		e.preventDefault();  
					   
		if(flag){
			if(e.changedTouches){                         
				e=e.changedTouches[e.changedTouches.length-1];                     
			}                     
			var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,                         
			y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;                                        
			cv.beginPath()                     
			cv.arc(x, y, 50, 0, Math.PI * 2);                         
			cv.fill();                                    
		} 
		
// 		if(flag){

// 			var x0 = e.clientX - canvas.offsetLeft;
// 			var y0 = e.clientY - canvas.offsetTop;

// 			cv.moveTo(x0, y0);
// 			cv.arc(x0, y0, r, 0, Math.PI * 2);
// 			cv.fill();

// 			var data = cv.getImageData(0,0,canvas.width,canvas.height).data;

// 			for(var i=0,j=0;i<data.length;i+=4){
// 				if(data[i] && data[i+1] && data[i+2] && data[i+3]){
// 					j++;
// 				}
// 			}
// 			//当图层被擦除剩余70%时触发
// 			if(j<=area*0.7){
// 				cv.clearRect(0,0,canvas.width,canvas.height);
// 			}
// 		}
	} 
	canvas.addEventListener('touchstart', eventDown);
	canvas.addEventListener('touchend', eventUp);             
	canvas.addEventListener('touchmove', eventMove);             
	canvas.addEventListener('mousedown', eventDown);             
	canvas.addEventListener('mouseup', eventUp);             
	canvas.addEventListener('mousemove', eventMove); 
		
}