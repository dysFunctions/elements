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
    },

    scoreSync:function(params){
        $.ajax ({
          url: '/api/scores',
          type: 'PUT',
          data: JSON.stringify({"scores":params})
        });
    },

    pushScores: function(params){
        var data = [];
        this.add(params);
        this.forEach(function(model){
          data.push(model.attributes);
        });
        this.scoreSync(data);
    }

  });

  return Scores;

});
