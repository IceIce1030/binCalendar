	// bCalendar('s-s-date');
	function bCalendar(inputid){
		Calendar(inputid);
		function Calendar(inputid){
			var setDate = new Date();//選到的時間
			var today = new Date();//今天

			//產生月曆外框
			calendarFrame(inputid);

			//滑鼠位置 月曆位置
			var tempX = event.clientX + document.body.scrollLeft;
			var tempY = event.clientY + document.body.scrollTop;
			document.getElementById('b-calendar').style.left = tempX+'px';
			document.getElementById('b-calendar').style.top = tempY+'px';

			wCreate();//星期
			mCreate(today);//月下拉選單
			yCreate(today);//年下拉選單
			dCreate(today,inputid);//天
		}



		// 產生月曆外框
		function calendarFrame(inputid){
			// 產生月曆框架
			var CalendarDiv = document.createElement('div');
			CalendarDiv.setAttribute("id", "b-calendar");
			//document.body.appendChild(CalendarDiv);
			document.getElementById('test').appendChild(CalendarDiv);

			// 叉叉
			var xx = document.createElement('div');
			xx.setAttribute("id", "x-cale");
			CalendarDiv.appendChild(xx);
			xx.addEventListener('click',function(){
				document.getElementById('b-calendar').remove();
			},false);

			// 年
			var yDiv = document.createElement('div');
			var ySelect = document.createElement('select');
			ySelect.setAttribute("id","year-s");
			yDiv.appendChild(ySelect);
			CalendarDiv.appendChild(yDiv);
			ySelect.addEventListener('change',function(e){
				yearSelect(inputid,e);
			},false);

			// 月的盒子
			var mDiv = document.createElement('div');
			mDiv.setAttribute("class","month-s-box");

			// 上一月
			var preMDiv = document.createElement('div');
			preMDiv.setAttribute("id","preMon");
			preMDiv.innerText = '上個月';
			mDiv.appendChild(preMDiv);
			preMDiv.addEventListener('click',function(e){
				var curMS = $('#month-s option:selected');


				if( curMS.val() == 1){
					$('#month-s option').eq(11).attr('selected',true);
					$('#month-s option').not($('#month-s option').eq(11)).attr('selected',false);

					var csy = $('#year-s option:selected')	;
					csy.prev('option').attr('selected',true);
					$('#year-s option').not(csy.prev('option')).attr('selected',false);
				}
				else{
					curMS.prev('option').attr('selected',true);
					$('#month-s option').not(curMS.prev('option')).attr('selected',false);
				}

				monthChange(inputid);
			},false);

			// 月下拉選單
			var mSelect = document.createElement('select');
			mSelect.setAttribute("id","month-s");
			mDiv.appendChild(mSelect);
			CalendarDiv.appendChild(mDiv);
			mSelect.addEventListener('change',function(e){
				monthSelect(inputid,e);
			},false);


			// 下一月
			var nextMDiv = document.createElement('div');
			nextMDiv.setAttribute("id","nextMon");
			nextMDiv.innerText = '下個月';
			mDiv.appendChild(nextMDiv);
			nextMDiv.addEventListener('click',function(e){
				var curMS = $('#month-s option:selected');

				if( curMS.val() == 12){
					$('#month-s option').eq(0).attr('selected',true);
					$('#month-s option').not($('#month-s option').eq(0)).attr('selected',false);

					var csy = $('#year-s option:selected');
					csy.next('option').attr('selected',true);
					$('#year-s option').not(csy.next('option')).attr('selected',false);
				}
				else{
					curMS.next('option').attr('selected',true);
					$('#month-s option').not(curMS.next('option')).attr('selected',false);
				}

				monthChange(inputid);
			},false);

			// week
			var wDiv = document.createElement('div');
			wDiv.setAttribute("id","wk-d");
			CalendarDiv.appendChild(wDiv);

			// tb-day
			var tbDayDiv = document.createElement('div');
			tbDayDiv.setAttribute("id","tb-day");
			CalendarDiv.appendChild(tbDayDiv);
		}

		//確認每個月有幾天
		function CheckDays(dd){
			var leapYeay = false;//是否為潤年

			var muchdays =[31,28,31,30,31,30,31,31,30,31,30,31];//一個月有幾天

			//判斷閏年
			if (dd.getFullYear()%4==0 || dd.getFullYear()%100==0 || dd.getFullYear()%400==0) {
				leapYeay = true;
				muchdays[dd.getMonth()]+1;
			}
			return muchdays[dd.getMonth()];
		}
		// 年被選取
		function yearSelect(inputid,e){
			var yva = $(e.target).find('option:selected').val();
			var sdy = new Date(yva,0,1);

			dCreate(sdy,inputid);
			$('#month-s option').attr('selected',false);
			$('#month-s option').eq(0).attr('selected',true);
		}
		//月被選取
		function monthSelect(inputid,e){
			var yva = $('#year-s').find('option:selected').val();
			var mva = $(e.target).find('option:selected').val();

			var sdm = new Date(yva,(mva-1),1);
			console.log(sdm);
			dCreate(sdm,inputid);

		}
		//月被改變 上下個月
		function monthChange(inputid){
			var yva = $('#year-s').find('option:selected').val();
			var mva = $('#month-s option:selected').val();

			var sdm = new Date(yva,(mva-1),1);
			console.log(sdm);
			dCreate(sdm,inputid);

		}
		//1-12月產生
		function mCreate(dd){

			// 傳進來的年跟月
			var ddm= dd.getMonth()+1;
			var ddy= dd.getFullYear();


			var tdy = new Date();
			var cm = tdy.getMonth()+1;//這個月
			var cy= tdy.getFullYear();//今年


			for( var i=1;i<=12;i++) {
				var opt = document.createElement('option');
				opt.innerText = i+' 月';
				opt.setAttribute("value",i);
				if( ddm==i && ddm==cm && ddy==cy) {
					//假如是這個月 把他選起來
					opt.setAttribute("selected",true);
				}
				document.getElementById('month-s').appendChild(opt);
			}
		}
		// 產生 年
		function yCreate(dd){
			// 傳進來的年跟月
			var ddy= dd.getFullYear();

			for(var i=ddy-4; i<=ddy+1; i++ ) {
				var opt = document.createElement('option');
				opt.innerText = '西元 '+i+' 年';
				opt.setAttribute("value",i);
				if(ddy==i ) {
					//假如剛好是今年 把他選起來
					opt.setAttribute("selected",true);
				}
				document.getElementById('year-s').appendChild(opt);
			}
		}
		// 星期 產生
		function wCreate(){
			//wk-d
			var wkArr = ['日','一','二','三','四','五','六'];
			for(var i=0; i<wkArr.length; i++){
				var div = document.createElement('div');
				div.innerText= wkArr[i];
				document.getElementById('wk-d').appendChild(div);
			}
		}
		// day
		function dCreate(sd,inputid){
			var tdid = document.getElementById('tb-day');
			tdid.innerHTML = '';
			//每月幾天
			var days = CheckDays(sd);

			var todayDate = new Date();
			var tdDY = todayDate.getFullYear();
			var tdDM = todayDate.getMonth();
			var tdDD = todayDate.getDate();
			//先變成每個月的1號
			sd.setDate(1);
			var w = sd.getDay();
			//先把空白填滿
			for(var i=1; i<=w; i++) {
				var div = document.createElement('div');
				tdid.appendChild(div);
			}
			for(var j=1;j<=days;j++ ){


				var div = document.createElement('div');
				//今天的日期加上 class
				if(tdDY==sd.getFullYear() && tdDM==sd.getMonth() && tdDD==j){
					div.setAttribute("class", "day-s today");
				}
				else{
					div.setAttribute("class", "day-s");
				}

				div.innerText= j;
				div.addEventListener('click',function(e){
					selectD(inputid,e);
				},false);
				tdid.appendChild(div);
			}
		}

		//點選日期
		function selectD(inputid,e){
			var sd = $(e.target).text();
			var sy = $('#year-s').find('option:selected').val();
			var sm = $('#month-s').find('option:selected').val();
			var sdt = new Date(sy,sm-1,sd);
			sdt = sdt.toLocaleDateString("ja-JP");
			$('#'+inputid).val(sdt);

			document.getElementById('x-cale').click();
		}


	}

	
