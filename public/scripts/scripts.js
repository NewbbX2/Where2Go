$(function()
{

	$(window).scroll(function(){
		var top = $(window).scrollTop();
		
		if(top>0)
			$('header').addClass('atTop');//inverted
		else
			$('header').removeClass('atTop');	//inverted
	});


	
});
