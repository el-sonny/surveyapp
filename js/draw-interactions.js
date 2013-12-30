google.load("visualization", "1", {packages:["corechart"]});
//google.setOnLoadCallback(drawChart);

$(function(){
	drawQuestion('una pregunta');
});

function drawQuestion(question){
	var callback = drawWithData(question);
	google.load("visualization", "1",{callback:callback});
}

function getQuestionData(question){
	return google.visualization.arrayToDataTable([
		['Task', 'number of data'],
		['good', 11],
		['medium', 2],
		[question,  2]
	]);
}

function drawWithData(question){
	var data = getQuestionData(question);
	return function(){
		var options = {
			title: "My Daily activities",
			is3D: true
		};
		var chart = new google.visualization.PieChart(document.getElementById('chart'));
		chart.draw(data,options);
	}
}
