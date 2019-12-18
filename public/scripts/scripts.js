$(function()
{

	$(window).scroll(function(){
		var top = $(window).scrollTop();
		
		if(top>0)
			$('header').addClass('atTop');//inverted
		else
			$('header').removeClass('atTop');	//inverted
	});


	
	if($('#indexStartDate')!=null)
	{
		var dateFrrom = $('#indexStarttDate').datepicker({
			dateFormat:'yymmdd'
			minDate: 0
		});
		datefrom.datepicker('setDate',new Date());
	}
	
	

	
});



