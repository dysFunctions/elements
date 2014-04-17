define(function(require){
	var Thorax = require('thorax');
	var Element = require ('models/element')

	var Elements = Thorax.Collection.extend({
		model: Element
	});

	return Elements;

});