google.load("visualization", "1", {packages:["corechart"]});
//google.setOnLoadCallback(drawChart);

$(function(){
	$('.box').on('click',function(e){
		e.preventDefault();
		$('.box.completed').removeClass('completed');
		$(this).addClass('completed');
		var index = $(this).html(),
		timeF = $($('.time')[0]),
		timeT = $($('.time')[1]),
		timeFrom = "",
		timeTo = "",
		separate = "";
		for(var i=2;i>=0;i--){
			timeFrom += separate + (timeF.find("input")[i].value).toString();
			timeTo += separate + (timeT.find("input")[i].value).toString();
			separate = "-";
		}
		console.log(timeFrom,timeTo);
		url = "http://yellowadmin.projects.spaceshiplabs.com/api/getDataByQuestion/"
		//url = "http://yellowadmin/api/getDataByQuestion/"
		$.ajax({
			url: url,
			crossDomain : true,
			type:'post',
			dataType : 'jsonp',
			data : {
				question:index,
				from:timeFrom,
				to:timeTo
			}, 
			success:drawQuestion
		})
		//change question
		$('.survey p').html(survey[index].en);
	});

	$('.box.completed').trigger('click');

	$('.up').on('click',function(){
		$(this).parent().prev()[0].stepUp();
	});

	$('.down').on('click',function(){
		$(this).parent().prev()[0].stepDown();
	});
});

function drawQuestion(question){
	var data = getQuestionTable(question),
	options = {
		pieHole: 0.5,
		backgroundColor: 'transparent',
		colors:['#FFDD02','#DBBE0B','#A38F0A'],
		pieSliceBorderColor:'none',
		pieSliceTextStyle:{color:'#888984',fontSize:18,fontWeight:'bold'},
		chartArea:{width:350,height:350,left:90},
		legend:{
			textStyle:{
				fontSize:20,
				color:'#888984'
			},
			position:'right',
			alignment:'center'
		},
		height:300
	};
	var chart = new google.visualization.PieChart(document.getElementById('chart'));
	chart.draw(data,options);
	$('path + text').each(moveText);
}

function getQuestionTable(question){
	var table = [
		['Task', 'number of data']
	];
	for(var i in question){
		table.push([i,question[i]]);
	}

	return google.visualization.arrayToDataTable(table);
}

function moveText(i,select){
	select = $(select);
	var svg = $("svg"),
	svgW = 236,
	x1 = svgW/2, 
	y1 = svg.height()/2,
	w = select.attr("x"),
	h = select.attr("y"),
	
	section = [[-1,-1],[1,-1],[1,1],[-1,1]];
	if(w <= x1 && h <= y1){
		s = 0;
	}else if(w > x1 && h <= y1){
		s = 1;
	}else if(w > x1 && h > y1){
		s = 2;
	}else{
		s = 3;
	}
	console.log(s);
	var path = select.prev();
	bounding = path[0].getBoundingClientRect();
	select.attr("x",parseFloat(w)+(section[s][0]*(55)));
	select.attr("y",parseFloat(h)+(section[s][1]*(55)));


}
