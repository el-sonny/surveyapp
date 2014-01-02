google.load("visualization", "1", {packages:["corechart"]});
//google.setOnLoadCallback(drawChart);

$(function(){
	$('.box').on('click',function(e){
		e.preventDefault();
		$('.box.completed').removeClass('completed');
		$(this).addClass('completed');
		var index = $(this).html();
		url = "http://yellowadmin.projects.spaceshiplabs.com/api/getDataByQuestion/"
		$.ajax({
			url: url,
			crossDomain : true,
			type:'post',
			dataType : 'jsonp',
			data : {
				question:index
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
		pieHole: 0.2,
		backgroundColor: "transparent"
	};
	var chart = new google.visualization.PieChart(document.getElementById('chart'));
	//color


	chart.draw(data,options);	
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
