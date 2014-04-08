define(function(require){

  var Backbone = require('backbone');

  var Score = Backbone.Model.extend({
    id: Math.floor(Math.random()*100)
  });

  return Score;

});
