var date = (function(){

	var getDate = function(year,month,day){
		var da = new Date();
		da.setDate(day);
		da.setMonth(month);
		da.setFullYear(year);
		return da;
	}

	var getDay = function(year,month,day){  //get weekday
    return (new Date(year,month,day).getDay());
	}

	var Time = {
		day:0,
		year:0,
		month:0,
		week_day:0,

	}
	var firstday = function(){
		return new Date(this.currentTime.year,this.currentTime.month-1,1).getDay();
		
	}
  var init = function(){
  	var date = new Date();
		this.currentTime.day = date.getDate();
  	this.currentTime.month = date.getMonth() + 1;
  	this.currentTime.year = date.getFullYear();
  	animation();
  	var str = this.currentTime.year + "年" + this.currentTime.month + "月";
  	$('.center').html(str);
  	this.setTime(this.currentTime.year,this.currentTime.month,this.currentTime.day);
  	var index = $('.cell').index(this);
  	var first = this.weekday_firstday();
  	
  }
  var getdays = function(){
  	return new Date(this.currentTime.year,this.currentTime.month,0).getDate();
  }
//=====================================================
//class
	var task = {
		currentTime:Time,   //记录的月数是系统月数加一；
	  limit:{
	  	from:Time,       //同上
	  	to:Time
	  },
	  getDayNumInMon:getdays,  //取得当前月份的天数
	  getTime:function(){
	  	return this.currentTime;
	  },
	  setTime:function(year,month,day){  //month is 1~12
			this.currentTime.day = day;
	  	this.currentTime.month = month;
	  	this.currentTime.year = year;
	  	this.currentTime.week_day = new Date(year,month-1,day).getDay();
		},

	  getDay:getDay, //获取星期几
	  init:init,
	  weekday_firstday:firstday //获取当前月份第一天是星期几
	}
	return task;
})()
//===========================================================
//the function area
$('.cell').click(function(){
	var fullday = date.getDayNumInMon();
	 var index = $('.cell').index(this);
	 var first = new Date(date.currentTime.year,date.currentTime.month-1,1).getDay();
	 var day = index - first + 1;
	 console.log(day);
	 var last_month_days = new Date(date.currentTime.year,date.currentTime.month-1,0).getDate(); 
	 
	 if(day<=0){
	 	 date.setTime(date.currentTime.year,date.currentTime.month-1,last_month_days-day);
	 	 var str = "" + date.currentTime.year + "/" +date.currentTime.month+"/"+date.currentTime.day;
	 $('.result').val(str);
	 	 animation();
	 	 return;
	 }
	 if(day>fullday){
	 	 date.setTime(date.currentTime.year,date.currentTime.month+1,day-fullday);
	 	 var str = "" + date.currentTime.year + "/" +date.currentTime.month+"/"+date.currentTime.day;
	 $('.result').val(str);
	 	 animation();
	 	 return;
	 }
	 $('.cell').css('background','#FFE4B5').eq(index).css('background','#F0FFF0');
	 
	 date.setTime(date.currentTime.year,date.currentTime.month,day);
	 var str = "" + date.currentTime.year + "/" +date.currentTime.month+"/"+date.currentTime.day;
	 $('.result').val(str);
})

var animation = function(){  //repaint the web
	$('.hang').eq(5).css('display','block');

  $('.center').html(str);
	var str = date.currentTime.year + "年" + date.currentTime.month + "月";
	$('.center').html(str);
  var first = date.weekday_firstday();
  var index = first + date.currentTime.day - 1; //当前日期所在日历位置
	var fulldays = date.getDayNumInMon();
	var last_month_days = new Date(date.currentTime.year,date.currentTime.month-1,0).getDate();
  var n = 1;
  var n_ = 1;
  var flag_n = 0;
  $('.cell').css({'background':'#FFE4B5','color':'black'}).eq(index).css('background','white');
 	for(var i = 0 ; i < 42;i++){
 		if( i < first ){
 			$('.cell').eq(i).html(last_month_days - first + i+1).css('color','#999');

 		}else if( i >= first && i < first+fulldays){
 			$('.cell').eq(i).html(n++);
 		}else{
 			$('.cell').eq(i).html(n_++).css('color','#999');
 			flag_n++;
 		}
 	}
 	if(flag_n >= 7){
 		$('.hang').eq(5).css('display','none');
 	}
}
$('.left').click(function(){
	var last_month_days = new Date(date.currentTime.year,date.currentTime.month-1,0).getDate(); 
	console.log(last_month_days);
	if(date.currentTime.day > last_month_days){
		date.currentTime.day = last_month_days;
	}
	$('.cell').css('background','#FFE4B5').css('color','black');
	date.currentTime.month -= 1;
	if(date.currentTime.month == 0){
		date.currentTime.month = 12;
		date.currentTime.year -= 1;
	}
	date.setTime(date.currentTime.year,date.currentTime.month,date.currentTime.day);
	animation();
})
$('.right').click(function(){
	var next_month_days = new Date(date.currentTime.year,date.currentTime.month+1,0).getDate(); 
	if(date.currentTime.day > next_month_days){
		date.currentTime.day = next_month_days;
	}
	$('.cell').css('background','#FFE4B5').css('color','black');
	date.currentTime.month += 1;
	if(date.currentTime.month == 13){
		date.currentTime.month = 1;
		date.currentTime.year += 1;
	}
	date.setTime(date.currentTime.year,date.currentTime.month,date.currentTime.day);
	animation();
})
date.init(1);





