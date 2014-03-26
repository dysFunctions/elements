define(function (require){

    var Backbone = require('backbone');
    var Element = require('models/element');
    var ElementView = require('views/ElementView');
    var Elements = require('collections/elements');
    var $ = require('jquery');

    $(function(){
        var app = {};
        window.app = app;
        
        var elements = new Elements();

        $.get('data.json', function(data){   

            var table = data.table; // Array of objects
            var lanthanoids = data.lanthanoids; // Array of objects
            var actinoids = data.actinoids; // Array of objects

            table.forEach( function (data) {
                createElement(data);
            });
 // ------------ Lanthanoid and Actinoid Objects are different than table objects. need to figure out createElement func           
            lanthanoids.forEach( function (data) {
                createElementAlt(data);
            });
            
            actinoids.forEach( function (data) {
                createElementAlt(data);
            });
//---------------------------------------------------------------------------------------------------------------------            
            var elementView = new ElementView({collection: elements});
        });



        function createElement (elementObject) {
            for (var i = 0; i < elementObject.elements.length; i++){
              if(elementObject.elements[i].name){  
                var element = new Element();
                 element.set({
                    name: elementObject.elements[i].name,
                    symbol: elementObject.elements[i].small,
                    atomicNumber: elementObject.elements[i].number,
                    atomicWeight: elementObject.elements[i].molar});
                elements.add(element);
                }                   
            }
        }
        
        function createElementAlt (elementObject) {
                var element = new Element();
                 element.set({
                    name: elementObject.name,
                    symbol: elementObject.small,
                    atomicNumber: elementObject.number,
                    atomicWeight: elementObject.molar});
                elements.add(element);
        }


    });

});


/*
    - want to add views for a right or wrong answer
    - want to add a view for scores
    - need to track score somewhere on the view
*/
