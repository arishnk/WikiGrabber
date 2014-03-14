function grabAWiki() {
	$.ajax({
		url		:	'http://en.wikipedia.org/w/api.php?action=query&generator=random&prop=extracts|info&format=json&callback=onWikipedia&grnnamespace=0&inprop=url',
		dataType:	'jsonp',
		success	:	function(json) {
			for (var id in json.query.pages) {	
			
				var aW = $('<div class="aWiki"></div>').appendTo('#theWikis');
				
				$('<h2>' +
					($('#theWikis').children('.aWiki').length == 1 ? 'Hey! Read this first paragraph from the article titled ' : 'Or read this one titled ') +
				 	'<em>' + json.query.pages[id].title + '</em></h2>')
					.appendTo(aW)
					.fadeIn('slow', function(){
					
						$('p:first-child',
							'<div>' + json.query.pages[id].extract + '</div>')
							.wrap('div')
							.addClass('firstParagraph')
							.appendTo(aW)
							.fadeIn('slow');
							
						if ($('.aWiki').length > 1) {
							$("html, body").animate({
								scrollTop: $('.aWiki:last-child').offset().top
							});
						}
						
					});
					
				aW.click(function(e){
					document.location = json.query.pages[id].fullurl;
				});
				
			}			
		}
	});
}
	
$(document).ready(function(){

	$('h1').fadeIn('slow');
	
	$('#anotherOne').click(function(e){
		e.preventDefault();
		grabAWiki();
	});

	grabAWiki();

});