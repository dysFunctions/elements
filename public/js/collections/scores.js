define(function(require){
  var Thorax = require('thorax');
  var Score = require ('models/score')

  var Scores = Thorax.Collection.extend({
    url: '/api/scores',
    model: Score,

    comparator: function(model){
      return parseInt(model.get('score'));
    },

    topTen: function(){
      var scoresArray = [];
      this.models.forEach(function(model){
        scoresArray.push(model.attributes);
      });
      scoresArray = _.pluck(scoresArray,'score');
      return scoresArray;
    }

  });

  return Scores;

});
