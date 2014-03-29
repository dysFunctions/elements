define(function(require){
  var Backbone = require('backbone');
  var Score = require ('models/score')

  var Scores = Backbone.Collection.extend({
    model: Score,

    topTen: function(){
      this.forEach(function(model){
        console.log(model);
      });
    }

  });

  return Scores;

});
