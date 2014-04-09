define(function(require){
  var Backbone = require('backbone');
  var Score = require ('models/score')

  var Scores = Backbone.Collection.extend({
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
