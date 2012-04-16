/**
 * Master File which contains all modules for Sorry namespace,
 * and is to be minified via Closure Compiler
 * Contains the following modules
 */
(function(w, d, $) {

	//enforce ECMAScript 5 Specs
	"use strict";

	
	var Sorry = {}, 
	    $document = $(d);

	//add modules

	
	//expose Sorry Namespace to global (window) object
	w.Sorry = Sorry;
	
})(window, document, jQuery);
