define(function(require){
  var Backbone = require('backbone');
  var Score = require ('models/score')

  var Scores = Backbone.Collection.extend({
    url: '/api/scores',
    model: Score,

    comparator: function(model){
      return parseInt(model.get('score'));
    },

    topTen: function(name,qScore){
      var scoresArray = [{name:name, score:qScore}];
      this.forEach(function(model){
        scoresArray.push(model.attributes);
      });
      return scoresArray;
    }

  });

  return Scores;

});
