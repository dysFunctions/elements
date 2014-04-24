define(function(require){
	var Thorax = require('thorax');
	var Element = require ('models/element')

	var Elements = Thorax.Collection.extend({
		model: Element,

		comparator: function(model){
      		return parseInt(model.get('atomicNumber'));
    	}
	});

	return Elements;

});