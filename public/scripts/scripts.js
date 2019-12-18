$(function()
{
	if($('#indexStarttDate')!=null&&$('#indexStarttDate')!="")
	{
		var dateFrrom = $('#indexStarttDate').datepicker({
			dateFormat:'yymmdd'
			minDate: 0
		});
		datefrom.datepicker('setDate',new Date());
	}
	
});
