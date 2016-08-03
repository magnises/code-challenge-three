var async = require('async');

module.exports = function(app) {

  var Person  = app.models.Person,
      Topic   = app.models.Topic,
      Post    = app.models.Post;

  if (app.dataSources.db.name !== 'Memory') {
    //check to see if we already imported data
  }else{
    createDefaultData();
  }

  function createDefaultData(){

    var matt = {
      email: "mkleppin@magnises.com",
      password: "kitten",
      fullname: "Mathew Kleppin"
    };

    var pritish = {
      email: "psangale@magnises.com",
      password: "squids",
      fullname: "Pritish Sangale"
    };

    var topic = {
      title: "Hello World"
    };

    async.series([
      function(callback) {
        Person.create(matt, function(error, response){
          if(error){
            callback(error);
          }else{
            matt = response;
            callback(null, response);
          }
        });
      },
      function(callback){
        Person.create(pritish, function(error, response){
          if(error){
            callback(error);
          }else{
            pritish = response;
            callback(null, response);
          }
        });
      }
    ],
    function(err, results) {

      matt.topics.create(topic, function(err, response){
        topic = response;

        var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

        async.series([
          function(callback) {
            createPost(topic, matt, "Hello World", callback);
          },
          function(callback) {
            createPost(topic, pritish, text, callback);
          },
          function(callback) {
            createPost(topic, matt, text, callback);
          },
          function(callback) {
            createPost(topic, matt, text, callback);
          },
          function(callback) {
            createPost(topic, pritish, text, callback);
          }
        ],
        function(e, r) {
          if(e)
            console.log(e);
        });

      });
    });

  }

  function createPost(topic, user, content, callback){
    var post = {
      content: content,
      personId: user.id
    };

    topic.posts.create(post, function(err, response){
      if(err)
        callback(err);
      else
        callback(null, response);
    });
  }

};
