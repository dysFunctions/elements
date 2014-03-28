define(function(require){
	var Backbone = require('backbone');
	var Element = require ('models/element')

	var Elements = Backbone.Collection.extend({
		model: Element
	});

	return Elements;

});