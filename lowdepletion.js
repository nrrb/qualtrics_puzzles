<!-- Low Depletion 'e' selection task -->

var Stopwatch = function() {
	var currentTime = parseInt(jQuery('#Stopwatch-LowDepl').val());
	currentTime += 1;
	jQuery('#Stopwatch-LowDepl').val(currentTime);
	setTimeout(Stopwatch, 1000);
}

var proportionCorrect = 0.2;

var tagText = function() {
	var corpus = jQuery('#corpustext').html();
	// if I was better with regexps in js, I wouldn't have the following ugliness
	var corpus_array = corpus.split("e");
	var new_corpus = corpus_array[0];
	for(var i = 1; i < corpus_array.length; i++) {
		var last_chunk = corpus_array[i-1];
		var this_chunk = corpus_array[i];
		var e_replacement = "";
		// 1/18/2011 - Have to replace this first "if" clause if I want
		// to make the matching regular expressions for a suitable "e" truly
		// variable on the fly
		if((last_chunk.length==1) || (this_chunk.length==1)) {
			// a special case, where a preceding or forthcoming 'e' in the text
			// makes this 'e' a regular 'e'
			e_replacement = '<span class="e wrong">e</span>';
		}
		else if((last_chunk.search(/[^aeiou]{2}$/i)>=0) && (this_chunk.search(/^[^aeiou]{2}/i)>=0)) {
			// this is the 'e' we're looking for
			e_replacement = '<span class="e right">e</span>';
		}
		else {
			// The dregs of the 'e' placements
			e_replacement = '<span class="e wrong">e</span>';
		}
		new_corpus += e_replacement + this_chunk;
	}
	jQuery('#corpustext').html(new_corpus);
};

var charsSelected = 0;

jQuery(document).ready(function() {
	tagText();
// Loosely based on the Qualtrics Question API as documented here: http://www.qualtrics.com/university/api/
// I assume that the id of the next button being 'NextButton' is subject to change without notice
	jQuery('#NextButton').hide();
	//jQuery('#CharactersSelected-LowDepl').val(charsSelected = 0);
	jQuery('#Stopwatch-LowDepl').val(0);
	Stopwatch();
	jQuery('#corpustext .e').click(function() {
		jQuery(this).toggleClass('selected');
		charsSelected = jQuery('.e.selected').length;
		charsSpecialSelected = jQuery('.e.right.selected').length;
		jQuery('#CharactersSelected-LowDepl').val(charsSelected);
		if(charsSelected >= proportionCorrect * jQuery('.e').length) {
		  jQuery('#NextButton').show();
		} else {
		  jQuery('#NextButton').hide();
		}
	});
});
