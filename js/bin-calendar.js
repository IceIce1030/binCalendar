function doFirst(){
	SetDate=new Date();
	LeapYear=false;
	muchdays =[31,28,31,30,31,30,31,31,30,31,30,31];
	now = new Date();
	startDate = new Date();
	endDate = new Date();
	current_year = new Date().getFullYear();
	current_month = new Date().getMonth();
	clcikCount=0;
	CheckYear();
	days = muchdays[current_month];
	$id('before').addEventListener('click',monthLess,false);
	$id('after').addEventListener('click',monthPlus,false);
	$id('year').innerText=current_year;
	$id('month').innerText=current_month+1;
	monthChange();	
	dayDivs = document.getElementsByClassName('dayy');
	for(var i=0;i<dayDivs.length;i++){
		if( now.getDate() == i+1 && now.getMonth()==current_month){
			dayDivs[i].style.background= '#999';
			break;
		}
		else{
			dayDivs[i].style.opacity= '0.4';
		}
	}
}//dofirst
function $id(id){
		var getid=document.getElementById(id);
		return getid;
}
function monthLess(){

	current_month --;
	if(current_month<0){
		current_month=11;
		current_year--;
		SetDate.setFullYear(current_year);

		$id('year').innerText=current_year;
	}
	$id('month').innerText=current_month+1;
	days = muchdays[current_month];
	monthChange();
}
function monthPlus(){
	current_month ++;
	if(current_month>11){
		current_month=0;
		current_year++;

		SetDate.setFullYear(current_year);
		$id('year').innerText=current_year;
	}
	$id('month').innerText=current_month+1;

	days = muchdays[current_month];
	monthChange();
}
function monthChange(){
	$id('table').innerHTML='';
	if (LeapYear==true && selectmm==2){
		days=days+1;
	}
	SetDate.setMonth(current_month);
	SetDate.setDate(1);
	var week=SetDate.getDay()+1;
	var day=1;
	var createDivDate = new Date();
	createDivDate.setMonth(current_month);
	createDivDate.setFullYear(current_year);
	for(var i=1;i<50;i++){
		
		if(days>0){
			if(week>1){
				var div = document.createElement('div');
				div.setAttribute("class", "day");
				

				var divBox = document.createElement('div');
				divBox.setAttribute("class", "dayBox");
				divBox.appendChild(div);

				$id('table').appendChild(divBox);
				week--;
			}
			else{
				createDivDate.setDate(day);
				var div = document.createElement('div');
				div.innerText = day;
				div.setAttribute("class", "day dayy");
				div.setAttribute("id","day"+day);

				var divBox = document.createElement('div');
				divBox.setAttribute("class", "dayBox");
				divBox.appendChild(div);

				if(createDivDate>now){
					div.addEventListener('click',selectday,false);
					div.setAttribute("class", "day dayy dayPointer");
				};
				
				$id('table').appendChild(divBox);
				day++;
				days--;
			}
		}
		else{
			break;
		}
	}
	now = new Date();
	dayDivs = document.getElementsByClassName('dayy');
	for(var i=0;i<dayDivs.length;i++){
		if( now.getDate() == i+1 && now.getMonth()==current_month && now.getFullYear()==current_year ){
			dayDivs[i].style.background = '#999';
			break;
		}

		else if(current_month==now.getMonth() && current_year==now.getFullYear() && now.getDate() > i+1 ){
			dayDivs[i].style.opacity= '0.4';
		}

		else if(current_month<now.getMonth() && current_year==now.getFullYear()){
				dayDivs[i].style.opacity= '0.4';
		}

		else if(current_year<now.getFullYear()){
				dayDivs[i].style.opacity= '0.4';
		}
		else{
			dayDivs[i].style.background ='';
		}
	}
	if(clcikCount>0){
		coloringStarEnd();
		coloring();
	} 
}
function CheckYear(){
	if (current_year%4==0 || current_year%100==0 || current_year%400==0) {
		LeapYear=true;
	}else{
		LeapYear=false;
	}
}
function selectday(){	
	var clickDate = this.innerText;
	if(clcikCount>1){
		clearColor();
		clcikCount=0;
	}
	if(clcikCount==0){
		var roomIn = document.getElementsByClassName('roomIn');
		for(var i=0;i<roomIn.length;i++){
			roomIn[i].innerText='請選擇入住日期';
		}
		var roomOut = document.getElementsByClassName('roomOut');
		for(var i=0;i<roomOut.length;i++){
			roomOut[i].innerText='請選擇退房日期';
		}
		var roomDays = document.getElementsByClassName('roomDays');
		for(var i=0;i<roomOut.length;i++){
			roomDays[i].innerText='0';
		}
		dayDivs = document.getElementsByClassName('dayy');
		for(var i=0;i<dayDivs.length;i++)
		{
			if( now.getDate() == i+1 && now.getMonth()==current_month && now.getFullYear()==current_year ){
				dayDivs[i].style.background = '#999';
			}
			else if(current_month<=now.getMonth() && current_year<=now.getFullYear() && now.getDate() > i+1 ){
				dayDivs[i].style.opacity= '0.4';
			}
			else{
				dayDivs[i].style.background ='';
				dayDivs[i].style.color ='#000';
			}
		}
		clcikCount++;
		startDate.setDate(clickDate);
		startDate.setMonth(current_month);
		startDate.setFullYear(current_year);
		this.style.background='#ffa800';

		var roomIn = document.getElementsByClassName('roomIn');
		for(var i=0;i<roomIn.length;i++){
			roomIn[i].innerText=startDate.toLocaleDateString("ja-JP");
		}

		$id('roomOut').innerText="";
		$id('roomIn').innerText=startDate.toLocaleDateString("ja-JP");

	}
	else if(clcikCount==1){
		clcikCount++;
		endDate.setDate(clickDate);
		endDate.setMonth(current_month);
		endDate.setFullYear(current_year);

		if(startDate>endDate){
			var temp = new Date();
			temp = startDate;
			startDate = endDate;
			endDate = temp;
			var roomIn = document.getElementsByClassName('roomIn');
			for(var i=0;i<roomIn.length;i++){
				roomIn[i].innerText=startDate.toLocaleDateString("ja-JP");
			}

		}
		this.style.background='#ffa800';
		var roomOut = document.getElementsByClassName('roomOut');
		for(var i=0;i<roomOut.length;i++){
			roomOut[i].innerText=endDate.toLocaleDateString("ja-JP");
		}
		muchNight=endDate-startDate;
		muchNight=muchNight/86400000+1;

		var roomDays = document.getElementsByClassName('roomDays');
		for(var i=0;i<roomOut.length;i++){
			roomDays[i].innerText=muchNight;
		}

		$id('roomOut').innerText=' - '+endDate.toLocaleDateString("ja-JP");
		
		coloring();
	}
}
function clearColor(){
	dayDivs = document.getElementsByClassName('dayy');
	for(var i=0;i<dayDivs.length;i++){
		if( now.getDate() == i+1 && now.getMonth()==current_month){
			dayDivs[i].style.background= '#999';
		}
		else{
			dayDivs[i].style.background= 'none';
		}
	}
}
function coloring(){
	var dds = document.getElementsByClassName('dayy');
	if(current_month==startDate.getMonth() && current_month==endDate.getMonth() ){
		var start=startDate.getDate();
		for(var i=1; i<=muchNight-2; i++ ){	
			var a=i+start;
			document.getElementById('day'+a).style.background='#774720';
			document.getElementById('day'+a).style.color='#ddd';
		}
	}
	else if(current_month==startDate.getMonth() && current_month != endDate.getMonth() ){
		var start=startDate.getDate();
		for( i=1; i<=dds.length-start ; i++ ){
			var aa=i+start;
			document.getElementById('day'+aa).style.background='#774720';
		}
	}
	else if(current_month != startDate.getMonth() && current_month == endDate.getMonth() ){
		var end=endDate.getDate();
		for( i=1; i<end; i++ ){
			document.getElementById('day'+i).style.background='#774720';
		}
	}
}
function coloringStarEnd(){
	if(current_month==startDate.getMonth()){
		document.getElementById('day'+startDate.getDate()).style.background='#ffa800';
		document.getElementById('day'+startDate.getDate()).style.color='#ddd';
	}
	if(current_month==endDate.getMonth()){
		document.getElementById('day'+endDate.getDate()).style.background='#ffa800';
		document.getElementById('day'+startDate.getDate()).style.color='#ddd';
	}
}
window.addEventListener('load',doFirst,false);
$().ready(function(){
	//日曆出現動畫
	$('.bin-calendar .i-dateClick').click(function(){
		$('.bin-calendar .b-select-date').slideToggle();
	});
	$('.bin-calendar .closeLightBox').click(function(){
		$('.bin-calendar .b-select-date').slideUp();
	});
});
	
