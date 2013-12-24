var score = [0,0,0,0,0,0,0,0,0,0,0];
$(function(){
	$('.box').on('click',function(e){
		e.preventDefault();
		var box = $(this);
		changeQuestion(box.html());
		$('.box.on').removeClass('on').addClass('completed');
		box.addClass('on');
	});
	
	$('.range .circle').on('click',function(e){
		e.preventDefault();
		var index = $('.box.on').html();
		$('.range .circle.select').removeClass('select');
		$(this).addClass('select');
		score[index-1] = $(this).parent().attr('class').split(' ')[1];
		//next
		setTimeout(function(){
			var box = $('.box');
			$(box[index]).trigger('click');	
		},600)
	})


	$('.type ul li .text').on('click',function(e){
		$(this).html('');
		$(this).off(e);
	})

	$('.save').on('click',function(e){
		e.preventDefault();
		//save text
		score[9] = [];
		$('.input.text ul li .text').each(saveText);
		score[10] = [];
		$('.input.save ul li .text').each(saveText);	
		localStorage[$('.hidden.id').html()] = JSON.stringify(score);
	})

	$('.hidden.id').html(localStorage.length)

	$('.box.on').trigger('click');
});

function changeQuestion(index){
	var $survey = $('.survey');
	$survey.removeClass('on');
	$('.range .circle.select').removeClass('select');
	$survey.find('p').html(survey[index].es);
	$survey.find('hr + p').html(survey[index].en);
	if(score[index-1]!=0 && index<10){
		$('.'+score[index-1]).find('.circle').addClass('select');
	}
	$survey.find('.type.on').removeClass('on');
	$survey.find('.type.'+survey[index].type).addClass('on');
	$survey.addClass('on');
}

function saveText(i,val){
	var index = 9;
	if($(this).parent().parent().parent().parent().hasClass('save')){
		index = 10;
	}
	score[index].push($(val).html());
}
