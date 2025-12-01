$(function(){
	if($('nav#TableOfContents').length > 0) return;

	let toc = '';

	$('article section.body h1,h2,h3,h4,h5,h6,h7,h8,h9')
		.each(function(idx,el){
			const tagName = el.tagName;
			const $el = $(el);
			toc += '<div class="tocjs-list ' + tagName + '">' + $el.text() + '</div>\n';
		});

	$('.tocjs').html(toc);
});
