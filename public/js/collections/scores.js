define(function(require){
  var Backbone = require('backbone');
  var Score = require ('models/score')

  var Scores = Backbone.Collection.extend({
    model: Score
  });

  return Scores;

});
