define(function (require){

    var Backbone = require('backbone');
    var Element = require('models/element');
    var ElementView = require('views/ElementView');
    var $ = require('jquery');

    $(function(){
        var app = {};
        window.app = app;
        var element = new Element();

        $.getJSON('data.json', function(data){   

            var randElementIndex = Math.floor(data.table.length*Math.random());
            var randElementObjectIndex = Math.floor(data.table[randElementIndex].elements.length*Math.random())
            
            element.set({
                name: data.table[randElementIndex].elements[randElementObjectIndex].name,
                symbol: data.table[randElementIndex].elements[randElementObjectIndex].small,
                atomicNumber: data.table[randElementIndex].elements[randElementObjectIndex].number,
                atomicWeight: data.table[randElementIndex].elements[randElementObjectIndex].molar});
        
            var elementView = new ElementView({model: element});
        });

    });

});